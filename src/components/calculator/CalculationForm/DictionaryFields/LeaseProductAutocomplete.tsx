import Autocomplete from '@material-ui/lab/Autocomplete';
import { useLeasingProductQuery } from './useLeasingProductQuery';
import { useAutocompleteFieldProps } from '../useAutocompleteFieldProps';
import { AutocompleteFieldProps } from '../types';

export const LeaseProductAutocomplete = (props: AutocompleteFieldProps) => {
  const { resetInputValue, ...rest } = useAutocompleteFieldProps(props);

  const { options } = useLeasingProductQuery();

  return <Autocomplete<string | undefined, false, false, false> {...rest} options={options} />;
};
