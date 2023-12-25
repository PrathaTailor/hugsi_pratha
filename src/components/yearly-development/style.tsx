import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    mainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      textTransform: 'none',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#293845',
      backgroundColor: '#fff',
      height: '4rem',
    },
    smallMainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      backgroundImage:
        'linear-gradient(to left right, rgba(0, 0, 0, 0.1), transparent)',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#293845',
      width: '7rem',
    },
    unselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1.1rem',
      // width: '14.2rem',
      width: '11rem',
      // backgroundImage:
      //   'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
    smallUnselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1rem',
      width: '6rem',
      backgroundImage:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
    box: {
      display: 'flex',
      flexDirection: 'row',
    }
  })
);