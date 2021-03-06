import { CalculationMethod, QuotaCalculationInput, Telematics } from 'schema';
import { CalculationFormValues } from './types';

export const getQuotaCalculationInput = (values: CalculationFormValues) => {
  const {
    save,
    calculationMethod,
    itemPrice,
    numberOfItems,
    numberOfMonths,
    prepayment,
    itemDiscount,
    subsidyVendor,
    subsidyDealer,
    agentFee,
    insuranceRatePercents,
    telematicsOneTimeAmount,
    telematicsMonthlyAmount,
    tradeFee,
    residualValue,
    marginPercents,
    cofPercents,
    cofAddPercents,
    vatPercents,
    calculationMethodType,
    irrPercents,
    rizeInPricePercents,
    currencySale,
    currencyRate,
    currencyLease,
    leaseItemCost,
    tradeFeeAmount,
    generalRatePercents,
    fundingAmount,
    dealer,
    lessee,
    insuranceCompany,
    hasResidualValue,
    hasInsurance,
    seasonalPaymentOptions,
    paymentOptions,
    ...rest
  } = values;
  const { agreement: agg, ...agreement } = rest;
  const request: QuotaCalculationInput = {
    calculationMethod,
    calculationMethodType,
    itemPrice,
    numberOfItems,
    numberOfMonths,
    prepayment,
    itemDiscount,
    subsidyVendor,
    subsidyDealer,
    agentFee,
    insuranceRatePercents,
    telematicsOneTimeAmount:
      agreement.telematics === Telematics.None ? undefined : telematicsOneTimeAmount,
    telematicsMonthlyAmount:
      agreement.telematics === Telematics.None ? undefined : telematicsMonthlyAmount,
    tradeFee,
    residualValue,
    hasResidualValue,
    hasInsurance,
    marginPercents,
    cofPercents,
    cofAddPercents,
    vatPercents,
    agreement,
    currencySale,
    currencyRate,
    currencyLease,
    leaseItemCost,
    dealer,
    lessee,
    insuranceCompany,
    seasonalPaymentOptions,
    paymentOptions: calculationMethod === CalculationMethod.Seasonal ? paymentOptions : undefined,
    rizeInPricePercents,
    irrPercents,
  };

  return request;
};
