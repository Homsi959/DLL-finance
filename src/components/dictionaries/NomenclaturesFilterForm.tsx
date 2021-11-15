import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { IconSprite, Input, Button } from 'components';
import { Grid } from 'components/Grid';
import { useTranslation } from 'react-i18next';
import { NomenclaturesFilterFormProps } from './types';
import { palette } from '../../theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonReset: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: theme.spacing(0.2),
    },
  })
);

export const NomenclaturesFilterForm = (props: NomenclaturesFilterFormProps) => {
  const classes = useStyles();
  const { control, handleOnReset } = props;
  const { t } = useTranslation();

  return (
    <form>
      <Grid container columnSpacing={2} rowSpacing={2.5}>
        <Grid md={20} xs={24} item>
          <Input
            label={`${t('Search')}`}
            control={control}
            name="search"
            variant="standard"
            InputProps={{
              endAdornment: (
                <IconSprite width="16px" color={palette.textGrey2.main} icon="search" />
              ),
            }}
          />
        </Grid>
        <Grid md={4} xs={24} item className={classes.buttonReset}>
          <FormControl>
            <Button variant="text" onClick={handleOnReset}>
              {t('Reset')}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};
