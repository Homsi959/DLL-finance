import { colors } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';

export const white = '#FFFFFF';

enum KitColors {
  bgGray = '#F8F8FB',
  grey3 = '#D1D7E4',
  grey4 = '#BEC5D2',
  grey5 = '#383C611A',
  grey6 = '#E3E6F3',
  greyBlue1 = '#ABC3EB',
  greyBlue2 = '#95C0E8',
  dllBlue = '#0099FF',
  blue1 = '#0081D7',
  blue2 = '#56BCFF',
  blue3 = '#1973AF',
  lightBlue = '#E9F1FE',
  lightBlue2 = '#F2F7FC',
  lightBlue3 = '#F8F9FB',
  blueGrey = '#D9E7FF',
  textGrey1 = '#405063',
  textGrey2 = '#6B7888',
  textGrey3 = '#7E8794',
  attention = '#FFB822',
  darkAttention = '#F29100',
  green = '#1DC9B7',
  lightGreen = '#E5F1F0',
  chartBlue = '#95C0E8',
  chartPurple = '#FD397A',
  lightPurple = '#FFEBF1',
}

const KitColorsPalette = Object.fromEntries(
  Object.entries(KitColors).map(([key, value]) => [[key], { main: value }])
);

const style = createPalette({
  primary: {
    dark: KitColors.blue1,
    main: KitColors.dllBlue,
    light: KitColors.blue2,
  },
  secondary: {
    dark: KitColors.grey3,
    main: KitColors.textGrey1,
    light: KitColors.lightBlue2,
  },
  success: {
    main: KitColors.green,
  },
  info: {
    dark: colors.lightBlue[500],
    main: 'rgb(56 60 97 / 10%)',
    light: 'rgb(0 133 255 / 50%)',
    contrastText: '#aeaeae',
  },
  warning: {
    dark: KitColors.darkAttention,
    main: KitColors.attention,
  },
  error: {
    dark: colors.red[700],
    main: colors.red[500],
    light: colors.red[50],
  },
  text: {
    primary: KitColors.textGrey3,
    secondary: KitColors.grey4,
    disabled: '#aeaeae',
  },
  background: {
    default: colors.grey[50],
    paper: white,
  },
  divider: KitColors.textGrey2,
  grey: {
    100: KitColors.chartBlue,
  },
  ...KitColorsPalette,
});

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    bgGray: Palette['primary'];
    grey3: Palette['primary'];
    grey4: Palette['primary'];
    grey5: Palette['primary'];
    grey6: Palette['primary'];
    greyBlue1: Palette['primary'];
    greyBlue2: Palette['primary'];
    dllBlue: Palette['primary'];
    blue1: Palette['primary'];
    blue2: Palette['primary'];
    blue3: Palette['primary'];
    lightBlue: Palette['primary'];
    lightBlue2: Palette['primary'];
    lightBlue3: Palette['primary'];
    blueGrey: Palette['primary'];
    textGrey1: Palette['primary'];
    textGrey2: Palette['primary'];
    textGrey3: Palette['primary'];
    attention: Palette['primary'];
    darkAttention: Palette['primary'];
    green: Palette['primary'];
    lightGreen: Palette['primary'];
    chartBlue: Palette['primary'];
    chartPurple: Palette['primary'];
    lightPurple: Palette['primary'];
  }
  interface PaletteOptions {
    bgGray: PaletteOptions['primary'];
    grey3: PaletteOptions['primary'];
    grey4: PaletteOptions['primary'];
    grey5: PaletteOptions['primary'];
    grey6: PaletteOptions['primary'];
    greyBlue1: PaletteOptions['primary'];
    greyBlue2: PaletteOptions['primary'];
    dllBlue: PaletteOptions['primary'];
    blue1: PaletteOptions['primary'];
    blue2: PaletteOptions['primary'];
    blue3: PaletteOptions['primary'];
    lightBlue: PaletteOptions['primary'];
    lightBlue2: PaletteOptions['primary'];
    lightBlue3: PaletteOptions['primary'];
    blueGrey: PaletteOptions['primary'];
    textGrey1: PaletteOptions['primary'];
    textGrey2: PaletteOptions['primary'];
    textGrey3: PaletteOptions['primary'];
    attention: PaletteOptions['primary'];
    darkAttention: PaletteOptions['primary'];
    green: PaletteOptions['primary'];
    lightGreen: PaletteOptions['primary'];
    chartBlue: PaletteOptions['primary'];
    chartPurple: PaletteOptions['primary'];
    lightPurple: PaletteOptions['primary'];
  }
}

export default style;
