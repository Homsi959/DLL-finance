import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const ApiQueryProvider = (props: React.PropsWithChildren<{}>) => {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};
