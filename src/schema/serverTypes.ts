export type ValidationProblemErrors = {
  [k: string]: string[];
};

export type ValidationProblemDetails = {
  errors: ValidationProblemErrors;
  type?: string;
  title?: string;
  status?: number;
  traceId?: string;
};

export enum CalculationMethod {
  Annuity = 'annuity',
  StraightLine = 'straightLine',
  Seasonal = 'seasonal',
}

export enum CalculationMethodType {
  Forward = 'forward',
  Reverse = 'reverse',
  ReverseIRR = 'reverseIRR',
}

export enum InsuranceFranchise {
  None = 'none',
  Unconditional = 'unconditional',
  Conditional = 'conditional',
}

export enum Telematics {
  Caesar = 'caesar',
  XPro = 'xPro',
  None = 'none',
}

export enum AgentFeeRecipient {
  Entity = 'entity',
}

export enum AgentFeeRefund {
  Evenly = 'evenly',
}

export enum AuditType {
  Desk = 'desk',
  Field = 'field',
}

export enum AuditRegularity {
  Month12 = 'month12',
  Month24 = 'month24',
}

export type MonthPaymentOption = {
  number: number;
  isPayment: boolean;
  isPreferential: boolean;
  value: number;
};

export enum SeasonalPaymentType {
  MonthlyPayment = 'monthlyPayment',
  MainDebt = 'mainDebt',
}

export type SeasonalPaymentOptions = {
  date?: string;
  paymentType: SeasonalPaymentType;
  hasCyclicity: boolean;
};

export type CalculationInput = {
  calculationMethod: CalculationMethod;
  itemPrice?: number;
  leaseItemCost?: number;
  numberOfItems?: number;
  numberOfMonths?: number;
  prepayment?: Amount;
  itemDiscount?: Amount;
  subsidyVendor?: Amount;
  subsidyDealer?: Amount;
  agentFee?: Amount;
  insuranceRatePercents?: number;
  telematicsOneTimeAmount?: number;
  telematicsMonthlyAmount?: number;
  tradeFee?: number;
  residualValue?: Amount;
  marginPercents?: number;
  cofPercents?: number;
  cofAddPercents?: number;
  vatPercents?: number;
  calculationMethodType?: CalculationMethodType;
  irrPercents?: number;
  rizeInPricePercents?: number;
  currencySale?: string;
  currencyRate?: number;
  currencyLease?: string;
  hasResidualValue?: boolean;
  hasInsurance?: boolean;
  agreement?: CalculationAgreement;
  seasonalPaymentOptions?: SeasonalPaymentOptions;
  paymentOptions?: MonthPaymentOption[];
};

export type CalculationAgreement = {
  brand?: string;
  category?: string;
  model?: string;
  insuranceFranchise?: InsuranceFranchise;
  franchiseAmount?: number;
  amount?: number;
  generalRatePercents?: number;
  year?: number;
  secondHand?: boolean;
  currencyCommission?: boolean;
  balanceHolder?: BalanceHolder;
  hasPropertyTax?: boolean;
  propertyTax?: Amount;
  hasVehicleRegistration?: boolean;
  telematics?: Telematics;
  agent?: string;
  agentFeeRecipient?: AgentFeeRecipient;
  agentFeeRefund?: AgentFeeRefund;
  hasAudit?: boolean;
  auditType?: AuditType;
  auditRegularity?: AuditRegularity;
  hasFeePriceRule?: boolean;
  hasInsurancePriceRule?: boolean;
  hasTelematicsPriceRule?: boolean;
  hasSubsidyPriceRule?: boolean;
};

export type QuotaCalculationInput = CalculationInput & {
  dealer?: string;
  lessee?: string;
  insuranceCompany?: string;
};

export type QuotaPayment = {
  insurance: number;
  mainDebt: number;
  mainDebtPayment: number;
  number: number;
  percentsPayment: number;
  telematics: number;
  total: number;
  date?: string;
};

export type CalculationResult = {
  model?: string;
  calculationMethod: CalculationMethod;
  assetCost: number;
  fundingAmount: number;
  itemPrice: number;
  leaseItemCost: number;
  monthlyPayment: number;
  saleCurrency: Currency;
  leaseCurrency: Currency;
  numberOfItems: number;
  numberOfMonths: number;
  payments: QuotaPayment[];
  discount?: number;
  discountAmount?: number;
  subsidyDiscount?: number;
  subsidyAmount?: number;
  tradeFeeAmount: number;
  financingFeeAmount: number;
  agentFee?: number;
  agentFeeAmount?: number;
  residualValue?: number;
  totalPaymentsAmount: number;
  initialFee: number;
  telematics?: Telematics;
  telematicsPayment?: number;
  insuranceCompany?: string;
  insuranceTotal?: number;
  insuranceMonthlyWithVat?: number;
  irr: number;
  priceRizing: number;
};

export type CreatedQuotaResult = {
  quotaId: number;
  calculationResult: CalculationResult;
};

export const isCreatedQuota = (
  result: CreatedQuotaResult | CalculationResult | undefined
): result is CreatedQuotaResult => {
  if (result === undefined) {
    return false;
  }
  return (result as CreatedQuotaResult).quotaId !== undefined;
};

export const isQuotaCalculation = (
  result: QuotaCalculationResult | CalculationResult | undefined
): result is QuotaCalculationResult => {
  if (result === undefined) {
    return false;
  }
  return (result as QuotaCalculationResult).quotaId !== undefined;
};

export enum AmountType {
  Money = 'money',
  Percents = 'percents',
}

export type Amount = {
  type: AmountType;
  value: number;
};

export enum Currency {
  Ruble = 'ruble',
  Dollar = 'dollar',
  Euro = 'euro',
}

export enum BalanceHolder {
  Lessor = 'lessor',
  Lessee = 'lessee',
}

export enum ApplicationRole {
  Admin = 'admin',
  SuperSalesManager = 'super_sales_manager',
  SalesManager = 'sales_manager',
  SalesSupport = 'sales_support',
}

export type User = {
  id: string;
  name: string;
};

export type QuotaCalculationResult = {
  quotaId: number;
  user: User;
  input: CalculationInput;
  calculationResult: CalculationResult;
  agreement: CalculationAgreement;
  createdDate: string;
  dealer?: string;
  lessee?: string;
  insuranceCompany?: string;
};

export type QuotaInputHistory = {
  user: User;
  date: string;
};

export type QuotaOwnerHistory = {
  oldOwner: User;
  newOwner: User;
  date: string;
};

export type QuotaHistoryWithAvailableOwners = {
  id: number;
  owner: User;
  availableOwners: User[];
  createdDate: string;
  inputHistory: QuotaInputHistory[];
  ownerHistory: QuotaOwnerHistory[];
};

export type NomenclatureItem = {
  brand: string;
  category: string;
  model: string;
};

export type QuotaListViewModel = {
  quotaId: number;
  user: User;
  createdDate: string;
  leaseProduct?: string;
  numberOfItems?: number;
  prepayment?: Amount;
  calculationMethod: CalculationMethod;
  numberOfMonths: number;
  fundingAmountNBV?: number;
  dealer?: string;
  lessee?: string;
  insuranceCompany?: string;
  currency: Currency;
};

export type CurrencyViewModel = {
  currency: Currency;
  rate: number;
};

export type CurrencyExchangeRate = {
  from: Currency;
  to: Currency;
  rate: number;
};

export type CurrencyDictionaryViewModel = {
  baseCurrency: Currency;
  currencies: CurrencyViewModel[];
  exchangeRates: CurrencyExchangeRate[];
  updated: string;
};

export enum CounterpartyType {
  dealer = 'dealer',
  lessee = 'lessee',
  insuranceCompany = 'insuranceCompany',
  lessor = 'lessor',
}

export type CounterpartyOption = {
  inn: string;
  name: string;
};

export type Cof = {
  currency: Currency;
  months: number;
  value: number;
  date: string;
};

export type UserViewModel = {
  id: string;
  name: string;
};

export enum QuotaSortBy {
  id = 'id',
  lessee = 'lessee',
}

export type Topo = {
  name: string;
  value: string;
};

export type Address = {
  zipCode: string;
  kladrCode: string;
  regionCode: string;
  regionName: Topo;
  settlement: Topo;
  district: Topo;
  city: Topo;
  street: Topo;
  house: Topo;
  flat: Topo;
  bulk: Topo;
  comment?: string;
};

export type Head = {
  fio: string;
  position: string;
};

export type CounterpartyViewModel = {
  inn: string;
  name: string;
  fullName: string;
  ogrn: string;
  kpp: string;
  okpo: string;
  registrationDate: string;
  heads: Head[];
  legalAddress: Address;
  actualAddress: Address;
};

export type CounterpartyListViewModel = {
  id: number;
  inn: string;
  name: string;
  isDealer: boolean;
  isLessee: boolean;
  isInsuranceCompany: boolean;
  isLessor: boolean;
};

export enum CounterpartySortBy {
  id = 'id',
  inn = 'inn',
  name = 'name',
}
