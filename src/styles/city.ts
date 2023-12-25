import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      margin: '0 auto',
      top: 0,
      overflow: 'auto !important'
    },
    enter: {
      textDecoration: 'underline',
      color: '#698d29',
      opacity: 0.7,
      fontWeight: 'bold',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '4rem 8rem',
      gridGap: '0.5rem',
    },
    listDrawer: {
      overflow: 'auto !important',
      maxWidth: '60%',
    },
    toggleButton: {
      zIndex: 7,
      top: 'calc(90vh/2.5)',
      backgroundColor: 'white',
      color: 'primary',
      opacity: 1,
      minHeight: 100,
      width: '1rem',
      padding: 0,
      borderRadius: '1rem 0rem 0rem 1rem',
      left: 0,
      marginLeft: '-45px',
      position: 'relative',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },

    toggleButtonShift: {
      zIndex: 7,
      top: 'calc(90vh/2.5)',
      backgroundColor: 'white',
      color: 'primary',
      opacity: 1,
      minHeight: 100,
      width: '1rem',
      padding: 0,
      borderRight: '0',
      marginLeft: '-45px',
      borderRadius: '1rem 0rem 0rem 1rem',
      position: 'absolute',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    smallToggleButton: {
      zIndex: 10,
      backgroundColor: 'white',
      opacity: 1,
      height: 70,
      width: '1rem',
      minWidth: '2rem',
      padding: 0,
      bottom: '0',
      left: '43%',
      borderRadius: '1rem 0rem 0rem 1rem',
      position: 'absolute',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    smallToggleButtonShift: {
      zIndex: 7,
      backgroundColor: 'white',
      color: 'primary',
      opacity: 1,
      height: 70,
      width: '1rem',
      minWidth: '2rem',
      padding: 0,
      borderRight: '0',
      bottom: '71%',
      left: '43%',
      borderRadius: '1rem 0rem 0rem 1rem',
      position: 'absolute',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    ArrowBack: {},
    drawerPaper: {
      zIndex: 4,
      maxWidth: '60%',
      height: '90vh',
      // width: 'calc(100vw/1.75)',
      // marginTop: '6.2rem',
      // @ts-ignore
      // visibility: 'visible !important',
      // overflow: 'auto !important',
      display: '-webkit-inline-box',
    },
    smallDrawerPaper: {
      zIndex: 9,
      height: '75%',
      overflow: 'auto !important',
    },
    largeDiv: {
      width: '100%',
      // overflow: 'visible',
      transitionDuration: '1s !important',
      transform: 'translateX(0px) !important',
    },
    smallDiv: {
      // overflow: 'visible !important',
      width: '40%',
      transform: 'translateX(0px) !important',
      transitionDuration: '1s !important',
    },
    helpMainBox: {
      // height: '187px',
      width: '221px',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '20px 10px',
    },
    helpHeader: {
      // marginLeft:'20px'
      fontSize: '14px',
      fontWeight: 700,
      color: '#293845'
    },
    helpActiveCardCount: {
      // marginLeft:'20px'
      fontSize: '14px',
      fontWeight: 300,
      color: '#000',
      lineHeight: '16px'
    },
    helpContent: {
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '10px',
      fontSize: '14px',
      // textAlign: 'justify',
      fontWeight: 300,
      color: '#000',
      lineHeight: '22px'
    },
    helpFooter: {
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    helpFooterContent: {
      fontSize: '14px',
      fontWeight: 300,
      color: '#000',
      lineHeight: '16px',
      cursor: 'pointer'
    }
  })
);