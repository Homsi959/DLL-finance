import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { CounterpartyViewModel } from 'schema';
import { useCounterpartiesBackendMutation, useCounterpartyQuery } from 'services/api';
import { emptyAddress } from './types';
import { useGroupsQuery } from './useGroupsQuery';

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
    };

    return values;
  }, [inn]);
};

const getDefaultValues = (counterparty: CounterpartyViewModel): CounterpartyViewModel => {
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
    ...rest
  } = counterparty;

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
    heads,
    contacts,
    requisites,
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
  const counterparty = getDefaultValues(state ?? data ?? defaultValues);

  const { handleSubmit, control, reset, setError, clearErrors, formState, ...rest } =
    useForm<CounterpartyViewModel>({
      mode: 'onBlur',
      defaultValues: counterparty,
    });

  useEffect(() => {
    if (data) {
      reset(getDefaultValues(data));
    }
  }, [data, reset]);

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
    const submit = async ({ inn, ...form }: CounterpartyViewModel) => {
      try {
        const { requisites: allRequisites = [] } = form;
        const requisites = allRequisites.filter((t) => {
          return t.bank !== '' || t.bic !== '' || t.correspondentAccount !== '' || t.account !== '';
        });
        await mutateAsync({ ...form, requisites });
      } catch (error) {
        setError('inn', { message: 'Не удалось обновить' }, { shouldFocus: true });
      }
    };
    return handleSubmit(submit);
  }, [handleSubmit, mutateAsync, setError]);

  const { data: groups, isLoading: groupsLoading } = useGroupsQuery();

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
