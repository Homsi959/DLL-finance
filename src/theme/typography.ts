import palette from './palette';
import createTypography from '@material-ui/core/styles/createTypography';

const style = createTypography(palette, {
  fontFamily: '"Montserrat", "Roboto", "sans-serif"',
  h1: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: '24px',
    letterSpacing: '0',
    lineHeight: '26px',
  },
  h2: {
    color: palette.primary.main,
    fontWeight: 700,
    fontSize: '16px',
    letterSpacing: '0',
    lineHeight: 1.2,
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: '24px',
    letterSpacing: '0',
    lineHeight: '26px',
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: '24px',
    letterSpacing: '0',
    lineHeight: '26px',
  },
  h5: {
    color: palette.primary.main,
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '18px',
  },
  h6: {
    color: palette.text.primary,
    fontSize: '16px',
    lineHeight: '18px',
  },
  subtitle1: {
    color: palette.primary.main,
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '17px',
  },
  subtitle2: {
    color: palette.text.secondary,
    fontSize: '14px',
    lineHeight: '17px',
  },
  body1: {
    color: palette.text.primary,
    fontSize: '12px',
    lineHeight: '14px',
  },
  body2: {
    color: palette.text.secondary,
    fontSize: '12px',
    lineHeight: '14px',
  },
  button: {
    color: palette.text.primary,
    fontSize: '12px',
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '11px',
    lineHeight: '13px',
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase',
  },
});

export default style;
