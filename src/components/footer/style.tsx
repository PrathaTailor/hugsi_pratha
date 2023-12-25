import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme =>
  createStyles({
    footerWrapper: {
      background: '#201e1e',
      padding: '20px',
      width: '100%',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 4,
    },
    footer: {
      width: '100%',
      maxWidth: 'var(--pageMaxWidth)',
      display: 'grid',
      gridTemplateColumns: '0.5fr 1fr 0.5fr',
      justifyItems: 'center',
      alignItems: 'center',
    },
    smallFooter: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#201e1e',
      color: 'white',
      padding: '3rem',
    },
    logo: {
      width: '10rem',
    },
    footerLink: {
      textDecoration: 'none',
      color: 'white',
      margin: '0.5rem 0',
      fontWeight: 'bold',
    },
  })
);
