import { useCallback, useMemo, useState, useContext, useRef, useEffect } from 'react';
import { FormApi } from 'final-form';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import {
  CalculationResult,
  CreatedQuotaResult,
  Currency,
  QuotaCalculationInput,
  ValidationProblemDetails,
} from 'schema';
import { CalculationFormValues, defaultCalculationValues } from './types';
import { useQuotasBackendMutation } from 'services';
import { getQuotaCalculationInput } from './getQuotaCalculationInput';
import { CurrencyRatesContext } from './CurrencyRatesContext';
import { calculateGeneralRatePercents } from './calculations';

export const useCalculatorForm = () => {
  const queryClient = useQueryClient();

  const [calculationResult, setCalculationResult] = useState<CalculationResult | undefined>();
  const [error, setError] = useState<ValidationProblemDetails | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (calculationResult) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [calculationResult]);

  const { mutateAsync: calculateAsync, isLoading: isCalculating } = useQuotasBackendMutation<
    CalculationFormValues,
    CalculationResult
  >('calculation', {
    onSuccess: (result) => {
      setCalculationResult(result);
    },
    onError: (error) => {
      setError(error);
    },
  });

  const { mutateAsync: createAsync, isLoading: isCreating } = useQuotasBackendMutation<
    QuotaCalculationInput,
    CreatedQuotaResult
  >('', {
    onError: (error) => {
      setError(error);
    },
    onSuccess: (result) => {
      setCalculationResult(result.calculationResult);

      queryClient.invalidateQueries({
        predicate: (query) => {
          if (Array.isArray(query.queryKey)) {
            const key = query.queryKey as Array<string>;
            if (key[0] === 'quotas') {
              return true;
            }
          }
          return false;
        },
      });
    },
  });

  const history = useHistory();
  const { path } = useRouteMatch();

  const onSubmit = useCallback(
    async (
      values: CalculationFormValues,
      form: FormApi<CalculationFormValues, Partial<CalculationFormValues>>
    ) => {
      const request = getQuotaCalculationInput(values);
      if (values.save) {
        const result = await createAsync(request);
        form.change('leaseItemCost', result.calculationResult.leaseItemCost);
        history.push(`${path}/results/${result.quotaId}`);
      } else {
        const calcResult = await calculateAsync(request);
        form.change('leaseItemCost', calcResult.leaseItemCost);
      }
    },
    [createAsync, calculateAsync, history, path]
  );

  const { getCofValue } = useContext(CurrencyRatesContext);
  const cofPercents = getCofValue(Currency.Ruble, 48);
  const { marginPercents = 6.0 } = defaultCalculationValues;
  const generalRatePercents = calculateGeneralRatePercents(cofPercents, marginPercents);

  const isLoading = isCalculating || isCreating;
  const props = useMemo(() => {
    return {
      onSubmit,
      initialValues: {
        ...defaultCalculationValues,
        cofPercents,
        generalRatePercents,
      },
      isLoading,
      data: calculationResult,
      error,
      resultRef,
    };
  }, [onSubmit, isLoading, calculationResult, error, cofPercents, generalRatePercents]);

  return props;
};
