import { TabProps } from './types';

export const isTabProps = (tab: string | TabProps | undefined): tab is TabProps => {
  if (tab === undefined) {
    return false;
  }
  return (tab as TabProps).name !== undefined;
};
