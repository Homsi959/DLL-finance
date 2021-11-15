import clsx from 'clsx';
import { Tabs as MaterialTabs, Tab, Theme, createStyles, makeStyles } from '@material-ui/core';
import { isTabProps } from './isTabProps';
import { TabProps, TabsProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: 0,
      '& .MuiTab-wrapper': {
        textTransform: 'uppercase',
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: 700,
      },
    },
  })
);

const getTabProps = (tab: string | TabProps) => {
  if (isTabProps(tab)) {
    return {
      label: tab.name,
      disabled: tab.disabled,
    };
  }

  return {
    label: tab,
    disabled: false,
  };
};

export const Tabs = (props: TabsProps) => {
  const classes = useStyles();

  const { tabs, className } = props;
  const { tabIndex, onChangeTab, a11yProps } = props;

  return (
    <MaterialTabs
      className={clsx(className, classes.root)}
      value={tabIndex}
      onChange={onChangeTab}
      indicatorColor="primary"
      textColor="secondary"
      variant="standard"
      aria-label="tabs"
    >
      {tabs.map((tab: string | TabProps, index: number) => {
        const { id, ...rest } = a11yProps(index);
        const { label, disabled } = getTabProps(tab);
        return <Tab key={id} label={label} id={id} {...rest} disabled={disabled} />;
      })}
    </MaterialTabs>
  );
};
