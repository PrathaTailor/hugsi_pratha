import { makeStyles } from '@material-ui/core';
// @ts-ignore
import articleImg1 from '../../images/HUGSI_Greenness_does_not_come_by_itself.png';
// @ts-ignore
import articleImg2 from '../../images/HUGSI_Is_the_world_getting_greener.png';
// @ts-ignore
import articleImg3 from '../../images/Green_KPI.png';

export const useStyles = makeStyles({
  boxWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
    gridGap: '2rem',
    justifyItems: 'center',
    alignItems: 'end',
  },
  boxWrappers: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
    gridGap: '2rem',
    justifyItems: 'center',
    alignItems: 'end',
  },
  box1: {
    backgroundImage: `url('${articleImg1}')`,
    backgroundSize: 'cover',
    margin: `0 auto`,
    height: '20rem',
    width: '100%',
    textTransform: 'none',
    border: '0.1px solid #99c93c',
  },
  box2: {
    backgroundImage: `url('${articleImg2}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: `0 auto`,
    height: '20rem',
    width: '100%',
    textTransform: 'none',
    border: '0.1px solid #99c93c',
  },
  box3: {
    backgroundImage: `url('${articleImg3}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: `0 auto`,
    height: '20rem',
    width: '100%',
    textTransform: 'none',
    border: '0.1px solid #99c93c',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    bottom: '0rem',
    fontWeight: 'bold',
    color: 'white',
    opacity: '0.6',
    backgroundColor: 'black',
  },
  title: {
    bottom: '2rem',
    fontWeight: 'bold',
    color: 'white',
    lineHeight: '1.5rem',
  },
  smallTitle: {
    marginTop: '8rem',
    fontWeight: 'bold',
    color: 'white',
    lineHeight: '1rem',
  },
});