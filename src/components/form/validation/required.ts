import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useRequired = (errorMessage: string | undefined = undefined) => {
  const { t } = useTranslation();
  const isRequiredMessage = errorMessage ? errorMessage : t('IsRequiredMessage');

  const required = useCallback(
    (value: any) => {
      if (value === undefined || value === null) {
        return isRequiredMessage;
      }

      if (typeof value === 'string' && value === '') {
        return isRequiredMessage;
      }

      if (Array.isArray(value) && value.length === 0) {
        return isRequiredMessage;
      }
    },
    [isRequiredMessage]
  );

  return { required };
};
