import { Grid } from '@material-ui/core';
import { InnAutocomplete } from './InnAutocomplete';
import { NameAutocomplete } from './NameAutocomplete';
import { useController, UseControllerProps, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { CounterpartyCreateFormValues } from './types';
import { useCounterpartySearchQuery } from './useCounterpartySearchQuery';

export type SearchAutocompleteProps = Pick<UseFormReturn<CounterpartyCreateFormValues>, 'control'>;

const useName = (control: UseControllerProps<CounterpartyCreateFormValues, 'name'>['control']) => {
  const {
    field: { onChange },
    fieldState: { invalid, error },
  } = useController<CounterpartyCreateFormValues, 'name'>({
    control,
    name: 'name',
  });

  return [onChange, invalid, error] as const;
};

const useInn = (control: UseControllerProps<CounterpartyCreateFormValues, 'inn'>['control']) => {
  const {
    field: { onChange },
    fieldState: { invalid, error },
  } = useController<CounterpartyCreateFormValues, 'inn'>({
    control,
    name: 'inn',
  });

  return [onChange, invalid, error] as const;
};

export const SearchAutocomplete = (props: SearchAutocompleteProps) => {
  const [inn, setInn] = useState('');
  const [name, setName] = useState('');

  const [onInnChange, innInvalid, innErr] = useInn(props.control);
  const [onNameChange, nameInvalid, nameErr] = useName(props.control);

  const { data: innData = [] } = useCounterpartySearchQuery(inn);
  const innOptions = innData.map(
    ({ inn, name, isDealer, isInsuranceCompany, isLessee, isLessor }) => ({
      inn,
      name,
      isDealer,
      isInsuranceCompany,
      isLessee,
      isLessor,
      label: `${inn} (${name})`,
    })
  );

  const { data: nameData = [] } = useCounterpartySearchQuery(name);
  const nameOptions = nameData.map(
    ({ inn, name, isDealer, isInsuranceCompany, isLessee, isLessor }) => ({
      inn,
      name,
      isDealer,
      isInsuranceCompany,
      isLessee,
      isLessor,
      label: `${inn} (${name})`,
    })
  );

  const autocompleteProps = {
    ...props,
    inn,
    name,
    setInn,
    setName,
    onInnChange,
    onNameChange,
  };

  return (
    <Grid container item spacing={2}>
      <Grid md={4} xs={12} item>
        <InnAutocomplete
          {...autocompleteProps}
          options={innOptions}
          helperText={innErr?.message}
          invalid={innInvalid}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <NameAutocomplete
          {...autocompleteProps}
          options={nameOptions}
          helperText={nameErr?.message}
          invalid={nameInvalid}
        />
      </Grid>
    </Grid>
  );
};
