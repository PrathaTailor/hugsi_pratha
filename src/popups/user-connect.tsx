import React, { useState } from 'react';
import css from './feedback-styles.css';
import { Button, TextField, Box, Typography, Checkbox } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSiteMetadata } from 'hooks';
import {
  makeStyles,
  Theme,
  createStyles,
  createTheme,
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import addSubscriber from '../api/addSubscriber';
import storeUserInputs from '../api/storeUserInputs';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
// @ts-ignore
import pdf_2021 from '../assets/files/hugsi_space_index_2021_report.pdf';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      fontSize: '1rem',
      backgroundColor: 'white',
      border: '0.1rem solid #99c93c',
      borderRadius: '0.5rem',
      overflow: 'scroll',
    },
    smallHeader: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    subscriptionSuccessHeader: {
      width: '100%',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '2rem',
      color: '#99c93c',
    },
    headerMsg: {
      width: '100%',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#293845',
    },
    messageInputField: {
      margin: '0 auto',
      backgroundColor: 'white',
      width: '19.5rem',
      '& .Mui-focused': {
        backgroundColor: 'white',
      },
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'row',
      margin: '2rem',
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      margin: '2rem',
    },
    closeBtn: {
      cursor: 'pointer',
      color: '#99c93c',
      lineHeight: '2rem',
      fontSize: '2rem',
      background: 'white',
      borderRadius: '0.5rem',
    },
    feedbackMsg: {
      color: 'white',
      borderColor: '#99c93c',
      width: '100%',
      margin: '1rem 0rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      '& .Mui-focused': {
        backgroundColor: 'white',
      },
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#99c93c',
      },
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#99c93c',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#99c93c',
      },
    },
    emailField: {
      margin: '1rem 0rem',
      width: '100%',
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#99c93c',
      },
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#99c93c',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#99c93c',
      },
    },
    btnFooter: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '0.5rem',
    },
    formSubmitErrorMsg: {
      color: 'red',
    },
  })
);

const theme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiFilledInput: {
      // Name of the rule
      root: {
        // Some CSS
        backgroundColor: 'none',
        '&:focus': {
          backgroundColor: 'white',
        },
        '&:hover': {
          backgroundColor: 'white',
        },
      },
      underline: {
        borderBottom: 'none',
        height: '0rem',
        '&:before': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
        '&:after': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
        '&:hover:before': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
        '&:hover:after': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
      },
    },
  },
});

const StyledRating = withStyles({
  iconFilled: {
    color: '#99c93c',
  },
  iconHover: {
    color: '#99c93c',
  },
})(Rating);

interface Props {
  close?: any;
  mode: string;
  quickLinkClick?: (type: string) => void;
}

const getRatingDescription = (value: number) => {
  switch (value) {
    case 1:
      return 'I don’t like it';
    case 2:
      return 'It’s ok';
    case 3:
      return 'Really good';
    case 4:
      return 'Awesome work';
    case 5:
      return 'I love it!';
    default:
      return '';
  }
};
const validateEmail = (userEmailAddress: string) => {
  const regexExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexExpEmail.test(userEmailAddress);
};

const UserConnect: React.FC<Props> = ({
  close,
  mode,
  quickLinkClick,
  // setSubscriptionStatus,
}) => {
  const [value, setValue] = useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubscribed, setSubscribed] = useState(false);
  const [userEmailAddress, setUserEmailAddress] = useState<string>('');
  const [checked, setChecked] = React.useState(false);
  const [emailFieldError, setEmailFieldError] = useState('');
  const [checkBoxError, setCheckBoxError] = useState<boolean>(false);
  const smallScreen = useMediaQuery('(max-width:600px)');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const {
    headerMsg,
    headerContent,
    modalContent,
    closeBtn,
    feedbackMsg,
    emailField,
    modal,
  } = useStyles({});
  const { apiKey, userInputsEndpoint } = useSiteMetadata();
  const addUser = (e, status) => {
    storeUserInputs(userInputsEndpoint, apiKey, 'subscription', {
      emailAddress: userEmailAddress,
      isSubscribed: true,
    });
    addSubscriber(userInputsEndpoint, apiKey, userEmailAddress);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={modal}
        style={{
          width: smallScreen ? '20rem' : '40rem',
          overflowY: 'scroll',
        }}
      >
        <Box className={headerContent}>
          <Box className={headerMsg}>
            {isSubscribed ? (
              <Box
                className={smallScreen ? 'smallHeader' : 'header'}
                style={{ color: '#99c93c' }}
              >
                Thank you and welcome aboard!
              </Box>
            ) : (
              <Box>
                <Box className={smallScreen ? 'smallHeader' : 'header'}>
                  {(mode === 'subscribe' || mode === 'download') &&
                    'To access this, you need to share your email with HUGSI'}
                  {mode === 'feedback' &&
                    (isSubmitted
                      ? 'Thank you for your feedback!'
                      : 'How do you like HUGSI?')}
                </Box>
              </Box>
            )}
          </Box>

          <Box className={closeBtn}>
            <a onClick={close}>&times;</a>
          </Box>
        </Box>

        <Box className={modalContent}>
          {!isSubscribed &&
            (isSubmitted || mode === 'subscribe' || mode === 'download') ? (
            <Box style={{}}>
              {mode === 'download' ? (
                <Typography style={{ fontWeight: 'bold' }}>
                  By doing so, you’ll...
                  <Typography style={{ fontWeight: 'normal' }}>
                    <i
                      className="fas fa-leaf"
                      style={{ color: '#99c93c', margin: '1rem 1rem 0 0' }}
                    ></i>
                    Gain access to the HUGSI Reports
                    <br></br>
                    <i
                      className="fas fa-leaf"
                      style={{ color: '#99c93c', margin: '1rem 1rem 1rem 0' }}
                    ></i>
                    Receive our monthly newsletter, Greener Stories
                    <br></br>
                    <i
                      className="fas fa-leaf"
                      style={{ color: '#99c93c', margin: '0 1rem 1rem 0' }}
                    ></i>
                    Firsthand access to new coming features and events
                  </Typography>
                </Typography>
              ) : (
                <Typography>
                  Would you like to subscribe to our newsletter, for updates and
                  articles?
                </Typography>
              )}
              {emailFieldError === 'empty' && (
                <Box style={{ color: 'red' }}>
                  Please enter your email address
                </Box>
              )}

              {emailFieldError === 'invalid' && (
                <Box style={{ color: 'red' }}>
                  Please enter a valid email address
                </Box>
              )}

              <TextField
                id="outlined-multiline-static"
                label="Your email*"
                InputLabelProps={{
                  style: {
                    color: '#698d29',
                  },
                }}
                variant="outlined"
                classes={{
                  root: emailField,
                }}
                onChange={event => {
                  setUserEmailAddress(event.target.value);
                }}
                onKeyPress={event => {
                  if (
                    event.key === 'Enter' &&
                    validateEmail(userEmailAddress) &&
                    checked
                  ) {
                    addUser(event, true);

                    setSubscribed(true);
                  }
                }}
                value={userEmailAddress}
              />

              {checkBoxError && (
                <Box style={{ color: 'red' }}>
                  Please select the below checkbox
                </Box>
              )}
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  size={smallScreen ? 'small' : 'medium'}
                  style={{
                    color: '#689d29',
                    alignItems: 'flex-start',
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Typography style={{ fontSize: '0.75rem' }}>
                  You understand that when you click on submit, Husqvarna AB
                  (publ.) and its affiliate companies will use your personal
                  data to respond to you. If you indicate that you want to
                  receive our newsletter, we will also use your personal data to
                  send you such newsletters. We will always use your personal
                  data in accordance with our
                  {
                    <a
                      href={
                        'https://privacyportal.husqvarnagroup.com/uk/privacy-notice/'
                      }
                      target="_blank"
                      style={{
                        color: '#698d29',
                        fontWeight: 'bold',
                      }}
                    >
                      {` Privacy Notice`}
                    </a>
                  }
                  . You will find more information about how we process your
                  data, who we may share it with, what rights you have and
                  further contact details to us in the Privacy Notice. You can
                  withdraw your consent to our newsletter at any time by
                  clicking the unsubscribe button in any communication you
                  receive from us or by contacting us as set out in the Privacy
                  Notice.
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    color: '#99c93c',
                    textTransform: 'none',
                    borderRadius: '8px',
                    borderColor: '#99c93c',
                    backgroundColor: 'white',
                  }}
                  size={'large'}
                  onClick={close}
                >
                  Not now
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#99c93c',
                  }}
                  size={'large'}
                  onClick={e => {
                    if (validateEmail(userEmailAddress) && checked) {
                      addUser(e, true);
                      setSubscribed(true);
                      setEmailFieldError('');
                      setCheckBoxError(false);
                      typeof window !== 'undefined' &&
                        localStorage.setItem('isUserSubscribed', 'Yes');
                    } else {
                      if (!userEmailAddress) {
                        setEmailFieldError('empty');
                      } else if (!validateEmail(userEmailAddress)) {
                        setEmailFieldError('invalid');
                      } else {
                        setEmailFieldError('');
                      }
                      if (!checked) {
                        setCheckBoxError(true);
                      } else {
                        setCheckBoxError(false);
                      }
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          ) : (
            <Box style={{}}>
              {isSubscribed ? (
                <Box
                  style={{
                    textAlign: 'center',
                    fontSize: mode === 'download' ? '1rem' : '1.2rem',
                    color: mode === 'download' ? 'black' : '#99c93c',
                    fontWeight: mode === 'download' ? 'normal' : 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  {mode === 'download' ? (
                    <Box>
                      <Typography style={{ fontWeight: 'normal' }}>
                        You can now access and download the HUGSI reports, watch
                        event and webinar recordings — All available via the
                        'How it works page' here on HUGSI.
                      </Typography>

                      <Box
                        style={{
                          fontWeight: 'bold',
                          margin: '3rem 0rem 1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'start',
                        }}
                      >
                        Quick links
                        <br></br>
                        <Typography
                          style={{
                            color: '#99c93c',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            margin: '1rem 0',
                          }}
                          onClick={() => {
                            // quickLinkClick('2021PDF')
                            window.open(pdf_2021);
                          }}
                        >
                          <i
                            className="fas fa-leaf"
                            style={{
                              marginRight: '1rem',
                            }}
                          ></i>
                          <span style={{}}>
                            Download the HUGSI 2021 report (pdf)
                          </span>
                        </Typography>
                        <Typography
                          style={{
                            color: '#99c93c',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                          }}
                          onClick={() => quickLinkClick('webinar')}
                        >
                          <i
                            className="fas fa-leaf"
                            style={{
                              color: '#99c93c',
                              marginRight: '1rem',
                            }}
                          ></i>
                          <span style={{ color: '#99c93c' }}>
                            Watch webinar recordings
                          </span>
                        </Typography>
                        <br></br>
                      </Box>
                    </Box>
                  ) : (
                    'You’re now subscribed to our newsletter. Awesome!'
                  )}
                </Box>
              ) : (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {'Help us improve and take a second or two to rate us.'}
                  <Box>
                    <Box style={{ margin: '1rem auto' }}>
                      <StyledRating
                        name="customized-color"
                        getLabelText={value =>
                          `${value} Heart${value !== 1 ? 's' : ''}`
                        }
                        precision={1}
                        icon={<i className="fas fa-leaf"></i>}
                        value={value}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            setValue(newValue);
                          }
                        }}
                      />

                      {value > 0 && (
                        <Box
                          style={{
                            padding: '0.5rem 0rem',
                            color: '#99c93c',
                            textAlign: 'center',
                          }}
                        >
                          {getRatingDescription(value)}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
              <Box>
                {!!value && !isSubscribed && (
                  <Box>
                    <Typography variant="subtitle1">
                      Any comments or feedback?
                    </Typography>

                    <TextField
                      id="outlined-multiline-static"
                      label="Optional"
                      multiline
                      rows={4}
                      defaultValue="Default Value"
                      variant="outlined"
                      classes={{
                        root: feedbackMsg,
                      }}
                      InputLabelProps={{
                        style: {
                          color: '#698d29',
                        },
                      }}
                      onChange={event => {
                        setFeedbackMessage(event.target.value);
                      }}
                      value={feedbackMessage}
                    />
                  </Box>
                )}
              </Box>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  variant="outlined"
                  className={'notSubscribedButton'}
                  style={{
                    color: '#99c93c',
                    textTransform: 'none',
                    borderRadius: '8px',
                    borderColor: '#99c93c',
                    backgroundColor: 'white',
                  }}
                  size={'large'}
                  onClick={close}
                >
                  Close
                </Button>
                {!!value && !isSubscribed && (
                  <Button
                    variant="outlined"
                    style={{
                      color: 'white',
                      textTransform: 'none',
                      borderRadius: '8px',
                      backgroundColor: '#99c93c',
                    }}
                    size={'large'}
                    onClick={e => {
                      storeUserInputs(
                        userInputsEndpoint,
                        apiKey,
                        'user-rating',
                        {
                          value,
                          feedbackMessage,
                        }
                      );
                      setSubmitted(true);
                    }}
                  >
                    Send
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserConnect;
