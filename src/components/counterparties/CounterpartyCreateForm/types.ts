import { UseFormReturn } from 'react-hook-form';
import { CounterpartyFormValues } from '../types';
import { CounterpartyViewModel, TypeOptions } from 'schema/serverTypes';
import { emptyAddress } from '../CounterpartyEditForm/types';

export type CounterpartyFormProps = Pick<
  UseFormReturn<CounterpartyFormValues>,
  'control' | 'reset'
>;

export const defaultTypeOptions: TypeOptions = {
  isDealer: true,
  isInsuranceCompany: true,
  isLessee: true,
  isLessor: true,
};

export const defaultValues: CounterpartyViewModel = {
  inn: '',
  name: '',
  fullName: '',
  transliteratedName: '',
  transliteratedOpf: '',
  ogrn: '',
  opf: '',
  kpp: '',
  okpo: '',
  registrationDate: '',
  isLessee: false,
  isDealer: false,
  isInsuranceCompany: false,
  isLessor: false,
  phoneNumber: '',
  email: '',
  legalAddress: emptyAddress,
  actualAddress: emptyAddress,
  mailingAddress: emptyAddress,
  generalCondidionsSellerDate: '',
  generalCondidionsLesseeDate: '',
  heads: [],
  contacts: [],
  requisites: [],
  complementaryActivities: [],
  groups: [],
  typeOptions: defaultTypeOptions,
};
