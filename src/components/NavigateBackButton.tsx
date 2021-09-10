import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { IconBackTo } from './icons';
import { white } from '../theme/palette';
import { useGoBack } from 'hooks';
import { useCallback } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
            minWidth: 0,
            border: '1px solid #D9E7FF',
            boxShadow: 'none',
            backgroundColor: white,
            '&:hover': {
                boxShadow: 'none',
                backgroundColor: theme.palette.primary.light,
                border: '1px solid #D9E7FF',
                '& svg': {
                    fill: white,
                },
            },
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                boxShadow: '3px 3px 5px 0px #383C611A',
                border: '1px solid #D9E7FF',
                '& svg': {
                    fill: white,
                },
            },
            '&:hover:focus': {
                backgroundColor: theme.palette.primary.light,
                '& svg': {
                    fill: 'theme.palette.primary.main',
                },
            },
        },
        startIcon: {
            margin: theme.spacing(0),
        },
        disabled: {
            border: '1px solid ' + theme.palette.secondary.dark,
            '& svg': {
                fill: theme.palette.secondary.dark,
            },
        },
    })
);

type NavigateBackButtonProps = {
    fallbackRoute: string;
};

export const NavigateBackButton = (props: NavigateBackButtonProps) => {
    const classes = useStyles();

    const { fallbackRoute } = props;
    const goBack = useGoBack();
    const backTo = useCallback(() => {
        goBack(fallbackRoute);
    }, [goBack, fallbackRoute]);

    return (
        <Button
            className={classes.root}
            startIcon={<IconBackTo />}
            classes={{
                startIcon: classes.startIcon,
                disabled: classes.disabled,
            }}
            onClick={() => backTo()}
        ></Button>
    );
};
