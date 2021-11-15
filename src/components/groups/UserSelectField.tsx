import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useTranslation } from 'react-i18next';
import { useUserSearchQuery } from './useUserSearchQuery';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { FieldRenderProps } from 'react-final-form';
import { palette } from 'theme';
import { IconCheckbox } from '../icons';
import { GroupUserViewModel } from 'schema/serverTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    valueList: {
      padding: theme.spacing(1.5, 1, 0, 0),
    },
    value: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
      cursor: 'pointer',
      '&:last-child': {
        marginBottom: 0,
      },
    },
    option: {
      marginTop: theme.spacing(-1),
      marginLeft: theme.spacing(-2),
      marginBottom: theme.spacing(-1),
    },
  })
);

type Props = FieldRenderProps<string, HTMLElement>;

const SearchableSelect = (props: any) => {
  const {
    options,
    multiple,
    disableCloseOnSelect = true,
    getOptionLabel,
    style = { width: '100%' },
    label = '',
    variant = 'outlined',
    size = 'small',
    placeholder = '',
    onChange,
    value,
    errorText,
    ...rest
  } = props;

  const classes = useStyles();
  const { users } = useUserSearchQuery('', []);
  const { t } = useTranslation();

  const onDelete = (name: string) => () => {
    const newValue = value.filter((v: GroupUserViewModel) => v.name !== name);
    onChange(null, newValue);
  };

  const handleOnChange = (_e: React.FormEvent<{}>, newValue: GroupUserViewModel) => {
    onChange(_e, newValue);
  };

  return (
    <>
      <Autocomplete
        {...rest}
        onChange={handleOnChange}
        multiple={true}
        options={users}
        noOptionsText={t('no results')}
        openText={t('Open')}
        closeText={t('Close')}
        disableCloseOnSelect={disableCloseOnSelect}
        getOptionLabel={(option: GroupUserViewModel) => option.name}
        popupIcon={<KeyboardArrowDownRoundedIcon color="primary" fontSize="default" />}
        style={style}
        size={size}
        value={value}
        getOptionSelected={(option: GroupUserViewModel, value: GroupUserViewModel) =>
          option.name === value.name
        }
        renderOption={(option: GroupUserViewModel, { selected }) => {
          return (
            <div key={option.id} className={classes.option}>
              <Checkbox
                icon={<IconCheckbox checked={false} />}
                checkedIcon={<IconCheckbox checked={true} />}
                checked={selected}
              />
              {option.name}
            </div>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!errorText}
            helperText={errorText}
            variant={variant}
            placeholder={placeholder}
          />
        )}
        renderTags={() => null}
      />
      {value.length > 0 ? (
        <div className={classes.valueList}>
          {value.map((v: GroupUserViewModel) => {
            return (
              <div onClick={onDelete(v.name)} className={classes.value} key={v.name}>
                <ClearIcon fontSize="small" display="inline" htmlColor={palette.grey4.main} />
                <Typography color="primary" display="inline" component="div">
                  {v.name}
                </Typography>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export const UserSelectField = ({ input, meta, ...rest }: Props) => (
  <SearchableSelect
    {...input}
    {...rest}
    onChange={(_e: React.FormEvent<{}>, value: GroupUserViewModel) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ''}
  />
);
