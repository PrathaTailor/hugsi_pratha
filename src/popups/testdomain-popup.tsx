import React, { useContext, useState } from 'react';
import { CityContext } from '../stores/city-context';
import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';

import {
  makeStyles,
  Theme,
  createStyles,
  createTheme,
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import {
  Twitter,
  Facebook,
  Pinterest,
  Linkedin,
  Whatsapp,
  Reddit,
} from 'react-social-sharing';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

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
const TestDomain: React.FC<Props> = ({ close, value }) => {
  const { headerContent, headerMsg, closeBtn, modal, content } = useStyles({});
  const cityStore = useContext(CityContext);
  const [email, setEmail] = useState('');
  const [show, SetShow] = useState(cityStore.user.testDomain ? false : true);
  const [showError, SetShowError] = useState(false);
  const linkValue = value ? value : window.location.href;

  const smallScreen = useMediaQuery('(max-width:600px)');
  const handleChange = input => {
    setEmail(input.target.value);
  };
  return (
    <>
      {show ? (
        <>
          <Box
            className={modal}
            style={{
              width: smallScreen ? '20rem' : '30rem',
              margin: smallScreen ? '0 0.5rem' : '0',
            }}
          >
            <Box className={headerContent}>
              <Box className={headerMsg}></Box>
              <Box className={closeBtn}>
                <a onClick={close}>&times;</a>
              </Box>
            </Box>
            <Typography
              variant="subtitle1"
              style={{ margin: '2rem 2rem 2rem 2rem' }}
            >
              Set a email alias to test municipality domain configuration
              <br />
              <br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Add email address to test"
                style={{
                  width: '100%',
                  position: 'relative',
                  fontSize: '2rem',
                  background: 'transparent',
                  font: 'inherit',
                  color: 'currentColor',
                  border: '1px solid #c9cdd0',
                }}
              />
              {showError && (
                <h6 style={{ color: 'red' }}>Please enter email to save</h6>
              )}
            </Typography>
            <Box
              style={{
                marginBottom: '1rem',
              }}
            >
              <Box
                style={{
                  color: '#99c93c',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',
                  marginRight: '7%',
                  justifyContent: 'end',
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    backgroundColor: '#99c93c',
                    width: '5rem',
                  }}
                  size={'large'}
                  onClick={e => {
                    e.preventDefault();
                    if (email === '') {
                      SetShowError(true);
                    } else {
                      const users = cityStore.user;
                      users.testDomain = email;
                      cityStore.loadUser(users);
                      SetShow(false);
                      SetShowError(false);
                    }
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          className={modal}
          style={{
            width: smallScreen ? '20rem' : '30rem',
            margin: smallScreen ? '0 0.5rem' : '0',
          }}
        >
          <Box className={headerContent}>
            <Box className={headerMsg}></Box>
            <Box className={closeBtn}>
              <a onClick={close}>&times;</a>
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            style={{ margin: '2rem 2rem 2rem 2rem' }}
          >
            The following email is set as an alias to test municipality domain
            configuration
            <br />
            <strong>{cityStore?.user?.testDomain}</strong>
          </Typography>

          <Box
            style={{
              marginBottom: '1rem',
            }}
          >
            <Box
              style={{
                color: '#99c93c',
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                marginRight: '7%',
                justifyContent: 'end',
              }}
            >
              <Button
                variant="contained"
                style={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: '#99c93c',
                }}
                size={'large'}
                onClick={e => {
                  e.preventDefault();
                  const users = cityStore.user;
                  users.testDomain = '';
                  cityStore.loadUser(users);
                  close();
                }}
              >
                Re-set alias
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TestDomain;
