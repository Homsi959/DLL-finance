import { Typography } from '@material-ui/core';
import { Button, Grid, Input } from 'components';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { LeasingProductItem, UpdateLeasingProductItemRequest } from 'schema/serverTypes';
import { useDictionaryBackendMutation } from 'services';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(5.5),
    },
    button: {
      display: 'block',
      margin: '4px auto 0',
    },
    required: {
      marginTop: theme.spacing(-1.5),
      color: theme.palette.textGrey2.main,
    },
  })
);

export type LeasingProductFormProps = {
  onSuccess: () => void;
  item?: LeasingProductItem;
};

const useLeasingProductForm = (
  message: string,
  onSuccess: () => void,
  item?: LeasingProductItem
) => {
  const { handleSubmit, control, formState, setError, clearErrors, reset } =
    useForm<UpdateLeasingProductItemRequest>({
      mode: 'onBlur',
      defaultValues: { name: item?.name ?? '', id: item?.id ?? 0 },
    });

  const queryClient = useQueryClient();

  const { mutateAsync } = useDictionaryBackendMutation<
    UpdateLeasingProductItemRequest,
    UpdateLeasingProductItemRequest
  >('leasingProducts', {
    method: 'PUT',
    onSuccess: (_result) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            typeof query.queryKey === 'string' &&
            (query.queryKey as string).startsWith('leasingProducts')
          );
        },
      });
    },
  });

  const onSubmit = useMemo(() => {
    const submit = async (form: UpdateLeasingProductItemRequest) => {
      try {
        await mutateAsync(form);
        onSuccess();
      } catch (error) {
        setError('name', { message }, { shouldFocus: true });
      }
    };
    return handleSubmit(submit);
  }, [handleSubmit, mutateAsync, setError, message, onSuccess]);

  return {
    control,
    onSubmit,
    reset,
    setError,
    clearErrors,
    ...formState,
  };
};

export const LeasingProductForm = (props: LeasingProductFormProps) => {
  const classes = useStyles();
  const { onSuccess, item } = props;
  const { t } = useTranslation();
  const message = t('Could not create');
  const { onSubmit, isSubmitting, control } = useLeasingProductForm(message, onSuccess, item);

  return (
    <form>
      <Typography variant={'h2'} className={classes.title}>
        {t('Add note')}
      </Typography>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md={24} xs={24}>
          <Input
            label={t('Name')}
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: t('Required'),
              },
            }}
          />
        </Grid>
        <Grid item md={24} xs={24}>
          <Button
            className={classes.button}
            color="primary"
            size="medium"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            onClick={onSubmit}
          >
            {t('Save')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
