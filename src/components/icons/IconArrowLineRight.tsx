import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

export const IconArrowLineRight = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.root}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
    >
      <path
        d="M11.8561 4.34261C11.9496 4.24837 12 4.12152 12 3.99829C12 3.87505 11.9532 3.7482 11.8561 3.65396L8.76882 0.54417C8.57811 0.352073 8.27226 0.352073 8.08156 0.54417C7.89086 0.736267 7.89086 1.04435 8.08156 1.23644L10.3412 3.50898L0.485757 3.50898C0.215892 3.50898 0 3.72645 0 3.99829C0 4.27012 0.215892 4.48759 0.485757 4.48759H10.3412L8.08156 6.76375C7.89086 6.95585 7.89086 7.26393 8.08156 7.45603C8.27226 7.64812 8.57811 7.64812 8.76882 7.45603L11.8561 4.34261Z"
        fill="#6B7888"
      />
    </svg>
  );
};
