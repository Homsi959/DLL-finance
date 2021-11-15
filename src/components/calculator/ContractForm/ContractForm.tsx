import {
  makeStyles,
  createStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Paper,
  Theme,
  Typography,
  Portal,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from 'components/Grid';
import { useTranslation } from 'react-i18next';
import { useContractForm } from './useContractForm';
import { DatePicker, Input, Select, Switch } from 'components/form';
import { CounterpartyAutocompete } from './CounterpartyAutocompete';
import {
  DepreciationGroup,
  PrepaymentAdvanceOrder,
  Region,
  QuotaCalculationResult,
} from 'schema/serverTypes';
import { CounterpartyType } from './types';
import { HeadSelect } from './HeadSelect';
import { DepreciationCoefficientSelect } from './DepreciationCoefficientSelect';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panels: {
      marginBottom: '75px',
    },
    actions: {
      [theme.breakpoints.down(1200)]: {
        width: 'calc(100% - 85px)',
        left: 63,
      },
      display: 'flex',
      justifyContent: 'flex-start',
      width: 'calc(100% - 238px)',
      padding: theme.spacing('20px', '32px'),
      bottom: 0,
      left: 214,
      position: 'fixed',
      zIndex: 1,
    },
    details: {
      width: '100%',
    },
    actionButton: {
      marginRight: theme.spacing(3),
    },
    exceptions: {
      padding: '8px 8px',
      backgroundColor: fade(theme.palette.warning.main, 0.07),
      fontSize: '10px',
      lineHeight: '15px',
      fontWeight: 400,
    },
  })
);

export type ContractFormProps = {
  quota: QuotaCalculationResult;
};

export const ContractForm = (props: ContractFormProps) => {
  const classes = useStyles();

  const { quota } = props;
  const { onSubmit, control, isSubmitting, isLoading, setValue } = useContractForm(quota);

  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <div className={classes.panels}>
        <Accordion defaultExpanded={true} disabled>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="subtitle1">{t('GeneralInfo')}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Grid container columnSpacing={2} rowSpacing={2.5}>
              <Grid md={8} xs={24} item>
                <Input label={`${t('Contract number')}`} name="contractNumber" control={control} />
              </Grid>
              <Grid item md={4} xs={24}>
                <DatePicker label={`${t('Date')}`} name="date" control={control} />
              </Grid>
              <Grid item md={12} xs={24}>
                <Input label={`${t('Lease subject')}`} name="leaseSubject" control={control} />
              </Grid>
              <Grid item xs={24}>
                <Input
                  label={`${t('Lease subject in document')}`}
                  name="leaseSubjectInDocument"
                  control={control}
                />
              </Grid>
              <Grid item xs={22}>
                <Select label={t('Depreciation.SPI')} name="depreciation.group" control={control}>
                  <MenuItem value={DepreciationGroup.Group1}>{t('Depreciation.Group1')}</MenuItem>
                  <MenuItem value={DepreciationGroup.Group2}>{t('Depreciation.Group2')}</MenuItem>
                  <MenuItem value={DepreciationGroup.Group3}>{t('Depreciation.Group3')}</MenuItem>
                  <MenuItem value={DepreciationGroup.Group4}>{t('Depreciation.Group4')}</MenuItem>
                  <MenuItem value={DepreciationGroup.Group5}>{t('Depreciation.Group5')}</MenuItem>
                  <MenuItem value={DepreciationGroup.Group6}>{t('Depreciation.Group6')}</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2}>
                <DepreciationCoefficientSelect control={control} />
              </Grid>
              <Grid item xs={24}>
                <Select label={t('Region')} name="region" control={control}>
                  <MenuItem value={Region.RussiaExceptRepublics}>
                    {t('Regions.RussiaExceptRepublics')}
                  </MenuItem>
                  <MenuItem value={Region.RussiaCisEurope}>{t('Regions.RussiaCisEurope')}</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={24}>
                <Typography className={classes.exceptions}>{t('Regions.Exceptions')}</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="subtitle1">{t('Parties to the deal')}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Grid container columnSpacing={2} rowSpacing={2.5}>
              <Grid md={12} xs={24} item>
                <CounterpartyAutocompete
                  type={CounterpartyType.lessor}
                  control={control}
                  setValue={setValue}
                />
              </Grid>
              <Grid item md={12} xs={24}>
                <HeadSelect type={CounterpartyType.lessor} control={control} />
              </Grid>
              <Grid md={12} xs={24} item>
                <CounterpartyAutocompete
                  type={CounterpartyType.dealer}
                  control={control}
                  setValue={setValue}
                />
              </Grid>
              <Grid item md={12} xs={24}>
                <HeadSelect type={CounterpartyType.dealer} control={control} />
              </Grid>
              <Grid md={12} xs={24} item>
                <CounterpartyAutocompete
                  type={CounterpartyType.lessee}
                  control={control}
                  setValue={setValue}
                />
              </Grid>
              <Grid item md={12} xs={24}>
                <HeadSelect type={CounterpartyType.lessee} control={control} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel2a-content"
            id="panel2a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="subtitle1">{t('Conditions')}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Grid container columnSpacing={2} rowSpacing={2.5}>
              <Grid md={6} xs={24} item>
                <Input
                  label={`${t('Sales prepayment in %')}`}
                  name="prepaymentPercents"
                  control={control}
                />
              </Grid>
              <Grid item md={6} xs={24}>
                <Input
                  label={`${t('Sales prepayment')}`}
                  name="prepaymentAmount"
                  control={control}
                />
              </Grid>
              <Grid item md={12} xs={24}>
                <Select
                  label={t('Prepayment advance order')}
                  name="prepaymentAdvanceOrder"
                  control={control}
                >
                  <MenuItem value={PrepaymentAdvanceOrder.OneTimeWithFirstPayment}>
                    {t('PrepaymentAdvanceOrder.OneTimeWithFirstPayment')}
                  </MenuItem>
                  <MenuItem value={PrepaymentAdvanceOrder.EvenlyDuringFirst12Months}>
                    {t('PrepaymentAdvanceOrder.EvenlyDuringFirst12Months')}
                  </MenuItem>
                  <MenuItem value={PrepaymentAdvanceOrder.EvenlyDuringLeaseTerm}>
                    {t('PrepaymentAdvanceOrder.EvenlyDuringLeaseTerm')}
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={24}>
                <Input
                  label={`${t('Prepayment conditions')}`}
                  name="prepaymentCondition"
                  control={control}
                  multiline
                />
              </Grid>
              <Grid item xs={24}>
                <Input
                  label={`${t('Payment currency rate')}`}
                  name="paymentCurrencyRate"
                  control={control}
                  multiline
                />
              </Grid>
              <Grid md={6} xs={24} item>
                <Input
                  label={`${t('Sales payment in %')}`}
                  name="paymentPercents"
                  control={control}
                />
              </Grid>
              <Grid item md={6} xs={24}>
                <Input label={`${t('Sales payment')}`} name="paymentAmount" control={control} />
              </Grid>
              <Grid item xs={24}>
                <Input
                  label={`${t('Payment conditions')}`}
                  name="paymentCondition"
                  control={control}
                  multiline
                />
              </Grid>
              <Grid item xs={5}>
                <DatePicker
                  label={`${t('Expected shipping date')}`}
                  name="expectedShippingDate"
                  control={control}
                />
              </Grid>
              <Grid item xs={2}>
                <Switch
                  label={`${t('Prefunding')}`}
                  name="prefunding"
                  control={control}
                  labelOn={''}
                  labelOff={''}
                />
              </Grid>
              <Grid item xs={24}>
                <Input
                  label={`${t('Shipping address')}`}
                  name="shippingAddress"
                  control={control}
                  multiline
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
      <Portal container={document.body}>
        <Paper square className={classes.actions}>
          <div className={classes.actionButton}>
            <Button
              color="primary"
              size="medium"
              type="submit"
              variant="contained"
              disabled={isSubmitting || isLoading}
              onClick={onSubmit}
            >
              {t('Save')}
            </Button>
          </div>
        </Paper>
      </Portal>
    </form>
  );
};
