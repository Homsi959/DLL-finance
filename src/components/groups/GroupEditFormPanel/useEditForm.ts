import { useGoBack } from 'hooks';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUserAuth } from 'services/authentication';
import { IDENTITY_CONFIG } from 'services/authentication/AuthenticationConfig';
import { GroupEditFormValues } from '../types';
import { GroupUsersViewModel, UpdateGroupViewModel } from 'schema/serverTypes';
import { useLessorsQuery } from '../useLessorsQuery';

const useUpdateGroupMutation = (id: number) => {
  const { user } = useUserAuth();
  const accessToken = user?.access_token;

  const updateGroup = useCallback(
    async (values: GroupEditFormValues) => {
      const requestUrl = `${IDENTITY_CONFIG.authority}/api/v1/groups/${id}`;
      const group: UpdateGroupViewModel = {
        ...values,
        users: values.users.map((user) => {
          return { id: user.id };
        }),
        owners: [{ id: values.owner }],
      };
      const response = await fetch(requestUrl, {
        method: 'PUT',
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
    [accessToken, id]
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
      queryClient.invalidateQueries(['group', id]);
      goBack('/users/groups');
    },
  });

  return mutation;
};

export const useEditForm = (group: GroupUsersViewModel) => {
  const initialValues: GroupEditFormValues = {
    ...group,
    owner: group.owners.length > 0 ? group.owners[0].id : '',
    lessorInn: group.lessor?.inn ?? '',
  };

  const { data = [], isLoading: isLoadingLessors } = useLessorsQuery();
  let options = data;
  if (
    group.lessor !== undefined &&
    options.find((t) => t.inn === group.lessor?.inn) === undefined
  ) {
    options.push(group.lessor);
  }

  const { mutateAsync, isLoading, isError } = useUpdateGroupMutation(group.id);

  const onSubmit = useCallback(
    async (values: GroupEditFormValues) => {
      await mutateAsync(values);
    },
    [mutateAsync]
  );

  return {
    initialValues,
    isLoading: isLoadingLessors || isLoading,
    isError,
    options,
    onSubmit,
  };
};
