import palette from '../palette';
import { TableHeadClassKey, StyleRules } from '@material-ui/core';

type MuiTableCellStyles = Partial<StyleRules<TableHeadClassKey>>;

const style: MuiTableCellStyles = {
  root: {
    borderBottom: `2px solid ${palette.grey6.main}`,
    fontSize: 14,
    '& .MuiTableCell-root': {
      color: palette.textGrey3.main,
      textTransform: 'capitalize',
      lineHeight: 1.2,
    },
  },
};

export default style;
