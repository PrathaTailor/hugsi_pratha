import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 2em',
      backgroundColor: '#99c93c',
      height: 'auto',
      margin: '0 auto',
    },
    box: {
      height: 'auto',
      margin: '0 auto',
      maxWidth: '75vw',
      padding: '6em 0 6em 0',
      display: 'flex',
      flexDirection: 'column',
      placeContent: 'center',
      placeItems: 'center',
    },
    enter: {
      textDecoration: 'underline',
      color: '#fff',
      opacity: 0.7,
    },
    link: {
      float: 'right',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    leave: {
      textDecoration: 'underline',
      color: '#fff',
      opacity: 1,
    },
    rowGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 10fr 1fr',
      gridGap: '4rem',
      marginLeft: '10rem'
    },
    columnGrid: {
      display: 'flex',
      gridGap: '1rem',
    },
    mobileViewGrid: {
      display: 'grid',
      gridGap: '1rem',
      marginTop: '80px'
    },
    arrow: {
      marginLeft: '0.5em',
      fontWeight: 'bold',
      fontSize: '1.3rem',
      color: '#698d29',
    },
    btnTest: {
      color: '#698d29',
      textTransform: 'none',
      fontWeight: 'bold',
      backgroundColor: 'white',
      justifyContent: 'left',
      textDecoration: 'none',
      margin: '1rem 0 0 -0.75rem',
    },
    userInputField: {
      margin: '0 auto',
      height: 'auto',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
    },
    messageInputField: {
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      '& .Mui-focused': {
        backgroundColor: 'white',
      },
    },
  })
);