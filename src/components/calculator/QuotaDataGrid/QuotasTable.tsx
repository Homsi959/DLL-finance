import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IconSprite } from 'components';
import { QuotaAsset } from './QuotaAsset';
import { QuotaAction, useQuotaData } from './useQuotaData';
import { formatDate } from '../utils';
import { useTranslation } from 'react-i18next';
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import theme from 'theme';

const baseUrl = '/calculator/results';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      '& .MuiTableCell-root': {
        '&:first-child': {
          paddingLeft: theme.spacing(1.5),
        },
        '&:last-child': {
          paddingRight: theme.spacing(1.5),
        },
      },
      '& .MuiTableBody-root .MuiTableCell-root': {
        paddingBottom: theme.spacing(5),
        position: 'relative',
      },
    },
    id: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
    button: {
      width: '14px',
      padding: 0,
    },
    lessee: {
      [theme.breakpoints.up('md')]: {
        width: '188px',
        maxWidth: '188px',
      },
      [theme.breakpoints.up('lg')]: {
        width: '280px',
        minWidth: '280px',
      },
      [theme.breakpoints.up('xl')]: {
        width: '410px',
        minWidth: '410px',
      },
    },
    owner: {
      width: '148px',
      [theme.breakpoints.up('xl')]: {
        width: '212px',
      },
    },
    dealer: {
      [theme.breakpoints.up('md')]: {
        Width: '188px',
        maxWidth: '188px',
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: '250px',
      },
      [theme.breakpoints.up('xl')]: {
        width: '410px',
        minWidth: '410px',
      },
    },
    link: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    decorated: {
      backgroundColor: theme.palette.lightGreen.main,
    },
    processRegistration: {
      backgroundColor: theme.palette.lightBlue2.main,
    },
    quotaAsset: {
      display: 'inline-block',
    },
    cellRefresh: {
      width: '33px',
    },
    cellID: {
      width: '100%',
      display: 'inline-block',
      maxWidth: '60px',
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
    dealer,
    asset,
    user: { id: userId, name: userName },
  } = props;

  const quotaAssetProps = {
    asset,
    currency,
    isRegistered: false,
  };

  const actionCalculation = action as QuotaAction | undefined;

  return (
    <TableRow>
      <TableCell className={classes.cellID} align="right" size="medium">
        <Link className={classes.id} to={`${baseUrl}/${id}`}>
          {id}
        </Link>
      </TableCell>
      <TableCell size="medium">
        <Link className={classes.quotaAsset} to={`${baseUrl}/${id}`}>
          <QuotaAsset {...quotaAssetProps} />
        </Link>
      </TableCell>
      <TableCell size="medium">
        <Link rel="noopener" target="_blank" className={classes.link} to={`${baseUrl}/${id}`}>
          {lessee}
        </Link>
      </TableCell>
      <TableCell className={classes.dealer} size="medium">
        {dealer}
      </TableCell>
      <TableCell align="right" size="medium">
        {formatDate(createdDate as string, true)}
      </TableCell>
      <TableCell key={userId} size="medium">
        {userName}
      </TableCell>
      <TableCell className={classes.cellRefresh} size="medium">
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
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.cellID} size="medium" align="right">
            {t('ID')}
          </TableCell>
          <TableCell size="medium">{t('LeaseSubject')}</TableCell>
          <TableCell className={classes.lessee} size="medium">
            {t('Lessee')}
          </TableCell>
          <TableCell className={classes.dealer} size="medium">
            {t('Dealer')}
          </TableCell>
          <TableCell align="right" size="medium">
            {t('Date')}
          </TableCell>
          <TableCell className={classes.owner} size="medium">
            {t('Owner')}
          </TableCell>
          <TableCell size="medium"></TableCell>
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
