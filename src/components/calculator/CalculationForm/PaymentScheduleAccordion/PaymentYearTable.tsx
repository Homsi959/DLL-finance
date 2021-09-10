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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: '0px 0px 5px 0px #383C611A',
      '& .MuiFormControlLabel-root': {
        margin: 0,
        '& .MuiButtonBase-root': {
          padding: 0,
        }
      },
      '& .MuiFormHelperText-root': {
        marginTop: 0
      }
    },
    input: {
      verticalAlign: 'middle',
      '& .MuiFormControl-root': {
        marginTop: 0,
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
        verticalAlign: 'middle',
        '&:first-child': {
          paddingLeft: theme.spacing(2)
        }
      }
    },
    lineTable: {
      height: '36px',
      '&:nth-child(odd)': {
        backgroundColor: theme.palette.secondary.light
      }
    },
    Preferential: {
      paddingLeft: theme.spacing(3)
    },
    Payment: {
      paddingLeft: theme.spacing(3)
    },
    Coefficient: {
      paddingLeft: theme.spacing(1)
    },
    tbody: {
      color: theme.palette.secondary.main,
      '& td': {
        verticalAlign: 'middle'
      }
    },
    index: {
      paddingLeft: theme.spacing(2) 
    }
  })
);

export type PaymentYearTableProps = {
  fields: YearField[];
  numberOfMonths: number;
  year: number;
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
          <th>№</th>
          <th>{t('Month')}</th>
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
                      <td className={classes.index}>{value}</td>
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
                  isСircle={true}
                />
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
                          isСircle={true}
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
