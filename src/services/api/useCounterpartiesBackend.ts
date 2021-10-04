import { QueryKey } from 'react-query';
import { CounterpartyViewModel } from 'schema';
import { useBackendQuery, useBackendMutation, QueryOptions, MutationOptions } from '.';
import { calculationUrl } from '../calculation';

const createUrlFromParts = (relativeUrl: string) => {
  const parts = [
    calculationUrl,
    'api',
    'v1',
    'counterparties',
    ...relativeUrl.trim().split('/'),
  ].filter((t) => t !== '');
  const url = parts.join('/');
  return url;
};

const getMutationUrl = <TRequest>(relativeUrl: string | ((form: TRequest) => string)) => {
  if (typeof relativeUrl === 'string') {
    return createUrlFromParts(relativeUrl);
  }
  return (form: TRequest) => createUrlFromParts(relativeUrl(form));
};

export const useCounterpartiesBackendQuery = <TResponse, TQueryKey extends QueryKey = QueryKey>(
  relativeUrl: string,
  queryKey: TQueryKey,
  options?: QueryOptions<TResponse, TQueryKey>
) => useBackendQuery(createUrlFromParts(relativeUrl), queryKey, options);

export const useCounterpartiesBackendMutation = <TRequest, TResponse, TContext = unknown>(
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

export const useCounterpartyQuery = (
  inn: string,
  options?: QueryOptions<CounterpartyViewModel, string>
) => useBackendQuery(createUrlFromParts(inn), `counterparties/${inn}`, createOptions(options));
