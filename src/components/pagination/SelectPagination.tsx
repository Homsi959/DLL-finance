import { Select, MenuItem } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { white } from 'theme/palette';
import { IconSprite } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '50px',
      backgroundColor: white,
      marginRight: theme.spacing(1.5),
      position: 'relative',
      '&:before': {
        display: 'none',
      },
      '&:after': {
        display: 'none',
      },
      '& .MuiSelect-root': {
        color: theme.palette.blue3.main,
        paddingLeft: theme.spacing(0.9),
      },
      '& .MuiSelect-select.MuiSelect-select': {
        paddingRight: 0,
      },
    },
    paper: {
      borderRadius: 0,
      boxShadow: '0px 5px 10px 0px #383C611A',
      border: '1px solid #D1D7E4',
      maxHeight: 185,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      '& li': {
        color: theme.palette.secondary.main,
      },
      '& .MuiListItem-button:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
      '& .MuiListItem-button.Mui-selected': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    icon: {
      position: 'absolute',
      right: '7px',
      pointerEvents: 'none',
    },
  })
);

export const SelectPagination = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [value, setValue] = useState<number>(20);
  const num = searchParams.get('pageSize') ?? value;

  const handleChange = useCallback(
    (e) => {
      history.push(`${location.pathname}?pageSize=${e.target.value}`);
      setValue(e.target.value);
    },
    [history, location.pathname]
  );

  return (
    <Select
      value={num}
      onChange={handleChange}
      className={classes.root}
      IconComponent={() => <IconSprite className={classes.icon} icon="dropdown" width="8px" />}
      MenuProps={{
        classes: {
          paper: classes?.paper,
          list: classes?.list,
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
    >
      <MenuItem value={20}> 20 </MenuItem>
      <MenuItem value={50}> 50 </MenuItem>
      <MenuItem value={100}> 100 </MenuItem>
    </Select>
  );
};
