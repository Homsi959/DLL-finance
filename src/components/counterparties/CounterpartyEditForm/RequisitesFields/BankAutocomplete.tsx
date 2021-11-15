import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldPath, useController } from 'react-hook-form';
import {
  BicAutocompleteProps,
  RequisiteAutocompleteOption,
  getOptionLabel,
  getOptionSelected,
  useStyles,
} from './types';
import { CounterpartyFormValues } from '../../types';
import { useBicAutocompleteOptions } from './useBicAutocompleteOptions';
import { Autocomplete } from 'components/Autocomplete';

export const BankAutocomplete = (props: BicAutocompleteProps) => {
  const classes = useStyles();
  const { index, control, setValue } = props;
  const { t } = useTranslation();

  const bicFieldName = `requisites.${index}.bic` as FieldPath<CounterpartyFormValues>;
  const correspondentAccountName =
    `requisites.${index}.correspondentAccount` as FieldPath<CounterpartyFormValues>;
  const bankFieldName = `requisites.${index}.bank` as const;

  const {
    field: { onChange, value: bank },
    fieldState: { invalid },
  } = useController({
    control,
    name: bankFieldName,
    rules: {
      required: {
        value: true,
        message: t('Required'),
      },
    },
  });

  const helperText = invalid ? t('Required') : undefined;

  const [inputValue, setInutValue] = useState(bank as string);
  const options = useBicAutocompleteOptions(inputValue, bank as string);

  const handleOnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, v: string) => {
      const selected = options.find((t) => t.label === v);
      setInutValue(selected ? selected?.bank : v);
    },
    [setInutValue, options]
  );

  const handleOnChange = useCallback(
    (_e: React.ChangeEvent<{}>, option: RequisiteAutocompleteOption | null) => {
      if (option === null) {
        onChange('');
      } else {
        onChange(option.bank);
        setInutValue(option.bank);
        setValue(correspondentAccountName, option.correspondentAccount);
        setValue(bicFieldName, option.bic);
      }
    },
    [setValue, onChange, correspondentAccountName, bicFieldName]
  );

  const selectedOption = options.find((t) => t.bank === bank) ?? null;

  return (
    <Autocomplete<RequisiteAutocompleteOption>
      label={`${t('Bank')}`}
      className={classes.root}
      options={options}
      inputValue={inputValue}
      onInputChange={handleOnInputChange}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      onChange={handleOnChange}
      error={invalid}
      helperText={helperText}
      value={selectedOption}
    />
  );
};
