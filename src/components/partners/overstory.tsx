import { Box, Typography, useMediaQuery } from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Link } from 'gatsby';
import React from 'react';
import SEO from '../../hooks/seo';
// @ts-ignore
import overstoryLogo from '../../images/overstory-logo.jpeg';
// @ts-ignore
import overstoryPlatform from '../../images/overstory-platform.png';
// @ts-ignore
import overstoryTech from '../../images/overstory-tech.jpeg';
import PartnerConnect from '../mail-connect/partner-connect';
import { useStyles } from './style';

/**
 * About Page
 * @file about.tsx the How it works
 */
const OverstoryDetails = () => {
  const smallScreen = useMediaQuery('(max-width:650px)');
  const {
    root,
    rootWrapper,
    center,
    twoCol,
  } = useStyles({});
  const box = {
    fontWeight: 'fontWeightBold',
    color: '#424242',
  };

  // @ts-ignore
  return (
    <section>
      <SEO
        title="Overstory"
        description={`Real-time vegetation intelligence, at scale`}
      />
      <div>
        <img
          src={overstoryTech}
          width="100%"
          height={smallScreen ? '300rem' : '500rem'}
          style={{
            margin: '100px 0 0'
          }}
        />
      </div>
      <div>
        <div className={rootWrapper}>
          <div
            className={root}
            style={{ margin: smallScreen ? '1rem auto' : '2rem auto' }}
          >
            <div
              style={{
                maxWidth: smallScreen ? 'unset' : '30rem',
                color: '#293845',
              }}
            >
              <Typography variant={'subtitle1'}>
                <Box
                  style={{ fontSize: smallScreen ? '1rem' : '1.2rem' }}
                  lineHeight={smallScreen ? '2.5rem' : '3.5rem'}
                  maxWidth="75%"
                >
                  <Link
                    to="/partners"
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                    onClick={() => {
                      window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                      });
                    }}
                  >
                    Partners {'&'} Friends
                  </Link>

                  <span
                    style={{
                      color: '#698d29',
                      textDecoration: 'none',
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    / Overstory
                  </span>
                </Box>
              </Typography>
            </div>
            <div className={twoCol}>
              <section>
                <Typography variant={smallScreen ? 'h5' : 'h4'}>
                  <Box {...box} className={'heading'}>
                    Ahead of the future
                  </Box>
                </Typography>
                <Typography
                  variant={'subtitle1'}
                  style={{ margin: smallScreen ? '2rem auto' : '1rem auto' }}
                >
                  Overstory applies artificial intelligence to high-resolution
                  satellite imagery to provide real-time analytics of natural
                  resources. Being part of HUGSI from the start, Overstory is
                  our technology partner providing the green data for the index
                  calculation.
                </Typography>

                <Typography
                  variant={'subtitle1'}
                  style={{ margin: '1rem auto' }}
                >
                  Detailed insights provided by Overstory helps electric
                  utilities, cities and forestry companies to improve vegetation
                  management. The insights derived from satellite imagery and AI
                  are:
                </Typography>
                <Typography
                  variant={'subtitle1'}
                  style={{ margin: '1rem auto' }}
                >
                  <ul>
                    <li>
                      Scalable: Quickly and regularly understand the vegetation
                      in your region or around your assets.
                    </li>
                    <li>
                      Accurate: Accurate insights ensure field visits are
                      focused on the most pressing concerns. Our algorithms have
                      been developed, tested and validated in partnership with
                      arborists and forestry professionals around the globe.
                    </li>
                    <li>
                      Actionable: Overstory delivers tree-level data on
                      vegetation species, health, height and proximity to
                      assets, enabling risk-based planning for vegetation
                      management. Overstory pinpoints risks and verifies if work
                      has been performed successfully.
                    </li>
                  </ul>
                </Typography>
              </section>
              <section>
                <Box display="flex" flexDirection="column">
                  <a href="https://www.overstory.com/" target="_blank">
                    <img
                      src={overstoryLogo}
                      style={{
                        width: '15rem',
                        // height: '5rem',
                        marginBottom: '3rem',
                      }}
                    ></img>
                  </a>
                </Box>
              </section>
            </div>
          </div>
        </div>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3rem',
          }}
        >
          {' '}
          <Typography
            variant={smallScreen ? 'subtitle1' : 'h5'}
            style={{
              textAlign: 'center',
              lineHeight: '2.5rem ',
              fontWeight: 'bold',
              width: smallScreen ? '18rem' : '50rem',
            }}
          >
            “We have been working with Overstory since the birth of HUGSI and
            they are an integral part of our team. We really enjoy working
            together and it is a real 1+1=3 story.”
          </Typography>
          <Typography variant={'subtitle1'} style={{ margin: '1rem 0 2rem' }}>
            — Team HUGSI
          </Typography>
        </Box>
        <div className={rootWrapper}>
          <div
            className={root}
            style={{
              padding: smallScreen ? '0 1rem' : '0 auto',
              margin: smallScreen ? '0 1rem' : '0 auto',
            }}
          >
            <div className={twoCol}>
              <section>
                <Typography variant={smallScreen ? 'h5' : 'h4'}>
                  <Box {...box} className={'heading'}>
                    Technology
                  </Box>
                </Typography>
                <Typography
                  variant={'subtitle1'}
                  style={{ margin: '2rem auto' }}
                >
                  Overstory uses machine learning to interpret satellite imagery
                  and climate data to extract detailed insights about trees and
                  shrubs.
                  <ul>
                    <li>
                      The machine learning algorithms are pre-trained with
                      ground measurements from arborists and forestry
                      professionals and the Overstory data repository.
                    </li>
                    <li>
                      By fusion of data with diverse spatial, spectral and
                      temporal resolution Overstory allows for real-time and
                      predictive insights.
                    </li>
                    <li>
                      The Overstory technology is set up to extract additional
                      value from other customer data sources such as LiDAR and
                      drone data.
                    </li>
                    <li>
                      Insights are accessed securely via the Overstory platform,
                      or can be easily integrated into existing tools and
                      customer workflows.
                    </li>
                  </ul>
                </Typography>
              </section>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
                className={center}
              >
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  style={{
                    float: 'right',
                  }}
                >
                  <img
                    src={overstoryPlatform}
                    width={smallScreen ? '320px' : '600px'}
                    height={smallScreen ? '200px' : '350px'}
                    alt={'satellite'}
                  />
                </Box>
              </div>
            </div>
          </div>

          <div className={root} style={{ margin: '2rem auto' }}>
            <Box
              style={{
                float: 'right',
                margin: '-2rem  0rem',
                fontSize: smallScreen ? '0.9rem' : '1.2rem',
                fontWeight: 'bold',
              }}
            >
              Learn more about Overstory at{' '}
              <Link
                to="https://www.overstory.com/"
                target="_blank"
                style={{
                  textDecoration: 'none',
                  color: '#698d29',
                  margin: '1rem 0',
                  whiteSpace: 'nowrap',
                }}
              >
                overstory.com
                <ArrowForward
                  style={{
                    paddingTop: '1.2rem',
                    fontWeight: 'bold',
                    fontSize: '2.2rem',
                    color: '#698d29',
                  }}
                />
              </Link>
            </Box>
          </div>
        </div>
      </div>
      <PartnerConnect />
    </section>
  );
};

export default OverstoryDetails;
