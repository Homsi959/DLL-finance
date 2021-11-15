import { useCallback, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  ContractViewModel,
  UpdateContractViewModel,
  DepreciationGroup,
  Region,
  PrepaymentAdvanceOrder,
  Currency,
  QuotaCalculationResult,
} from 'schema/serverTypes';
import { useQuotasBackendQuery, useQuotasBackendMutation } from 'services/api';
import { ContractFormValues } from './types';

const createFormValues = (contract: ContractViewModel) => {
  const {
    prepaymentPercents,
    prepaymentAmount,
    paymentPercents,
    paymentAmount,
    contractNumber = '',
    date = '',
    leaseSubject = '',
    leaseSubjectInDocument = '',
    prepaymentCondition = '',
    paymentCurrencyRate = '',
    paymentCondition = '',
    expectedShippingDate = '',
    shippingAddress = '',
    ...rest
  } = contract;

  const values: ContractFormValues = {
    ...rest,
    contractNumber,
    date,
    leaseSubject,
    leaseSubjectInDocument,
    prepaymentCondition,
    paymentCurrencyRate,
    paymentCondition,
    expectedShippingDate,
    shippingAddress,
    prepaymentPercents: prepaymentPercents?.toString() ?? '',
    prepaymentAmount: prepaymentAmount?.toString() ?? '',
    paymentPercents: paymentPercents?.toString() ?? '',
    paymentAmount: paymentAmount?.toString() ?? '',
  };

  return values;
};

const useDefaultValues = (quota: QuotaCalculationResult) => {
  const leaseSubject = quota.calculationResult.leaseSubject || '';
  const numberOfMonths = quota.calculationResult.numberOfMonths ?? 48;

  const defaultValues: ContractFormValues = useMemo(() => {
    return {
      id: 0,
      contractNumber: '',
      date: '',
      leaseSubject,
      leaseSubjectInDocument: leaseSubject,
      prepaymentPercents: '',
      prepaymentAmount: '',
      prepaymentCondition: '',
      paymentCurrencyRate: '',
      paymentPercents: '',
      paymentAmount: '',
      paymentCondition: '',
      expectedShippingDate: '',
      shippingAddress: '',
      depreciation: {
        group: DepreciationGroup.Group1,
        numberOfMonths,
        coefficient: 0.25,
      },
      region: Region.RussiaExceptRepublics,
      saleCurrency: Currency.Ruble,
      prepaymentAdvanceOrder: PrepaymentAdvanceOrder.OneTimeWithFirstPayment,
      prefunding: false,
    };
  }, [leaseSubject, numberOfMonths]);

  return defaultValues;
};

const useUpdateContractMutation = (quotaId: number) => {
  const { mutateAsync } = useQuotasBackendMutation<UpdateContractViewModel, ContractViewModel>(
    `${quotaId}/contract`,
    {
      method: 'PUT',
    }
  );

  const submit = useCallback(
    async (values: ContractFormValues) => {
      const {
        dealer,
        dealerHead,
        lessor,
        lessorHead,
        lessee,
        lesseeHead,
        depreciation,
        prepaymentPercents,
        prepaymentAmount,
        paymentPercents,
        paymentAmount,
        ...rest
      } = values;
      const model: UpdateContractViewModel = {
        ...rest,
        dealerInn: dealer?.inn,
        dealerHeadId: dealerHead?.id,
        lessorInn: lessor?.inn,
        lessorHeadId: lessorHead?.id,
        lesseeInn: lessee?.inn,
        lesseeHeadId: lesseeHead?.id,
        depreciationGroup: depreciation.group,
        prepaymentPercents: prepaymentPercents !== '' ? parseFloat(prepaymentPercents) : null,
        prepaymentAmount: prepaymentAmount !== '' ? parseFloat(prepaymentAmount) : null,
        paymentPercents: paymentPercents !== '' ? parseFloat(paymentPercents) : null,
        paymentAmount: paymentAmount !== '' ? parseFloat(paymentAmount) : null,
      };
      return await mutateAsync(model);
    },
    [mutateAsync]
  );

  return submit;
};

const getSpiMonths = (group: DepreciationGroup) => {
  switch (group) {
    case DepreciationGroup.Group1:
      return 1 * 12;
    case DepreciationGroup.Group2:
      return 2 * 12 + 1;
    case DepreciationGroup.Group3:
      return 3 * 12 + 1;
    case DepreciationGroup.Group4:
      return 5 * 12 + 1;
    case DepreciationGroup.Group5:
      return 7 * 12 + 1;
    case DepreciationGroup.Group6:
      return 10 * 12 + 1;
  }
};

export const useContractForm = (quota: QuotaCalculationResult) => {
  const defaultValues = useDefaultValues(quota);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
  });

  const { data, isLoading } = useQuotasBackendQuery<ContractViewModel>(
    `${quota.quotaId}/contract`,
    ['quotas', quota.quotaId, 'contract'],
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const values = createFormValues(data);
      reset(values);
    }
  }, [isLoading, data, reset]);

  const mutateAsync = useUpdateContractMutation(quota.quotaId);

  const onSubmit = useMemo(() => {
    const submit = async (values: ContractFormValues) => {
      return await mutateAsync(values);
    };
    return handleSubmit(submit);
  }, [handleSubmit, mutateAsync]);

  const group = useWatch({
    control,
    name: 'depreciation.group',
  });

  const numberOfMonths = useWatch({
    control,
    name: 'depreciation.numberOfMonths',
  });

  useEffect(() => {
    const months = getSpiMonths(group);
    let value = months / numberOfMonths;
    if (value > 3) {
      value = 3;
    }
    const coeff = value.toFixed(2);
    setValue('depreciation.coefficient', parseFloat(coeff));
  }, [group, numberOfMonths, setValue]);

  return {
    onSubmit,
    control,
    isSubmitting,
    isLoading,
    setValue,
  };
};
