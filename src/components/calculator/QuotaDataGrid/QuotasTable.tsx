import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IconSprite } from 'components';
import { Currency } from 'schema';
import { QuotaAsset } from './QuotaAsset';
import { QuotaAction, useQuotaData } from './useQuotaData';
import { formatNumber, formatCurrency, formatDate } from '../utils';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableSortLabel,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import theme from 'theme';

const baseUrl = '/calculator/results';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '14px',
      padding: 0,
    },
    id: {
      maxWidth: '34px',
      minWidth: '34px',
    },
    leaseSubject: {
      width: '100%',
      whiteSpace: 'nowrap',
    },
    lessee: {
      width: '300px',
    },
    nbv: {
      minWidth: '120px',
      maxWidth: '120px',
    },
    currencies: {
      width: '120px',
      whiteSpace: 'nowrap',
    },
    buttonChange: {
      width: '60px',
    },
    owner: {
      width: '170px',
    },
    date: {
      width: '100px',
    },
    dealer: {
      minWidth: '200px',
      maxWidth: '200px',
    },
  })
);

type QuotasTableProps = Omit<ReturnType<typeof useQuotaData>, 'filter' | 'paging'>;

type TableItemProps = QuotasTableProps['rows'][0];

const TableItem = (props: TableItemProps) => {
  const classes = useStyles();

  const {
    id,
    action,
    currency,
    lessee,
    createdDate,
    fundingAmountNBV,
    dealer,
    asset,
    user: { id: userId, name: userName },
  } = props;

  const actionCalculation = action as QuotaAction | undefined;

  return (
    <TableRow>
      <TableCell size="medium" component="th">
        <Link to={`${baseUrl}/${id}`}>{id}</Link>
      </TableCell>
      <TableCell size="medium">
        <Link to={`${baseUrl}/${id}`}>
          <QuotaAsset {...asset} />
        </Link>
      </TableCell>
      <TableCell size="medium">{lessee}</TableCell>
      <TableCell align="left" size="medium" className={classes.nbv}>
        {isNaN(fundingAmountNBV as number) ? '' : formatNumber(fundingAmountNBV as number, 2, true)}
      </TableCell>
      <TableCell align="center" size="medium">
        {formatCurrency(currency as Currency)}
      </TableCell>
      <TableCell size="medium">{dealer}</TableCell>
      <TableCell align="right" size="medium">
        {formatDate(createdDate as string)}
      </TableCell>
      <TableCell key={userId} size="medium">
        {userName}
      </TableCell>
      <TableCell size="medium">
        {actionCalculation === 'changeOwner' || actionCalculation === 'viewHistory' ? (
          <IconButton
            aria-label="change owner"
            component={Link}
            to={`${baseUrl}/owner/${id}`}
            className={classes.button}
          >
            <IconSprite width="14px" icon="rotate" color={theme.palette.textGrey2.main} />
          </IconButton>
        ) : (
          ''
        )}
      </TableCell>
    </TableRow>
  );
};

export const QuotasTable = (props: QuotasTableProps) => {
  const { rows } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell size="medium" className={classes.id}>
            <TableSortLabel IconComponent={ArrowDropDownIcon}>{t('ID')}</TableSortLabel>
          </TableCell>
          <TableCell size="medium" className={classes.leaseSubject}>
            {t('LeaseSubject')}
          </TableCell>
          <TableCell className={classes.lessee} size="medium">
            {t('Lessee')}
          </TableCell>
          <TableCell className={classes.nbv} align="left" size="medium">
            {t('NBV, €')}
          </TableCell>
          <TableCell className={classes.currencies} align="center" size="medium">
            {t('Currencies.Lease')}
          </TableCell>
          <TableCell className={classes.dealer} size="medium">
            {t('Dealer')}
          </TableCell>
          <TableCell className={classes.date} align="right" size="medium">
            <TableSortLabel IconComponent={ArrowDropDownIcon}>{t('Date')}</TableSortLabel>
          </TableCell>
          <TableCell className={classes.owner} size="medium">
            <TableSortLabel IconComponent={ArrowDropDownIcon}>{t('Owner')}</TableSortLabel>
          </TableCell>
          <TableCell className={classes.buttonChange} size="medium"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableItem key={row.id} {...row} />
        ))}
      </TableBody>
    </Table>
  );
};
