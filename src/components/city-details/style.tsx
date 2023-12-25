
import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      width: '50rem',
      overflow: 'auto',
      // height: 'calc(100vh - 300px)',

      '&::-webkit-scrollbar': {
        display: 'none'
      },
    },
    smallRoot: {
      position: 'relative',
      width: '22rem',
    },
    shortDataAndSealedWrapper: {
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
    },
    shorterCityName: {
      width: '50vw',
      height: 'auto',
    },
    longerCityName: {
      width: 'auto',
    },
    enter: {
      textDecoration: 'underline',
      color: '#698d29',
      opacity: 0.7,
      fontWeight: 'bold',
    },
    leave: {
      textDecoration: 'none',
      color: '#698d29',
      opacity: 1,
      fontWeight: 'bold',
    },
    demographicGrid: {
      fontSize: '1.25rem',
      display: 'grid',
      gridTemplateColumns: '18rem 18rem',
      gridGap: '0.3rem',
      margin: '40px 0',

    },
    smallDemographicGrid: {
      fontSize: '0.5rem',
      gridTemplateColumns: '1fr 1.2fr',
      gridGap: '1rem',
    },
    mainAppBar: {
      background: 'transparent',
      boxShadow: 'none',
      textTransform: 'none',
      margin: '0rem 0rem 0rem 0rem',
      padding: '0rem',

    },
    mainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      textTransform: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#293845',
      backgroundColor: '#fff',
      height: '4rem',
      width: '100% !important',
      minWidth: '100px !important',
      maxWidth: '183px !important',
      ['@media (max-width:1600px)']: {
        maxWidth: '160px !important'
      }
    },
    smallMainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      backgroundImage:
        'linear-gradient(to left right, rgba(0, 0, 0, 0.1), transparent)',
      textTransform: 'none',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      color: '#293845',
      width: '7rem',
    },
    unselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '16px',
      height: '4rem !important',
      width: '100% !important',
      minWidth: '100px !important',
      maxWidth: '183px !important',
      ['@media (max-width:1600px)']: {
        maxWidth: '160px !important'
      }

    },
    smallUnselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '0.8rem',
      height: '4rem !important',
      width: '100% !important',
      maxWidth: '183px !important',
      backgroundImage:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
    rankingGrid: {
      fontSize: '1.25rem',
      display: 'grid',
      gridTemplateColumns: '13rem 14rem',
      gridGap: '0.3rem',
      margin: '1rem auto',
    },
    smallRankingGrid: {
      fontSize: '0.5rem',
      display: 'grid',
      gridTemplateColumns: '10rem 12rem',
      gridGap: '0.5rem',
      margin: '0.5rem auto',
    },
    grayBg: {
      width: '100%',
      padding: '2rem 4rem 0rem 4rem',
      zIndex: 1,
      position: 'relative',
      ['@media (max-width:1366px)']: {
        padding: '2rem 2rem 0rem 2rem',
      }
    },
    middleSection: {
      backgroundColor: '#fff',
      padding: '2rem 4rem 1rem 4rem',
      zIndex: 1,
      position: 'relative',
      height: 'calc(100vh - 285px)',
      overflow: 'auto',
      ['@media (max-width:1366px)']: {
        padding: '2rem',
      }
    },
    viewOptions: {
      display: 'flex',
      // width: '20%',
      color: '#C9CDD0',
      // margin: '1rem 0rem 0rem 22rem',
      fontSize: '2rem',
      cursor: 'pointer',
      letterSpacing: '1rem',
      // justifyContent: 'space-between',
    },
    selectedViewOption: {
      color: '#99C93C',
    },
    descriptionLayout: {
      color: '#293845',
      lineHeight: '27px',
      fontSize: '16px',
    },
    descriptionSummaryLayout: {
      color: '#293845',
      lineHeight: '27px',
      fontSize: '16px',
      fontWeight: 500,
      width: '70%',
      textAlign: 'justify',
      margin: '0rem',
    },
    insightsListWrapper: {
      listStyle: 'none',
      listStyleType: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginLeft: '-15px',
    },
    storiesText: {
      color: ' #293845',
      fontSize: '16px',
    },
    imageMain: {
      '&::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'rgba(153, 201, 60, 0.7)',
        width: '100%',
        height: '100%',
        zIndex: '9',
      },
    },
    insightLink: {
      display: 'block',
      position: 'relative',
    },
    smallDrawer: {
      backgroundColor: 'white',
      position: 'fixed',
      top: 'calc(90vh / 2.5)',
      // height: '190px',
      width: '13rem',
      right: 0,
      border: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px, 24px, 8px, 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      borderRadius: '8px 0px 0px 8px',
      zIndex: 999,
      textAlign: 'justify',
      boxShadow: '0.1rem 0.1rem 1rem 0.2rem #d3d3d3',
      transition: '0.5s all ease-in-out',
    },
    smallSubDrawer: {
      backgroundColor: 'rgb(153, 201, 60)',
      transition: '0.5s all ease-in-out',
      position: 'fixed',
      top: 'calc(90vh / 2.5)',
      // height: '190px',
      width: '13rem',
      right: -156,
      border: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px, 24px, 8px, 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      borderRadius: '8px 0px 0px 8px',
      zIndex: 999,
      textAlign: 'justify',
    },
  })
);
