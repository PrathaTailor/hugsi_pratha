import { makeStyles, Theme, createStyles, } from '@material-ui/core';
// @ts-ignore
import bannerBig from '../../images/banner-big.png';
// @ts-ignore
import bannerSmall from '../../images/banner-small.png';
// @ts-ignore
import winnerBannerBig from '../../images/winner-banner-big.png';
// @ts-ignore
import winnerBannerSmall from '../../images/winner-banner-small.png';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    compareBtn: {

      color: '#698d29',
      textTransform: 'none',
      fontWeight: 'bold',
      backgroundColor: 'white',
      alignItems: 'center',
      alignContent: 'center',
    },
    root: {
      maxWidth: '100%',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundImage: `url('${bannerBig}')`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain'
    },
    smallRoot: {
      maxWidth: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundImage: `url('${bannerSmall}')`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    },
    box: {
      margin: '4rem auto 1rem',
      textAlign: 'center',
      color: '#293845',
      fontSize: '2.8rem',
      fontWeight: 'bold',
      maxWidth: '40rem',
      display: 'flex',
      flexDirection: 'column',
    },
    winnerBox: {
      margin: '4rem auto 4rem 13%',
      textAlign: 'center',
      color: '#293845',
      fontSize: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    smallBox: {
      margin: '4rem auto 1rem',
      fontSize: '1.5rem',
      textAlign: 'center',
      maxWidth: '20rem',
      fontWeight: 'bold',
      color: '#293845',
      display: 'flex',
      flexDirection: 'column',
    },
    winnersmallBox: {
      margin: '20px auto 1rem',

      textAlign: 'center',
      maxWidth: '20rem',
      fontWeight: 'bold',
      color: '#293845',
      display: 'flex',
      flexDirection: 'column',
    },
    winnerRoot: {
      margin: '0px 0 0',
      maxWidth: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundImage: `url('${winnerBannerBig}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    smallWinnerRoot: {
      margin: '0px auto 25px',
      maxWidth: '90%',
      height: 'auto',
      display: 'grid',
      gridTemplateColumns: '60% 40%',
      // flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundImage: `url('${winnerBannerSmall}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    btnCompare: {
      color: 'white',
      backgroundColor: '#99c93c',
      margin: '2rem 0',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '8px',
      width: '12rem',
    }
  })
);