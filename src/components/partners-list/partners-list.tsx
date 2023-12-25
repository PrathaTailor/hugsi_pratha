import React from 'react';
import { Link } from 'gatsby';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Box, Typography, Button, useMediaQuery } from '@material-ui/core';
import { useStyles } from './style';

/**
 * Category Winners component
 * @param cities - list of cities
 */
const PartnersList = props => {
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
        Our Partners {'&'} Friends
      </Typography>
      <Box className={smallScreen ? style.smallBoxWrapper : style.boxWrapper}>
        <Box>
          <Box className={style.box1}></Box>

          <Typography style={{ marginTop: '1rem', color: '#293845' }}>
            NL Greenlabel provides insight into the integral sustainability of
            areas, terrains and products. Starting from the value of green a
            project can be assisted to achieve its sustainability ambition from
            the design to use-phase. Attention is given to health, biodiversity,
            climate adaptation etc.
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
          <Box className={style.box2}></Box>
          <Typography style={{ marginTop: '1rem', color: '#293845' }}>
            Overstory applies artificial intelligence to high-resolution
            satellite imagery to provide real-time analytics of natural
            resources. Being part of HUGSI from the start, Overstory is our
            technology partner providing the green data for the index
            calculation.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PartnersList;