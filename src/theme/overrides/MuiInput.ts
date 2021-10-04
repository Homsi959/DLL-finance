import { InputClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette';

const style: Partial<StyleRules<InputClassKey>> = {
  root: {},
  underline: {
    '&:before': {
      borderBottom: '2px solid ' + palette.grey3.main,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid ' + palette.primary.main,
    },
  },
};

export default style;
