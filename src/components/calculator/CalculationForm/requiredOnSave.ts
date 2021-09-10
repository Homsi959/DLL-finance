import { useRequired } from 'components/form/validation/required';
import { useCallback } from 'react';

export const useRequiredOnSave = () => {
  const { required } = useRequired();
  const requiredOnSave = useCallback(
    (value: any, allValues: any) => {
      const save = allValues.save as boolean | undefined;
      if (save === true) {
        return required(value);
      }
      return undefined;
    },
    [required]
  );

  return { requiredOnSave };
};
