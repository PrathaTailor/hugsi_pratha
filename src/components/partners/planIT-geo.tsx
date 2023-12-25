import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, useMediaQuery } from '@material-ui/core';
import SEO from '../../hooks/seo';
import { Link, navigate } from 'gatsby';
import ArrowForward from '@material-ui/icons/ArrowForward';
// @ts-ignore
import planITGeoLogo from '../../images/planitgeo-logo.png';
// @ts-ignore
import planItGeoParks from '../../images/planitgeo-parks.png';
// @ts-ignore
import planItGeoInventory from '../../images/planitgeo-inventory.png';
// @ts-ignore
import planItGeoCanopy from '../../images/planitgeo-canopy.png';
// @ts-ignore
import planITGeoDenver from '../../images/planitgeo-denver.png';
import PartnerConnect from '../mail-connect/partner-connect';
import { useStyles } from './style';

/**
 * About Page
 * @file about.tsx the How it works
 */
const PlanItGeoDetails = () => {
  const smallScreen = useMediaQuery('(max-width:650px)');
  const {
    root,
    rootWrapper,
    center,
    twoCols,
  } = useStyles({});
  const isSubscribed =
    typeof window !== 'undefined' &&
    localStorage.getItem('isUserSubscribed') === 'Yes';
  const box = {
    fontWeight: 'fontWeightBold',
    color: '#424242',
  };
  const productHash = typeof window !== 'undefined' && window.location.hash;
  const products = [
    '#treePlotterCanopy',
    '#treePlotterInventory',
    '#treePlotterParks',
    '#urbanForestryConsulting',
  ];

  useEffect(() => {
    if (productHash) {
      if (!products.includes(productHash)) {
        navigate('/404', { replace: true });
      } else {
        const executeScroll = elemToScrollTo => {
          elemToScrollTo.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        };
        const elemToScrollTo = document.getElementById(productHash.slice(1));
        elemToScrollTo && executeScroll(elemToScrollTo);
      }
    }
  }, [productHash]);

  // @ts-ignore
  return (
    <section>
      <SEO
        title="PlanIT Geo"
        description={`Mapping The World’s Urban Forests for a Greener Future ​`}
      />
      <div>
        <img
          src={planITGeoDenver}
          width="100%"
          height={smallScreen ? '300rem' : '500rem'}
          style={{
            margin: '100px 0 0'
          }}
        />
      </div>
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
                  / PlanIT Geo
                </span>
              </Box>
            </Typography>
          </div>
          <div className={twoCols}>
            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box {...box} className={'heading'}>
                  Mapping The World’s Urban Forests for a Greener Future
                </Box>
              </Typography>
              <Typography
                variant={'subtitle1'}
                style={{ margin: smallScreen ? '2rem auto' : '1rem auto' }}
              >
                PlanIT Geo™ is a global urban forestry consulting and software
                development firm. Founded in 2012 to address the growing
                technical divide between urban forestry professionals and the
                tree and canopy data that could make their jobs easier. To
                bridge that gap we developed the TreePlotter™ software suite to
                make urban forestry data collection and management faster, with
                less technical hurdles, and more accessible and interactive for
                professionals and the general public.
              </Typography>

              <Typography variant={'subtitle1'} style={{ margin: '1rem auto' }}>
                The powerful, yet easy-to-use software was quickly embraced by
                the industry and we now have 350 software clients in the public,
                private, and nonprofit sectors across 20 different countries. We
                also offer tree inventory, urban forestry consulting, and
                geospatial mapping services in addition to our subscription
                software products. To keep pace with client demand we’ve grown
                quickly, and have 35 employees who specialize in GIS, software
                development, urban forestry, tree care, finance, administration,
                and SaaS.
              </Typography>

              <Typography variant={'subtitle1'} style={{ margin: '1rem auto' }}>
                Through this growth and evolution we’ve remained relentless in
                our pursuit of customer-driven innovations to foster better
                management of green infrastructure and broader awareness of the
                triple bottom line benefits (social, economic, and
                environmental) of nature-based solutions. We will continue to
                work hard to enable governments to spend public funds
                efficiently and transparently, for tree care businesses to grow
                and meet client needs, for consultants to provide professional
                services, data, and recommendations, and foundations to assist
                cities in engaging the public and other stakeholders. The scale
                may be changing, but the mission remains the same: mapping the
                world’s urban forests for a greener future.{' '}
              </Typography>
            </section>
            <section>
              <Box display="flex" flexDirection="column">
                <a
                  href="https://planitgeo.com/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page"
                  target="_blank"
                >
                  <img
                    src={planITGeoLogo}
                    style={{
                      width: '20rem',
                      height: '5rem',
                      marginBottom: smallScreen ? 'unset' : '3rem',
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
        <Typography
          variant={smallScreen ? 'subtitle1' : 'h5'}
          style={{
            textAlign: 'center',
            lineHeight: '2.5rem ',
            fontWeight: 'bold',
            width: smallScreen ? '18rem' : '50rem',
          }}
        >
          “We all know how important urban trees are for the wellbeing of people
          living in the cities. PlanIT Geo comes with great solutions, knowledge
          and experience how you as a city can form policy’s, track and manage
          the canopy of your city. Together we can strengthen our respective
          offerings and for us at HUGSI this means that we can share more
          insights about the tree canopy to benefit all HUGSI-cities.”
        </Typography>
        <Typography variant={'subtitle1'} style={{ margin: '1rem 0 2rem' }}>
          — Team HUGSI
        </Typography>
      </Box>
      <div className={rootWrapper} id="treePlotterCanopy">
        <div
          className={root}
          style={{
            padding: smallScreen ? '0 1rem' : '0 auto',
            margin: smallScreen ? '0 1rem' : '0 auto',
          }}
        >
          <div className={twoCols}>
            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box {...box} className={'heading'}>
                  TreePlotter CANOPY™
                </Box>
              </Typography>
              <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
                Urban tree canopy assessments should be easy and affordable so
                you can spend more time on planning, management, operations, and
                community engagement. That’s why we partnered with EarthDefine
                to analyze high-resolution land cover imagery across the country
                and deliver data and software in days, not months. We’ve removed
                the traditional technical hurdles of canopy assessments and
                there is no longer need for GIS staff to analyze or scope out an
                assessment. An annual subscription brings you current and
                historical canopy cover in the TreePlotter CANOPY software
                interface so that you can view, plan and grow your urban forest
                canopy.
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
                  margin: '0 0 0 -0.75rem',
                }}
                size={'large'}
              >
                <a
                  href="https://planitgeo.com/treeplotter-canopy/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-canopy"
                  target="_blank"
                  style={{
                    display: 'flex',
                    textDecoration: 'none',
                    color: '#698d29',
                  }}
                >
                  <Typography
                    style={{
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
                </a>
              </Button>
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
                  // float: smallScreen ? 'unset' : 'right',
                  margin: 'auto',
                }}
              >
                <a
                  href={
                    'https://planitgeo.com/treeplotter-canopy/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-canopy'
                  }
                  target="_blank"
                >
                  <img
                    src={planItGeoCanopy}
                    width={smallScreen ? '300px' : '500px'}
                    height={smallScreen ? '100px' : '150px'}
                    alt={'PlanIT Geo Canopy'}
                  />
                </a>
              </Box>
            </div>
          </div>
        </div>
        <div className={rootWrapper}>
          <div className={root} style={{ margin: '0 auto' }}>
            <div className={twoCols}>
              <div
                style={{
                  width: 'auto',
                  gridRow: smallScreen ? 2 : 1,
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
                className={center}
              >
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  style={{
                    // float: smallScreen ? 'unset' : 'left',
                    margin: 'auto',
                  }}
                >
                  <a
                    href="https://planitgeo.com/treeplotter-inventory/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-inventory"
                    target="_blank"
                  >
                    <img
                      src={planItGeoInventory}
                      width={smallScreen ? '320px' : '600px'}
                      height={smallScreen ? '100px' : '150px'}
                      alt={'PlanIT Geo Inventory'}
                      id="treePlotterInventory"
                    />
                  </a>
                </Box>
              </div>
              <section>
                <Typography variant={smallScreen ? 'h5' : 'h4'}>
                  <Box
                    {...box}
                    className={'heading'}
                    style={{ marginTop: smallScreen ? 'unset' : '2rem' }}
                  >
                    TreePlotter INVENTORY™
                  </Box>
                </Typography>
                <Typography
                  variant={'subtitle1'}
                  style={{ margin: '2rem auto' }}
                >
                  TreePlotter INVENTORY is used globally as a comprehensive GIS
                  tree management software application for urban asset mapping,
                  reporting, crowdsourcing, and maintenance tracking. It’s
                  designed to be quickly mastered but is also laden with enough
                  features, add-on modules, and scalable product levels to meet
                  the needs of any organization. These flexible options include
                  offline data collection, ecosystem benefit calculations, and
                  advanced tree risk assessment forms all integrated right into
                  the application.Through INVENTORY you can create tree maps
                  that tell a compelling story, with color coded data points,
                  and share via interactive web maps.
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
                    margin: '0 0 0 -0.75rem',
                  }}
                  size={'large'}
                >
                  <a
                    href="https://planitgeo.com/treeplotter-inventory/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-inventory"
                    target="_blank"
                    style={{
                      display: 'flex',
                      textDecoration: 'none',
                      color: '#698d29',
                    }}
                  >
                    <Typography
                      style={{
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
                  </a>
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className={rootWrapper}>
        <div
          className={root}
          style={{
            padding: smallScreen ? '0 1rem' : '0 auto',
            margin: smallScreen ? '0 1rem' : '0 auto',
          }}
        >
          <div className={twoCols} id="treePlotterParks">
            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box {...box} className={'heading'}>
                  TreePlotter PARKS™
                </Box>
              </Typography>
              <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
                TreePlotter PARKS is an enterprise GIS system for park asset
                management, mapping, inspections, and maintenance tracking.
                Features include paperless work orders and service requests that
                can be updated live in the field, unlimited user accounts at all
                product levels, and customizable data fields and dropdown menus
                for park boundaries, amenities, playgrounds, irrigation, and
                other asset types. Staff and contractors can access data and
                work orders in the field from any device. PARKS also includes
                TreePlotter INVENTORY, providing a single system for parks,
                recreation, and urban forestry asset management.
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
                  margin: '0 0 0 -0.75rem',
                }}
                size={'large'}
              >
                <a
                  href="https://planitgeo.com/treeplotter-parks/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-parks"
                  target="_blank"
                  style={{
                    display: 'flex',
                    textDecoration: 'none',
                    color: '#698d29',
                  }}
                >
                  <Typography
                    style={{
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
                </a>
              </Button>
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
                  // float: smallScreen ? 'unset' : 'right',
                  margin: 'auto',
                }}
              >
                <a
                  href={
                    'https://planitgeo.com/treeplotter-parks/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-parks'
                  }
                  target="_blank"
                >
                  <img
                    src={planItGeoParks}
                    width={smallScreen ? '300px' : '450px'}
                    height={smallScreen ? '100px' : '150px'}
                    alt={'PlanIT Geo Parks'}
                  />
                </a>
              </Box>
            </div>
          </div>
        </div>
        <div className={root} style={{ margin: '0 auto' }}>
          <div className={twoCols}>
            <div
              style={{
                width: 'auto',
                gridRow: smallScreen ? 2 : 1,
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              className={center}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                style={{
                  margin: 'auto',
                }}
              >
                <a
                  href="https://planitgeo.com/urban-forestry-consulting-services/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-consulting"
                  target="_blank"
                >
                  <img
                    src={planITGeoLogo}
                    width={smallScreen ? '300px' : '500px'}
                    height={smallScreen ? '100px' : '150px'}
                    alt={'PlanIT Geo Logo'}
                  />
                </a>
              </Box>
            </div>

            <section id="urbanForestryConsulting">
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box
                  {...box}
                  className={'heading'}
                  style={{ marginTop: smallScreen ? 'unset' : '2rem' }}
                >
                  PlanIT Geo™ Urban Forestry Consulting
                </Box>
              </Typography>
              <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
                PlanIT Geo’s urban forestry consulting team has worked with
                governments of all sizes, from small communities to major
                metros, and can be your urban forestry partner every step of the
                way. We provide an integrative approach to guide your urban
                forestry program from tactical management, community engagement,
                budget planning, tree inventory data collection, urban canopy
                action planning, software provider, and support. Our team works
                to prepare plans by learning about your needs and desires and
                the available tree resources, delivering you the most effective
                and useful plan to achieve maximum, long-term benefits.
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
                  margin: '0 0 0 -0.75rem',
                }}
                size={'large'}
              >
                <a
                  href="https://planitgeo.com/urban-forestry-consulting-services/?utm_campaign=hugsi-partner&utm_source=hugsi&utm_medium=partners&utm_content=geo-partner-page-product-consulting"
                  target="_blank"
                  style={{
                    display: 'flex',
                    textDecoration: 'none',
                    color: '#698d29',
                  }}
                >
                  <Typography
                    style={{
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
                </a>
              </Button>
            </section>
          </div>
        </div>
      </div>
      <PartnerConnect />
    </section>
  );
};

export default PlanItGeoDetails;