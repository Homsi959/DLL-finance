import { RequisiteAutocompleteOption } from './types';
import { useBankSearchQuery } from './useBankSearchQuery';

export const useBicAutocompleteOptions = (bic: string, bank: string) => {
  const { data = [] } = useBankSearchQuery(bic !== '' ? bic : bank);
  const options: RequisiteAutocompleteOption[] = data.map(({ bic, bank, correspondentAccount }) => {
    return {
      bic,
      bank,
      correspondentAccount,
      label: `${bic} (${bank})`,
    };
  });
  return options;
};
