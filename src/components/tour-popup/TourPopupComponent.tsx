import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import {
  Button,
  Drawer,
  Box,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import {
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
  Close,
  PartyModeSharp,
} from '@material-ui/icons';

import { useStyles } from './popup-style';
// @ts-ignore
import helpImage from '../../images/Help.png';


const TourPopupComponent = ({ onClose }: any) => {
  const {
    closeBtn
  } = useStyles({});
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Popup
      open={open}
      onClose={handleClose}
      // closeOnDocumentClick={false}
      position="top center"
      modal
    >
      <Box
        // className={modal}
        style={{
          width: '556px',
          height: '158px',
          backgroundColor: '#FFFFFF',
          padding: '30px'
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <div
            style={{
              marginRight: '50px',
              width: '80px',
              height: '80px',
            }}
          >
            <img src={helpImage} />

          </div>
          <div style={{ width: '330px', height: '54px' }}>
            <div style={{ display: 'flex' }}>
              <p style={{ marginRight: '20px' }}>
                To enhance your overall experience and platform usability,
                let us take you on a brief tour to use Hugsi efficiently.
              </p>
              <Box className={closeBtn}>
                <Close onClick={handleClose} />
              </Box>
            </div>
            <div>
              <Button
                variant="text"
                style={{
                  color: '#698D29',
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
                size={'large'}
                onClick={onClose}
              >
                Start the guide &nbsp;
                <ArrowForward />
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Popup>
  );
};

export default TourPopupComponent;
