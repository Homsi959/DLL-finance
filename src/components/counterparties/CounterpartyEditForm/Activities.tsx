import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FieldsControlProps } from './types';
import { useWatch } from 'react-hook-form';

export const Activities = (props: FieldsControlProps) => {
  const { control } = props;
  const { t } = useTranslation();

  const principalActivity = useWatch({
    control,
    name: 'principalActivity',
  });

  const complementaryActivities = useWatch({
    control,
    name: 'complementaryActivities',
  });

  return (
    <>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          {t('Principal activity')}
        </Grid>
        <Grid item xs={12}>
          {principalActivity && (
            <Typography>
              {principalActivity.code} - {principalActivity.text}
            </Typography>
          )}
        </Grid>
      </Grid>
      {complementaryActivities.length > 0 && (
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            {t('Complementary activities')}
          </Grid>
          {complementaryActivities.map((activity) => {
            return (
              <Grid key={activity.code} item xs={12}>
                <Typography>
                  {activity.code} - {activity.text}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};
