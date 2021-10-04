import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useEmail = () => {
  const { t } = useTranslation();
  const invalidEmailMessage = t('Неверный формат email');
  const email = useCallback(
    (value: any) => {
      if (value === undefined || value === null) {
        return invalidEmailMessage;
      }

      if (typeof value === 'string' && value.indexOf('@') < 0) {
        return invalidEmailMessage;
      }
    },
    [invalidEmailMessage]
  );

  return { email };
};
