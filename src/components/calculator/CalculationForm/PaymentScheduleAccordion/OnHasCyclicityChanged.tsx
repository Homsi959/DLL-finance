import { usePrevious } from 'hooks';
import { useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form-hooks';
import { MonthPaymentOption } from 'schema/serverTypes';

export type OnHasCyclicityChangedProps = FieldRenderProps<boolean> & {
  options: MonthPaymentOption[];
  update: (index: number, value: MonthPaymentOption) => void;
};

export const OnHasCyclicityChanged = (props: OnHasCyclicityChangedProps) => {
  const { input, options, update } = props;
  const { value: hasCyclicity = false } = input;

  const prevHasCyclicity = usePrevious(hasCyclicity);

  useEffect(() => {
    if (options.length <= 12) {
      return;
    }
    if (hasCyclicity && !prevHasCyclicity) {
      const patterns = options.slice(0, 12);
      for (let i = 11; i < options.length; i++) {
        const option = options[i];
        const pattern = patterns[i % 12];
        if (
          option.isPayment !== pattern.isPayment ||
          option.isPreferential !== pattern.isPreferential ||
          option.value !== pattern.value
        ) {
          update(i, { ...pattern, number: option.number });
        }
      }
    }
  }, [hasCyclicity, prevHasCyclicity, options, update]);

  return <></>;
};
