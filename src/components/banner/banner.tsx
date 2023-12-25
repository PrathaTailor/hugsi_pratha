import React from 'react';
import { Link } from 'gatsby';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Button, Box, useMediaQuery } from '@material-ui/core';
import CityComparisonLink from '../link/cities-comparison-link';
import { useStyles } from './style';

/**
 * Mail connect component
 */
const Banner = () => {
  const classes = useStyles({});
  const smallScreen = useMediaQuery('(max-width:900px)');
  const promoQuestion = 'Which city has more urban green space than Austin?';

  return (
    <Box className={smallScreen ? classes.smallRoot : classes.root}>
      <Box className={smallScreen ? classes.smallBox : classes.box}>
        <Box>{promoQuestion}</Box>
        <Box style={{ margin: smallScreen ? '0rem 1rem' : '2rem 0rem 0rem' }}>
          <Button className={classes.compareBtn}
            variant="contained"
            style={{
              color: '#fff',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: '#99c93c',
            }}
            size={'large'}
            component={Link}
            to="/compare/?_vs_"
          >
            <CityComparisonLink>
              <Box style={{ fontSize: smallScreen ? '1rem' : '1.2rem', color: '#fff' }}>
                Compare cities
              </Box>
            </CityComparisonLink>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
