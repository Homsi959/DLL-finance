import { CardHeaderClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette';

const style: Partial<StyleRules<CardHeaderClassKey>> = {
  root: {
    backgroundColor: palette.secondary.light,
    '& .MuiTypography-root': {
      // fontSize: '14px',
      // fontWeight: 700,
      color: palette.primary.main,
    }
  },
};

export default style;
