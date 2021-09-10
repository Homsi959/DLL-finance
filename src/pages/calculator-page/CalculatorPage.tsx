import { Calculator, QuotaCalculatorForm, QuotaDataGrid, QuotaOwnerFormPanel } from 'components';
import { CurrencyRatesContextProvider } from 'components/calculator';
import { useEffect } from 'react';
import { Route, RouteComponentProps, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { QuotaCalculationResult } from 'schema';
import { useQuotasBackendQuery } from 'services';
import { useCurrencyRatesQuery } from 'components/calculator';
import { useCofsQuery } from 'components/calculator';

const QuotaListPage = (props: RouteComponentProps) => {
  const path = props.location.pathname;
  const changeOwnerPath = `/calculator/results/owner/:id(\\d+)`;

  return (
    <>
      <Route path={path} component={QuotaDataGrid} />
      <Route exact path={changeOwnerPath} component={QuotaOwnerFormPanel} />
    </>
  );
};

const QuotaCalculatorFormPage = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = Number.parseInt(idString);
  const url = `${id}`;

  const {
    data: quota,
    isLoading,
    refetch,
  } = useQuotasBackendQuery<QuotaCalculationResult>(url, ['quotas', id], {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [url, refetch]);

  const { data: currencies, isLoading: isLoadingRates } = useCurrencyRatesQuery();
  const { data: cofs, isLoading: isLoadingCofs } = useCofsQuery();

  if (!quota || !currencies || isLoading || isLoadingRates || !cofs || isLoadingCofs) {
    return null;
  }

  return (
    <CurrencyRatesContextProvider currencies={currencies} cofs={cofs}>
      <QuotaCalculatorForm quota={quota} />
    </CurrencyRatesContextProvider>
  );
};

const CalculatorFormPage = () => {
  const { data: currencies, isLoading } = useCurrencyRatesQuery();
  const { data: cofs, isLoading: isLoadingCofs } = useCofsQuery();

  if (!currencies || isLoading || !cofs || isLoadingCofs) {
    return null;
  }

  return (
    <CurrencyRatesContextProvider currencies={currencies} cofs={cofs}>
      <Calculator />
    </CurrencyRatesContextProvider>
  );
};

export const CalculatorPage = () => {
  const { path } = useRouteMatch();
  const quotaResultPath = `${path}/results/:id(\\d+)`;
  const resultsPath = `${path}/results`;

  return (
    <Switch>
      <Route exact path={path} component={CalculatorFormPage} />
      <Route exact path={quotaResultPath} component={QuotaCalculatorFormPage} />
      <Route path={resultsPath} component={QuotaListPage} />
    </Switch>
  );
};
