import { QuotaDataGrid, QuotaOwnerFormPanel } from 'components';
import { Route, RouteComponentProps } from 'react-router-dom';

export const QuotaListPage = (props: RouteComponentProps) => {
  const path = props.location.pathname;
  const changeOwnerPath = `/calculator/results/owner/:id(\\d+)`;

  return (
    <>
      <Route path={path} component={QuotaDataGrid} />
      <Route exact path={changeOwnerPath} component={QuotaOwnerFormPanel} />
    </>
  );
};
