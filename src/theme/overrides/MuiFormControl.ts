import { FormControlClassKey, StyleRules } from '@material-ui/core';

const style: Partial<StyleRules<FormControlClassKey>> = {
  root: {
    marginTop: 16,
    marginBottom: 0,
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0,
    },
  },
  marginNormal: {
    marginTop: 8,
    marginBottom: 4,
  },
  marginDense: {
    marginTop: 6,
    marginBottom: 3,
  },
};

export default style;
