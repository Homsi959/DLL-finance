import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { CounterpartyViewModel } from 'schema/serverTypes';
import { useCounterpartiesBackendMutation } from 'services/api';
import { CounterpartyFormValues } from '../types';
import { defaultValues } from './types';

export const useCounterpartyCreateForm = () => {
  const { handleSubmit, control, reset, setError, clearErrors, formState, ...rest } =
    useForm<CounterpartyFormValues>({
      mode: 'onBlur',
      defaultValues,
    });

  const history = useHistory();

  const { mutateAsync } = useCounterpartiesBackendMutation<
    CounterpartyViewModel,
    CounterpartyViewModel
  >('', {
    method: 'POST',
    onSuccess: (party) => {
      history.push(`${party.inn}`);
    },
  });

  const onSubmit = useMemo(() => {
    const submit = async ({ heads, ...form }: CounterpartyFormValues) => {
      try {
        const { requisites: allRequisites = [], groups: allGroups = [] } = form;
        const requisites = allRequisites.filter((t) => {
          return t.bank !== '' || t.bic !== '' || t.correspondentAccount !== '' || t.account !== '';
        });
        const groups = allGroups
          .filter((group) => group.checked)
          .map((group) => ({
            id: group.id,
            name: group.id.toString(),
          }));

        await mutateAsync({
          ...form,
          heads: heads.map(({ headId: id, ...rest }) => ({ id, ...rest })),
          requisites,
          groups,
        });
      } catch (error) {
        setError('inn', { message: 'Не удалось обновить' }, { shouldFocus: true });
      }
    };
    return handleSubmit(submit);
  }, [handleSubmit, mutateAsync, setError]);

  return {
    control,
    onSubmit,
    clearErrors,
    reset,
    ...formState,
    ...rest,
  };
};
