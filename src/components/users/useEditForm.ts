import { useGoBack } from 'hooks';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUserAuth } from 'services/authentication';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { UserViewModel } from './types';

export interface UserEditFormValues {
  role?: string;
  lastName?: string;
  middleName?: string;
  firstName?: string;
  phoneNumber?: string;
}

const useUpdateUserMutation = (id: string) => {
  const { user } = useUserAuth();
  const accessToken = user?.access_token;

  const updateUser = useCallback(
    async (values: UserEditFormValues) => {
      const requestUrl = `${IDENTITY_CONFIG.authority}/api/v1/user/${id}`;
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Could not update user');
      }
    },
    [accessToken, id]
  );

  const queryClient = useQueryClient();
  const goBack = useGoBack();

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (Array.isArray(query.queryKey)) {
            const key = query.queryKey as Array<string>;
            if (key[0] === 'users') {
              return true;
            }
          }

          return false;
        },
      });
      queryClient.invalidateQueries(['user', id]);
      goBack('/users');
    },
  });

  return mutation;
};

export const useEditForm = (user: UserViewModel) => {
  const initialValues: UserEditFormValues = {
    lastName: user.lastName,
    middleName: user.middleName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };

  const { mutateAsync, isLoading, isError } = useUpdateUserMutation(user.id);

  const onSubmit = useCallback(
    async (values: UserEditFormValues) => {
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
