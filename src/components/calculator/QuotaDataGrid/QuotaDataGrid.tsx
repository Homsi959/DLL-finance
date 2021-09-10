import { useMemo } from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from 'components';
import { GridColumns } from '@material-ui/data-grid';
import { DataGrid } from 'components';
import { Currency, User } from 'schema';
import { QuotaAsset, QuotaAssetProps } from './QuotaAsset';
import { QuotaFilterForm } from './QuotaFilterForm';
import { Tabs, useTabs } from 'components/Tabs';
import { QuotaAction, useQuotaData } from './useQuotaData';
import { formatNumber, formatCurrency } from '../utils';
import { ButtonCustomVariant } from 'components';
import { useTranslation } from 'react-i18next';

const baseUrl = '/calculator/results';

export const QuotaDataGrid = () => {
  const { t } = useTranslation();
  const mine = t('Mine');
  const all = t('All');
  const tabsProps = useTabs([mine, all]);

  const columns: GridColumns = useMemo(() => {
    return [
      {
        field: 'id',
        headerName: t('ID'),
        flex: 0.79,
        renderCell: (params) => {
          const id = params.value as number;
          return (
            <Link className="no-link" to={`${baseUrl}/${id}`}>
              {id}
            </Link>
          );
        },
      },
      {
        field: 'asset',
        headerName: t('LeaseSubject'),
        flex: 5.9,
        sortable: false,
        renderCell: (params) => {
          const props = params.value as QuotaAssetProps;
          return (
            <Link className="no-link" to={`${baseUrl}/${params.id}`}>
              <QuotaAsset {...props} />
            </Link>
          );
        },
      },
      {
        field: 'lessee',
        headerName: t('Lessee'),
        flex: 3,
      },
      {
        field: 'fundingAmountNBV',
        headerName: t('NBV, €'),
        headerAlign: 'left',
        sortable: false,
        flex: 1.3,
        valueFormatter: (params) => {
          const value = params.value as number;
          return isNaN(value) ? '' : formatNumber(value, 2, true);
        },
        align: 'left',
      },
      {
        field: 'currency',
        headerName: t('Currencies.Lease'),
        headerAlign: 'center',
        sortable: false,
        flex: 1.46,
        valueFormatter: (params) => {
          return formatCurrency(params.value as Currency);
        },
        align: 'center',
      },
      {
        field: 'dealer',
        headerName: t('Dealer'),
        flex: 2,
        sortable: false,
      },
      {
        field: 'createdDate',
        headerName: t('Date'),
        headerAlign: 'right',
        flex: 1.7,
        valueFormatter: (params) => {
          return new Date(params.value as string).toLocaleDateString('ru-RU');
        },
        align: 'right',
      },
      {
        field: 'user',
        headerName: t('Owner'),
        headerAlign: 'left',
        align: 'left',
        flex: 2,
        valueGetter: (params) => (params.value as User).name,
      },
      {
        field: 'action',
        headerName: ' ',
        headerAlign: 'left',
        align: 'left',
        flex: 0.65,
        sortable: false,
        renderCell: (params) => {
          const action = params.value as QuotaAction | undefined;
          if (action === 'changeOwner' || action === 'viewHistory') {
            return (
              <IconButton
                aria-label="change owner"
                component={Link}
                to={`${baseUrl}/owner/${params.id}`}
              >
                <svg className="svg-icon svg-icon-search">
                  <use xlinkHref="/img/svg-sprite.svg#svg-icon-rotate"></use>
                </svg>
              </IconButton>
            );
          }
          return null;
        },
      },
    ];
  }, [t]);

  const { tabIndex } = tabsProps;

  const { filter, paging, sorting, ...dataProps } = useQuotaData(tabIndex);

  const gridProps = {
    ...dataProps,
    ...sorting,
    columns,
  };

  const filterProps = {
    ...filter,
    tabIndex,
  };

  return (
    <Grid container spacing={1} direction="column">
      <Grid container item justify="space-between" alignItems="center">
        <Grid item>
          <Tabs {...tabsProps} />
        </Grid>
        <Grid item>
          <ButtonCustomVariant component={Link} to="/calculator">
            {t('Buttons.AddQuota')}
          </ButtonCustomVariant>
        </Grid>
      </Grid>
      <Grid item>
        <QuotaFilterForm {...filterProps} />
      </Grid>
      <Grid container item direction="column">
        <Grid item>
          <DataGrid {...gridProps} />
        </Grid>
        <Grid item>
          <Pagination {...paging} />
        </Grid>
      </Grid>
    </Grid>
  );
};
