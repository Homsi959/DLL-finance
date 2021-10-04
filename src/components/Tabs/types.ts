import { TabProps as MuiTabProps } from '@material-ui/core';
import { useTabs } from './useTabs';

export type UseTabsProps = Omit<ReturnType<typeof useTabs>, 'onChangeTabIndex'>;

export type TabProps = {
  name: string;
  disabled?: boolean;
};

export type TabsProps = MuiTabProps &
  UseTabsProps & {
    tabs: Array<string> | Array<TabProps>;
  };
