import { InputLabelClassKey, StyleRules } from '@material-ui/core';

const style: Partial<StyleRules<InputLabelClassKey>> = {
  root: {},
  outlined: {
    '&$marginDense': {
      transform: 'translate(10px, 13px) scale(1)',
    },
    '&$shrink': {
      transform: 'translate(9px, -6px) scale(0.75)',
    },
  },
};

export default style;
