import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSiteMetadata } from 'hooks';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { navigate } from 'gatsby';
import {
  Select,
  MenuItem,
  Box,
  Grid,
  Checkbox,
  Typography,
  TextField,
  useMediaQuery,
  Snackbar,
  SnackbarContent,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import SEO from 'hooks/seo';
import TopComponent from 'components/top-component/top-component';
import { RefreshOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { useStyles } from '../../styles/signup';

interface Props {
  location: Location;
}
declare global {
  interface Window {
    dataLayer?: any;
    gtag?: any;
  }
}
/**
 * Ranking Page
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const Signup: React.FC<Props> = props => {
  const { loginDssEndpoint, frontUrl } = useSiteMetadata();
  const smallScreen = useMediaQuery('(max-width:1024px)');
  const classes = useStyles({});
  const domain = typeof window !== 'undefined' ? window.location.origin : '';

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  });
  const password = useRef({});
  password.current = watch('password', '');
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const handleClickShowPwd = () => setShowPassword(!showPassword);
  const handleMouseDownPwd = () => setShowPassword(!showPassword);
  const handleClickShowConfPwd = () => setShowConfPassword(!showConfPassword);
  const handleMouseDownConfPwd = () => setShowConfPassword(!showConfPassword);
  useEffect(() => {
    axios
      .get(`${loginDssEndpoint}/v1/countries`)
      .then(res => {
        setCountries(res.data.data);
      })
      .catch(() => { });
    getCaptcha();
  }, []);

  const getCaptcha = () => {
    axios
      .get(`${loginDssEndpoint}/v1/captcha/generate`)
      .then(res => {
        setCaptcha(res.data?.data?.attributes?.svg);
      })
      .catch(() => { });
  };

  const onSubmit = data => {
    const formVal = {
      data: {
        type: 'customers',
        attributes: {
          captchaText: data.captcha,
          type: 'IndividualCustomer',
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          language: 'en',
          locationAddress: { street: '', zipCode: '', city: '', country: '' },
          billingAddress: { street: '', zipCode: '', city: '', country: '' },
          shippingAddress: {},
          vatNumber: '',
          name: '',
          eContact: { emailContacts: [{ emailAddress: data.email }] },
        },
      },
      meta: {
        forward: {
          uri: `${loginDssEndpoint}/v1/oauth2/email-verification`,
          query: {
            redirect_uri: frontUrl + 'community',
            client_id: 'hugsi',
            state: null,
          },
          text: 'Verification link',
        },
      },
    };
    // typeof window !== 'undefined' &&
    //   window.gtag('event', 'click', { category: 'signup', user: data.email });
    axios
      .post(`${loginDssEndpoint}/v1/customers`, formVal)
      .then(res => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          signup: 'click'
        });
        navigate('/community');
        window.open(
          `${loginDssEndpoint}/v1/oauth2/verify-email?email=${data.email}`,
          '_blank',
          'noopener,noreferrer'
        );
      })
      .catch(error => {
        setOpen(true);
        setErrorMessage(error.response.data.errors[0].title);
      });
  };
  return (
    <section>
      <SEO
        title="HUGSI Global & Regional Ranking"
      // description={`Husqvarna Urban Green Space Index and Ranking for ${cities.length} cities across the globe`}
      />
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          // height: '100vh',
        }}
      >
        {captcha !== '' && countries.length ? (
          <Grid
            className={classes.contentCenter}
            container
            md={12}
            style={{ backgroundColor: 'rgb(243, 242, 240)' }}
          >
            {!smallScreen && (
              <Grid item xs={5} md={6} style={{ maxWidth: '46.5%', flexBasis: '46.5%' }}>
                <div
                  className={classes.bannerImage}
                // src={'https://mypages.husqvarna.com/login.6d3dc914.png'}
                >
                  <div
                    style={{
                      color: 'white',
                      padding: '64px',
                      marginBottom: '160px',
                    }}
                  >
                    <h1
                      style={{
                        maxWidth: '340px',
                        backgroundColor: ' rgba(0, 0, 0, 0.5)',
                        textTransform: 'uppercase',
                        padding: '12px',
                      }}
                    >
                      HUGSI.green powered by Husqvarna
                    </h1>
                    <p
                      style={{
                        maxWidth: '500px',
                        backgroundColor: ' rgba(0, 0, 0, 0.5)',
                        padding: '12px',
                      }}
                    >
                      Signup and become a member of the HUGSI.green community.
                      With a login you can further customize your experience and
                      get access to more information.
                    </p>
                  </div>
                </div>
              </Grid>
            )}
            <Grid
              style={{ padding: '64px 8%', overflow: 'auto', height: '100vh', maxWidth: '53.5%', flexBasis: '53.5%' }}
              xs={12}
              sm={12}
              md={6}
            >
              <TopComponent
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <form
                  className={classes.signupForm}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Typography
                    variant={'h5'}
                    style={{
                      display: 'flex',
                      justifyContent: 'left',
                      marginTop: '10px',
                      fontWeight: 'bold',
                    }}
                  >
                    Sign up for a HUGSI-account
                  </Typography>
                  <p>
                    Enter your work email and set a password for your account
                  </p>
                  <div className={classes.inputHolder}>
                    <TextField
                      inputProps={{ className: classes.customInput }}
                      className={classes.focusClass}
                      id="filled-basic"
                      label="Email"
                      variant="filled"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Email required.',
                        },
                        pattern: {
                          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Invalid email format',
                        },
                      })}
                    />
                    {errors?.email?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.email?.message}
                      </p>
                    )}
                  </div>
                  <div className={classes.inputHolder}>
                    <TextField
                      inputProps={{ className: classes.customInput }}
                      className={classes.focusClass}
                      id="filled-basic"
                      label="Firstname"
                      variant="filled"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      {...register('firstName', {
                        required: {
                          value: true,
                          message: 'Firstname required.',
                        },
                        // pattern: {
                        //   value: /^[A-Za-z]+$/,
                        //   message: 'Firstname must be alphabets only.',
                        // },
                      })}
                    />
                    {errors?.firstName?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.firstName?.message}
                      </p>
                    )}
                  </div>
                  <div className={classes.inputHolder}>
                    <TextField
                      inputProps={{ className: classes.customInput }}
                      className={classes.focusClass}
                      id="filled-basic"
                      label="Lastname"
                      variant="filled"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      {...register('lastName', {
                        required: {
                          value: true,
                          message: 'Lastname required.',
                        },
                        // pattern: {
                        //   value: /^[A-Za-z]+$/,
                        //   message: 'Lastname must be alphabets only.',
                        // },
                      })}
                    />
                    {errors?.lastName?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.lastName?.message}
                      </p>
                    )}
                  </div>

                  <div className={classes.inputHolder}>
                    <TextField
                      inputProps={{ className: classes.customInput }}
                      id="filled-basic"
                      label="Password"
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      variant="filled"
                      className={classes.focusClass}
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'Password required.',
                        },
                        minLength: {
                          value: 6,
                          message: 'Password must have at least 6 characters.',
                        },
                      })}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        className: classes.customInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPwd}
                              onMouseDown={handleMouseDownPwd}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                      }}
                    />
                    {errors?.password?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.password?.message}
                      </p>
                    )}
                  </div>
                  <div className={classes.inputHolder}>
                    <TextField
                      inputProps={{ className: classes.customInput }}
                      id="filled-basic"
                      label="Confirm Password"
                      type={showConfPassword ? 'text' : 'password'}
                      variant="filled"
                      fullWidth
                      className={classes.focusClass}
                      {...register('confPassword', {
                        required: {
                          value: true,
                          message: 'Confirm Password required.',
                        },
                        validate: value =>
                          value === password.current ||
                          'The passwords do not match.',
                      })}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        className: classes.customInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfPwd}
                              onMouseDown={handleMouseDownConfPwd}
                            >
                              {showConfPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                      }}
                    />
                    {errors?.confPassword?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.confPassword?.message}
                      </p>
                    )}
                  </div>
                  <div className={classes.inputHolder}>
                    <FormControl
                      fullWidth
                      variant="filled"
                      placeholder="Choose a country"
                      className={classes.focusClass}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Country
                      </InputLabel>
                      <Select
                        label="Country"
                        inputProps={{
                          className: classes.customInput,
                          disableUnderline: true,
                        }}
                        disableUnderline={true}
                        {...register('country', {
                          required: {
                            value: true,
                            message: 'Country required.',
                          },
                          // validate: value =>
                          //   value === password.current || "The passwords do not match"
                        })}
                      >
                        {countries.map((data, index) => {
                          // if(data.type === 'country'){
                          return (
                            <MenuItem value={data.id}>
                              {data.attributes.name}
                            </MenuItem>
                          );
                          // }
                        })}
                      </Select>
                    </FormControl>
                    {errors?.country?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.country?.message}
                      </p>
                    )}
                  </div>
                  {/* <PhoneInput
                      country={'us'}
                      value={'34343'}
                      onChange={() => {}}
                    /> */}
                  <div className={classes.inputHolder}>
                    <div className={classes.captchaHolder}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: captcha,
                        }}
                      />
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="refresh"
                          onClick={() => getCaptcha()}
                        // onMouseDown={handleMouseDownConfPassword}
                        >
                          <RefreshOutlined />
                        </IconButton>
                      </InputAdornment>
                    </div>
                  </div>
                  <div className={classes.inputHolder}>
                    <TextField
                      inputProps={{ className: classes.customInput }}
                      id="filled-basic"
                      variant="filled"
                      label="Enter Captcha"
                      fullWidth
                      className={classes.focusClass}
                      InputProps={{ disableUnderline: true }}
                      {...register('captcha', {
                        required: {
                          value: true,
                          message: 'Captcha required.',
                        },
                      })}
                    />
                    {errors?.captcha?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.captcha?.message}
                      </p>
                    )}
                  </div>
                  <div className={classes.flex}>
                    <Checkbox
                      // checked={checked}
                      // onChange={handleChange}
                      size={'medium'}
                      style={{
                        color: 'rgba(0, 0, 0, 0.87)',
                        alignItems: 'flex-start',
                        marginRight: '10px',
                        display: 'inline-block',
                      }}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      {...register('policy', {
                        required: {
                          value: true,
                          message: 'Please check the policy.',
                        },
                      })}
                    />
                    <Typography className={classes.policyTag}>
                      By registering, you confirm that we, Husqvarna AB (publ.)
                      and our affiliate companies have the right to handle your
                      personal information to provide you with relevant material
                      and communication. Based on your membership we may
                      occasionally send emails with updates to the service. You
                      can change your preferences at any time.
                      {<br />}
                      By completing the registration of the Husqvarna
                      account,you agree to our
                      {` `}
                      {
                        <a
                          href={
                            'https://www.hugsi.green/terms-of-use'
                          }
                          target="_blank"
                          style={{
                            color: 'rgba(0, 0, 0, 0.87)',
                            fontWeight: 'bold',
                          }}
                        >
                          {`Terms of Use`}
                        </a>
                      }
                      {` `} and confirm that you have read our
                      {` `}
                      {
                        <a
                          href={
                            'https://privacyportal.husqvarnagroup.com/int/'
                          }
                          target="_blank"
                          style={{
                            color: 'rgba(0, 0, 0, 0.87)',
                            fontWeight: 'bold',
                          }}
                        >
                          {`Privacy Notice`}
                        </a>
                      }
                      .
                    </Typography>
                    {errors?.policy?.message && (
                      <p className={classes.errorMsg}>
                        {errors?.policy?.message}
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <input
                      type="submit"
                      value="REGISTER"
                      className={classes.buttonGreen}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '18px',
                    }}
                  >
                    <a
                      // href="https://api.qa-customer.dss.husqvarnagroup.net/v1/oauth2/authorize?client_id=hugsi&
                      // redirect_uri=http://localhost:8080/community"
                      href={`${loginDssEndpoint}/v1/oauth2/authorize?client_id=hugsi&redirect_uri=${domain}/community`}
                      target="_blank"
                      style={{
                        float: 'right',
                        color: 'rgb(243, 83, 33)',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                      }}
                    >
                      Already have an account?
                    </a>
                  </div>
                </form>
              </TopComponent>
            </Grid>
          </Grid>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#99c93c',
            }}
          >
            <i
              className="fas fa-spinner fa-spin"
              style={{
                color: '#99c93c',
                fontSize: '4rem',
              }}
            ></i>
            <h2 style={{ fontSize: '2rem' }}>Loading Sign Up Form</h2>
          </div>
        )}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
      >
        <SnackbarContent
          className={classes.errorMessageRed}
          role="alert"
          message={errorMessage}
        ></SnackbarContent>
      </Snackbar>
    </section>
  );
};

export default observer(Signup);