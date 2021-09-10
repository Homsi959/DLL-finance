import { useCallback } from 'react';
import { UseMutationOptions, useMutation, UseQueryOptions, useQuery, QueryKey } from 'react-query';
import { ValidationProblemDetails } from 'schema';
import { useUserAuth } from 'services';
import { UnauthorizedError } from './UnauthorizedError';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const useBackendFetch = () => {
  const { user } = useUserAuth();
  const accessToken = user?.access_token;

  const fetchBackend = useCallback(
    async (url: string, init?: RequestInit) => {
      const { headers = {}, ...rest } = init ?? {};
      const requestHeaders = accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
            ...defaultHeaders,
            ...headers,
          }
        : {
            ...defaultHeaders,
            ...headers,
          };
      const request = { headers: requestHeaders, ...rest };

      const response = await fetch(url, request);

      if (response.status === 401) {
        throw new UnauthorizedError();
      }

      return response;
    },
    [accessToken]
  );

  return fetchBackend;
};

export type QueryOptions<
  TResponse,
  TQueryKey extends QueryKey = QueryKey,
  TError = unknown
> = UseQueryOptions<TResponse, TError, TResponse, TQueryKey>;

export const useBackendQuery = <TResponse, TQueryKey extends QueryKey = QueryKey, TError = unknown>(
  url: string,
  queryKey: TQueryKey,
  options?: QueryOptions<TResponse, TQueryKey, TError>
) => {
  const fetchBackend = useBackendFetch();

  const getData = useCallback(async (): Promise<TResponse> => {
    const response = await fetchBackend(url);

    if (response.status === 404) {
      throw new Error();
    }

    const result: TResponse = await response.json();
    return result;
  }, [url, fetchBackend]);

  const query = useQuery(queryKey, getData, {
    //enabled: authenticated,
    keepPreviousData: true,
    refetchInterval: false,
    ...options,
  });

  return query;
};

type MutationHttpMethod = 'POST' | 'PUT' | 'DELETE';

export type MutationOptions<TRequest, TResponse, TContext = unknown> = UseMutationOptions<
  TResponse,
  ValidationProblemDetails,
  TRequest,
  TContext
> & {
  method?: MutationHttpMethod | ((form: TRequest) => MutationHttpMethod);
  json?: (form: TRequest, response: Response) => Promise<TResponse>;
};

export const useBackendMutation = <TRequest, TResponse, TContext = unknown>(
  url: string | ((form: TRequest) => string),
  options: MutationOptions<TRequest, TResponse, TContext> | undefined = { method: 'POST' }
) => {
  const fetchBackend = useBackendFetch();

  const { method = 'POST', json, ...rest } = options;

  const mutationFn = useCallback(
    async (form: TRequest): Promise<TResponse> => {
      const requestMethod =
        method === undefined ? 'POST' : typeof method === 'string' ? method : method(form);
      let requestUrl = typeof url === 'string' ? url : url(form);
      const response = await fetchBackend(requestUrl, {
        method: requestMethod,
        body: JSON.stringify(form),
      });

      if (response.status === 400) {
        const validationErrors: ValidationProblemDetails | undefined = await response.json();
        throw validationErrors ?? { errors: { '': ['Ошибка'] } };
      }

      if (response.status === 404) {
        throw new Error();
      }

      if (json) {
        const jsonResult: TResponse = await json(form, response);
        return jsonResult;
      }
      const result: TResponse = await response.json();
      return result;
    },
    [fetchBackend, method, url, json]
  );

  return useMutation(mutationFn, rest);
};
