import { Grid } from '@material-ui/core';
import { Input } from 'components/form';
import { useTranslation } from 'react-i18next';
import { FieldsControlProps } from '../types';
import { Address as CounterpartyAddress, CounterpartyViewModel } from 'schema/serverTypes';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { emptyAddress } from '../types';

export type AddressField = keyof CounterpartyAddress;
export type AdddressName = keyof Pick<
  CounterpartyViewModel,
  'legalAddress' | 'actualAddress' | 'mailingAddress'
>;

export type AddressProps = FieldsControlProps & {
  name: AdddressName;
};

const addAddressPart = (parts: string[], name?: string) => {
  if (name && name !== '' && !parts.includes(name)) {
    parts.push(name);
  }
};

const combine = (a?: string, b?: string) => {
  if (a && b) {
    return `${a} ${b}`;
  }

  if (a) {
    return a;
  }

  if (b) {
    return b;
  }
};

export const Address = (props: AddressProps) => {
  const { control, name, setValue } = props;
  const { t } = useTranslation();

  const getFieldName = useCallback(
    (field: AddressField) => {
      return `${name}.${field}` as const;
    },
    [name]
  );

  const valueState = useFormState({
    control,
    name: getFieldName('value'),
  });

  const { isDirty } = useFormState({
    control,
  });
  const touched = valueState.touchedFields[name]?.value === true;

  const value = useWatch({
    control,
    name,
  });

  const {
    country,
    zipCode,
    regionValue,
    districtValue,
    cityValue,
    settlementValue,
    streetValue,
    houseNameFull,
    houseValue,
    bulkNameFull,
    bulkValue,
    flatNameFull,
    flatValue,
  } = value ?? emptyAddress;

  const represantation = useMemo(() => {
    const parts: Array<string> = [];
    addAddressPart(parts, zipCode);
    addAddressPart(parts, regionValue);
    addAddressPart(parts, country);
    addAddressPart(parts, settlementValue);
    addAddressPart(parts, districtValue);
    addAddressPart(parts, cityValue);
    addAddressPart(parts, streetValue);
    addAddressPart(parts, combine(houseNameFull, houseValue));
    addAddressPart(parts, combine(bulkNameFull, bulkValue));
    addAddressPart(parts, combine(flatNameFull, flatValue));
    return parts.join(', ');
  }, [
    country,
    zipCode,
    regionValue,
    districtValue,
    cityValue,
    settlementValue,
    streetValue,
    houseNameFull,
    houseValue,
    bulkNameFull,
    bulkValue,
    flatNameFull,
    flatValue,
  ]);

  const isMount = useRef(false);

  useEffect(() => {
    if (isMount.current) {
      return;
    }
    if (isDirty && !touched && setValue) {
      setValue(getFieldName('value'), represantation);
    }
  }, [represantation, touched, setValue, getFieldName, isDirty]);

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item md={5} xs={12}>
          <Input label={t('Country')} name={getFieldName('country')} control={control} disabled />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={t('Zip code')} name={getFieldName('zipCode')} control={control} />
        </Grid>
        <Grid item md={5} xs={12}>
          <Input label={t('Region')} name={getFieldName('regionValue')} control={control} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={6} xs={12}>
          <Input label={t('District')} name={getFieldName('districtValue')} control={control} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Input label={t('City')} name={getFieldName('cityValue')} control={control} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={6} xs={12}>
          <Input label={t('Settlement')} name={getFieldName('settlementValue')} control={control} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Input label={t('Street')} name={getFieldName('streetValue')} control={control} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={2} xs={12}>
          <Input
            label={t('Building type')}
            name={getFieldName('houseNameFull')}
            control={control}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={t('House')} name={getFieldName('houseValue')} control={control} />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={t('Block type')} name={getFieldName('bulkNameFull')} control={control} />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={t('Block')} name={getFieldName('bulkValue')} control={control} />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={t('Room type')} name={getFieldName('flatNameFull')} control={control} />
        </Grid>
        <Grid item md={2} xs={12}>
          <Input label={t('Flat')} name={getFieldName('flatValue')} control={control} />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={12} xs={12}>
          <Input
            label={t('Represenation')}
            name={getFieldName('value')}
            control={control}
            multiline
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={12} xs={12}>
          <Input label={t('Comment')} name={getFieldName('comment')} control={control} multiline />
        </Grid>
      </Grid>
    </>
  );
};
