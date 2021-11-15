import { ToolbarClassKey, StyleRules } from '@material-ui/core';

const style: Partial<StyleRules<ToolbarClassKey>> = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
  },
  gutters: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  regular: {
    '@media (min-width: 1200px)': {
      minHeight: 40,
    },
  },
};

export default style;
