import { useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form-hooks';
import { MonthPaymentOption } from 'schema/serverTypes';

export type OnIsPaymentChangedProps = FieldRenderProps<MonthPaymentOption>;

export const OnIsPaymentChanged = (props: OnIsPaymentChangedProps) => {
  const { input } = props;
  const { value, onChange } = input;

  useEffect(() => {
    if (!value.isPayment && value.isPreferential) {
      onChange({ ...value, isPreferential: false });
    }
  }, [value, onChange]);

  return <></>;
};
