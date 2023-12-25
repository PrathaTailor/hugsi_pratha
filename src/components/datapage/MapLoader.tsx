import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    drawerSPan: {
      position: 'absolute',
      left: 0,
      width: '50%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateY(-50%)'
    },
  })
);

const MapLoader = props => {
  const { drawerSPan } = useStyles({});
  const [currentState, setCurrentState] = useState(
    props.currentState ? props.currentState : 1
  );
  return (
    <>
      <div className={drawerSPan}>
        <CircularProgress size={100} color="primary" />
        <div >
        {currentState === 1 && (
          <Typography variant="h4" style={{ color: '#698d29' }}>
            Counting the number of trees in your city. Stay tuned!
          </Typography>
        )}
        {currentState === 2 && (
          <Typography variant="h4" style={{ color: '#698d29' }}>
            We are really going from grass to grass to fetch amazing insights.
          </Typography>
        )}
        {currentState === 3 && (
          <Typography variant="h4" style={{ color: '#698d29' }}>
            Gathering the geographic and demographic data.
          </Typography>
        )}
      </div>
      </div>
     
    </>
  );
};

export default MapLoader;
