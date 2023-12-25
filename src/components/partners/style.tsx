import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 'auto',
      position: 'relative',
      maxWidth: 'var(--pageMaxWidth)',
      padding: '0 3em',
    },
    smallRoot: {
      height: 'auto',
      position: 'relative',
      maxWidth: 'var(--pageMaxWidth)',
      padding: '0 1em',
    },

    rootWrapper: {
      position: 'relative',
      margin: `0 auto`,
      backgroundPosition: 'center',
    },
    content: {
      fontColor: '#293845',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    withLeftAndRightSpace: {
      maxWidth: '75vw',
      margin: '0 auto 6.25rem auto',
    },
    center: {
      placeContent: 'center',
      placeItems: 'center',
    },
    singleDash: {
      color: '#99c93c',
      height: '0.30rem',
      width: '5rem',
      margin: '1rem 0',
    },
    twoCols: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridColumnGap: '8rem',
      margin: '0 auto 6.25rem auto',
    },

    twoCol: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridColumnGap: '8rem',
      margin: '0 auto 3.25rem auto',
    },
    twoRows: {
      display: 'grid',
      gridDirection: 'row',
      gridRowGap: '2rem',
    },
    question: {
      color: '#99c93c',
      fontSize: '0.8rem',
      lineHeight: '1.7rem',
      fontWeight: 'bold',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
    founderGrid: {
      fontSize: '1.25rem',
      display: 'grid',
      gridGap: '1rem',
    },
  })
);