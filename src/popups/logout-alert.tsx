import React, { useContext } from 'react';
import { CityContext } from '../stores/city-context';
import { Box, Typography, Button, useMediaQuery } from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
  createTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContent: {
      display: 'flex',
      flexDirection: 'row',
      margin: '2rem',
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
    modal: {
      backgroundColor: 'white',
      border: '0.1rem solid #99c93c',
      borderRadius: '0.5rem',
    },
    content: {
      margin: '2rem',
    },
  })
);

interface Props {
  close?: any;
  value?: string;
}

const LogoutAlert: React.FC<Props> = ({ close, value }) => {
  const { headerContent, headerMsg, closeBtn, modal, content } = useStyles({});
  const cityStore = useContext(CityContext);
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      className={modal}
      style={{
        width: smallScreen ? '20rem' : '50rem',
        margin: smallScreen ? '0 0.5rem' : '0',
      }}
    >
      <Box className={headerContent}>
        <Box className={headerMsg}>Log out</Box>
        <Box className={closeBtn}>
          <a onClick={close}>&times;</a>
        </Box>
      </Box>
      <Typography variant="subtitle1" style={{ margin: '0rem 2rem 2rem' }}>
        Do you really want to log out of HUGSI? You may miss the opportunity to
        view potential data...
      </Typography>

      <Box
        style={{
          padding: smallScreen ? '0 1rem' : '0rem 1.5rem',
          marginBottom: '1rem',
        }}
      >
        <Box
          style={{
            color: '#99c93c',
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            style={{
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '1rem',
              backgroundColor: '#99c93c',
              width: '5rem',
            }}
            size={'large'}
            onClick={e => {
              e.preventDefault();
              localStorage.removeItem('access_token');
              localStorage.removeItem('loginCode');
              cityStore.loadUser({});
              close();
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            style={{
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '1rem',
              backgroundColor: '#99c93c',
              width: '5rem',
            }}
            size={'large'}
            onClick={e => {
              e.preventDefault();
              close();
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogoutAlert;
