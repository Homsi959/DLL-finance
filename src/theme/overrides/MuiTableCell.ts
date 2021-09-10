import palette from '../palette';
import typography from '../typography';
import { TableCellClassKey, StyleRules } from '@material-ui/core';

type MuiTableCellStyles = Partial<StyleRules<TableCellClassKey>>;

const style: MuiTableCellStyles = {
  root: {
    ...typography.body1,
    textTransform: 'none',
    borderBottom: `1px solid ${palette.divider}`,
    position: 'relative',
  },
  head: {
    textTransform: 'uppercase',
    color: 'palette.text.secondary',
    fontWeight: 700,
    fontSize: 12,
  },
};

export default style;
