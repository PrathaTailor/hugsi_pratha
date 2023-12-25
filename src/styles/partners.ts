
import { makeStyles, Theme, createStyles } from '@material-ui/core';
// @ts-ignore
import widget_1 from '../images/logo-nl-greenlabel-big.png';
// @ts-ignore
import widget_2 from '../images/partner-overstory-logo.png';
// @ts-ignore
import widget_3 from '../images/partner-planitgeo-logo.png';
// @ts-ignore
import LeavesBackground from '../images/leaves-background.png';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '100px auto',
      height: 'auto',
      maxWidth: 'var(--pageMaxWidth)',
      padding: '0 1em',
      position: 'relative',
    },
    rootWrapper: {
      position: 'relative',
      backgroundImage: `url('${LeavesBackground}')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      margin: `0 auto`,
    },
    twoCols: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridColumnGap: '4rem',
      maxWidth: '75vw',
      margin: '0 auto 6.25rem auto',
    },
    contentWrapper: {
      maxWidth: 'var(--pageMaxWidth)',
      padding: '0 1em',
      position: 'relative',
    },
    boxWrapper: {
      display: 'grid',
      gridTemplateColumns: '20rem 20rem 20rem',
      gridGap: '3rem',
    },
    smallBoxWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
      gridGap: '2rem',
      justifyItems: 'center',
      alignItems: 'end',
    },
    center: {
      placeContent: 'center',
      placeItems: 'center',
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
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      // margin: `0 auto`,
      height: '12rem',
      width: '20rem',
      textTransform: 'none',
      borderRadius: '0.5rem',
      // border: '0.1px solid #99c93c',
    },
    box3: {
      backgroundImage: `url('${widget_3}')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      // margin: `0 auto`,
      height: '12rem',
      width: '20rem',
      textTransform: 'none',
      borderRadius: '0.5rem',
      // border: '0.1px solid #99c93c',
    },
  })
);