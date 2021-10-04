import palette from '../palette';
import typography from '../typography';
import { TableCellClassKey, StyleRules } from '@material-ui/core';

type MuiTableCellStyles = Partial<StyleRules<TableCellClassKey>>;

const style: MuiTableCellStyles = {
  root: {
    ...typography.body1,
    textTransform: 'none',
    position: 'relative',
    borderBottom: 'none',
    padding: '16px 6px',
    '&:first-of-type': {
      paddingLeft: '14px',
    },
    '&:last-of-type': {
      paddingRight: '14px',
    },
  },
  head: {
    textTransform: 'uppercase',
    color: palette.textGrey1.main,
    fontWeight: 700,
    fontSize: 12,
  },
};

export default style;
