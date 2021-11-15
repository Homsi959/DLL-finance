import { useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Field } from 'react-final-form';
import moment from 'moment';
import { YearField } from './types';
import { useTranslation } from 'react-i18next';
import { CheckboxField } from 'components/form/CheckboxField';
import { NumberInputField } from 'components/form/NumberInputField';
import { useRequired } from 'components/form';
import { white } from 'theme/palette';
import { MonthPaymentOption } from 'schema/serverTypes';
import { OnIsPaymentChanged } from './OnIsPaymentChanged';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderCollapse: 'collapse',
      border: 'none',
      width: '100%',
      boxShadow: '0px 0px 5px 0px ' + theme.palette.grey5.main,
      '& .MuiFormControlLabel-root': {
        margin: 0,
        '& .MuiButtonBase-root': {
          padding: 0,
        },
      },
      '& .MuiFormHelperText-root': {
        marginTop: 0,
      },
    },
    input: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      verticalAlign: 'middle',
      '& .MuiFormControl-root': {
        marginTop: 0,
        justifyContent: 'center',
        '& .MuiGrid-root': {
          justifyContent: 'center',
        },
      },
      '& .MuiInputBase-root': {
        backgroundColor: theme.palette.common.white,
      },
      '& .MuiOutlinedInput-inputMarginDense': {
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    thead: {
      backgroundColor: theme.palette.grey[100],
      color: white,
      height: '38px',
      '& th': {
        fontWeight: 500,
        verticalAlign: 'middle',
        padding: theme.spacing(0, 1.5),
        '&:first-child': {
          paddingLeft: theme.spacing(2.5),
        },
        '&:last-child': {
          paddingRight: theme.spacing(2.5),
        },
      },
    },
    lineTable: {
      height: '36px',
      '& td': {
        padding: theme.spacing(0, 1.5),
        '&:first-child': {
          paddingLeft: theme.spacing(2.5),
        },
        '&:last-child': {
          paddingRight: theme.spacing(2.5),
        },
      },
      '&:nth-child(odd)': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    Payment: {
      textAlign: 'center',
    },
    Preferential: {
      textAlign: 'center',
    },
    Coefficient: {},
    tbody: {
      color: theme.palette.secondary.main,
      '& td': {
        verticalAlign: 'middle',
      },
    },
  })
);

export type PaymentYearTableProps = {
  fields: YearField[];
  numberOfMonths: number;
  year: number;
  update: (index: number, value: MonthPaymentOption) => void;
};

export const PaymentYearTable = (props: PaymentYearTableProps) => {
  const classes = useStyles();

  const { fields, year, numberOfMonths } = props;
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const getMonth = useCallback(
    (number: number, dateStr: string | undefined) => {
      const startDate =
        dateStr !== undefined && dateStr !== '' ? new Date(dateStr) : new Date(year, 1, 1);
      const date =
        number === 1
          ? startDate
          : new Date(
              startDate.getFullYear(),
              startDate.getMonth() + (number - 1),
              startDate.getDate()
            );
      return moment(date).locale(language).format('MMMM');
    },
    [year, language]
  );

  const { required } = useRequired();

  return (
    <table className={classes.root}>
      <thead className={classes.thead}>
        <tr>
          <th align="left">№</th>
          <th align="left">{t('Month')}</th>
          <th>{t('IsPayment')}</th>
          <th>{t('IsPreferential')}</th>
          <th className={classes.Coefficient}>{t('Coefficient')}</th>
        </tr>
      </thead>
      <tbody className={classes.tbody}>
        {fields.map(({ name, index }) => {
          const numberFieldName = `${name}.number`;
          const isPaymentFieldName = `${name}.isPayment`;
          const isPreferentialFieldName = `${name}.isPreferential`;
          const valueFieldName = `${name}.value`;
          const disabled = index === numberOfMonths - 1;

          return (
            <tr className={classes.lineTable} key={name}>
              <Field name={numberFieldName}>
                {({ input }) => {
                  const { value } = input;
                  return (
                    <>
                      <td>{value}</td>
                      <td>
                        <Field<string | undefined> name="seasonalPaymentOptions.date">
                          {({ input }) => {
                            return getMonth(value, input.value);
                          }}
                        </Field>
                      </td>
                    </>
                  );
                }}
              </Field>
              <td className={classes.Payment}>
                <Field
                  name={isPaymentFieldName}
                  type="checkbox"
                  component={CheckboxField}
                  disabled={disabled}
                  isCircle={true}
                />
                <Field name={name} component={OnIsPaymentChanged} />
              </td>
              <Field name={isPaymentFieldName} type="checkbox">
                {({ input }) => {
                  const value = input.checked ?? true;
                  const isDisabled = disabled || !value;
                  return (
                    <>
                      <td className={classes.Preferential}>
                        <Field
                          name={isPreferentialFieldName}
                          type="checkbox"
                          component={CheckboxField}
                          disabled={isDisabled}
                          isCircle={true}
                        />
                      </td>
                      <td className={classes.input}>
                        <Field
                          name={valueFieldName}
                          component={NumberInputField}
                          decimalScale={1}
                          validate={required}
                          disabled={isDisabled}
                        />
                      </td>
                    </>
                  );
                }}
              </Field>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
