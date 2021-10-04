import palette from '../palette';
import { TableBodyClassKey, StyleRules } from '@material-ui/core';

type MuiTableCellStyles = Partial<StyleRules<TableBodyClassKey>>;

const style: MuiTableCellStyles = {
  root: {
    '& .MuiTableCell-body': {
      verticalAlign: 'top',
      '& a': {
        color: palette.blue3.main,
        borderBottom: 'none',
        fontWeight: 400,
        '&[href^="mailto:"]': {
          color: palette.textGrey1.main,
          fontSize: '12px',
          textDecoration: 'underline',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
    '& .MuiTableRow-root': {
      '&:hover': {
        backgroundColor: 'rgba(0, 153, 255, 0.08)',
      },
    },
  },
};

export default style;
