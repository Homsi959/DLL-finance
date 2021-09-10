import { useState, useCallback } from 'react';
import { TabProps } from './types';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

export const useTabs = (tabs: Array<string> | Array<TabProps>, initialTab: number = 0) => {
  const [tabIndex, setTabIndex] = useState(initialTab);

  const onChangeTab = useCallback((_event: React.ChangeEvent<{}>, index: number) => {
    setTabIndex(index);
  }, []);

  const onChangeTabIndex = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  return {
    tabIndex,
    onChangeTab,
    onChangeTabIndex,
    a11yProps,
    tabs,
  } as const;
};
