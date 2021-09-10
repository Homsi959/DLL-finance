import { AccordionSummaryClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette';

const style: Partial<StyleRules<AccordionSummaryClassKey>> = {
  root: {
    backgroundColor: palette.background.paper,
    borderBottom: '3px solid #E3E6F3',
    marginBottom: -1,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
    '&$disabled': {
      opacity: 1,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    '& .MuiTypography-root': {
      lineHeight: '15px'
    }
  },
  expanded: {},
};

export default style;
