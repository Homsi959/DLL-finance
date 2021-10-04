import {
  AgentFeeRecipient,
  AgentFeeRefund,
  AmountType,
  AuditRegularity,
  AuditType,
  BalanceHolder,
  CalculationAgreement,
  CalculationInput,
  CalculationMethod,
  CalculationMethodType,
  Currency,
  InsuranceFranchise,
  SeasonalPaymentType,
  Telematics,
} from 'schema';

export const TelematicsValue = {
  caesar: {
    monthly: 534.0,
    oneTime: 15763.0,
  },
};

export type CalculationFormValues = CalculationInput &
  CalculationAgreement & {
    generalRatePercents?: number;
    tradeFeeAmount?: number;
    prepaymentAmount?: number;
    fundingAmount?: number;
    save?: boolean;
    copy?: boolean;
    dealer?: string;
    dealerName?: string;
    lessee?: string;
    lesseeName?: string;
    insuranceCompany?: string;
    insuranceCompanyName?: string;
  };

const getSeasonStartDate = () => {
  return new Date().toISOString();
};

export const defaultCalculationValues: CalculationFormValues = {
  calculationMethod: CalculationMethod.Annuity,
  numberOfItems: 1,
  numberOfMonths: 48,
  marginPercents: 6.0,
  cofPercents: 6.83,
  cofAddPercents: 0.0,
  prepayment: {
    type: AmountType.Percents,
    value: 20.0,
  },
  tradeFee: 1.0,
  insuranceFranchise: InsuranceFranchise.None,
  year: new Date().getFullYear(),
  secondHand: false,
  currencySale: Currency.Ruble,
  currencyLease: Currency.Ruble,
  currencyRate: 1.0,
  currencyCommission: false,
  balanceHolder: BalanceHolder.Lessee,
  hasPropertyTax: false,
  hasInsurance: false,
  hasVehicleRegistration: false,
  telematics: Telematics.None,
  agentFeeRecipient: AgentFeeRecipient.Entity,
  agentFeeRefund: AgentFeeRefund.Evenly,
  hasAudit: false,
  auditType: AuditType.Desk,
  auditRegularity: AuditRegularity.Month12,
  hasFeePriceRule: true,
  hasInsurancePriceRule: false,
  hasTelematicsPriceRule: false,
  hasSubsidyPriceRule: true,
  calculationMethodType: CalculationMethodType.Forward,
  save: false,
  seasonalPaymentOptions: {
    paymentType: SeasonalPaymentType.MonthlyPayment,
    date: getSeasonStartDate(),
    hasCyclicity: false,
  },
  paymentOptions: Array.from(Array(48)).map((_value, index) => {
    return {
      number: index + 1,
      isPreferential: false,
      isPayment: true,
      value: 1.0,
    };
  }),
};
