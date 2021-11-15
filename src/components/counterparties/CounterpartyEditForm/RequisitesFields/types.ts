import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { UseFormReturn } from 'react-hook-form';
import { Requisite } from 'schema/serverTypes';
import { CounterpartyFormValues } from '../../types';

export type RequisiteAutocompleteOption = Requisite & {
  label: string;
};

export type CounterpartyFormProps = Pick<
  UseFormReturn<CounterpartyFormValues>,
  'control' | 'setValue'
>;

export const getOptionLabel = (option: RequisiteAutocompleteOption) =>
  `${option.bic} (${option.bank})`;

export const getOptionSelected = (
  option: RequisiteAutocompleteOption,
  value: RequisiteAutocompleteOption
) => option.bic === value.bic;

export type BicAutocompleteProps = CounterpartyFormProps & {
  index: number;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiInputBase-root': {
        backgroundColor: 'white',
      },
      '& input': {
        backgroundColor: 'white',
      },
    },
  })
);
