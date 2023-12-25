import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      backgroundColor: 'white',
      border: '0.1rem solid #99c93c',
      borderRadius: '0.5rem',
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'row-reverse',
      // margin: '2rem',
    },
    headerMsg: {
      width: '100%',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#293845',
    },
    closeBtn: {
      cursor: 'pointer',
      color: '#99c93c',
      lineHeight: '2rem',
      fontSize: '2rem',
      background: 'white',
      borderRadius: '0.5rem',
    },
  })
);
