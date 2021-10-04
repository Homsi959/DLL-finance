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
};

export default style;
