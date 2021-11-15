import { Route, Switch } from 'react-router-dom';
import { NomenclaturesDataGrid, LeasingProductsDataGrid, SalesPointsDataGrid } from 'components';
import { DictionariesPage } from './DictionariesPage';

export const NomenclaturesPage = () => {
  return (
    <Switch>
      <Route path="/dictionaries/salesPoints" exact component={SalesPointsDataGrid} />
      <Route path="/dictionaries/leasingProducts" exact component={LeasingProductsDataGrid} />
      <Route path="/dictionaries/nomenclatures" exact component={NomenclaturesDataGrid} />
      <Route path="/dictionaries" exact component={DictionariesPage} />
    </Switch>
  );
};
