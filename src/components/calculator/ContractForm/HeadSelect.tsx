import { MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useWatch } from 'react-hook-form';
import { Select } from 'components/form';
import { CounterpartyType, CounterpartyFormControl } from './types';

export type HeadSelectProps = {
  type: CounterpartyType;
  control: CounterpartyFormControl;
};

export const HeadSelect = (props: HeadSelectProps) => {
  const { type, control } = props;

  const name =
    type === CounterpartyType.dealer
      ? 'dealerHead.id'
      : type === CounterpartyType.lessor
      ? 'lessorHead.id'
      : 'lesseeHead.id';

  const headsName =
    type === CounterpartyType.dealer
      ? 'dealer.heads'
      : type === CounterpartyType.lessor
      ? 'lessor.heads'
      : 'lessee.heads';

  const heads = useWatch({ control, name: headsName, defaultValue: [] });

  const { t } = useTranslation();

  return (
    <Select
      label={t('Signer')}
      name={name}
      control={control}
      rules={{
        required: {
          value: true,
          message: t('Required'),
        },
      }}
    >
      {heads?.map((head) => {
        return (
          <MenuItem key={head.id} value={head.id}>
            {head.lastName} {head.firstName} {head.middleName}
          </MenuItem>
        );
      })}
    </Select>
  );
};
