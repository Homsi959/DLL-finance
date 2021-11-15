import { useEffect } from 'react';
import theme from 'theme';
import Grid from '@material-ui/core/Grid';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageAuthenticatedLayout, Tabs, TabPanel, useTabs } from 'components';
import { UsersPage as UsersPageContent } from './UsersPage';
import { GroupsPage } from '../groups-page';
import { useGoBack } from 'hooks';
import SwipeableViews from 'react-swipeable-views';

const UserGroupPage = () => {
  const { t } = useTranslation();
  const tabs = [t('User_plural'), t('Group_plural')];
  const tabsProps = useTabs(tabs);
  const { tabIndex, onChangeTabIndex, onChangeTab } = tabsProps;

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
      <Tabs {...tabsProps} value={tabIndex} onChangeTab={onChangeTab} />
      <SwipeableViews
        containerStyle={{
          transition: 'transform 0.6s ease-out 0s',
        }}
        springConfig={{ duration: '0.6s', easeFunction: 'transform 0.6s ease-out 0s', delay: '0s' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={onChangeTabIndex}
      >
        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
          <UsersPageContent />
        </TabPanel>
        <TabPanel value={tabIndex} index={1} dir={theme.direction}>
          <GroupsPage />
        </TabPanel>
      </SwipeableViews>
    </Grid>
  );
};

export const UsersPage = () => {
  return <PageAuthenticatedLayout pageContent={<UserGroupPage />} />;
};
