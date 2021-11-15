import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { CounterpartyViewModel, GroupViewModel, TypeOptions } from 'schema/serverTypes';
import { useCounterpartiesBackendMutation, useCounterpartyQuery } from 'services/api';
import { emptyAddress } from './types';
import { useGroupsQuery } from './useGroupsQuery';
import { CounterpartyFormValues, CounterpartyGroupViewModel } from '../types';

const defaultTypeOptions: TypeOptions = {
  isDealer: true,
  isInsuranceCompany: true,
  isLessee: true,
  isLessor: true,
};

const useDefaultValues = (inn: string) => {
  return useMemo(() => {
    const values: CounterpartyViewModel = {
      inn,
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

    return values;
  }, [inn]);
};

const getDefaultValues = (
  counterparty: CounterpartyViewModel,
  userGroups: GroupViewModel[]
): CounterpartyFormValues => {
  const {
    inn,
    name = '',
    fullName = '',
    transliteratedName = '',
    transliteratedOpf = '',
    ogrn = '',
    opf = '',
    kpp = '',
    okpo = '',
    registrationDate = '',
    phoneNumber = '',
    email = '',
    legalAddress = emptyAddress,
    actualAddress = emptyAddress,
    mailingAddress = emptyAddress,
    generalCondidionsSellerDate = '',
    generalCondidionsLesseeDate = '',
    heads = [],
    contacts = [],
    requisites = [],
    groups = [],
    typeOptions = defaultTypeOptions,
    ...rest
  } = counterparty;

  const formGroups: CounterpartyGroupViewModel[] = userGroups.map((group) => ({
    id: group.id,
    checked: groups.find((t) => t.id === group.id) !== undefined,
  }));

  return {
    inn,
    name,
    fullName,
    transliteratedName,
    transliteratedOpf,
    ogrn,
    opf,
    kpp,
    okpo,
    registrationDate,
    phoneNumber,
    email,
    legalAddress,
    actualAddress,
    mailingAddress,
    generalCondidionsSellerDate,
    generalCondidionsLesseeDate,
    heads: heads.map(({ id: headId, ...rest }) => {
      return { ...rest, headId };
    }),
    contacts,
    requisites,
    groups: formGroups,
    typeOptions,
    ...rest,
  };
};

export const useCounterpartyEditForm = () => {
  const { inn } = useParams<{ inn: string }>();
  const { state } = useLocation<CounterpartyViewModel | undefined>();

  const { data, isLoading } = useCounterpartyQuery(inn, {
    enabled: state === undefined,
  });

  const defaultValues = useDefaultValues(inn);

  const { data: groups = [], isLoading: groupsLoading } = useGroupsQuery();
  const counterparty = getDefaultValues(state ?? data ?? defaultValues, groups);

  const { handleSubmit, control, reset, setError, clearErrors, formState, ...rest } =
    useForm<CounterpartyFormValues>({
      mode: 'onBlur',
      defaultValues: counterparty,
    });

  useEffect(() => {
    if (data && groups) {
      reset(getDefaultValues(data, groups));
    }
  }, [data, groups, reset]);

  const queryClient = useQueryClient();
  const { mutateAsync } = useCounterpartiesBackendMutation<
    Omit<CounterpartyViewModel, 'inn'>,
    CounterpartyViewModel
  >(inn, {
    method: 'PUT',
    onSuccess: () => {
      queryClient.invalidateQueries(`counterparties/${inn}`);
    },
  });

  const onSubmit = useMemo(() => {
    const submit = async ({ inn, heads, ...form }: CounterpartyFormValues) => {
      try {
        const { requisites: allRequisites = [], groups: allGroups = [] } = form;
        const requisites = allRequisites.filter((t) => {
          return t.bank !== '' || t.bic !== '' || t.correspondentAccount !== '' || t.account !== '';
        });
        const groups = allGroups
          .filter((group) => group.checked)
          .map((group) => ({
            id: group.id,
            name: group.id.toString(),
          }));

        await mutateAsync({
          ...form,
          heads: heads.map(({ headId: id, ...rest }) => ({ id, ...rest })),
          requisites,
          groups,
        });
      } catch (error) {
        setError('inn', { message: 'Не удалось обновить' }, { shouldFocus: true });
      }
    };
    return handleSubmit(submit);
  }, [handleSubmit, mutateAsync, setError]);

  return {
    control,
    onSubmit,
    loading: groupsLoading ? true : state !== undefined ? false : isLoading,
    groups,
    clearErrors,
    ...formState,
    ...rest,
  };
};
