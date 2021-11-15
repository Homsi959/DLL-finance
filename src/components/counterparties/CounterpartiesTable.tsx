import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core';
import { CounterpartyListViewModel } from 'schema';
import { IconSprite } from 'components';
import { palette } from 'theme';
import { CounterpartiesDataReturn } from './types';

const useStyles = makeStyles((theme) =>
  createStyles({
    abbreviatedName: {
      minWidth: '420px',
    },
    list: {
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(0.2),
    },
    change: {
      width: '41px',
    },
    calculation: {
      width: '55px',
    },
    monitoring: {
      width: '80px',
    },
    verification: {
      width: '92px',
    },
    tin: {
      width: '100px',
      [theme.breakpoints.up('md')]: {
        width: '140px',
      },
      [theme.breakpoints.up('lg')]: {
        width: '200px',
      },
    },
    userType: {
      width: '140px',
      [theme.breakpoints.up('md')]: {
        width: '212px',
      },
      [theme.breakpoints.up('lg')]: {
        width: '372px',
      },
    },
  })
);

const TableItem = (props: CounterpartyListViewModel) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { name, inn, isDealer, isInsuranceCompany, isLessee, isLessor } = props;

  const roles = [
    isDealer ? t('Lessee') : false,
    isInsuranceCompany ? t('InsuranceCompany') : false,
    isLessee ? t('Lessee') : false,
    isLessor ? t('Lessor') : false,
  ];
  const counterpartyUrl = `/counterparties/${inn}`;

  return (
    <TableRow>
      <TableCell className={classes.abbreviatedName} size="medium">
        <Link to={counterpartyUrl}>{name}</Link>
      </TableCell>
      <TableCell size="medium">
        <ul>
          {roles
            .filter((t) => t !== false)
            .map((role, i) => (
              <li className={classes.list} key={i}>
                {role}
              </li>
            ))}
        </ul>
      </TableCell>
      <TableCell size="medium">{inn}</TableCell>
      <TableCell size="medium" />
      <TableCell size="medium" />
      <TableCell size="medium" align="center">
        <IconSprite
          width="14px"
          color={palette.textGrey2.main}
          hoverColor={palette.primary.main}
          icon="view"
        />
      </TableCell>
      <TableCell size="medium">
        <Link to={counterpartyUrl}>
          <IconSprite
            width="14px"
            color={palette.textGrey2.main}
            hoverColor={palette.primary.main}
            icon="edit"
          />
        </Link>
      </TableCell>
    </TableRow>
  );
};

export type CounterpartiesTableProps = Pick<CounterpartiesDataReturn, 'rows' | 'sorting'>;

export const CounterpartiesTable = (props: CounterpartiesTableProps) => {
  const { rows } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell size="medium">{t('AbbreviatedName')}</TableCell>
          <TableCell className={classes.userType} size="medium">
            {t('UserType')}
          </TableCell>
          <TableCell className={classes.tin} size="medium">
            {t('Inn')}
          </TableCell>
          <TableCell className={classes.verification} size="medium">
            {t('Verification')}
          </TableCell>
          <TableCell className={classes.monitoring} size="medium">
            {t('Monitoring')}
          </TableCell>
          <TableCell className={classes.calculation} size="medium">
            {t('Calculation_plural')}
          </TableCell>
          <TableCell className={classes.change} size="medium" />
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row: CounterpartyListViewModel) => (
          <TableItem key={row.id} {...row} />
        ))}
      </TableBody>
    </Table>
  );
};
