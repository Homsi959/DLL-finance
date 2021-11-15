import { useCallback } from 'react';
import { IconSprite } from '../icons';
import { makeStyles } from '@material-ui/core/styles';
import { TableSortLabelProps } from './types';

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  desc: {
    '& > div > svg': {
      transform: 'rotate(180deg)',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '9px',
    paddingTop: '1px',
  },
  left: {
    order: -1,
    marginLeft: 0,
    marginRight: '9px',
  },
}));

export const TableSortLabel = (props: React.PropsWithChildren<TableSortLabelProps>) => {
  const {
    columnName,
    sorting: { setOrder, setSortBy, order, sortBy },
    children,
    position,
  } = props;
  const classes = useStyles();

  const handleSort = useCallback(
    (columnName: string) => () => {
      if (!sortBy || sortBy !== columnName) {
        setOrder('asc');
        setSortBy(columnName);
      } else if (sortBy === columnName) {
        if (!order) {
          setOrder('asc');
          setSortBy(columnName);
        } else if (order === 'asc') {
          setOrder('desc');
          setSortBy(columnName);
        } else if (order === 'desc') {
          setOrder('');
          setSortBy('');
        }
      }
    },
    [sortBy, order, setOrder, setSortBy]
  );

  const isSort = columnName === sortBy;
  const orderClass = columnName === sortBy && order === 'desc' ? classes.desc : '';
  const resultClass = `${classes.root} ${orderClass}`;

  const icon = isSort ? 'sortActive' : 'sort';
  const iconClass = position === 'left' ? `${classes.icon} ${classes.left}` : classes.icon;

  return (
    <div onClick={handleSort(columnName)} className={resultClass}>
      {children}
      <div className={iconClass}>
        <IconSprite icon={icon} width="8px" height="17px" />
      </div>
    </div>
  );
};
