import TextField from '@material-ui/core/TextField';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import React, { useCallback } from 'react';
import { TextFieldProps } from './types';
import { palette } from 'theme';
import { IconArrowLight } from 'components/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiInputBase-root': {
        paddingRight: '0 !important'
      }
    },
  })
);


export const useAutocompleteTextField = (props: TextFieldProps) => {
  const classes = useStyles();
  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams): React.ReactNode => {
      return <TextField
        {...params}
        {...props}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              <IconArrowLight colors={{ fill: palette.primary.main }} />
            </React.Fragment>
          ),
        }}
        className={classes.root}
      />;
    },
    [props, classes.root]
  );

  return { renderInput };
};
