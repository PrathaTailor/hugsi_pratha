import React from 'react';
import { Button, Typography, Box, useMediaQuery } from '@material-ui/core';
import SEO from '../../hooks/seo';
import { Link } from 'gatsby';
import ArrowForward from '@material-ui/icons/ArrowForward';
// @ts-ignore
import Partnership from '../../images/partnership.png';
import PartnerProducts from 'components/partner-products/partner-products';
import PartnerConnect from 'components/mail-connect/partner-connect';
import { useStyles } from '../../styles/partners';

/**
 * Partners Page
 * @file partners.tsx the Partners page
 */
const PartnerPage = () => {
  const smallScreen = useMediaQuery('(max-width:960px)');
  const {
    root,
    box1,
    box2,
    box3,
    boxWrapper,
    smallBoxWrapper,
    contentWrapper,
    rootWrapper,
    twoCols,
  } = useStyles({});

  /**
   * Only works in production. Send Google Analytics event tracking
   * @returns void
   */

  // @ts-ignore
  return (
    <>
      <SEO
        title="Partners"
        description={`The HUGSI (Husqvarna Urban Green Space Index) is an
            AI-powered satellite solution to help decision makers monitor the
             proportion and health of green spaces in cities across the globe.`}
      />
      <div className={rootWrapper}>
        <div className={root}>
          <div
            className={twoCols}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: smallScreen ? '0rem' : '10rem',
            }}
          >
            <section
              style={{
                margin: smallScreen ? '8rem 1rem 2rem' : '8rem 0 0 2rem',
                maxWidth: smallScreen ? 'unset' : '40%',
                color: '#293845',
              }}
            >
              <Typography variant={'h6'}>
                <Box
                  fontWeight={'fontWeightBold'}
                  fontSize={smallScreen ? '1.5rem' : '2.5rem'}
                  lineHeight={smallScreen ? '2.5rem' : '3.5rem'}
                >
                  Partners {'&'} Friends
                </Box>
              </Typography>
              <Typography
                variant={'subtitle1'}
                style={{ margin: '2rem auto', color: '#293845' }}
              >
                Our ambition is to develop HUGSI.green into a collaborative
                platform for green data and knowledge exchange, building a
                global network of engaged individuals, cities, organizations and
                companies with the resources and will to greenify the world. We
                will continuously expand our network with new partners enabling
                this journey. We are nothing without you, let’s work together!
              </Typography>
              <Button
                variant="contained"
                style={{
                  color: 'white',
                  margin: smallScreen ? '1rem 0' : '2rem 0 4rem',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  backgroundColor: '#99c93c',
                }}
                size={'large'}
                onClick={() => {
                  window.scroll({
                    top: smallScreen
                      ? 0.7 * document.body.scrollHeight
                      : 0.6 * document.body.scrollHeight,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                Want to become a partner?
              </Button>
            </section>
            {!smallScreen && (
              <section>
                <img src={Partnership} style={{ margin: '8rem 2rem 2rem 0' }} />
              </section>
            )}
          </div>
        </div>
        <Box
          className={contentWrapper}
          style={{
            margin: '2rem auto',
          }}
        >
          <Typography
            variant={'h4'}
            style={{
              fontWeight: 'bold',
              margin: smallScreen ? '6rem 1rem 2rem' : '2rem',
              fontSize: smallScreen ? '1.5rem' : '2rem',
            }}
          >
            Our partners & Friends
          </Typography>
          <Box
            className={smallScreen ? smallBoxWrapper : boxWrapper}
            style={{ margin: smallScreen ? 'auto 1rem' : 'auto 2rem' }}
          >
            <Box>
              <Box className={box1}></Box>
              <Typography
                style={{
                  marginTop: '1rem',
                  color: '#293845',
                  minHeight: '14rem',
                }}
              >
                NL Greenlabel provides insight into the integral sustainability
                of areas, terrains and products. Starting from the value of
                green a project can be assisted to achieve its sustainability
                ambition from the design to use-phase. Attention is given to
                health, biodiversity, climate adaptation etc.
              </Typography>
              <Button
                style={{
                  color: '#698d29',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  alignContent: 'center',
                  textDecoration: 'none',
                  margin: '1rem 0 0 -0.75rem',
                }}
                size={'large'}
                component={Link}
                to="/partners/nl-greenlabel"
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <Typography
                  style={{
                    color: '#698d29',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  Learn more
                </Typography>
                <ArrowForward
                  style={{
                    marginLeft: '0.5em',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                />
              </Button>
            </Box>
            <Box style={{ marginTop: smallScreen ? '2rem' : 'unset' }}>
              <Box className={box2}></Box>
              <Typography
                style={{
                  marginTop: '1rem',
                  color: '#293845',
                  minHeight: '14rem',
                }}
              >
                Overstory applies artificial intelligence to high-resolution
                satellite imagery to provide real-time analytics of natural
                resources. Being part of HUGSI from the start, Overstory is our
                technology partner providing the green data for the index
                calculation.
              </Typography>
              <Button
                style={{
                  color: '#698d29',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  alignContent: 'center',
                  textDecoration: 'none',
                  margin: '1rem 0 0 -0.75rem',
                }}
                size={'large'}
                component={Link}
                to="/partners/overstory"
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <Typography
                  style={{
                    color: '#698d29',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  Learn more
                </Typography>
                <ArrowForward
                  style={{
                    marginLeft: '0.5em',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                />
              </Button>
            </Box>
            <Box style={{ marginTop: smallScreen ? '2rem' : 'unset' }}>
              <Box className={box3}></Box>
              <Typography
                style={{
                  marginTop: '1rem',
                  color: '#293845',
                  minHeight: '14rem',
                }}
              >
                PlanIT Geo™ offers urban forestry consulting, geospatial
                services and developed the cutting edge TreePlotter™ Software
                Suite to enable smarter, data-driven decision making for urban
                forests, parks, and arboriculture. As a HUGSI partner, PlanIT
                Geo is working to expand the awareness and impact of HUGSI
                worldwide and helping recruit new cities to join the platform.
              </Typography>
              <Button
                style={{
                  color: '#698d29',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  alignContent: 'center',
                  textDecoration: 'none',
                  margin: '1rem 0 0 -0.75rem',
                }}
                size={'large'}
                component={Link}
                to="/partners/planIT-geo"
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <Typography
                  style={{
                    color: '#698d29',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  Learn more
                </Typography>
                <ArrowForward
                  style={{
                    marginLeft: '0.5em',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
      <PartnerProducts title="Partner products" />
      <PartnerConnect />
    </>
  );
};
export default PartnerPage;