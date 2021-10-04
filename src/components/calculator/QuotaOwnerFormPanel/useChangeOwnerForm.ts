import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { QuotaHistoryWithAvailableOwners, QuotaCalculationResult, User } from 'schema';
import { useQuotasBackendMutation } from 'services';
import { useGoBack } from 'hooks';

type ChangeOwnerFormValues = {
  ownerId: string;
};

export const useChangeOwnerForm = (quota: QuotaHistoryWithAvailableOwners) => {
  const { availableOwners, owner } = quota;

  const goBack = useGoBack();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, ...rest } = useQuotasBackendMutation<
    User,
    QuotaCalculationResult
  >(`${quota.id}/owner`, {
    method: 'PUT',
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (Array.isArray(query.queryKey)) {
            const key = query.queryKey as Array<string>;
            if (key[0] === 'quotas') {
              return true;
            }
          }
          return false;
        },
      });
    },
  });

  const onSubmit = useCallback(
    async (values: ChangeOwnerFormValues) => {
      var { ownerId } = values;
      const owner = availableOwners.find((t) => t.id === ownerId);
      if (owner) {
        await mutateAsync(owner);
        goBack('/calculator/results');
      }
    },
    [mutateAsync, availableOwners, goBack]
  );

  return {
    onSubmit,
    initialValues: {
      ownerId: owner.id,
    },
    disabled: isLoading || availableOwners.length === 0,
    isLoading,
    ...rest,
  };
};
