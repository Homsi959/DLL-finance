import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 1200,
    lg: 1440,
    xl: 1920,
  },
};

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1201,
    drawer: 1100,
  },
  breakpoints,
});

export default theme;
export { default as palette } from './palette';
