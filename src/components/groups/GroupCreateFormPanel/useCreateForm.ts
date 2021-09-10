import { useGoBack } from 'hooks';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUserAuth } from 'services/authentication';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { GroupEditFormValues } from '../types';

const useCreateGroupMutation = () => {
  const { user } = useUserAuth();
  const accessToken = user?.access_token;

  const updateGroup = useCallback(
    async (values: GroupEditFormValues) => {
      const requestUrl = `${IDENTITY_CONFIG.authority}/api/v1/groups`;
      const group = {
        ...values,
        users: values.users.map((owner) => {
          return { id: owner.id };
        }),
        owners: values.owners.map((owner) => {
          return { id: owner.id };
        }),
      };
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(group),
      });

      if (!response.ok) {
        throw new Error('Could not update group');
      }
    },
    [accessToken]
  );

  const queryClient = useQueryClient();
  const goBack = useGoBack();

  const mutation = useMutation(updateGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (Array.isArray(query.queryKey)) {
            const key = query.queryKey as Array<string>;
            if (key[0] === 'users' || key[0] === 'groups') {
              return true;
            }
          }

          return false;
        },
      });
      goBack('/users/groups');
    },
  });

  return mutation;
};

export const useCreateForm = () => {
  const initialValues: GroupEditFormValues = {
    name: '',
    users: [],
    owners: [],
  };

  const { mutateAsync, isLoading, isError } = useCreateGroupMutation();

  const onSubmit = useCallback(
    async (values: GroupEditFormValues) => {
      await mutateAsync(values);
    },
    [mutateAsync]
  );

  return {
    initialValues,
    isLoading,
    isError,
    onSubmit,
  };
};
