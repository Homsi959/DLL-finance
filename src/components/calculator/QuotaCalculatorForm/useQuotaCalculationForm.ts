import { FormApi } from 'final-form';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  CalculationResult,
  QuotaCalculationResult,
  QuotaCalculationInput,
  ValidationProblemDetails,
  AmountType,
} from 'schema';
import { CalculationFormValues } from '../types';
import { useQuotasBackendMutation } from 'services';
import { getQuotaCalculationInput } from '../getQuotaCalculationInput';
import {
  calculatePrepaymentAmount,
  calculateFundingAmount,
  calculateTradeFeeAmount,
  calculateGeneralRatePercents,
} from '../calculations';

export const useQuotaCalculationForm = (quota: QuotaCalculationResult) => {
  const { id: idString } = useParams<{ id: string }>();
  const id = Number.parseInt(idString);

  const [calculationResult, setCalculationResult] = useState<CalculationResult>(
    quota.calculationResult
  );

  const [error, setError] = useState<ValidationProblemDetails | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: calculateAsync, isLoading: isCalculating } = useQuotasBackendMutation<
    CalculationFormValues,
    CalculationResult
  >('calculation', {
    onError: (error) => {
      setError(error);
    },
    onSuccess: (result) => {
      setCalculationResult(result);
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
  });

  const { mutateAsync: updateAsync, isLoading: isUpdating } = useQuotasBackendMutation<
    QuotaCalculationInput,
    QuotaCalculationResult
  >(`${id}`, {
    method: 'PUT',
    onError: (error) => {
      setError(error);
    },
    onSuccess: (quota) => {
      setCalculationResult(quota.calculationResult);
    },
  });

  const { mutateAsync: copyAsync, isLoading: isCopying } = useQuotasBackendMutation<
    QuotaCalculationInput,
    QuotaCalculationResult
  >(`${id}/copy`, {
    onError: (error) => {
      setError(error);
    },
  });

  const history = useHistory();

  const onSubmit = useCallback(
    async (
      values: CalculationFormValues,
      form: FormApi<CalculationFormValues, Partial<CalculationFormValues>>
    ) => {
      const request = getQuotaCalculationInput(values);
      if (values.copy) {
        const result = await copyAsync(request);
        if (result.quotaId) {
          history.push(`/calculator/results/${result.quotaId}`);
        }
      } else if (values.save) {
        const result = await updateAsync(request);
        form.change('leaseItemCost', result.calculationResult.leaseItemCost);
      } else {
        const calcResult = await calculateAsync(request);
        form.change('leaseItemCost', calcResult.leaseItemCost);
      }
    },
    [updateAsync, calculateAsync, copyAsync, history]
  );

  const { input, agreement, calculationResult: result, dealer, lessee, insuranceCompany } = quota;
  const { leaseItemCost } = result;
  const {
    cofPercents = 0,
    marginPercents = 0,
    itemDiscount = {
      value: 0,
      type: AmountType.Money,
    },
  } = input;

  const initialValues: CalculationFormValues = useMemo(() => {
    const { prepayment = { type: AmountType.Percents, value: 0 }, tradeFee = 0 } = input;
    const prepaymentAmount = calculatePrepaymentAmount(leaseItemCost, prepayment, itemDiscount);
    const fundingAmount = calculateFundingAmount(leaseItemCost, prepaymentAmount, itemDiscount);
    const tradeFeeAmount = calculateTradeFeeAmount(leaseItemCost, tradeFee, itemDiscount);
    const generalRatePercents = calculateGeneralRatePercents(cofPercents, marginPercents);

    return {
      ...input,
      ...agreement,
      leaseItemCost,
      prepaymentAmount,
      tradeFeeAmount,
      fundingAmount,
      dealer,
      lessee,
      insuranceCompany,
      generalRatePercents,
    };
  }, [
    input,
    agreement,
    leaseItemCost,
    dealer,
    lessee,
    insuranceCompany,
    cofPercents,
    marginPercents,
    itemDiscount,
  ]);

  const isLoading = isUpdating || isCalculating || isCopying;

  return {
    isLoading,
    onSubmit,
    initialValues,
    data: calculationResult,
    error,
    resultRef,
  };
};
