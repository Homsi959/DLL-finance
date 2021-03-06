import { TextFieldClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette';

const style: Partial<StyleRules<TextFieldClassKey>> = {
  root: {
    '& label.Mui-focused': {
      color: palette.divider,
    },
    '& .MuiInputBase-root': {
      color: palette.secondary.main,
      '&.Mui-disabled': {
        '& fieldset': {
          borderColor: palette.secondary.dark,
        },
      },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: palette.secondary.dark,
      },
      '&:hover fieldset': {
        borderColor: palette.divider,
      },
      '&.Mui-focused fieldset': {
        borderColor: palette.divider,
      },
      '& .MuiOutlinedInput-input': {
        padding: '12px 10px 8px',
      },
    },
  },
};

export default style;
