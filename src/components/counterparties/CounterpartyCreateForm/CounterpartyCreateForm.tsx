import { makeStyles, createStyles, Button, Theme, Paper } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useCounterpartyCreateForm } from './useCounterpartyCreateForm';
import { GeneralInformationFields } from './GeneralInformationFields';
import { ContactFields } from '../CounterpartyEditForm/ContactFields';
import { AdditionalDataFields } from '../CounterpartyEditForm/AdditionalDataFields';
import { SignersFields } from '../CounterpartyEditForm/SignersFields/SignersFields';
import { RequisitesFields } from '../CounterpartyEditForm/RequisitesFields';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    panels: {
      marginBottom: '75px',
    },
    actions: {
      [theme.breakpoints.down(1200)]: {
        width: 'calc(100% - 85px)',
      },
      display: 'flex',
      justifyContent: 'flex-start',
      width: 'calc(100% - 238px)',
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
  const { onSubmit, control, setValue, clearErrors, reset, ...rest } = useCounterpartyCreateForm();
  const { isSubmitting, isValid } = rest;

  return (
    <form className={classes.root}>
      <div className={classes.panels}>
        <Accordion defaultExpanded={true} disabled>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="subtitle1">{t('GeneralInfo')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GeneralInformationFields
              control={control}
              reset={reset}
              clearErrors={clearErrors}
              isValid={isValid}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="subtitle1">{t('Contacts')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ContactFields control={control} setValue={setValue} />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="subtitle1">{t('Signers')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SignersFields control={control} />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="subtitle1">{t('Requisites')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RequisitesFields control={control} setValue={setValue} />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="subtitle1">{t('Additional data')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdditionalDataFields control={control} />
          </AccordionDetails>
        </Accordion>
      </div>
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
