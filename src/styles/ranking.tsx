import { makeStyles, createStyles } from '@material-ui/core';
import { smallScreen } from 'components/interaction-blocker/interaction-blocker.css';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      margin: '0 auto',
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
      // overflow: 'auto !important',
      '& .MuiDrawer-paper': {
        maxWidth: '60%',
      },
    },
    toggleButton: {
      zIndex: 7,
      top: 'calc(100vh / 3)',
      backgroundColor: 'white',
      color: 'primary',
      opacity: 1,
      minHeight: 100,
      width: '32px',
      padding: 0,
      borderRadius: '1rem 0rem 0rem 1rem',
      // right: 0,
      marginLeft: '-45px',
      position: 'relative',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    // toggleButtonShift: {
    //   zIndex: 999,
    //   top: 'calc(100vh / 3)',
    //   backgroundColor: 'white',
    //   color: 'primary',
    //   opacity: 1,
    //   minHeight: 100,
    //   width: '1rem',
    //   padding: 0,
    //   borderRight: '0',
    //   marginLeft: '-45px',
    //   borderRadius: '1rem 0rem 0rem 1rem',
    //   position: 'relative',
    //   '&:hover': {
    //     backgroundColor: 'white',
    //     opacity: 1,
    //     color: 'secondary',
    //   },
    // },
    smallToggleButton: {
      zIndex: 10,
      backgroundColor: 'white',
      opacity: 1,
      height: 70,
      width: '1rem',
      minWidth: '2rem',
      padding: 0,
      // bottom: '0',
      top:'-51px',
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
      bottom: '97%',
      left: '43%',
      borderRadius: '1rem 0rem 0rem 1rem',
      position: 'absolute',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    ArrowBack: {

    },
    drawerPaper: {
      zIndex: 4,
      maxWidth:'60%',
      // maxWidth: '60%',
      height: '90vh',
      // width: 'calc(100vw/1.75)',
      // marginTop: '6.2rem',
      // @ts-ignore
      // visibility: 'visible !important',
      // overflow: 'auto !important',
      display: '-webkit-inline-box',
    },
    smallDrawerPaper: {
      // zIndex: 9,
      // height: '75%',
      // overflow: 'auto',
      maxWidth: '100%'
    },
    largeDiv: {
      width: '100%',
      transform: 'translateX(0px) !important',
      // overflow: 'visible',
      transitionDuration: '1s !important',
    },
    smallDiv: {
      // overflow: 'visible',
      width: '40%',
      transform: 'translateX(0px) !important',
      transitionDuration: '1s !important',
    },
    smallDataDiv: {
      width: '100%',
      transform: 'translateX(0px) !important',
      transitionDuration: '1s !important',

    },

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
      width: '11rem',
    },
    smallUnselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1rem',
      width: '6rem',
      backgroundImage:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
    helpMainBox: {
      // height: '150px',
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
    },
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
