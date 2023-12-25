import React from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, useMediaQuery, Button, Box } from '@material-ui/core';
import { Link } from 'gatsby';
import Counter from '../counter/counter';
import { City } from '../../models';
import { useStyles } from './style';

interface Props {
  cities: City[];
}

/**
 * Intro Text component
 * @param cities - list of cities
 */
const IntroText: React.FC<Props> = ({ cities }) => {
  const { smallRoot, root } = useStyles({});
  const smallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <div className={smallScreen ? smallRoot : root}>
      <section
        style={{
          marginTop: smallScreen ? '8rem' : '12rem',
          marginLeft: smallScreen ? '0rem' : '2rem',
        }}
      >
        <div style={{ maxWidth: '30rem', color: '#ffffff' }}>
          <Box>Husqvarna Urban Green Space Index</Box>
          <Typography variant={'h5'}>
            <Box
              fontWeight={'fontWeightBold'}
              fontSize={smallScreen ? '1.5rem' : '2.75rem'}
              lineHeight={smallScreen ? '2rem' : '3.5rem'}
            >
              Quantifying the greenness of global cities
            </Box>
          </Typography>
          <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
            By applying computer vision and deep learning techniques on
            satellite images, HUGSI measures and analyzes urban green space in
            select cities across the globe.
          </Typography>
        </div>
        <Box
          style={{
            display: 'flex',
            flexDirection: smallScreen ? 'column' : 'row',
            alignItems: 'center',
            color: '#ffffff',
          }}
        >
          <Box
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            How green is your city?
          </Box>
          <Box className={smallScreen ? 'smallBtnContainer' : 'btnContainer'}>
            <Button
              variant="contained"
              style={{
                color: '#293845',
                margin: smallScreen ? '1rem' : '2rem',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
              }}
              size={'large'}
              component={Link}
              to="/ranking"
            >
              To the ranking
            </Button>
            <Button
              variant="outlined"
              color={'primary'}
              style={{
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '8px',
                color: '#ffffff',
                textDecoration: 'none',
                borderColor: '#ffffff',
              }}
              size={'large'}
              component={Link}
              to="/about"
            >
              How it works
            </Button>
          </Box>
        </Box>
        <Counter cities={cities} />
      </section>
      <section></section>
    </div>
  );
};

export default observer(IntroText);
