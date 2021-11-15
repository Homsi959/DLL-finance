import { useTranslation } from 'react-i18next';
import { FieldsControlProps } from './types';
import { useWatch } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { Activity } from './Activity';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 4,
    },
    more: {
      marginTop: 12,
      color: theme.palette.blue2.main,
      borderBottom: '1px dashed' + theme.palette.blue2.main,
      display: 'inline-block',
      cursor: 'pointer',
    },
  })
);

export const Activities = (props: FieldsControlProps) => {
  const classes = useStyles();
  const { control } = props;
  const { t } = useTranslation();
  const [listOpen, setListOpen] = useState<boolean>(false);

  const principalActivity = useWatch({
    control,
    name: 'principalActivity',
  });

  const complementaryActivities = useWatch({
    control,
    name: 'complementaryActivities',
  });

  const handleShowActivities = () => {
    setListOpen((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <Activity
        title={t('Principal activity')}
        code={principalActivity?.code}
        text={principalActivity?.text}
      />
      {complementaryActivities?.length > 0 && ( //shown first item
        <Activity
          title={t('Complementary activities')}
          code={complementaryActivities[0]?.code}
          text={complementaryActivities[0]?.text}
        />
      )}
      {complementaryActivities?.length > 1 ? (
        <>
          {listOpen &&
            complementaryActivities
              .filter((activity, index) => index > 0) //first item is shown above
              .map((activity) => {
                return (
                  <Activity
                    title={t('Complementary activities')}
                    code={activity?.code}
                    text={activity?.text}
                    key={activity?.code}
                  />
                );
              })}
          <Typography onClick={handleShowActivities} className={classes.more}>
            {listOpen ? t('Hide') : t('ShowAll', { count: complementaryActivities.length - 1 })}
          </Typography>
        </>
      ) : null}
    </div>
  );
};
