import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from 'components/Grid';
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
    checkbox: {
      marginTop: '-9px',
      marginBottom: '-9px',
    },
    wrapper: {
      width: '100%',
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
      const address = legalAddress !== undefined ? { ...legalAddress } : undefined;
      if (checked && setValue) {
        setValue('actualAddress', address);
      }
      setLegal(checked);
    },
    [legalAddress, setValue, setLegal]
  );

  const handleOnEqualsToActualChanged = useCallback(
    (e: any, checked: boolean) => {
      if (checked && setValue) {
        if (actualAddress) {
          setValue('mailingAddress', { ...actualAddress });
        } else if (legalAddress) {
          setValue('mailingAddress', { ...legalAddress });
        } else {
          setValue('mailingAddress', undefined);
        }
      }
      setActual(checked);
    },
    [legalAddress, actualAddress, setValue, setActual]
  );

  return (
    <div className={classes.wrapper}>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Legal address')} *
          </Typography>
        </Grid>
      </Grid>
      <Address {...props} name="legalAddress" />
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Actual address')} *
          </Typography>
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <FormControlLabel
            label={t('Equals to the legal address')}
            classes={{
              root: classes.checkbox,
            }}
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
        <Grid container columnSpacing={2} rowSpacing={2.5}>
          <Grid item xs={24}>
            <Typography>{actualAddress?.value}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <Typography variant="subtitle1" className={classes.head}>
            {t('Mailing address')} *
          </Typography>
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid item xs={24}>
          <FormControlLabel
            label={t('Equals to the actual address')}
            classes={{
              root: classes.checkbox,
            }}
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
        <Grid container columnSpacing={2} rowSpacing={2.5}>
          <Grid item xs={24}>
            <Typography>{mailingAddress?.value}</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
