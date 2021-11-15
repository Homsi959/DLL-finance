import { MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useWatch } from 'react-hook-form';
import { Select } from 'components/form';
import { CounterpartyFormControl } from './types';

export type DepreciationCoefficientSelectProps = {
  control: CounterpartyFormControl;
};

const name = 'depreciation.coefficient';

export const DepreciationCoefficientSelect = (props: DepreciationCoefficientSelectProps) => {
  const { control } = props;

  const depreciationCoefficient = useWatch({ control, name });

  const { t } = useTranslation();

  return (
    <Select label={t('Depreciation.Coefficient')} name={name} control={control} disabled>
      <MenuItem value={depreciationCoefficient}>{depreciationCoefficient}</MenuItem>
    </Select>
  );
};
