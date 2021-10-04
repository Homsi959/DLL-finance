import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableSortLabel,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { CounterpartyListViewModel } from 'schema';
import { IconSprite } from 'components';
import { palette } from 'theme';

const useStyles = makeStyles((theme) => ({
  abbreviatedName: {
    minWidth: '420px',
  },
  list: {
    marginTop: theme.spacing(0.2),
    marginBottom: theme.spacing(0.2),
  },
  change: {
    width: '60px',
  },
  calculation: {
    width: '100px',
  },
  monitoring: {
    width: '120px',
  },
  verification: {
    width: '130px',
  },
  tin: {
    width: '130px',
  },
  userType: {
    width: '130px',
  },
}));

const TableItem = (props: CounterpartyListViewModel) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { name, inn, isDealer, isInsuranceCompany, isLessee, isLessor } = props;

  const arrRoles = [
    isDealer ? t('Lessee') : false,
    isInsuranceCompany ? t('InsuranceCompany') : false,
    isLessee ? t('Lessee') : false,
    isLessor ? t('Lessor') : false,
  ];

  return (
    <TableRow>
      <TableCell className={classes.abbreviatedName} size="medium">
        <Link to={`/counterparties/${inn}`}>{name}</Link>
      </TableCell>
      <TableCell size="medium">
        <ul>
          {arrRoles
            .filter((t) => t !== false)
            .map((role, i) => (
              <li className={classes.list} key={i}>
                {role}
              </li>
            ))}
        </ul>
      </TableCell>
      <TableCell size="medium">{inn}</TableCell>
      <TableCell size="medium"></TableCell>
      <TableCell size="medium"></TableCell>
      <TableCell size="medium"></TableCell>
      <TableCell size="medium">
        <Link to={'groupUrl'}>
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
export type CounterpartiesTableProps = {
  rows: CounterpartyListViewModel[];
};

export const CounterpartiesTable = (props: CounterpartiesTableProps) => {
  const { rows } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell size="medium">
            <TableSortLabel IconComponent={ArrowDropDownIcon}>
              {t('AbbreviatedName')}
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.userType} size="medium">
            {t('UserType')}
          </TableCell>
          <TableCell className={classes.tin} size="medium">
            {t('TIN')}
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
          <TableCell className={classes.change} size="medium"></TableCell>
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
