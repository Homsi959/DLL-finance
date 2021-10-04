import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useCounterpartiesBackendMutation } from 'services/api';
import { CounterpartyViewModel } from 'schema';
import { useHistory } from 'react-router';
import { CounterpartyCreateFormValues, defaultValues } from './types';
import { useTranslation } from 'react-i18next';

export const useCounterpartyCreateForm = () => {
  const { handleSubmit, control, formState, setError, clearErrors, reset } =
    useForm<CounterpartyCreateFormValues>({
      mode: 'onBlur',
      defaultValues,
    });

  const { mutateAsync } = useCounterpartiesBackendMutation<
    CounterpartyCreateFormValues,
    CounterpartyViewModel
  >('');

  const history = useHistory();

  const { t } = useTranslation();
  const message = t('Could not create');

  const onSubmit = useMemo(() => {
    const submit = async (form: CounterpartyCreateFormValues) => {
      try {
        const counterparty = await mutateAsync(form);
        history.replace(`/counterparties/${counterparty.inn}`, counterparty);
      } catch (error) {
        setError('inn', { message }, { shouldFocus: true });
      }
    };
    return handleSubmit(submit);
  }, [handleSubmit, mutateAsync, setError, history, message]);

  return {
    control,
    onSubmit,
    reset,
    setError,
    clearErrors,
    ...formState,
  };
};
