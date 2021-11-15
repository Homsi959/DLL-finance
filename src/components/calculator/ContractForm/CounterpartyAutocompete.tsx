import { useCallback, useMemo, useState } from 'react';
import { useController, useWatch, UseFormSetValue, FieldError } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useQuotasDictionaryBackendQuery } from 'services/api';
import {
  CounterpartyType,
  CounterpartyFormControl,
  CounterpartyAutocompleteOption,
  ContractFormValues,
} from './types';
import { Autocomplete, IconSprite } from 'components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteChangeDetails,
} from '@material-ui/lab/useAutocomplete';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import theme from 'theme';

export type CounterpartyAutocompeteProps = {
  type: CounterpartyType;
  control: CounterpartyFormControl;
  setValue: UseFormSetValue<ContractFormValues>;
};

const useRequestUrl = (type: CounterpartyType, input: string) => {
  return useMemo(() => {
    var requestUrl = 'counterparties';
    const searchParams = new URLSearchParams();

    searchParams.set('type', type);
    searchParams.set('includeHeads', 'true');

    if (input) {
      searchParams.set('name', input);
    }
    requestUrl += `?${searchParams}`;

    return requestUrl;
  }, [type, input]);
};

export const getOptionLabel = (option: CounterpartyAutocompleteOption | null) => {
  if (option === null) {
    return '';
  }
  return `${option.inn} (${option.name})`;
};

export const getOptionSelected = (
  option: CounterpartyAutocompleteOption | null,
  value: CounterpartyAutocompleteOption | null
) => {
  if (option === null || value === null) {
    return false;
  }
  return option.inn === value.inn;
};

export const CounterpartyAutocompete = (props: CounterpartyAutocompeteProps) => {
  const { type, control, setValue } = props;

  const name =
    type === CounterpartyType.dealer
      ? 'dealer'
      : type === CounterpartyType.lessor
      ? 'lessor'
      : 'lessee';
  const headName =
    type === CounterpartyType.dealer
      ? 'dealerHead'
      : type === CounterpartyType.lessor
      ? 'lessorHead'
      : 'lesseeHead';

  const { t } = useTranslation();

  const {
    field: { onChange, value = null },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules: {
      required: {
        value: true,
        message: t('Required'),
      },
    },
  });
  const helperText = error !== undefined ? (error as FieldError).message : undefined;

  const [inputValue, setInputValue] = useState('');
  const [input] = useDebounce(inputValue, 500);
  const requestUrl = useRequestUrl(type, input);
  const id = useWatch({ control, name: 'id' });

  const { data: options = [], refetch } = useQuotasDictionaryBackendQuery<
    CounterpartyAutocompleteOption[]
  >(requestUrl, {
    enabled: id > 0,
  });

  const handleOnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, value: string, _reason: AutocompleteInputChangeReason) => {
      setInputValue(value);
    },
    [setInputValue]
  );

  const handleOnChange = useCallback(
    (
      _e: React.ChangeEvent<{}>,
      value: CounterpartyAutocompleteOption | null,
      reason: AutocompleteChangeReason,
      _details?: AutocompleteChangeDetails<CounterpartyAutocompleteOption | null>
    ) => {
      if (reason === 'clear') {
        onChange(undefined);
        setValue(headName, undefined, { shouldValidate: true });
        refetch();
      } else {
        if (value !== null) {
          onChange(value);
          const { heads = [] } = value;
          if (heads.length > 0) {
            setValue(headName, heads[0], { shouldValidate: true });
          } else {
            setValue(headName, undefined, { shouldValidate: true });
          }
        } else {
          onChange(undefined);
          setValue(headName, undefined, { shouldValidate: true });
          refetch();
        }
      }
    },
    [onChange, setValue, headName, refetch]
  );

  const label =
    type === CounterpartyType.dealer
      ? t('Dealer')
      : type === CounterpartyType.lessee
      ? t('Lessee')
      : t('Lessor');

  const iconColor = value ? theme.palette.textGrey2.main : theme.palette.grey4.main;
  const iconHoverColor = value ? theme.palette.dllBlue.main : theme.palette.grey4.main;
  const counterpartyLink = value !== null ? `/counterparties/${value.inn}` : undefined;
  const icon = (
    <Box p={1} pt={1.4} pr={0}>
      <IconSprite
        icon={'view'}
        width="15px"
        height="10px"
        color={iconColor}
        hoverColor={iconHoverColor}
      />
    </Box>
  );

  return (
    <Box display={'flex'}>
      <Box flexGrow={1}>
        <Autocomplete<CounterpartyAutocompleteOption | null>
          label={label}
          options={options}
          inputValue={inputValue}
          onInputChange={handleOnInputChange}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          onChange={handleOnChange}
          error={invalid}
          helperText={helperText}
          value={value}
        />
      </Box>
      <Box>
        {counterpartyLink ? (
          <a href={counterpartyLink} target="_blank" rel="noreferrer">
            {icon}
          </a>
        ) : (
          icon
        )}
      </Box>
    </Box>
  );
};
