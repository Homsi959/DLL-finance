import { Theme, WithStyles } from '@material-ui/core/styles';

export type GenericWithStyles<T extends WithStyles<any, any>> = Omit<T, 'theme' | 'classes'> & {
  classes?: T['classes'];
} & ('theme' extends keyof T ? { theme?: Theme } : {});
