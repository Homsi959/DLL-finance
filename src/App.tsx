import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { QueryParamProvider } from 'use-query-params';
import theme from 'theme';
import { LoadingLinearIndicator, PageLayout, PrivateRoute } from 'components';
import {
  HomePage,
  LoginPage,
  CallbackPage,
  SilentPage,
  UsersPage,
  GroupsPage,
  CalculatorPage,
  CounterpartiesPage,
} from './pages';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/ru';

import { AuthenticationProvider, ApiQueryProvider } from 'services';
import { useTranslation } from 'react-i18next';

const PagesWithLanguage = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={language}>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/callback" component={CallbackPage} />
        <Route exact path="/silent" component={SilentPage} />
        <PrivateRoute path="/users" component={UsersPage} />
        <PrivateRoute path="/groups" component={GroupsPage} role="admin" />
        <PrivateRoute path="/calculator" component={CalculatorPage} />
        <PrivateRoute path="/counterparties" component={CounterpartiesPage} />
        <PrivateRoute exact path="/" component={HomePage} />
      </Switch>
    </MuiPickersUtilsProvider>
  );
};

const App = () => {
  return (
    <Suspense fallback={<PageLayout pageContent={<LoadingLinearIndicator />} />}>
      <ThemeProvider theme={theme}>
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <AuthenticationProvider>
              <ApiQueryProvider>
                <PagesWithLanguage />
              </ApiQueryProvider>
            </AuthenticationProvider>
          </QueryParamProvider>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
