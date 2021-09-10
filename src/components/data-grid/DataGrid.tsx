import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DataGrid as MuiDataGrid, DataGridProps } from '@material-ui/data-grid';
import { LoadingLinearIndicator, NoRowsOverlay } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    grid: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
      borderCollapse: 'collapse',
      borderSpacing: 0,
      boxShadow: '0px 0px 20px 0px rgba(56, 60, 97, 0.1)',
      '& .MuiDataGrid-columnsContainer': {},
      '& .MuiDataGrid-iconSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
      },
      '& .MuiDataGrid-cell': {
        color: theme.palette.secondary.main,
        '& a': {
          color: theme.palette.secondary.main,
        },
      },
      '& .MuiDataGrid-columnHeader': {
        paddingLeft: theme.spacing(0.5),
      },
      '& .MuiDataGrid-columnHeader:nth-child(1)': {
        paddingLeft: 2,
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        color: theme.palette.text.primary,
        overflow: 'visible',
        fontWeight: 600,
      },
      '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
        outline: 0,
        outlineOffset: 0,
      },
      '& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within': {
        outline: 0,
        outlineOffset: 0,
        outlineWidth: 0,
      },
      '& .MuiDataGrid-row': {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        '&:hover': {
          backgroundColor: 'rgba(0, 153, 255, 0.08)',
        }
      },
      '& .MuiPaginationItem-root': {
        borderRadius: 0,
      },
    },
  })
);

const EmptyFooter = () => {
  return null;
};

export const DataGrid = (props: DataGridProps) => {
  const classes = useStyles();

  const {
    autoHeight = true,
    disableColumnFilter = true,
    disableColumnMenu = true,
    components = {
      LoadingOverlay: LoadingLinearIndicator,
      Footer: EmptyFooter,
      NoRowsOverlay: NoRowsOverlay,
    },
    headerHeight = 40,
    rowHeight = 65,
    ...rest
  } = props;

  const dataGridProps: DataGridProps = {
    autoHeight,
    disableColumnFilter,
    disableColumnMenu,
    components,
    headerHeight,
    rowHeight,
    ...rest,
  };

  return (
    <div className={classes.root}>
      <MuiDataGrid className={classes.grid} {...dataGridProps} />
    </div>
  );
};
