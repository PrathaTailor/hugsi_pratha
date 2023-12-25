import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'transparent',
      maxWidth: 'var(--pageMaxWidth)',
      margin: `0 auto`,
      padding: '0rem',
      fontSize: '1rem',
      color: '#293845',
      position: 'absolute',
      top: '2rem',
      left: '0px',
      zIndex: 9
    },
    hoverButton: {
      color: '293845',
      '&:hover': {
        backgroundColor: '#99C93C',
        color: '#fff',
        fontWeight: 'bold',

      },
    },
    compareBtn: {
      color: '#698d29',
      textTransform: 'none',
      fontWeight: 'bold',
      float: 'right',
      backgroundColor: 'white',
      alignItems: 'center',
      alignContent: 'center',
      textDecoration: 'none',
      margin: '0',
      zIndex: 10,
    },
    smallCompareBtn: {
      color: '#698d29',
      textTransform: 'none',
      fontWeight: 'bold',
      float: 'none',
      alignItems: 'center',
      alignContent: 'center',
      textDecoration: 'none',
      margin: '1rem 0',
      zIndex: 10,
    }
  })
);
