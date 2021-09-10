import { Amount, AmountType } from 'schema/serverTypes';

const round2 = (value: number) => {
  return parseFloat(value.toFixed(2));
};

const calculateLeaseItemCost = (leaseItemCost: number, discount: Amount) => {
  if (discount.type === AmountType.Money) {
    return leaseItemCost - discount.value;
  } else {
    return leaseItemCost - (leaseItemCost * discount.value) / 100.0;
  }
};

export const calculatePrepaymentAmount = (
  leaseItemCost: number,
  prepayment: Amount,
  discount: Amount
) => {
  const itemCost = calculateLeaseItemCost(leaseItemCost, discount);
  const isMoney = prepayment.type === AmountType.Money;
  return isMoney ? prepayment.value : (itemCost * prepayment.value) / 100.0;
};

export const calculateTradeFeeAmount = (
  leaseItemCost: number,
  tradeFeePercents: number,
  discount: Amount
) => {
  const itemCost = calculateLeaseItemCost(leaseItemCost, discount);
  return (itemCost * tradeFeePercents) / 100.0;
};

export const calculateFundingAmount = (
  leaseItemCost: number,
  prepaymentAmount: number,
  discount: Amount
) => {
  const itemCost = calculateLeaseItemCost(leaseItemCost, discount);
  return itemCost - prepaymentAmount;
};

export const calculateGeneralRatePercents = (cof: number, margin: number) => {
  const cofValue = round2(cof);
  const marginValue = round2(margin);
  const generalRate = round2(cofValue + marginValue);
  return generalRate;
};
