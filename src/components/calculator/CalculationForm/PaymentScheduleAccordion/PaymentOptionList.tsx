import { useMemo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { PaymentYearTable } from './PaymentYearTable';
import { MonthPaymentOption } from 'schema';
import { YearFields } from './types';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    table: {
      width: '50%',
      float: 'left',
      marginBottom: theme.spacing(3),
      '&:nth-child(2n-1)': {
        paddingRight: theme.spacing(1.3),
        '&:last-child': {
          marginBottom: 0,
        },
      },
      '&:nth-child(2n)': {
        float: 'right',
        paddingLeft: theme.spacing(1.3),
        '&:last-child': {
          marginBottom: 0,
        },
      },
    },
    header: {
      marginBottom: '14px',
      lineHeight: 1.2,
    },
    Box: {
      fontSize: '14px',
      fontWeight: 700,
      color: theme.palette.divider,
    },
  })
);

export type PaymentOptionListProps = FieldArrayRenderProps<MonthPaymentOption, HTMLDivElement> & {
  numberOfMonths: number;
  date?: string;
};

export const PaymentOptionList = (props: PaymentOptionListProps) => {
  const classes = useStyles();
  const { fields, date, numberOfMonths } = props;
  const { map, update } = fields;

  const years = useMemo(() => {
    const years: YearFields[] = [];
    let currentDate = date ? new Date(date) : new Date();
    let current: YearFields | null = null;

    map((name: string, index: number) => {
      const monthField = { name, index };

      if (current === null) {
        current = {
          year: currentDate.getFullYear(),
          fields: [monthField],
        };
        years.push(current);
      } else {
        const nextDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          currentDate.getDate()
        );
        if (nextDate.getFullYear() !== currentDate.getFullYear()) {
          current = {
            year: nextDate.getFullYear(),
            fields: [],
          };
          years.push(current);
        }
        current.fields.push(monthField);
        currentDate = nextDate;
      }
    });

    return years;
  }, [date, map]);

  return (
    <div className={classes.root}>
      {years.map((yearProps) => {
        const { year } = yearProps;
        const gridProps = {
          ...yearProps,
          numberOfMonths,
          update,
        };
        return (
          <div key={year} className={classes.table}>
            <div className={classes.header}>
              <Box className={classes.Box}>{year}</Box>
            </div>
            <PaymentYearTable {...gridProps} />
          </div>
        );
      })}
    </div>
  );
};
