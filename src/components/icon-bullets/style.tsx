import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    item: {
      // display: 'grid',
      // width: 'max-content',
      // gridTemplateColumns: '1fr 4fr',
      display: 'flex',
    },
    smallItem: {
      display: 'grid',
      gridTemplateColumns: '0.5fr 3fr',
    },
    title: {
      fontSize: '1.25em',
      color: '#868686',
      margin: '0.25rem',
      maxWidth: '14rem',
      fontWeight: 'normal'
    },
    smallTitle: {
      fontSize: '1em',
      color: '#868686',
      margin: '0.25rem',
      // maxWidth: '17.7rem',
      fontWeight: 'normal'
    },
    place: {
      margin: '0.25rem',
      marginTop: '0.5rem',
      fontSize: '1.4rem',
    },
    smallPlace: {
      margin: '0.25rem',
      marginTop: '0.5rem',
      fontSize: '1.1rem',
    },
  })
);

export const useStyle = makeStyles(() =>
  createStyles({
    root: {
      margin: '20px auto 0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridGap: '3rem',
    },
    smallRoot: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridGap: '1rem',
    },
    cityPageRoot: {
      // display: 'grid',
      gridTemplateColumns: '16rem 17rem',
      gridGap: '10px',
      width:'50% ',
    },
    favRoot: {
      display: 'flex',
    },
  })
);
