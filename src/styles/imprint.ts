import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'auto',
      backgroundColor: '#99c93c',
      width: '100%',
      color: '#fff',
    },
    message: {
      maxWidth: 'var(--pageMaxWidth)',
      margin: '0 auto',
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridGap: '1rem',
      placeContent: 'center',
      placeItems: 'center',
    },
    smallErrorMessage: {
      maxWidth: 'var(--pageMaxWidth)',
      margin: '0 auto',
      height: '100vh',
      display: 'flex',
      placeContent: 'center',
      placeItems: 'center',
    },
  })
);