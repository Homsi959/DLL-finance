import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from 'components';
import { GridColumns } from '@material-ui/data-grid';
import { DataGrid } from 'components';
import { ButtonCustomVariant } from 'components';
import { useCounterpartiesData } from './useCounterpartiesData';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useColumns = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    const columns: GridColumns = [
      {
        field: 'name',
        headerName: t('AbbreviatedName'),
        flex: 5,
        renderCell: (params) => {
          const id = params.id as number;
          return (
            <Link className="no-link" to={`/counterparties/${id}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: 'role',
        headerName: t('UserType'),
        flex: 2,
        sortable: false,
        renderCell: (params) => {
          const isDealer = params.row.isDealer as boolean;
          const isInsuranceCompany = params.row.isInsuranceCompany as boolean;
          const isLessee = params.row.isLessee as boolean;
          const isLessor = params.row.isLessor as boolean;
          return (
            <>
              {isDealer ? t('Dealer') : ''},
              {isInsuranceCompany ? t('InsuranceCompany') : ''},
              {isLessee ? t('Lessee') : ''},
              {isLessor ? t('Lessor') : ''}
            </>
          );
        },
      },
      {
        field: 'inn',
        headerName: t('TIN'),
        headerAlign: 'left',
        sortable: false,
        flex: 2,
        align: 'left',
        renderCell: (params) => {
          const id = params.id as number;
          return (
            <Link className="no-link" to={`/counterparties/${id}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: 'verification',
        headerName: t('Verification'),
        headerAlign: 'center',
        sortable: false,
        flex: 1.2,
        align: 'center',
        renderCell: (params) => {
          const id = params.id as number;

          return (
            <Link className="no-link" to={`/counterparties/${id}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: 'monitor',
        headerName: t('Monitoring'),
        flex: 1,
        sortable: false,
      },
      {
        field: 'calculations',
        headerName: t('Calculation_plural'),
        headerAlign: 'right',
        flex: 1,
        align: 'right',
      },
    ];
    return columns;
  }, [t]);
};

const useStyles = makeStyles((theme) => ({
  ok: {
    backgroundColor: '#1DC9B7',
    width: '10px',
    height: '10px',
    borderRadius: '50px'
  },
  error: {
    backgroundColor: '#FD397A',
    width: '10px',
    height: '10px',
    borderRadius: '50px'
  },
  wrapIndicators: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2)
  },
  indicator: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(4)
  },
  indicatContent: {
    marginLeft: theme.spacing(1)
  }
}));

type IndicatorProps = {
  isOk: boolean;
}

const Indicator = (props: IndicatorProps) => {
  const { isOk } = props;
  const classes = useStyles();

  return (
    <div className={isOk ? classes.ok : classes.error}></div>
  )
}

export const CounterpartiesDataGrid = () => {
  const { filter, paging, sorting, ...dataProps } = useCounterpartiesData();
  const { t } = useTranslation();
  const classes = useStyles();
  const columns = useColumns();
  const gridProps = {
    ...dataProps,
    ...sorting,
    columns
  };

  return (
    <Grid container spacing={1} direction="column">
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>Фильтры</Grid>
        <Grid item>
          <ButtonCustomVariant component={Link} to="/counterparties">
            {t('Buttons.AddCounterparty')}
          </ButtonCustomVariant>
        </Grid>
      </Grid>
      <Grid container item direction="column">
        <Grid item>
          <DataGrid {...gridProps} />
        </Grid>
        <Grid container className={classes.wrapIndicators}>
          <Grid item className={classes.indicator}>
            <Indicator isOk={true} />
            <Grid className={classes.indicatContent}>Заполнен</Grid>
          </Grid>
          <Grid item className={classes.indicator}>
            <Indicator isOk={false} />
            <Grid className={classes.indicatContent}>Не заполнен</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
