import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from 'hooks';
import addSubscriber from '../../api/addSubscriber';
import storeUserInputs from '../../api/storeUserInputs';
import { Box, Typography, Button, TextField, useMediaQuery, Checkbox } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from './style';


/**
 * Mail connect component
 */
const MailConnect = props => {
  const {
    withLeftAndRightSpace,
    userInputField,
    messageInputField,
  } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:960px)');
  const city =
    typeof window !== 'undefined'
      ? decodeURI(window.location.search.slice(10))
      : '';
  const [isHover, setIsHover] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmailAddress, setUserEmailAddress] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>(city);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [isSubscribed, setSubscribed] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [checked, setChecked] = React.useState(false);
  const { apiKey, userInputsEndpoint } = useSiteMetadata();

  const [emailFieldError, setEmailFieldError] = useState('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const [checkBoxError, setCheckBoxError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const setInitialFormState = () => {
    setUserName('');
    setUserEmailAddress('');
    setCompanyName('');
    setUserMessage('');
  };
  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const handleOnMouseLeave = () => {
    setIsHover(false);
  };

  const addUser = (e, status: boolean) => {
    e.preventDefault();
    addSubscriber(userInputsEndpoint, apiKey, userEmailAddress, userName);
    storeUserInputs(userInputsEndpoint, apiKey, 'subscription', {
      emailAddress: userEmailAddress,
      isSubscribed: true,
    });
  };

  const addCityReq = (e, status: boolean) => {
    e.preventDefault();
    storeUserInputs(userInputsEndpoint, apiKey, 'request-city', {
      emailAddress: userEmailAddress,
      username: userName,
      cityToAdd: companyName,
      feedbackMessage: `${userMessage}`,
      isSubscribed: status,
    });
  };

  const validateEmail = (userEmailAddress: string) => {
    const regexExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexExpEmail.test(userEmailAddress);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ marginTop: '9rem' }}>
        {showForm && (
          <div
            style={{
              backgroundColor: 'white',
              height: 'auto',
              margin: '0 auto',
              zIndex: 4,
            }}
          >
            {isSubmitted ||
              (typeof window !== 'undefined' &&
                localStorage.getItem('userDetailsStatus') === 'submitted' &&
                localStorage.getItem('isUserSubscribed') &&
                localStorage.getItem('isUserSubscribed') !== 'Yes') ? (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: smallScreen ? '16rem' : '32rem',
                  }}
                >
                  <Typography
                    variant={'h4'}
                    style={{
                      color: 'white',
                      margin: '4rem 0rem 1rem 0rem',
                      textAlign: 'center',
                    }}
                  >
                    {`Thank you`}
                    {userName ? ` ${userName}` : ``}
                    {` for your request! We shall get back to you shortly`}!
                  </Typography>
                  <Typography
                    variant={'body1'}
                    style={{
                      color: 'white',
                      margin: '1rem auto',
                      marginBottom: '2rem',
                      textAlign: 'center',
                    }}
                  >
                    {isSubscribed
                      ? `You’re now subscribed to our newsletter. Awesome!`
                      : `Would you like to subscribe to our newsletter as well?`}
                  </Typography>
                </Box>
                {!isSubscribed && (
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: '1rem',
                    }}
                  >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="outlined"
                        className={'notSubscribedButton'}
                        style={{
                          color: 'white',
                          margin: '1rem 0',
                          textTransform: 'none',
                          borderRadius: '8px',
                          marginRight: '1rem',
                          borderColor: 'white',
                        }}
                        size={'large'}
                        onClick={() => {
                          typeof window !== 'undefined' &&
                            localStorage.setItem(
                              'userDetailsStatus',
                              'submitted'
                            );
                          setInitialFormState();
                          setShowForm(false);
                        }}
                      >
                        Not at this moment
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      style={{
                        color: 'white',
                        margin: '1rem 0',
                        textTransform: 'none',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        marginLeft: '1rem',
                      }}
                      size={'large'}
                      onClick={e => {
                        addUser(e, true);
                        if (typeof window !== 'undefined') {
                          localStorage.setItem(
                            'userDetailsStatus',
                            'subscribed'
                          );
                          localStorage.setItem('isUserSubscribed', 'Yes');
                        }
                        setSubscribed(true);
                        setInitialFormState();
                      }}
                    >
                      Yes please!
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <main
                className={smallScreen ? 'smallRoot' : 'largeRoot'}
                style={{ padding: smallScreen ? '3rem 2.5rem' : '4rem 14rem' }}
              >
                <section
                  className={withLeftAndRightSpace}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
                    gridGap: '1.2rem',
                    backgroundColor: 'white',
                  }}
                >
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: smallScreen ? '2rem' : '2.2rem',
                        maxWidth: '20rem',
                        paddingTop: '1rem',
                      }}
                    >
                      {`Add your city to HUGSI.green`}
                    </Box>
                    {
                      <Box
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: smallScreen ? '1rem' : '1.2rem',
                          maxWidth: '25rem',
                          paddingTop: '2rem',
                        }}
                      >
                        <Typography>  Become part of the growing HUGSI community! Get your city on
                          HUGSI to be able to quantify your
                          urban green space, track development year on year, compare and benchmark KPI’s
                          with other cities globally.
                        </Typography>
                        <Typography>What is included? </Typography>
                        <Typography>  <ul>
                          <li>A public dedicated city page on hugsi.green showcasing your city’s
                            KPI’s, maps and development.
                          </li>
                          <li>Yearly recurring updates of urban green space data for the selected city</li>
                          <li>Ranking and rating part of the HUGSI-index</li>
                          <li>At first addition we analyze data from your prime date from previous
                            year + data 5 years back in time</li>
                        </ul>
                        </Typography>
                      </Box>
                    }
                  </Box>
                  <Box>
                    {/* <Box
                      style={{
                        paddingBottom: '1rem',
                      }}
                    >
                      {nameError && (
                        <Box style={{ color: 'red' }}>
                          Please enter your name
                        </Box>
                      )}
                      <TextField
                        inputProps={{
                          style: {
                            fontSize: '1.25rem',
                            borderRadius: '0.5rem',
                            backgroundColor: 'white',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: '#698d29',
                          },
                        }}
                        id="name"
                        label="Name*"
                        variant="filled"
                        autoComplete="off"
                        classes={{
                          root: userInputField,
                        }}
                        style={{ width: smallScreen ? '20rem' : '34rem' }}
                        onChange={event => {
                          setUserName(event.target.value);
                        }}
                        value={userName}
                      />
                    </Box>
                    <Box
                      style={{
                        paddingBottom: '1rem',
                      }}
                    >
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
                        inputProps={{
                          style: {
                            fontSize: '1.25rem',
                            borderRadius: '0.5rem',
                            backgroundColor: 'white',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: '#698d29',
                          },
                        }}
                        id="email"
                        label="Your email*"
                        variant="filled"
                        classes={{
                          root: userInputField,
                        }}
                        style={{
                          width: smallScreen ? '20rem' : '34rem',
                        }}
                        onChange={event => {
                          setUserEmailAddress(event.target.value);
                        }}
                        value={userEmailAddress}
                      />
                    </Box>
                    {
                      <Box>
                        <Box
                          style={{
                            paddingBottom: '1rem',
                          }}
                        >
                          <TextField
                            inputProps={{
                              style: {
                                fontSize: '1.25rem',
                                borderRadius: '0.5rem',
                                backgroundColor: 'white',
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                color: '#698d29',
                              },
                            }}
                            id="company"
                            label="City to add"
                            variant="filled"
                            classes={{
                              root: userInputField,
                            }}
                            style={{
                              width: smallScreen ? '20rem' : '34rem',
                            }}
                            onChange={event => {
                              setCompanyName(event.target.value);
                            }}
                            value={companyName}
                          />
                        </Box>

                        <Box
                          style={{
                            paddingBottom: '1rem',
                          }}
                        >
                          {messageError && (
                            <Box style={{ color: 'red' }}>
                              Please provide your message
                            </Box>
                          )}
                          <TextField
                            id="message"
                            label="Message*"
                            inputProps={{
                              style: {
                                fontSize: '1.25rem',
                                borderRadius: '0.5rem',
                                backgroundColor: 'white',
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                color: '#698d29',
                              },
                            }}
                            multiline
                            rows={7}
                            classes={{
                              root: messageInputField,
                            }}
                            style={{
                              width: smallScreen ? '20rem' : '34rem',
                              borderRadius: '0.5rem',
                            }}
                            onChange={event => {
                              setUserMessage(event.target.value);
                            }}
                            value={userMessage}
                            variant="filled"
                          />
                        </Box>
                      </Box>
                    }
                    {checkBoxError && (
                      <Box style={{ color: 'red' }}>
                        Please select the below checkbox
                      </Box>
                    )}
                    <Box
                      style={{
                        width: smallScreen ? '20rem' : '34rem',
                        color: 'white',
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
                        You understand that when you click on submit, Husqvarna
                        AB (publ.) and its affiliate companies will use your
                        personal data to respond to you. If you indicate that
                        you want to receive our newsletter, we will also use
                        your personal data to send you such newsletters. We will
                        always use your personal data in accordance with our
                        {` `}
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
                            {`Privacy Notice`}
                          </a>
                        }
                        . You will find more information about how we process
                        your data, who we may share it with, what rights you
                        have and further contact details to us in the Privacy
                        Notice. You can withdraw your consent to our newsletter
                        at any time by clicking the unsubscribe button in any
                        communication you receive from us or by contacting us as
                        set out in the Privacy Notice.
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="row"
                      marginTop={smallScreen ? '1rem' : '1.5rem'}
                      padding={smallScreen ? '0rem' : '0.5rem'}
                      style={{
                        justifyContent: 'space-between',
                        width: smallScreen ? '20rem' : '34rem',
                        marginTop: smallScreen ? '2rem' : '1rem',
                      }}
                    >
                      <Typography
                        style={{ color: '#293845', margin: 'auto 0' }}
                      >
                        <i
                          className="fas fa-asterisk"
                          style={{ color: '#698d29', marginRight: '1rem' }}
                        ></i>
                        Required information
                      </Typography>
                      <Button
                        style={{
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#698d29',
                          textDecoration: 'none',
                          textTransform: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.8rem',
                          width: '6rem',
                          height: '2.5rem',
                        }}
                        type="submit"
                        onClick={event => {
                          if (
                            validateEmail(userEmailAddress) &&
                            checked &&
                            userName &&
                            userMessage
                          ) {
                            if (typeof window !== 'undefined') {
                              localStorage.setItem(
                                'userDetailsStatus',
                                'submitted'
                              );
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                              });
                            }

                            setSubmitted(true);
                            addCityReq(event, false);
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
                            if (!userName) {
                              setNameError(true);
                            } else {
                              setNameError(false);
                            }
                            if (!userMessage) {
                              setMessageError(true);
                            } else {
                              setMessageError(false);
                            }
                          }
                        }}
                      >
                        Submit
                      </Button>
                    </Box> */}
                    <iframe allowTransparency={true}
                      style={{
                        border: '1px',
                        borderColor: 'black',
                        height: '100%',
                        overflow: 'auto'
                      }}
                      width="100%" id="contactform123" name="contactform123"
                      src="https://forms.husqvarna.com/my-contact-form-58044.html"></iframe>
                  </Box>
                </section>
              </main>
            )}
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default MailConnect;