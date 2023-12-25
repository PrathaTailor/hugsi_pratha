import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '4rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridColumnGap: '4em',
      gridRowGap: '2em',
      marginBottom: '3rem',
      color: '#424242',
    },
    smallRoot: {
      marginTop: '6rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridColumnGap: '4em',
      gridRowGap: '2em',
      marginBottom: '3rem',
      color: '#424242',
    },
  })
);
