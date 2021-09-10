import { ButtonClassKey, StyleRules } from '@material-ui/core';
import palette, { white } from '../palette';

type MuiButtonStyles = Partial<StyleRules<ButtonClassKey>>;

const style: MuiButtonStyles = {
  root: {
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'none',
  },
  contained: {
    borderRadius: '5px',
    padding: '4px 20px',
    border: 'none',
    boxShadow: `0 5px 10px 0  ${palette.info.light}`,
    whiteSpace: 'nowrap',
    '&.MuiButton-containedPrimary:hover': {
      backgroundColor: palette.primary.light,
      boxShadow: 'none',
      opacity: 0.8,
    },
    '&:focus': {
      backgroundColor: palette.primary.dark,
    },
    '&.Mui-disabled': {
      backgroundColor: palette.secondary.dark,
      color: white,
    }
  },
  outlined: {
    padding: '3px 20px',
    boxShadow: '3px 3px 5px 0px #383C611A',
    '&.MuiButton-outlinedPrimary': {
      border: '1px solid' + palette.secondary.dark,
    },
    '&:hover': {
      boxShadow: 'none',
      '&.MuiButton-outlinedPrimary': {
        backgroundColor: palette.secondary.light,
      }
    },
    '&.Mui-disabled': {
      boxShadow: 'none'
    }
  },
  text: {
    padding: 0,
    fontWeight: 400,
    lineHeight: 1.1,
    textDecoration: 'underline',
    '&:hover': {
      color: '#1973AF',
      backgroundColor: 'transparent',
    },
    '&:focus': {
      color: '#1973AF',
    },
  },
};

export default style;
