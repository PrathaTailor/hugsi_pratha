import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    insightsContent: {
      display: 'flex',
      flexDirection: 'row',
      margin: '100px auto 2rem',
      maxWidth: '1200px',
      justifyContent: 'center',
    },
    insightLink: {
      display: 'block',
      position: 'relative',
    },
    latestContent: {
      flexDirection: 'row',
      margin: '2rem auto',
      maxWidth: '1200px',
      justifyContent: 'center',
    },
    smallInsightsContent: {
      display: 'grid',
      flexDirection: 'row',
      margin: '120px 20px 0px',
    },
    storiesText: {
      color: ' #293845',
      fontSize: '16px',
    },
    smallBanner: {
      display: 'flex',
      flexDirection: 'column',
    },
    banner: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '8rem',
      marginBottom: '5rem',
    },
    insightsListWrapper: {
      listStyle: 'none',
      listStyleType: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      // marginLeft: '-15px',
    },
    insightsDivListWrapper: {
      listStyle: 'none',
      listStyleType: 'none',
      padding: 0,
      display: 'grid',
      flexWrap: 'wrap',
      // width: 'max-content',
      // justifyContent: 'flex-start',
    },
    contentSection: {},
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
  })
);