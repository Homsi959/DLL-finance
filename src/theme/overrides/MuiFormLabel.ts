import { FormLabelClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette'

const style: Partial<StyleRules<FormLabelClassKey>> = {
  root: {
    fontSize: '12px',
    color: palette.divider,
    '&.Mui-focused': {
      color: palette.divider
    }
  },
};

export default style;
