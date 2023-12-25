import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      maxWidth: 'var(--pageMaxWidth)',
      margin: `0 auto`,
      padding: '0rem',
      fontSize: '1rem',
      color: '#293845',
    },
    drawerSPan: {
      position: 'fixed',
      bottom: '20rem',
      left: '0px',
      zIndex: 999,
      backgroundColor: ' #fff',
      padding: '15px',
      marginLeft: '2.6rem',
      fontSize: '0.9rem',
      borderRadius: '10px',
      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.05), 0px 2px 16px rgba(0, 0, 0, 0.12)'
    },
    menuItemStyle: {
      paddingLeft: '16px',
      paddingRight: '16px',
      height: '120px',
      width: '120px',
      backgroundColor: ' #fff',
      margin: '10px',
      justifyContent: 'center',
      borderRadius: '16px',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '24px',
      flexWrap: 'wrap',
    },
    listItem: {
      display: 'flex',
      gap: '16px'
    }
  })
);
