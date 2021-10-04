import { useEffect } from 'react';
import theme from 'theme';
import Grid from '@material-ui/core/Grid';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageAuthenticatedLayout, Tabs, TabPanel, useTabs } from 'components';
import { UsersPage as UsersPageContent } from './UsersPage';
import { GroupsPage } from '../groups-page';
import { useGoBack } from 'hooks';

const UserGroupPage = () => {
  const { t } = useTranslation();
  const tabs = [t('User_plural'), t('Group_plural')];
  const tabsProps = useTabs(tabs);
  const { tabIndex } = tabsProps;

  const { pathname } = useLocation();
  const isGroupsPath = pathname.indexOf('/groups') > -1;

  const history = useHistory();
  const { push } = history;

  const goBack = useGoBack();

  useEffect(() => {
    if (tabIndex === 0) {
      if (isGroupsPath) {
        goBack('/users');
      }
    } else {
      if (!isGroupsPath) {
        push('/users/groups');
      }
    }
  }, [tabIndex, isGroupsPath, goBack, push]);

  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <Tabs {...tabsProps} />
      </Grid>
      <TabPanel value={tabIndex} index={0} dir={theme.direction}>
        <UsersPageContent />
      </TabPanel>
      <TabPanel value={tabIndex} index={1} dir={theme.direction}>
        <GroupsPage />
      </TabPanel>
    </Grid>
  );
};

export const UsersPage = () => {
  return <PageAuthenticatedLayout pageContent={<UserGroupPage />} />;
};
