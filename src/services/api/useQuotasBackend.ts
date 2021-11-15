import { QueryKey } from 'react-query';
import { useBackendQuery, useBackendMutation, QueryOptions, MutationOptions } from '.';
import { calculationUrl } from '../calculation';

const getMutationUrl = <TRequest>(relativeUrl: string | ((form: TRequest) => string)) => {
  if (typeof relativeUrl === 'string') {
    return `${calculationUrl}/api/v1/quotas/${relativeUrl}`;
  }
  return (form: TRequest) => `${calculationUrl}/api/v1/quotas/${relativeUrl(form)}`;
};

export const useQuotasBackendQuery = <TResponse, TQueryKey extends QueryKey = QueryKey>(
  relativeUrl: string,
  queryKey: TQueryKey,
  options?: QueryOptions<TResponse, TQueryKey>
) => useBackendQuery(`${calculationUrl}/api/v1/quotas/${relativeUrl}`, queryKey, options);

export const useQuotasBackendMutation = <TRequest, TResponse, TContext = unknown>(
  relativeUrl: string | ((form: TRequest) => string),
  options: MutationOptions<TRequest, TResponse, TContext> | undefined = { method: 'POST' }
) => useBackendMutation(getMutationUrl(relativeUrl), options);

const createOptions = <TResponse>(options: QueryOptions<TResponse, string> | undefined = {}) => {
  const defaultOptions: QueryOptions<TResponse, string> = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  };
  return {
    ...defaultOptions,
    ...options,
  } as QueryOptions<TResponse, string>;
};

export const useQuotasDictionaryBackendQuery = <TResponse>(
  relativeUrl: string,
  options?: QueryOptions<TResponse, string>
) =>
  useBackendQuery(
    `${calculationUrl}/api/v1/dictionaries/${relativeUrl}`,
    relativeUrl,
    createOptions(options)
  );

export const useDictionaryBackendMutation = <TRequest, TResponse, TContext = unknown>(
  relativeUrl: string | ((form: TRequest) => string),
  options: MutationOptions<TRequest, TResponse, TContext> | undefined = { method: 'POST' }
) => useBackendMutation(`${calculationUrl}/api/v1/dictionaries/${relativeUrl}`, options);
