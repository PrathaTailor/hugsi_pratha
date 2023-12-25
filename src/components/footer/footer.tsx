import React from 'react';
import { Link } from 'gatsby';
import { Typography, useMediaQuery, Box, Button } from '@material-ui/core';
import UserConnect from '../../popups/user-connect';
import Popup from 'reactjs-popup';
// @ts-ignore
import footerLogo from '../../images/husqvarna_logo_white.png';
import { useStyles } from './style';

/**
 * Footer component
 */
const Footer = () => {
  const smallScreen = useMediaQuery('(max-width:600px)');
  const { footerWrapper, footer, smallFooter, logo, footerLink } = useStyles({});

  return (
    <footer className={footerWrapper}>
      <div className={smallScreen ? smallFooter : footer}>
        <a href="https://husqvarna.com" target="_blank">
          <img src={footerLogo} alt="Husqvarna logo" className={logo} />
        </a>
        <Box padding={smallScreen ? '3rem 0rem' : '0rem 1rem'}>
          <Typography variant={'subtitle2'}>
            Since 1689, Husqvarna has manufactured high performing products and
            delivered industry-changing innovations such as anti-vibration and
            automatic chain-break on chainsaws, as well as robotic mowers.
            Today, Husqvarna offers a broad range of high performing outdoor
            power products for parks, forest and garden, and represents
            technological leadership in the key areas; chainsaws, trimmers,
            ride-on mowers and robotic mowers. Husqvarna products are sold in
            more than 100 countries, mainly through servicing dealers.
          </Typography>
          <Box
            style={{
              display: 'flex',
              flexDirection: smallScreen ? 'column' : 'row',
              marginTop: '2rem',
              gap: '20px',
              // justifyContent: 'space-between',
              alignItems: smallScreen ? 'flex-start' : 'center',
            }}
          >
            <Button
              component={Link}
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              to={`/imprint`}
              style={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                margin: smallScreen ? '0rem 1.5rem 0rem' : '0rem'
              }}
            >
              Imprint
            </Button>
            <Button>
              <a
                href="https://privacyportal.husqvarnagroup.com/se/privacy-notice/"
                target="_blank"
                style={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  margin: smallScreen ? '0rem 2rem 0rem' : '0rem 0rem',
                }}
              >
                Privacy
              </a>
            </Button>
            <Button
              component={Link}
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              to={`/terms-of-use`}
              style={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                margin: smallScreen ? '0rem 1.5rem 0rem' : '0rem'
              }}
            >
              Terms of use
            </Button>
            <Button>
              <a
                href="https://www.linkedin.com/company/hugsi-green/"
                target="_blank"
                style={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  margin: smallScreen ? '0rem 2rem 0rem' : '0rem 0rem',
                }}
              >
                LinkedIn
              </a>
            </Button>
            <Button>
              <a
                href="https://www.youtube.com/channel/UC26e23JapKtNXx2S8JkfuIg"
                target="_blank"
                style={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  margin: smallScreen ? '0rem 2rem 0rem' : '0rem 0rem',
                }}
              >
                Youtube Channel
              </a>
            </Button>
          </Box>
        </Box>
        <Box padding={smallScreen ? '3rem 0rem' : '3rem 1rem'}>
          <Box className={footerLink}>
            <Link to="/ranking" className={footerLink}>
              <Typography variant="subtitle1">
                <Box
                  fontWeight="fontWeightBold"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Ranking
                </Box>
              </Typography>
            </Link>
          </Box>
          <Box className={footerLink}>
            <Link to="/about" className={footerLink}>
              <Typography variant="subtitle1">
                <Box
                  fontWeight="fontWeightBold"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  How it works
                </Box>
              </Typography>
            </Link>
          </Box>
          <Box className={footerLink}>
            <Link to="/stories" className={footerLink}>
              <Typography variant="subtitle1">
                <Box
                  fontWeight="fontWeightBold"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Insights
                </Box>
              </Typography>
            </Link>
          </Box>
          <Box className={footerLink}>
            <Link to="/partners" className={footerLink}>
              <Typography variant="subtitle1">
                <Box
                  fontWeight="fontWeightBold"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Partners {'&'} Friends
                </Box>
              </Typography>
            </Link>
          </Box>
          <Box
            style={{
              marginTop: '3rem',
              textDecoration: 'none',
              color: 'white',
            }}
          >
            <Link to="/add-your-city" className={footerLink}>
              <Typography
                variant="subtitle1"
                style={{
                  fontWeight: 'bold',
                }}
              >
                <Box
                  fontWeight="fontWeightBold"
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  <i
                    className="fas fa-city"
                    style={{
                      marginRight: '0.75rem',
                    }}
                    aria-hidden="false"
                  />
                  Request your city
                </Box>
              </Typography>
            </Link>
          </Box>
          <Popup
            modal
            closeOnDocumentClick={false}
            trigger={
              <Box
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  <Box
                    fontWeight="fontWeightBold"
                    style={{ cursor: 'pointer' }}
                  >
                    <i
                      className="fas fa-envelope-open-text"
                      style={{
                        marginRight: '1rem',
                      }}
                      aria-hidden="false"
                    />
                    Sign up for our Newsletter
                  </Box>
                </Typography>
              </Box>
            }
          >
            {close => <UserConnect close={close} mode="subscribe" />}
          </Popup>

          <Popup
            closeOnDocumentClick={false}
            modal
            trigger={
              <Box style={{ textDecoration: 'none', color: 'white' }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  <Box
                    fontWeight="fontWeightBold"
                    style={{ cursor: 'pointer' }}
                  >
                    <i
                      className="fas fa-comment-alt"
                      style={{
                        marginRight: '1rem',
                      }}
                      aria-hidden="false"
                    />
                    Got any feedback?
                  </Box>
                </Typography>
              </Box>
            }
          >
            {close => <UserConnect close={close} mode="feedback" />}
          </Popup>
        </Box>
      </div>
    </footer>
  );
};

export default Footer;