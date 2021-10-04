import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { FieldsControlProps } from '../types';
import { Address } from './Address';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useInitialEquals } from './useInitialEquals';
import { IconCheckbox } from 'components/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    head: {
      color: theme.palette.secondary.main,
    },
    label: {
      marginTop: theme.spacing(3),
    },
  })
);

export const Addresses = (props: FieldsControlProps) => {
  const classes = useStyles();
  const { control, setValue } = props;
  const { t } = useTranslation();

  const legalAddress = useWatch({
    control,
    name: 'legalAddress',
  });
  const actualAddress = useWatch({
    control,
    name: 'actualAddress',
  });
  const mailingAddress = useWatch({
    control,
    name: 'mailingAddress',
  });

  const [equalsToLegal, setLegal] = useInitialEquals(
    'actualAddress',
    actualAddress,
    legalAddress,
    setValue
  );
  const [equalsToActual, setActual] = useInitialEquals(
    'mailingAddress',
    mailingAddress,
    actualAddress,
    setValue
  );

  const handleOnEqualsToLegalChanged = useCallback(
    (e: any, checked: boolean) => {
      if (checked && setValue) {
        setValue('actualAddress', { ...legalAddress });
      }
      setLegal(checked);
    },
    [legalAddress, setValue, setLegal]
  );

  const handleOnEqualsToActualChanged = useCallback(
    (e: any, checked: boolean) => {
      if (checked && setValue) {
        const address = actualAddress ?? legalAddress;
        setValue('mailingAddress', { ...address });
      }
      setActual(checked);
    },
    [legalAddress, actualAddress, setValue, setActual]
  );

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item className={classes.label}>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Legal address')} *
          </Typography>
        </Grid>
      </Grid>
      <Address {...props} name="legalAddress" />
      <Grid container item spacing={2}>
        <Grid item className={classes.label}>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Actual address')} *
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item>
          <FormControlLabel
            label={t('Equals to the legal address')}
            control={
              <Checkbox
                checkedIcon={<IconCheckbox checked={true} />}
                icon={<IconCheckbox checked={false} />}
                checked={equalsToLegal}
                onChange={handleOnEqualsToLegalChanged}
                color="primary"
                size="small"
              />
            }
          />
        </Grid>
      </Grid>
      {!equalsToLegal && <Address {...props} name="actualAddress" />}
      {equalsToLegal && (
        <Grid container item spacing={2}>
          <Grid item md={12} xs={12}>
            <Typography>{actualAddress?.value}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid container item spacing={2}>
        <Grid item className={classes.label}>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Mailing address')} *
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item>
          <FormControlLabel
            label={t('Equals to the actual address')}
            control={
              <Checkbox
                checked={equalsToActual}
                checkedIcon={<IconCheckbox checked={true} />}
                icon={<IconCheckbox checked={false} />}
                onChange={handleOnEqualsToActualChanged}
                color="primary"
                size="small"
              />
            }
          />
        </Grid>
      </Grid>
      {!equalsToActual && <Address {...props} name="mailingAddress" />}
      {equalsToActual && (
        <Grid container item spacing={2}>
          <Grid item md={12} xs={12}>
            <Typography>{mailingAddress?.value}</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
