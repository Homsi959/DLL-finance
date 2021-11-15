import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles<Theme, GridProps>((theme) =>
  createStyles({
    container: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: 'repeat(24, 1fr)',
      gridColumnGap: (props) =>
        `${(props.columnSpacing || props.spacing || 0) * theme.spacing(1)}px`,
      gridRowGap: (props) => `${(props.rowSpacing || props.spacing || 0) * theme.spacing(1)}px`,
      marginBottom: (props) => `${(props.rowSpacing || props.spacing || 0) * theme.spacing(1)}px`,
      '&:last-child': {
        marginBottom: 0,
      },
    },
    item: {
      //border: '1px solid red',
      gridColumnEnd: (props) => {
        return props.xs === 'auto' ? 'auto' : `span ${props.xs ?? 12}`;
      },
      [theme.breakpoints.up('sm')]: {
        gridColumnEnd: (props) => {
          return props.sm === 'auto' ? 'auto' : `span ${props.sm ?? props.xs ?? 12}`;
        },
      },
      [theme.breakpoints.up('md')]: {
        gridColumnEnd: (props) => {
          return props.md === 'auto' ? 'auto' : `span ${props.md ?? props.sm ?? props.xs ?? 12}`;
        },
      },
      [theme.breakpoints.up('lg')]: {
        gridColumnEnd: (props) => {
          return props.lg === 'auto'
            ? 'auto'
            : `span ${props.lg ?? props.md ?? props.sm ?? props.xs ?? 12}`;
        },
      },
      [theme.breakpoints.up('xl')]: {
        gridColumnEnd: (props) => {
          return props.xl === 'auto'
            ? 'auto'
            : `span ${props.xl ?? props.lg ?? props.md ?? props.sm ?? props.xs ?? 12}`;
        },
      },
    },
  })
);

type GridSize =
  | 'auto'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

interface GridProps {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  rowSpacing?: number;
  columnSpacing?: number;
  className?: string;
}

export const Grid = ({
  children,
  container,
  className,
  item,
  ...props
}: React.PropsWithChildren<GridProps>) => {
  const classes = useStyles(props);
  const concatedClassName = clsx(container ? classes.container : classes.item, className);

  return <div className={concatedClassName}>{children}</div>;
};
