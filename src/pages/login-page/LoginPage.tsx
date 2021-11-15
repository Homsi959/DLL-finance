import { useEffect } from 'react';
import { LoginButton } from 'components';
import { useTranslation } from 'react-i18next';
import { useGoBack } from 'hooks';
import { useUserAuth } from 'services';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: 40,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      overflowY: 'auto',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100%',
    },
    blockForm: {
      textAlign: 'center',
      minHeight: '100%',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      justifyContent: 'center',
    },
    blockBackground: {
      minHeight: '100%',
      flex: 1,
      background: 'url(/img/dll-auth-big-img.png) no-repeat center',
      backgroundSize: 'cover',
      overflow: 'hidden',
      zIndex: -1,
      position: 'relative',
    },
    title: {
      fontSize: '36px',
      fontWeight: 700,
      color: theme.palette.primary.main,
      margin: '0 16px 21px',
    },
    description: {
      marginBottom: theme.spacing(4),
    },
    formWrap: {
      width: '100%',
      maxWidth: '448px',
    },
    loader: {
      display: 'flex',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -4,
      transition: 'all .3s ease',
    },
  })
);

export const LoginPage = () => {
  const classes = useStyles();
  const { user } = useUserAuth();
  const goBack = useGoBack();

  useEffect(() => {
    if (user) {
      goBack();
    }
  }, [user, goBack]);

  const { t } = useTranslation();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Box className={classes.blockForm}>
          <div className={`${classes.loader} loader`}>
            <div className="spinner ">
              <svg
                className="letter"
                id="letter"
                width="230"
                height="195"
                viewBox="0 0 230 195"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="clip-i-1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M53.5788 76.4098C69.9205 74.3151 83.3291 87.302 84.5861 102.383C85.8432 119.979 74.9487 132.965 59.864 134.641C42.6843 136.317 28.4377 123.749 27.5996 108.667C26.7616 90.6534 37.6561 78.5044 53.5788 76.4098ZM85.4242 6.44837C85.4242 21.9488 86.2622 43.7332 85.4242 58.3958C82.491 58.3958 74.9487 50.0172 54.4168 50.0172C18.8002 50.0172 -9.27397 84.7884 2.87756 122.911C7.90578 138.83 20.0573 151.398 33.8849 157.263C41.8463 160.615 51.4837 161.453 61.9591 160.615C66.1493 160.196 71.5966 158.52 74.9487 157.263C78.7199 155.588 82.91 152.655 85.4242 151.817C86.2622 157.263 85.8432 158.52 92.1284 158.52C115.593 158.52 111.822 163.547 111.822 127.938V13.1513C111.822 -0.673447 113.079 1.00228 94.2235 1.00228C89.1953 1.00228 85.8432 0.583345 85.4242 6.44837Z"
                />
                <path
                  id="clip-i-2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M53.5788 76.4098C69.9205 74.3151 83.3291 87.302 84.5861 102.383C85.8432 119.979 74.9487 132.965 59.864 134.641C42.6843 136.317 28.4377 123.749 27.5996 108.667C26.7616 90.6534 37.6561 78.5044 53.5788 76.4098ZM85.4242 6.44837C85.4242 21.9488 86.2622 43.7332 85.4242 58.3958C82.491 58.3958 74.9487 50.0172 54.4168 50.0172C18.8002 50.0172 -9.27397 84.7884 2.87756 122.911C7.90578 138.83 20.0573 151.398 33.8849 157.263C41.8463 160.615 51.4837 161.453 61.9591 160.615C66.1493 160.196 71.5966 158.52 74.9487 157.263C78.7199 155.588 82.91 152.655 85.4242 151.817C86.2622 157.263 85.8432 158.52 92.1284 158.52C115.593 158.52 111.822 163.547 111.822 127.938V13.1513C111.822 -0.673447 113.079 1.00228 94.2235 1.00228C89.1953 1.00228 85.8432 0.583345 85.4242 6.44837Z"
                />
                <path
                  id="clip-i-3"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M151.21 132.128C150.791 94.0049 151.21 54.2064 151.21 15.6648C151.21 -1.93027 153.305 1.42117 131.516 1.00224C123.974 1.00224 125.231 3.93476 125.231 11.0566V145.952C124.812 161.034 123.555 158.52 146.182 158.52H229.985C237.108 158.52 236.689 155.169 236.689 148.466C236.689 129.614 237.947 132.128 219.091 132.128C196.464 132.128 173.837 132.128 151.21 132.128Z"
                />
                <path
                  id="clip-i-4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M151.21 132.128C150.791 94.0049 151.21 54.2064 151.21 15.6648C151.21 -1.93027 153.305 1.42117 131.516 1.00224C123.974 1.00224 125.231 3.93476 125.231 11.0566V145.952C124.812 161.034 123.555 158.52 146.182 158.52H229.985C237.108 158.52 236.689 155.169 236.689 148.466C236.689 129.614 237.947 132.128 219.091 132.128C196.464 132.128 173.837 132.128 151.21 132.128Z"
                />
                <path
                  id="clip-i-5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M164.619 7.28566V104.897C164.619 114.951 163.362 119.14 171.742 119.14H230.404C238.366 119.14 236.69 114.532 236.69 101.964C236.69 91.0718 235.852 92.7475 217.834 92.7475L190.598 93.1665V10.6371C190.598 -0.255088 191.436 1.0017 171.742 1.0017C165.876 1.0017 164.2 1.42063 164.619 7.28566Z"
                />
                <path
                  id="clip-i-6"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M164.619 7.28566V104.897C164.619 114.951 163.362 119.14 171.742 119.14H230.404C238.366 119.14 236.69 114.532 236.69 101.964C236.69 91.0718 235.852 92.7475 217.834 92.7475L190.598 93.1665V10.6371C190.598 -0.255088 191.436 1.0017 171.742 1.0017C165.876 1.0017 164.2 1.42063 164.619 7.28566Z"
                />
              </svg>
            </div>
          </div>
          <div className={`${classes.formWrap} form-wrap`}>
            <Typography variant="h1" className={classes.title}>
              {t('Enter')}
            </Typography>
            <Typography variant="body1" className={classes.description}>
              {t('LoginWelcomeMessage')}
              <br />
              {t('CorrectnesOfTheEnteredData')}
            </Typography>
            <form autoComplete="off">
              <LoginButton />
            </form>
          </div>
        </Box>
        <Box className={classes.blockBackground} />
      </Box>
    </Box>
  );
};
