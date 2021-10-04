import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

export const useFieldController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName>
) => {
  const { field, fieldState, formState } = useController<TFieldValues, TName>(props);
  return [field, fieldState, formState] as const;
};
