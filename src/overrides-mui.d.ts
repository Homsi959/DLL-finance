import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type PickersOverrides = Omit<MuiPickersOverrides, 'MuiPickersYearSelectionStyles'> & {
  MuiPickersYearSelection: MuiPickersOverrides['MuiPickersYearSelectionStyles'];
};

type overridesNameToClassKey = {
  [P in keyof PickersOverrides]: keyof PickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}
