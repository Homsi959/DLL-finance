import palette from '../palette';

const style = {
  root: {
    borderBottom: '1px solid' + palette.divider,
    minHeight: '30px',
    '& .MuiTabs-scroller': {
      width: 'auto',
      minWidth: 'auto',
      borderBottom: '1px solid' + palette.secondary.dark,
      flex: 'none',
    },
    '& span.MuiTabs-indicator': {
      height: '3px',
    }
  },
};

export default style;
