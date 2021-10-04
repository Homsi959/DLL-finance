import { useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form-hooks';
import { MonthPaymentOption } from 'schema/serverTypes';

type OnMonthNumberChangedProps = FieldRenderProps<number> & {
  valuesCount: number;
  push: (option: MonthPaymentOption) => void;
  pop: () => MonthPaymentOption;
};

export const OnMonthNumberChanged = (props: OnMonthNumberChangedProps) => {
  const { input, push, pop, valuesCount } = props;
  const { value: numberOfMonths } = input;

  useEffect(() => {
    if (valuesCount === numberOfMonths) {
      return;
    }
    if (valuesCount < numberOfMonths) {
      for (let i = valuesCount; i < numberOfMonths; i++) {
        push({ number: i + 1, isPayment: true, isPreferential: false, value: 1.0 });
      }
    } else {
      for (let i = numberOfMonths; i < valuesCount; i++) {
        pop();
      }
    }
  }, [valuesCount, numberOfMonths, push, pop]);

  return <></>;
};
