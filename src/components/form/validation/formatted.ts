import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useFormatMessage = () => {
  const { t } = useTranslation();
  const format = useCallback(
    (format: string) => {
      return t('InvalidFormatMessage', { format });
    },
    [t]
  );

  return format;
};

export const usePassportSeries = () => {
  return useFormatted(/^\d{4}$/, '1234', false);
};

export const usePassportNumber = () => {
  return useFormatted(/^\d{6}$/, '123456', false);
};

export const usePassportIssuerCode = () => {
  return useFormatted(/^\d{3}-\d{3}$/, '123-456', false);
};

export const useFormatted = (format: RegExp, expectedFormat: string, required: boolean) => {
  const invalidFormatMessage = useFormatMessage();
  const formatted = useCallback(
    (value: any) => {
      if (value === undefined || value === null || value === '') {
        if (required) {
          return invalidFormatMessage(expectedFormat);
        } else {
          return undefined;
        }
      }

      if (typeof value === 'string' && !format.test(value)) {
        return invalidFormatMessage(expectedFormat);
      }
    },
    [invalidFormatMessage, expectedFormat, format, required]
  );

  return { formatted };
};
