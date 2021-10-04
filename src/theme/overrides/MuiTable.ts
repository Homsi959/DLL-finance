import { TableClassKey, StyleRules } from '@material-ui/core';
import palette from '../palette';
import { white } from 'theme/palette';

const style: Partial<StyleRules<TableClassKey>> = {
  root: {
    boxShadow: '0px 0px 20px 0px ' + palette.grey5.main,
    backgroundColor: white,
  },
};

export default style;
