import { makeStyles } from '@material-ui/core';
// @ts-ignore
import widget_1 from '../../images/logo-nl-greenlabel-big.png';
// @ts-ignore
import widget_2 from '../../images/logo-overstory-big.png';
export const useStyles = makeStyles({
  contentWrapper: {
    maxWidth: 'var(--pageMaxWidth)',
    padding: '0 1em',
    position: 'relative',
  },
  boxWrapper: {
    display: 'grid',
    gridTemplateColumns: '20rem 20rem',
    gridGap: '2rem',
    margin: 'auto 2rem',
  },
  smallBoxWrapper: {
    display: 'grid',
    gridGap: '2rem',
    justifyItems: 'center',
    alignItems: 'end',
    margin: 'auto 1rem',
  },
  box1: {
    backgroundImage: `url('${widget_1}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: `0 auto`,
    height: '12rem',
    width: '20rem',
    textTransform: 'none',
    border: '0.1px solid #99c93c',
    borderRadius: '0.5rem',
  },
  box2: {
    backgroundImage: `url('${widget_2}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: `0 auto`,
    height: '12rem',
    width: '20rem',
    textTransform: 'none',
    borderRadius: '0.5rem',
  },
});