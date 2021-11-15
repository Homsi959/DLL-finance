import { Control, FieldError, useController, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteChangeDetails,
} from '@material-ui/lab/useAutocomplete';
import { Autocomplete } from 'components';
import { NomenclatureItem } from 'schema/serverTypes';
import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuotasDictionaryBackendQuery } from 'services/api/useQuotasBackend';

export type NomenclatureField = keyof Pick<
  NomenclatureItem,
  'vendor' | 'model' | 'brand' | 'category'
>;

export type NomenclatureAutocompleteProps = {
  label: string;
  name: NomenclatureField;
  control: Control<NomenclatureItem, object>;
  setValue: UseFormSetValue<NomenclatureItem>;
};

const useRequestUrl = (name: NomenclatureField, input: string) => {
  return useMemo(() => {
    var requestUrl = name === 'category' ? 'nomenclature/categories' : `nomenclature/${name}s`;
    const searchParams = new URLSearchParams();

    if (input) {
      searchParams.set('name', input);
    }
    requestUrl += `?${searchParams}`;

    return requestUrl;
  }, [name, input]);
};

const update = (
  name: NomenclatureField,
  options: NomenclatureItem[],
  setValue: UseFormSetValue<NomenclatureItem>,
  value: string | null
) => {
  const option = options.find((t) => t[name] === value);
  const brand = option?.brand ?? '';
  const vendor = option?.vendor ?? '';

  switch (name) {
    case 'category':
      setValue('model', '');
      setValue('brand', brand);
      setValue('vendor', vendor);
      return;
    case 'brand':
      setValue('category', '');
      setValue('model', '');
      setValue('vendor', vendor);
      return;
    case 'vendor':
      setValue('brand', '');
      setValue('category', '');
      setValue('model', '');
      return;
  }
};

export const NomenclatureAutocomplete = (props: NomenclatureAutocompleteProps) => {
  const { label, name, control, setValue } = props;

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
  const requestUrl = useRequestUrl(name, input);

  const { data = [], refetch } = useQuotasDictionaryBackendQuery<NomenclatureItem[]>(requestUrl);
  var options = data.map((item) => {
    return item[name];
  });

  const handleOnInputChange = useCallback(
    (_ev: React.ChangeEvent<{}>, value: string, _reason: AutocompleteInputChangeReason) => {
      setInputValue(value);
      onChange(value);
    },
    [setInputValue, onChange]
  );

  const handleOnChange = useCallback(
    (
      _e: React.ChangeEvent<{}>,
      value: string | null,
      reason: AutocompleteChangeReason,
      _details?: AutocompleteChangeDetails<string | null>
    ) => {
      if (reason === 'clear') {
        onChange(undefined);
        update(name, data, setValue, value);
        refetch();
      } else {
        if (value !== null) {
          onChange(value);
          update(name, data, setValue, value);
        } else {
          onChange(undefined);
          update(name, data, setValue, value);
          refetch();
        }
      }
    },
    [onChange, refetch, name, data, setValue]
  );

  if (value) {
    const existing = options.find((t) => t === value);
    if (existing === undefined) {
      options = [value, ...options];
    }
  }

  return (
    <Autocomplete<string | null, false, false, true>
      label={`${label}*`}
      options={options}
      inputValue={inputValue}
      onInputChange={handleOnInputChange}
      getOptionLabel={(t) => t ?? ''}
      getOptionSelected={(o, v) => o === v}
      onChange={handleOnChange}
      error={invalid}
      helperText={helperText}
      value={value}
      freeSolo
    />
  );
};
