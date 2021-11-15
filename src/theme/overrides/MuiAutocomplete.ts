import palette from '../palette';

const style = {
  option: {
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent',
    },
    '&[data-focus="true"]': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: palette.secondary.light,
    },
  },
  inputRoot: {
    '&&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
      padding: '0',
      '& $input': {
        padding: '12px 10px 8px',
      },
    },
  },
};

export default style;
