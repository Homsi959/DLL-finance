import { InputBaseClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette';

const style: Partial<StyleRules<InputBaseClassKey>> = {
  root: {
    fontSize: '12px',
    borderRadius: 0,
    '&:hover': {
      '& fieldset': {
        border: `1px solid ${palette.primary.main} !important`,
        boxShadow: `3px 3px 5px ${palette.info.main}`,
        // TODO DELETE important
      },
    },
    '&.Mui-focused': {
      '& fieldset': {
        border: `1px solid ${palette.primary.main} !important`,
        // TODO DELETE important
      },
    },
    '&.Mui-disabled': {
      backgroundColor: palette.secondary.light,
      '&:hover': {
        '& fieldset': {
          boxShadow: 'none',
        },
      },
    },
    '& fieldset': {
      border: `1px solid ${palette.secondary.dark}`,
      borderRadius: '0px',
      '& legend': {
        fontSize: '0.75em',
        marginLeft: '-5px',
      },
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
  },
};

export default style;
