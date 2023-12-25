import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      maxWidth: 'var(--pageMaxWidth)',
      margin: `0 auto`,
      padding: '0rem',
      fontSize: '1rem',
      color: '#293845',
    },
  })
);