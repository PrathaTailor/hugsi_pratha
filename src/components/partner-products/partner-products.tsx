import { Box, Button, Paper, Typography, useMediaQuery } from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Link } from 'gatsby';
import React from 'react';
// @ts-ignore
import logo_nl_gl_small from '../../images/logo-nl-greenlabel@3x.jpg';
// @ts-ignore
import planItGeoCanopy from '../../images/planitgeo-canopy.png';
// @ts-ignore
import planItGeoInventory from '../../images/planitgeo-inventory.png';
// @ts-ignore
import planItGeoLogo from '../../images/planitgeo-logo.png';
// @ts-ignore
import planItGeoParks from '../../images/planitgeo-parks.png';
import { useStyles } from './style';

/**
 * Category Winners component
 * @param cities - list of cities
 */
const PartnerProducts = props => {
  const style = useStyles({});
  const smallScreen = useMediaQuery('(max-width:650px)');

  return (
    <Box
      className={style.contentWrapper}
      style={{
        margin: '2rem auto',
      }}
    >
      <Typography
        variant={'h4'}
        style={{
          fontWeight: 'bold',
          margin: smallScreen ? '6rem 1rem 2rem' : '6rem 2rem 2rem',
          fontSize: smallScreen ? '1.5rem' : '2rem',
        }}
      >
        {props.title}
      </Typography>
      <Box
        className={smallScreen ? style.smallBoxWrapper : style.boxWrapper}
        style={{
          margin: smallScreen ? 'auto 1rem' : 'auto 2rem',
        }}
      >
        <Box>
          <Paper elevation={3} style={{ padding: '1rem', minHeight: '32rem' }}>
            <Box
              display="flex"
              flex-direction="row"
              style={{ justifyContent: 'space-between' }}
            >
              <Box className={style.box}>
                <i
                  className="fa fa-flag fa-lg"
                  aria-hidden="true"
                  style={{ color: '#698d29' }}
                ></i>
              </Box>
              <Box style={{ margin: '1rem 0' }}>
                <img
                  src={logo_nl_gl_small}
                  alt="logo_nl_gl_small"
                  style={{
                    height: '3rem',
                    width: '10rem',
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant={'h6'}
              style={{
                marginTop: '1rem',
                color: '#293845',
                fontWeight: 'bold',
              }}
            >
              Self-assessment tool
            </Typography>

            <Typography
              style={{
                marginTop: '1rem',
                color: '#293845',
                minHeight: '16rem',
              }}
            >
              Get insight into the sustainability of your terrain. The
              self-assessment tool gives a sustainability score to your project,
              but more importantly, it helps you to ask to check if all relevant
              aspects are sustainable. This tool helps you to create a more
              healthy and liveable terrain. It is available{' '}
              {
                <a
                  href={'/nl-green-label-self-assessment'}
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    color: '#698d29',
                  }}
                >
                  {'here.'}
                </a>
              }
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
              onClick={() => {
                window.scroll({
                  top: smallScreen
                    ? 0.29 * document.body.scrollHeight
                    : 0.48 * document.body.scrollHeight,

                  left: 0,
                  behavior: 'smooth',
                });
              }}
              size={'large'}
              component={Link}
              to="/partners/nl-greenlabel"
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
          </Paper>
        </Box>

        <Box>
          <Paper elevation={3} style={{ padding: '1rem', minHeight: '32rem' }}>
            <Box
              display="flex"
              flex-direction="row"
              style={{ justifyContent: 'space-between' }}
            >
              <Box
                style={{
                  width: '4rem',
                  height: '4rem',
                  background: '#99c93c',
                  borderRadius: '2rem',
                  display: 'flex',
                  placeContent: 'center',
                  placeItems: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  margin: 'auto 0rem',
                }}
              >
                <i
                  className="fa fa-flag fa-lg"
                  aria-hidden="true"
                  style={{ color: '#698d29' }}
                ></i>
              </Box>
              <Box style={{ margin: '1rem 0' }}>
                <img
                  src={logo_nl_gl_small}
                  alt=""
                  style={{
                    height: '3rem',
                    width: '10rem',
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant={'h6'}
              style={{
                marginTop: '1rem',
                color: '#293845',
                fontWeight: 'bold',
              }}
            >
              Green Passports
            </Typography>

            <Typography
              style={{
                marginTop: '1rem',
                color: '#293845',
                minHeight: '16rem',
              }}
            >
              NL Greenlabel gives out passports to provide insight into the
              sustainability of products, terrains and areas. The passports are
              not a goal on their own, but a tool to work on sustainability and
              an objective method to communicate the quality and environmental
              impact to users.
            </Typography>

            <Button
              style={{
                color: '#698d29',
                textTransform: 'none',
                fontWeight: 'bold',
                margin: '1rem 0 0 -0.75rem',
                backgroundColor: 'white',
                alignItems: 'center',
                alignContent: 'center',
                textDecoration: 'none',
              }}
              onClick={() => {
                window.scrollTo({
                  top: smallScreen
                    ? 0.39 * document.body.scrollHeight
                    : 0.6 * document.body.scrollHeight,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              size={'large'}
              component={Link}
              to="/partners/nl-greenlabel"
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
          </Paper>
        </Box>

        <Box>
          <div>
            <Paper
              elevation={3}
              style={{ padding: '1rem', minHeight: '32rem' }}
            >
              <Box
                display="flex"
                flex-direction="row"
                style={{ justifyContent: 'space-between' }}
              >
                <Box style={{ margin: '1rem auto' }}>
                  <img
                    src={planItGeoCanopy}
                    alt=""
                    style={{
                      height: '3rem',
                      width: '10rem',
                    }}
                  />
                </Box>
              </Box>
              <Typography
                variant={'h6'}
                style={{
                  marginTop: '1rem',
                  color: '#293845',
                  fontWeight: 'bold',
                }}
              >
                TreePlotter CANOPY™
              </Typography>

              <Typography
                style={{
                  marginTop: '1rem',
                  color: '#293845',
                  minHeight: '16rem',
                }}
              >
                Urban tree canopy assessments should be easy and affordable. To
                make that a reality we analyzed high-resolution land cover
                imagery across the country and can now deliver canopy data in
                days, not months. With TreePlotter CANOPY software you can view,
                plan and grow your urban forest canopy in one easy-to-use
                application.
              </Typography>

              <Button
                style={{
                  color: '#698d29',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  margin: '1rem 0 0 -0.75rem',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  alignContent: 'center',
                  textDecoration: 'none',
                }}
                onClick={() => {
                  window.scroll({
                    top: smallScreen
                      ? 0.52 * document.body.scrollHeight
                      : 0.6 * document.body.scrollHeight,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
                size={'large'}
                component={Link}
                to="/partners/planIT-geo#treePlotterCanopy"
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
            </Paper>
          </div>
        </Box>

        <Box>
          <Paper elevation={3} style={{ padding: '1rem', minHeight: '32rem' }}>
            <Box
              display="flex"
              flex-direction="row"
              style={{ justifyContent: 'space-between' }}
            >
              <Box style={{ margin: '1rem auto' }}>
                <img
                  src={planItGeoInventory}
                  alt=""
                  style={{
                    height: '3rem',
                    width: '12rem',
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant={'h6'}
              style={{
                marginTop: '1rem',
                color: '#293845',
                fontWeight: 'bold',
              }}
            >
              TreePlotter INVENTORY™
            </Typography>

            <Typography
              style={{
                marginTop: '1rem',
                color: '#293845',
                minHeight: '16rem',
              }}
            >
              TreePlotter INVENTORY™ is a comprehensive GIS tree management
              software application for field data collection and data
              management. With unlimited users able to access and input data,
              scalable product levels, and an array of add-on modules this
              application can fit the needs of any organization.
            </Typography>

            <Button
              style={{
                color: '#698d29',
                textTransform: 'none',
                fontWeight: 'bold',
                margin: '1rem 0 0 -0.75rem',
                backgroundColor: 'white',
                alignItems: 'center',
                alignContent: 'center',
                textDecoration: 'none',
              }}
              onClick={() => {
                window.scroll({
                  top: smallScreen
                    ? 0.52 * document.body.scrollHeight
                    : 0.55 * document.body.scrollHeight,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              size={'large'}
              component={Link}
              to="/partners/planIT-geo#treePlotterInventory"
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
          </Paper>
        </Box>

        <Box>
          <Paper elevation={3} style={{ padding: '1rem', minHeight: '32rem' }}>
            <Box
              display="flex"
              flex-direction="row"
              style={{ justifyContent: 'space-between' }}
            >
              <Box style={{ margin: '1rem auto' }}>
                <img
                  src={planItGeoParks}
                  alt=""
                  style={{
                    height: '3rem',
                    width: '10rem',
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant={'h6'}
              style={{
                marginTop: '1rem',
                color: '#293845',
                fontWeight: 'bold',
              }}
            >
              TreePlotter PARKS™
            </Typography>

            <Typography
              style={{
                marginTop: '1rem',
                color: '#293845',
                minHeight: '16rem',
              }}
            >
              TreePlotter PARKS maps and documents your parks and playgrounds to
              simplify management and maintenance operations so you can grow and
              evolve as your surrounding community does too. This GIS-based,
              all-in-one mobile web app also includes TreePlotter INVENTORY,
              providing a single system for parks, recreation, and urban
              forestry asset management.
            </Typography>

            <Button
              style={{
                color: '#698d29',
                textTransform: 'none',
                fontWeight: 'bold',
                margin: '1rem 0 0 -0.75rem',
                backgroundColor: 'white',
                alignItems: 'center',
                alignContent: 'center',
                textDecoration: 'none',
              }}
              onClick={() => {
                window.scroll({
                  top: smallScreen
                    ? 0.52 * document.body.scrollHeight
                    : 0.6 * document.body.scrollHeight,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              size={'large'}
              component={Link}
              to="/partners/planIT-geo/#treePlotterParks"
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
          </Paper>
        </Box>

        <Box>
          <Paper elevation={3} style={{ padding: '1rem', minHeight: '32rem' }}>
            <Box
              display="flex"
              flex-direction="row"
              style={{ justifyContent: 'space-between' }}
            >
              <Box style={{ margin: '1rem auto' }}>
                <img
                  src={planItGeoLogo}
                  alt=""
                  style={{
                    height: '3rem',
                    width: '10rem',
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant={'h6'}
              style={{
                marginTop: '1rem',
                color: '#293845',
                fontWeight: 'bold',
              }}
            >
              PlanIT Geo™ Urban Forestry Consulting
            </Typography>

            <Typography
              style={{
                marginTop: '1rem',
                color: '#293845',
                minHeight: '14rem',
              }}
            >
              Our consulting team can be your urban forestry partner at every
              step of the journey. We provide an integrative approach to guide
              your urban forestry program from tactical management, community
              engagement, budget planning, tree inventory data collection, urban
              canopy action planning, software, and support.
            </Typography>

            <Button
              style={{
                color: '#698d29',
                textTransform: 'none',
                fontWeight: 'bold',
                margin: '1rem 0 0 -0.75rem',
                backgroundColor: 'white',
                alignItems: 'center',
                alignContent: 'center',
                textDecoration: 'none',
              }}
              onClick={() => {
                window.scroll({
                  top: smallScreen
                    ? 0.52 * document.body.scrollHeight
                    : 0.6 * document.body.scrollHeight,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              size={'large'}
              component={Link}
              to="/partners/planIT-geo/#urbanForestryConsulting"
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
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PartnerProducts;