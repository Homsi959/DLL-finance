import palette from '../palette';

const style = {
  root: {
    minWidth: 0,
    minHeight: 0,
    padding: 0,
    color: palette.text.secondary,
    borderBottom: '3px solid transparent',
    paddingBottom: '2px',
    '&:not(.Mui-selected):hover': {
      borderColor: palette.primary.main,
      color: palette.text.primary
    },
    '&:not(:first-child)': {
      marginLeft: '50px'
    },
    '@media (min-width: 0px)': {
      minWidth: 0
    },
  },
};

export default style;
