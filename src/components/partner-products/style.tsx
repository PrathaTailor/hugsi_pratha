import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  contentWrapper: {
    maxWidth: 'var(--pageMaxWidth)',
    padding: '0 1em',
    position: 'relative',
  },
  boxWrapper: {
    display: 'grid',
    gridTemplateColumns: '20rem 20rem 20rem',
    gridGap: '2rem',
    margin: 'auto 2rem',
  },
  smallBoxWrapper: {
    display: 'grid',
    gridGap: '2rem',
    justifyItems: 'center',
    alignItems: 'end',
    margin: 'auto 2rem',
  },
  box: {
    width: '4rem',
    height: '4rem',
    background: '#99c93c',
    borderRadius: '2rem',
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
    color: 'white',
    fontSize: '1.2rem',
    margin: 'auto 0rem',
  }
});
