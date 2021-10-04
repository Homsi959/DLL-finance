import palette from '../palette';

const style = {
  root: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${palette.lightBlue3.main}`,
    },
  },
};

export default style;
