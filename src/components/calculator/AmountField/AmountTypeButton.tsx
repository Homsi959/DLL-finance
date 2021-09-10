import { useCallback, useContext } from 'react';
import {
  createStyles,
  Theme,
  makeStyles,
  InputAdornment,
  Select,
  MenuItem,
} from '@material-ui/core';
import { FieldRenderProps } from 'react-final-form-hooks';
import { AmountType } from 'schema';
import { formatCurrency } from '../utils';
import { CurrencyRatesContext } from '../CurrencyRatesContext';
import { OnChange } from 'react-final-form-listeners';
import { IconArrowLightMain } from 'components/icons/IconArrowLightMain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      minWidth: '70px',
      height: '34px',
      border: '1px solid ' + theme.palette.secondary.dark,
      backgroundColor: theme.palette.secondary.light,
      position: 'absolute',
      right: '0',
      '& svg': {
        position: 'absolute',
        right: '0px',
        pointerEvents: 'none',
      },
      '& .MuiSelect-root': {
        paddingLeft: theme.spacing(1),
        height: '100%',
        padding: '0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
    paper: {
      borderRadius: 0,
      boxShadow: '0px 5px 10px 0px #383C611A',
      border: '1px solid ' + theme.palette.secondary.dark,
      maxHeight: 185,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      '& .MuiListItem-button': {
        paddingLeft: theme.spacing(1),
        '&:hover': {
          backgroundColor: theme.palette.secondary.light,
        },
      },
      '& .MuiListItem-button.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  })
);

export type AmountTypeButtonProps = FieldRenderProps<string | undefined> & {
  disabled?: boolean;
  resetAmountValue: () => void;
  inputName: string;
  useSaleCurrency?: boolean;
};

export const AmountTypeButton = (props: AmountTypeButtonProps) => {
  const classes = useStyles();

  const { input, disabled, resetAmountValue, inputName, useSaleCurrency = false } = props;
  const { value: amountType = AmountType.Percents, onChange } = input;

  const handleClickChangeAmountType = useCallback(() => {
    onChange(
      amountType === '' || amountType === AmountType.Percents
        ? AmountType.Money
        : AmountType.Percents
    );
    resetAmountValue();
  }, [onChange, amountType, resetAmountValue]);

  const { currencyLease, currencySale } = useContext(CurrencyRatesContext);
  const label = formatCurrency(useSaleCurrency ? currencySale : currencyLease);
  const selectValue =
    amountType === '' || amountType === AmountType.Percents
      ? AmountType.Percents
      : AmountType.Money;

  return (
    <>
      <InputAdornment position="start">
        <Select
          className={classes?.select}
          disableUnderline={true}
          disabled={disabled}
          onChange={handleClickChangeAmountType}
          value={selectValue}
          MenuProps={{
            classes: {
              paper: classes?.paper,
              list: classes?.list,
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
          IconComponent={IconArrowLightMain}
        >
          <MenuItem value={AmountType.Percents}>%</MenuItem>
          <MenuItem value={AmountType.Money}>{label}</MenuItem>
        </Select>
      </InputAdornment>
      <OnChange name={inputName}>
        {() => {
          if (amountType === '') {
            onChange(AmountType.Percents);
          }
        }}
      </OnChange>
    </>
  );
};
