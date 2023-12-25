import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
// @ts-ignore
import leafBackground from '../../images/leaf-background.png';
// @ts-ignore
import searchIndicator from '../../images/indicator-search.png';
import style from './loading-map.css';

const useStyles = makeStyles({
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    gap: '50px',
    // padding: '13rem 10rem',
    backgroundImage: `url('${leafBackground}')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

export interface ILoadingMap {
  message?: string;
}

/**
 * Loading Map component
 */

const LoadingMap: React.FC<ILoadingMap> = ({ message }) => {
  const styles = useStyles({});
  return (
    <div className={styles.style}>
      <img src={searchIndicator} className={style.loader} />
      {/* <Typography variant='h4'>Measuring Grass</Typography> */}
      <Typography variant="h4">{message}</Typography>
    </div>
  );
};

export default LoadingMap;
