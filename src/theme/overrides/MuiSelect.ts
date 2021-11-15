import palette from '../palette';
import { SelectClassKey, StyleRules } from '@material-ui/core';

const style: Partial<StyleRules<SelectClassKey>> = {
  outlined: {
    '&.MuiOutlinedInput-inputMarginDense': {
      padding: '12px 10px 8px',
    },
  },
  root: {
    width: '100%',
    minWidth: '0',
    color: palette.secondary.main,
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      paddingRight: 0,
    },
    '& .MuiSelect-icon': {
      color: palette.primary.main,
    },
  },
};

export default style;
