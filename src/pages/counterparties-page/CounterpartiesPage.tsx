import { Route, Switch } from 'react-router-dom';
import { CounterpartiesDataGrid } from 'components';

export const CounterpartiesPage = () => {
  return (
    <Switch>
      <Route path="/counterparties" component={CounterpartiesDataGrid} />
    </Switch>
  );
};
