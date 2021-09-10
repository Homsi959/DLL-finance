import { Field } from 'react-final-form';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { List } from '@material-ui/core';
import { GroupUserViewModel } from '../types';
import { GroupUserField } from './GroupUserField';
import { useTranslation } from 'react-i18next';

export interface GroupUserListFieldProps
  extends FieldArrayRenderProps<GroupUserViewModel, HTMLElement> {}

export const GroupUserListField = (props: GroupUserListFieldProps) => {
  const { fields } = props;
  const { t } = useTranslation();

  return (
    <List component="nav" aria-label={t('BasicActionsOnAGroupMember')}>
      {fields.map((name, index) => {
        return (
          <Field
            key={name}
            name={name}
            component={GroupUserField}
            onRemove={fields.remove}
            index={index}
          />
        );
      })}
    </List>
  );
};
