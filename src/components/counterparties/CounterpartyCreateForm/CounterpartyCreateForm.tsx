import { makeStyles, createStyles, Button, Theme, Paper, Grid } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useCounterpartyCreateForm } from './useCounterpartyCreateForm';
import { Checkbox } from 'components/form';
import { SearchAutocomplete } from './SearchAutocomplete';
import { useWatch } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    form: {
      marginBottom: '75px',
    },
    actions: {
      [theme.breakpoints.down(1200)]: {
        width: 'calc(100% - 85px)',
      },
      display: 'flex',
      justifyContent: 'flex-start',
      width: 'calc(100% - 230px)',
      padding: theme.spacing('20px', '32px'),
      bottom: 0,
      position: 'fixed',
      zIndex: 1,
    },
    actionButton: {
      marginRight: theme.spacing(3),
    },
  })
);

export const CounterpartyCreateForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { onSubmit, isSubmitting, control, clearErrors, isValid } = useCounterpartyCreateForm();

  const { isDealer, isInsuranceCompany, isLessee, isLessor } = useWatch({
    control,
  });

  useEffect(() => {
    if (isDealer || isInsuranceCompany || isLessee || isLessor) {
      if (!isValid) {
        clearErrors(['isDealer', 'isInsuranceCompany', 'isLessee', 'isLessor']);
      }
    }
  }, [isDealer, isInsuranceCompany, isLessee, isLessor, isValid, clearErrors]);

  const required = t('Required');

  const validateIsLessee = useCallback(
    (value: boolean) => {
      if (!value && !isDealer && !isInsuranceCompany && !isLessor) {
        return required;
      }
      if (value && isLessor) {
        return required;
      }
      return true;
    },
    [isDealer, isInsuranceCompany, isLessor, required]
  );

  const validateIsDealer = useCallback(
    (value: boolean) => {
      if (!value && !isLessee && !isInsuranceCompany && !isLessor) {
        return required;
      }
      return true;
    },
    [isLessee, isInsuranceCompany, isLessor, required]
  );

  const validateIsLessor = useCallback(
    (value: boolean) => {
      if (!value && !isLessee && !isInsuranceCompany && !isDealer) {
        return required;
      }
      if (value && isLessee) {
        return required;
      }
      return true;
    },
    [isLessee, isInsuranceCompany, isDealer, required]
  );

  const validateIsInsuranceCompany = useCallback(
    (value: boolean) => {
      if (!value && !isLessee && !isLessor && !isDealer) {
        return required;
      }
      return true;
    },
    [isLessee, isLessor, isDealer, required]
  );

  return (
    <form className={classes.root}>
      <Accordion defaultExpanded={true} disabled className={classes.form}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="subtitle1">{t('GeneralInfo')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid container item spacing={2}>
              <Grid item>
                <Checkbox
                  name="isLessee"
                  label={t('Lessee')}
                  control={control}
                  rules={{
                    validate: validateIsLessee,
                  }}
                />
              </Grid>
              <Grid item>
                <Checkbox
                  name="isDealer"
                  label={t('Dealer')}
                  control={control}
                  rules={{
                    validate: validateIsDealer,
                  }}
                />
              </Grid>
              <Grid item>
                <Checkbox
                  name="isInsuranceCompany"
                  label={t('InsuranceCompany')}
                  control={control}
                  rules={{
                    validate: validateIsInsuranceCompany,
                  }}
                />
              </Grid>
              <Grid item>
                <Checkbox
                  name="isLessor"
                  label={t('Lessor')}
                  control={control}
                  rules={{
                    validate: validateIsLessor,
                  }}
                />
              </Grid>
            </Grid>
            <SearchAutocomplete control={control} />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Paper square className={classes.actions}>
        <div className={classes.actionButton}>
          <Button
            color="primary"
            size="medium"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            onClick={onSubmit}
          >
            {t('Save')}
          </Button>
        </div>
      </Paper>
    </form>
  );
};
