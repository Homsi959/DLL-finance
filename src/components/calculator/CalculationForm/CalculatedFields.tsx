import { useContext, useEffect } from 'react';
import { FormSpy, FormSpyRenderProps } from 'react-final-form';
import { AmountType, Currency } from 'schema/serverTypes';
import {
  calculateFundingAmount,
  calculateGeneralRatePercents,
  calculatePrepaymentAmount,
  calculateTradeFeeAmount,
} from '../calculations';
import { CalculationFormValues } from '../types';
import {
  CalculationFormApiContext,
  CalculationFormApiContextProps,
} from './CalculationFormApiContext';

const useCalculation = (context: CalculationFormApiContextProps, values: CalculationFormValues) => {
  const {
    getFieldState,
    getActualRate,
    exchangeMoney,
    batch,
    change,
    isActive,
    getCofValue,
    setLeaseCurrency,
    setCurrencyRate,
    setSaleCurrency,
  } = context;

  const {
    itemPrice = 0,
    currencyLease = Currency.Ruble,
    currencySale = Currency.Ruble,
    currencyRate = 1,
    numberOfMonths = 48,
  } = values;

  useEffect(() => {
    const lease = currencyLease as Currency;
    const sale = currencySale as Currency;
    const actualRate = getActualRate(sale, lease, currencyRate);
    const money = exchangeMoney(itemPrice, sale, lease, actualRate);

    const changes: (() => void)[] = [];

    if (!isActive('leaseItemCost')) {
      changes.push(() => change('leaseItemCost', money));
    }

    if (isActive('currencyLease')) {
      setLeaseCurrency(lease);
      setCurrencyRate(sale, lease);
      changes.push(() => {
        change('currencyCommission', lease !== Currency.Ruble);
        change('cofPercents', getCofValue(lease, numberOfMonths));
      });
    } else if (isActive('currencySale')) {
      setSaleCurrency(sale);
      setCurrencyRate(sale, lease);
    } else if (isActive('numberOfMonths')) {
      changes.push(() => {
        change('cofPercents', getCofValue(lease, numberOfMonths));
      });
    }

    if (changes.length > 0) {
      batch(() => {
        changes.forEach((change) => change());
      });
    }
  }, [
    itemPrice,
    currencyLease,
    currencySale,
    currencyRate,
    numberOfMonths,
    getFieldState,
    getActualRate,
    exchangeMoney,
    batch,
    change,
    isActive,
    getCofValue,
    setLeaseCurrency,
    setCurrencyRate,
    setSaleCurrency,
  ]);
};

const useLeaseItemCostBasedCalculation = (
  context: CalculationFormApiContextProps,
  values: CalculationFormValues
) => {
  const {
    leaseItemCost = 0,
    itemDiscount = { type: AmountType.Percents, value: 0 },
    prepayment = { type: AmountType.Percents, value: 0 },
    tradeFee = 0,
  } = values;

  const { batch, change } = context;

  useEffect(() => {
    const prepaymentAmount = calculatePrepaymentAmount(leaseItemCost, prepayment, itemDiscount);
    const tradeFeeAmount = calculateTradeFeeAmount(leaseItemCost, tradeFee, itemDiscount);
    const fundingAmount = calculateFundingAmount(leaseItemCost, prepaymentAmount, itemDiscount);
    batch(() => {
      change('prepaymentAmount', prepaymentAmount);
      change('fundingAmount', fundingAmount);
      change('tradeFeeAmount', tradeFeeAmount);
    });
  }, [leaseItemCost, itemDiscount, prepayment, tradeFee, batch, change]);
};

const useGeneralRateCalculation = (
  context: CalculationFormApiContextProps,
  values: CalculationFormValues
) => {
  const { cofPercents = 0, cofAddPercents = 0, marginPercents = 0 } = values;

  const { change } = context;

  useEffect(() => {
    change(
      'generalRatePercents',
      calculateGeneralRatePercents(cofPercents + cofAddPercents, marginPercents)
    );
  }, [cofPercents, cofAddPercents, marginPercents, change]);
};

const Calculations = (props: FormSpyRenderProps<CalculationFormValues>) => {
  const { values } = props;

  const context = useContext(CalculationFormApiContext);

  useCalculation(context, values);
  useLeaseItemCostBasedCalculation(context, values);
  useGeneralRateCalculation(context, values);

  return <></>;
};

export const CalculatedFields = () => {
  return (
    <FormSpy<CalculationFormValues> component={Calculations} subscription={{ values: true }} />
  );
};
