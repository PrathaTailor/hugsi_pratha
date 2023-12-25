import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  smallRoot: {
    margin: '1rem 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediumRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'center',
    placeItems: 'center',
    margin: '1rem 0',
  },
});