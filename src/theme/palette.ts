import { colors } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';

export const white = '#FFFFFF';

const style = createPalette({
  primary: {
    dark: '#0081D7',
    main: '#0099ff',
    light: '#56BCFF',
  },
  secondary: {
    dark: '#d1d7e4',
    main: '#405063',
    light: '#F2F7FC;',
  },
  success: {
    main: '#1DC9B7',
  },
  info: {
    dark: colors.lightBlue[500],
    main: 'rgb(56 60 97 / 10%)',
    light: 'rgb(0 133 255 / 50%)',
    contrastText: '#aeaeae',
  },
  warning: {
    dark: '#F29100',
    main: '#FFB822',
  },
  error: {
    dark: colors.red[700],
    main: colors.red[500],
    light: colors.red[50],
  },
  text: {
    primary: '#7E8794',
    secondary: '#BEC5D2',
    disabled: '#aeaeae',
  },
  background: {
    default: colors.grey[50],
    paper: white,
  },
  divider: '#6b7888',
  grey: {
    100: '#95C0E8'
  }
});

export default style;
