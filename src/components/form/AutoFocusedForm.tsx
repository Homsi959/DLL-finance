import { useMemo, useCallback } from 'react';
import { Form, FormProps } from 'react-final-form';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';
import { FormApi, SubmissionErrors, AnyObject, FormSubscription } from 'final-form';

const { insert, concat, move, pop, push, removeBatch, remove, shift, swap, update, unshift } =
  arrayMutators;

const arrayTypedMutators = {
  insert,
  concat,
  move,
  pop,
  push,
  removeBatch,
  remove,
  shift,
  swap,
  update,
  unshift,
};

interface DefaultValuesType<FormValues = AnyObject> {
  defaultValues?: Partial<FormValues>;
}

export type AutoFocusedFormProps<FormValues = AnyObject> = FormProps<FormValues> &
  DefaultValuesType;

export function AutoFocusedForm<FormValues = AnyObject>({
  decorators = [],
  mutators,
  subscription,
  onSubmit,
  defaultValues,
  ...rest
}: AutoFocusedFormProps<FormValues>) {
  const focusOnErrors = useMemo(() => createDecorator<FormValues>(), []);
  const defaultDecarators = useMemo(() => [focusOnErrors], [focusOnErrors]);

  const defaultSubscription: FormSubscription = useMemo(
    () => ({
      submitting: true,
      pristine: true,
      valid: true,
      dirty: false,
      submitSucceeded: true,
      values: false,
    }),
    []
  );

  const mergedSubmit = useCallback(
    (
      values: FormValues,
      form: FormApi<FormValues>,
      callback?: (errors?: SubmissionErrors) => void
    ) => {
      const mergedValues: FormValues = { ...defaultValues, ...values };
      return onSubmit(mergedValues, form, callback);
    },
    [defaultValues, onSubmit]
  );

  const mergedDecorators = useMemo(() => {
    return [...defaultDecarators, ...decorators];
  }, [defaultDecarators, decorators]);

  const mergedSubscription = useMemo(() => {
    return {
      ...defaultSubscription,
      ...subscription,
    };
  }, [defaultSubscription, subscription]);

  const mergedMutators = useMemo(() => {
    return {
      ...arrayTypedMutators,
      ...mutators,
    };
  }, [mutators]);

  return (
    <Form
      mutators={mergedMutators}
      decorators={mergedDecorators}
      subscription={mergedSubscription}
      onSubmit={mergedSubmit}
      {...rest}
    />
  );
}
