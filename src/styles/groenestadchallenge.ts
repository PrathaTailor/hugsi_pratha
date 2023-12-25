import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 'var(--pageMaxWidth)',
    margin: '100px auto 6.25rem auto',
  },
  smallLayerSec: {
    margin: '1rem 2rem',
  },
  layerSec: {
    display: 'grid',
    gridGap: '10rem',
    gridTemplateColumns: '2fr 1fr',
    margin: '0rem 14rem 3rem',
  },
  smallBtnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});