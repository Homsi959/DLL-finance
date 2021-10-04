import { Route, Switch } from 'react-router-dom';
import { CounterpartiesDataGrid, CounterpartyCreateForm, CounterpartyEditForm } from 'components';

export const CounterpartiesPage = () => {
  return (
    <Switch>
      <Route path="/counterparties/create" exact component={CounterpartyCreateForm} />
      <Route path="/counterparties/:inn" exact component={CounterpartyEditForm} />
      <Route path="/counterparties" exact component={CounterpartiesDataGrid} />
    </Switch>
  );
};
