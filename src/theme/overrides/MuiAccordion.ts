import { AccordionClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette';

const style: Partial<StyleRules<AccordionClassKey>> = {
  root: {
    boxShadow: '0px 0px 10px rgba(56, 60, 97, 0.05)',
    '&:not(:first-child)': {
      marginTop: '10px',
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      marginBottom: '10px',
    },
    '&$disabled': {
      backgroundColor: palette.background.paper,
    },
  },
  expanded: {},
};

export default style;
