import { Button, Typography } from '@material-ui/core';
import { Grid, Input } from 'components';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { UpdateNomenclatureItemRequest, NomenclatureItem } from 'schema/serverTypes';
import { useDictionaryBackendMutation } from 'services';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NomenclatureAutocomplete } from './NomenclatureAutocomplete';

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

export type NomenclatureFormProps = {
  onSuccess: () => void;
  item?: NomenclatureItem;
};

const useNomenclatureForm = (message: string, onSuccess: () => void, item?: NomenclatureItem) => {
  const {
    vendor = '',
    brand = '',
    category = '',
    model = '',
  } = item ?? { id: 0, vendor: '', brand: '', category: '', model: '' };
  const { handleSubmit, setValue, control, formState, setError, clearErrors, reset } =
    useForm<UpdateNomenclatureItemRequest>({
      mode: 'onBlur',
      defaultValues: { vendor, brand, category, model },
    });

  const queryClient = useQueryClient();

  const { mutateAsync } = useDictionaryBackendMutation<
    UpdateNomenclatureItemRequest,
    UpdateNomenclatureItemRequest
  >('nomenclature', {
    method: 'PUT',
    onSuccess: (_result) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            typeof query.queryKey === 'string' &&
            (query.queryKey as string).startsWith('nomenclature')
          );
        },
      });
    },
  });

  const onSubmit = useMemo(() => {
    const submit = async (form: UpdateNomenclatureItemRequest) => {
      try {
        await mutateAsync(form);
        onSuccess();
      } catch (error) {
        setError('vendor', { message }, { shouldFocus: true });
      }
    };
    return handleSubmit(submit);
  }, [handleSubmit, mutateAsync, setError, message, onSuccess]);

  return {
    setValue,
    control,
    onSubmit,
    reset,
    setError,
    clearErrors,
    ...formState,
  };
};

export const NomenclatureForm = (props: NomenclatureFormProps) => {
  const classes = useStyles();
  const { onSuccess, item } = props;
  const { t } = useTranslation();
  const message = t('Could not create');
  const { onSubmit, isSubmitting, control, setValue } = useNomenclatureForm(
    message,
    onSuccess,
    item
  );

  return (
    <form>
      <Typography variant={'h2'} className={classes.title}>
        {t('Add note')}
      </Typography>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item md={24} xs={24}>
          <NomenclatureAutocomplete
            label={t('Vendor')}
            control={control}
            setValue={setValue}
            name="vendor"
          />
        </Grid>
        <Grid item md={24} xs={24}>
          <NomenclatureAutocomplete
            label={t('Brand')}
            control={control}
            setValue={setValue}
            name="brand"
          />
        </Grid>
        <Grid item md={24} xs={24}>
          <NomenclatureAutocomplete
            label={t('Category')}
            control={control}
            setValue={setValue}
            name="category"
          />
        </Grid>
        <Grid item md={24} xs={24}>
          <Input label={t('Model')} control={control} name="model" />
        </Grid>
        <Grid item md={24} xs={24}>
          <Typography className={classes.required}>*{t('required fields')}</Typography>
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
