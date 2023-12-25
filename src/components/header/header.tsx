import { AppBar, Box, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'gatsby';
import { useSiteMetadata } from 'hooks';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import useCities from '../../hooks/cities';
import useScrollFromTop from '../../hooks/scroll-from-top';
// @ts-ignore
import addYourCityLogo from '../../images/icon-add-your-city.png';
// @ts-ignore
import greenAddCityLogo from '../../images/icon-green-building.png';
// @ts-ignore
import greenLeaflogo from '../../images/icon-leaf.png';
// @ts-ignore
import signoutlogo from '../../images/icon-logout.png';
// @ts-ignore
import signInlogo from '../../images/icon-sign-in.png';
// @ts-ignore
import userlogo from '../../images/icon-user.png';
import LogoutAlert from '../../popups/logout-alert';
import LargeToolbar from './large-toolbar';
import SmallToolbar from './small-toolbar';
import { useStyles } from './style';

interface HeaderProps {
  backgroundImageSelector: string;
  pathname: string;
}

/**
 * Header component
 * @param backgroundImageSelector - image to be rendered
 */
const Header: React.FC<HeaderProps> = ({ backgroundImageSelector, pathname }) => {
  const {
    navContainer, headerBox,
    navLink,
    customizeToolbar,
  } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:991px)');
  const showScrolledMenu = useScrollFromTop({ backgroundImageSelector });
  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const navLinkClass = navLink;
  const appBarClass = navContainer;
  const { cityStore } = useCities();
  const { user } = cityStore;
  const fullName =
    cityStore && cityStore.user && cityStore.user.first_name
      ? cityStore.user.first_name.concat(` ${cityStore.user.last_name}`)
      : '';
  const [username, setUsername] = useState(fullName);
  const { apiKey, userInputsEndpoint, loginDssEndpoint } = useSiteMetadata();
  const code =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('code')
      : '';
  const fetchUserData = async (token: string) => {
    axios
      .post(
        `${userInputsEndpoint}/validateUser`,
        {
          accessToken: token,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            'x-api-key': apiKey,
            // accessToken: token,
            // redirectUrl: `${domain}/community`,
          },
        }
      )
      .then(response => {
        const { data } = (response && response.data) || {};
        const { first_name = '', last_name = '' } = data || {};
        const nameToSet = first_name ? first_name.concat(` ${last_name}`) : '';
        setUsername(nameToSet);
        cityStore.loadUser(data);
        return response.data;
      });
  };

  const fetchUserWithCode = async (code: string) => {
    try {
      const userData = await axios
        .post(
          `${userInputsEndpoint}/login`,
          {
            auth_code: code,
            redirectUrl: `${domain}/community`,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
              'x-api-key': apiKey,
              // auth_code: code,
              // redirectUrl: `${domain}/community`,
            },
          }
        )
        .then(response => {
          const { userDetails } = response && response.data;
          const { first_name = '', last_name = '' } = userDetails || {};
          if (first_name) {
            setUsername(first_name.concat(` ${last_name}`));

            cityStore.loadUser(
              response && response.data && response.data.userDetails
            );
            const { accessToken } = response && response.data;
            if (accessToken) {
              localStorage.setItem('access_token', accessToken);
            }
            return userDetails;
          }
        });
    } catch (err) {
      return {};
    }
  };

  useEffect(() => {
    const { first_name, last_name } = user || {};
    const nameToSet = first_name ? first_name.concat(` ${last_name}`) : '';
    setUsername(nameToSet);
  }, [user, username]);

  useEffect(() => {
    const sessionCode =
      localStorage.getItem('loginCode') &&
        localStorage.getItem('loginCode') !== 'undefined'
        ? localStorage.getItem('loginCode')
        : '';

    if (
      !code &&
      // !cityStore?.user?.first_name &&
      localStorage.getItem('access_token')
    ) {
      try {
        fetchUserData(localStorage.getItem('access_token'));
      } catch (err) { }
    } else {
      try {
        if (code || sessionCode) {
          fetchUserWithCode(code || sessionCode);
        }
      } catch (err) { }
    }
  }, [code]);

  return (
    <AppBar
      className={appBarClass}
      style={{
        zIndex: smallScreen ? 11 : 99,

      }}
    >
      <Toolbar
        className={customizeToolbar}
        style={{
          backgroundColor:
            username && username !== 'undefined' ? '#293845' : '#E9EFBB',
        }}
      >
        {username && username !== 'undefined' && username !== '' ? (
          <>
            <div style={{ justifyContent: 'space-between', width: '100%', display: 'flex' }}>
              <span
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: smallScreen ? '1.1rem' : '1.2rem',

                }}
              >
                <Box style={{ textDecoration: 'none', color: 'black' }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    <Box
                      className={headerBox}
                      fontWeight="bold"
                    >
                      <img
                        src={userlogo}
                        alt="User logo"
                        height="18px"
                        width="14px"
                      />
                      Welcome,{``} {username}
                    </Box>
                  </Typography>
                </Box>
                {/* {localStorage.getItem('loggedInUsername')} */}
              </span>

              <span
                style={{
                  float: 'right',
                  display: smallScreen ? 'none' : 'flex',
                  width: 'max-content',
                  justifyContent: 'flex-end',
                  gap: '40px'
                }}>
                <Box style={{ textDecoration: 'none', color: 'black' }}>
                  <Link to="/add-your-city">
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      <Box
                        fontWeight="fontWeightBold"
                        style={{
                          cursor: 'pointer',
                          color: 'white',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '10px',
                          // width: '72px',
                          // height: '24px',
                        }}
                      >
                        <img
                          src={addYourCityLogo}
                          alt="Add you city logo"
                          height="18px"
                          width="14px"
                        // style={{ margin: 0, width: '6rem' }}
                        />
                        Add your city
                      </Box>
                    </Typography>
                  </Link>
                </Box>
                <Popup
                  closeOnDocumentClick={false}
                  modal
                  trigger={
                    <Box style={{ textDecoration: 'none', color: 'black' }}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        <Box
                          fontWeight="fontWeightBold"
                          style={{
                            cursor: 'pointer',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '0px',
                            gap: '10px',
                            // width: '72px',
                            // height: '24px',
                          }}
                        >
                          Sign out
                          <img
                            src={signoutlogo}
                            alt="Signout logo"
                            height="12px"
                            width="10px"
                          // style={{ margin: 0, width: '6rem' }}
                          />
                        </Box>
                      </Typography>
                    </Box>
                  }
                >
                  {close => <LogoutAlert close={close} />}
                </Popup>
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                justifyContent: 'space-between',
                display: 'flex',
                width: smallScreen ? '100%' : 'auto',
                gap: smallScreen ? '0' : '40px',
                alignItems: 'center'
              }}>
              <span>
                <Link to="/add-your-city">
                  <Typography
                    variant="subtitle1"
                    style={{
                      float: 'right',
                      color: '#293845',
                      fontSize: smallScreen ? '15px' : '1.1rem',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      // marginRight: '2rem',
                    }}
                  >
                    <Box fontWeight="fontWeightBold"
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '0px',
                        gap: '10px',
                        // width: '72px',
                        // height: '24px',
                      }}>
                      <img
                        src={greenAddCityLogo}
                        alt="Add you city logo"
                        height="18px"
                        width="14px"
                      // style={{ margin: 0, width: '6rem' }}
                      />
                      Add your city
                    </Box>
                  </Typography>
                </Link>
              </span>
              <span>
                <Link to="/community">
                  <Typography
                    variant="h6"
                    style={{
                      float: 'right',
                      color: '#293845',
                      fontSize: smallScreen ? '15px' : '1.1rem',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      // marginRight: '2rem',
                    }}
                  >
                    {' '}
                    <Box fontWeight="fontWeightBold"
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '0px',
                        gap: '10px',
                        // width: '72px',
                        // height: '24px',
                      }}>
                      <img
                        src={greenLeaflogo}
                        alt="green leaf logo"
                        height="18px"
                        width="18px"
                      />
                      Create account
                    </Box>
                  </Typography>
                </Link>
              </span>

              <span>
                <a
                  // href="https://api.qa-customer.dss.husqvarnagroup.net/v1/oauth2/authorize?client_id=hugsi&
                  // redirect_uri=http://localhost:8080/community"
                  href={`${loginDssEndpoint}/v1/oauth2/authorize?client_id=hugsi&redirect_uri=${domain}/community`}
                  target="_blank"
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      float: 'right',
                      color: '#293845',
                      fontSize: smallScreen ? '15px' : '1.1rem',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      // marginRight: '2rem',
                    }}
                  >
                    <Box fontWeight="fontWeightBold"
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '0px',
                        gap: '10px',
                        fontWeight: 'bold'
                      }}>
                      Log in
                      <img
                        src={signInlogo}
                        alt="SignIn logo"
                        height="12px"
                        width="10px"
                      />
                    </Box>
                  </Typography>
                </a>
              </span>
            </div>
          </>
        )}
      </Toolbar >

      {
        smallScreen ? (
          <SmallToolbar
            showScrolledMenu={showScrolledMenu}
            navLinkClass={navLinkClass}
          />
        ) : (
          <LargeToolbar
            navLinkClass={navLinkClass}
            pathname={pathname}
          />
        )}
    </AppBar >
  );
};

export default observer(Header);