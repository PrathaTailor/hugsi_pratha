import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    marginTop: '100px',
  },
  boxWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
    gridGap: '1rem',
    justifyItems: 'center',
    alignItems: 'end',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'flex-end',
    placeItems: 'center',

  },
});