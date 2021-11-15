import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Grid } from 'components';
import { Card, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import question from 'img/icons/question.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'block',
      height: '100%',
      textDecoration: 'none',
    },
    card: {
      height: '100%',
      display: 'flex',
      borderRadius: 0,
    },
    content: {
      padding: theme.spacing(1.5, 2.5, 2.5, 0),
    },
    icon: {
      width: 22,
      height: 30,
      margin: theme.spacing(1.25, 1.5, 1.25, 1.25),
    },
    title: {
      color: theme.palette.blue3.main,
      marginBottom: theme.spacing(1.5),
    },
    description: {
      color: theme.palette.textGrey3.main,
      fontSize: 12,
    },
  })
);

export const DictionariesPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container columnSpacing={2.5} rowSpacing={2.5}>
      <Grid item xl={6} md={8} xs={24}>
        <Link to="/dictionaries/nomenclatures" className={classes.link}>
          <Card className={classes.card}>
            <img alt={t('Nomenclatures')} className={classes.icon} src={question} />
            <CardContent className={classes.content}>
              <Typography className={classes.title} variant={'subtitle2'} component={'h2'}>
                {t('Nomenclatures')}
              </Typography>
              <Typography className={classes.description} variant={'subtitle2'} component={'p'}>
                {t('Dictionaries.Nomenclature')}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
      <Grid item xl={6} md={8} xs={24}>
        <Link to="/dictionaries/leasingProducts" className={classes.link}>
          <Card className={classes.card}>
            <img alt={t('Leasing product')} className={classes.icon} src={question} />
            <CardContent className={classes.content}>
              <Typography className={classes.title} variant={'subtitle2'} component={'h2'}>
                {t('Leasing product')}
              </Typography>
              <Typography className={classes.description} variant={'subtitle2'} component={'p'}>
                {t('Dictionaries.LeasingProduct')}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
      <Grid item xl={6} md={8} xs={24}>
        <Link to="/dictionaries/salesPoints" className={classes.link}>
          <Card className={classes.card}>
            <img alt={t('Sales points')} className={classes.icon} src={question} />
            <CardContent className={classes.content}>
              <Typography className={classes.title} variant={'subtitle2'} component={'h2'}>
                {t('Sales points')}
              </Typography>
              <Typography className={classes.description} variant={'subtitle2'} component={'p'}>
                {t('Dictionaries.SalesPoint')}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
};
