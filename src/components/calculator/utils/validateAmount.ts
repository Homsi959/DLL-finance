import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AmountType } from 'schema';

export const useAmountValidation = () => {
  const { t } = useTranslation();

  const greaterThanZeroErrorMessage = t('GreaterThanZeroErrorMessage');
  const lessThan100ErrorMessage = t('LessThan100ErrorMessage');
  const isRequiredMessage = t('IsRequiredMessage');

  const validateAmount = useCallback(
    (required: boolean, allowZero: boolean, type: AmountType, value: any) => {
      const isString = typeof value === 'string';
      const hasValue = (value !== undefined && value !== null) || (isString && value !== '');
      if (required && !hasValue) {
        return isRequiredMessage;
      }

      if (hasValue) {
        const numberValue = isString ? parseFloat(value as string) : (value as number);

        if (isNaN(numberValue) || numberValue < 0) {
          return greaterThanZeroErrorMessage;
        }

        if (required && numberValue === 0 && !allowZero) {
          return greaterThanZeroErrorMessage;
        }

        if (type === AmountType.Percents && numberValue > 100) {
          return lessThan100ErrorMessage;
        }
      }
    },
    [greaterThanZeroErrorMessage, lessThan100ErrorMessage, isRequiredMessage]
  );

  return { validateAmount };
};
