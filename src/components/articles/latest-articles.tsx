import React from 'react';
import { Button, Box, Typography, useMediaQuery } from '@material-ui/core';
import { Link } from 'gatsby';
import { useStyles } from './style';

/**
 * Latest Articles component
 */

const LatestArticles = props => {
  const {
    box1,
    box2,
    box3,
    title,
    boxWrapper,
    smallTitle,
    overlay,
  } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <section style={{ margin: smallScreen ? 'unset' : '0 2rem' }}>
      <Typography
        variant={smallScreen ? 'h5' : 'h4'}
        style={{ margin: '2rem 0' }}
      >
        <Box fontWeight={'fontWeightBold'} color={'#424242'}>
          {props.titleHeader ? props.titleHeader : 'Latest Articles'}
        </Box>
      </Typography>
      <div className={boxWrapper}>
        <Button
          className={box1}
          to="/stories/greenness-does-not-come-by-itself"
          component={Link}
        >
          <Box className={overlay}>
            <Typography
              className={smallScreen ? smallTitle : title}
              variant={smallScreen ? 'h6' : 'h5'}
              style={{
                margin: '1rem auto',
                textAlign: 'center',
              }}
            >
              Greenness does not come by itself
            </Typography>
          </Box>
        </Button>

        <Button
          className={box2}
          to="/stories/the-green-KPIs-of-HUGSI"
          component={Link}
        >
          <Box className={overlay}>
            <Typography
              className={smallScreen ? smallTitle : title}
              variant={smallScreen ? 'h6' : 'h5'}
              style={{
                margin: '1rem auto',
                textAlign: 'center',
              }}
            >
              The Green KPI’s of HUGSI
            </Typography>
          </Box>
        </Button>
        <Button
          className={box3}
          to="/stories/is-the-world-getting-greener"
          component={Link}
        >
          <Box className={overlay}>
            <Typography
              className={smallScreen ? smallTitle : title}
              variant={smallScreen ? 'h6' : 'h5'}
              style={{
                margin: '1rem auto',
                textAlign: 'center',
              }}
            >
              Is the world getting greener?
            </Typography>
          </Box>
        </Button>
      </div>
      <div
        style={{
          margin: '2rem 0',
          display: 'flex',
          justifyContent: smallScreen ? 'center' : 'flex-end',
        }}
      >
        <Button
          variant="contained"
          color={'primary'}
          style={{
            color: 'white',
            margin: '1rem 0',
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#99c93c',
          }}
          size={'large'}
          to="/stories"
          component={Link}
        >
          See all articles
        </Button>
      </div>
    </section>
  );
};

export default LatestArticles;
