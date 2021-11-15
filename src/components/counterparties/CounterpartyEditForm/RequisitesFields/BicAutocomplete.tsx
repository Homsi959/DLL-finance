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

export const BicAutocomplete = (props: BicAutocompleteProps) => {
  const classes = useStyles();
  const { index, control, setValue } = props;
  const { t } = useTranslation();

  const bicFieldName = `requisites.${index}.bic` as const;
  const correspondentAccountName =
    `requisites.${index}.correspondentAccount` as FieldPath<CounterpartyFormValues>;
  const bankFieldName = `requisites.${index}.bank` as FieldPath<CounterpartyFormValues>;

  const {
    field: { onChange, value: bic },
    fieldState: { invalid },
  } = useController({
    control,
    name: bicFieldName,
    rules: {
      required: {
        value: true,
        message: t('Required'),
      },
    },
  });

  const helperText = invalid ? t('Required') : undefined;

  const [inputValue, setInutValue] = useState(bic as string);
  const options = useBicAutocompleteOptions(inputValue, bic as string);

  const handleOnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, v: string) => {
      const selected = options.find((t) => t.label === v);
      setInutValue(selected ? selected?.bic : v);
    },
    [setInutValue, options]
  );

  const handleOnChange = useCallback(
    (_e: React.ChangeEvent<{}>, option: RequisiteAutocompleteOption | null) => {
      if (option === null) {
        onChange('');
      } else {
        onChange(option.bic);
        setInutValue(option.bic);
        setValue(correspondentAccountName, option.correspondentAccount);
        setValue(bankFieldName, option.bank);
      }
    },
    [setValue, onChange, correspondentAccountName, bankFieldName]
  );

  const selectedOption = options.find((t) => t.bic === bic) ?? null;

  return (
    <Autocomplete<RequisiteAutocompleteOption>
      label={`${t('BIK')}`}
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
