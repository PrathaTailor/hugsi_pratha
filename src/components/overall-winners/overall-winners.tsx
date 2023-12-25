import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, useMediaQuery, Box } from '@material-ui/core';
import { getOverallWinners } from '../../utils/city-utils';
import { City } from '../../models';
import CityLink from '../link/city-link';
import { Link } from 'gatsby';
import { useStyles } from './style';

interface Props {
  cities: City[];
}

/**
 * Overall Winners component
 * @param cities - list of cities
 */
const OverallWinners: React.FC<Props> = ({ cities }) => {
  const noCrown = useMediaQuery('(max-width:1200px)');
  const forFlex = useMediaQuery('(max-width:855px)');
  const smallScreen = useMediaQuery('(max-width:600px)');
  const { root, boxWrapper, box } = useStyles({});

  const boxAward = {
    fontSize: smallScreen ? '0.75rem' : '',
    fontWeight: 'fontWeightBold',
  };

  const boxWinner = {
    fontSize: smallScreen ? '1.25rem' : '',
    fontWeight: 'fontWeightBold',
  };

  const overallWinners = useMemo(() => getOverallWinners(cities), [cities]);

  return (
    <section className={root}>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>
        <Box fontWeight="fontWeightBold" color="#424242">
          Overall winners
        </Box>
      </Typography>
      <div
        style={{
          display: noCrown ? 'none' : 'flex',
          placeContent: 'center',
          placeItems: 'center',
          marginBottom: '0.5rem',
          fontSize: '2rem',
        }}
      >
        <i
          className="fas fa-crown"
          style={{ marginTop: '2rem', color: '#99c93c' }}
        />
      </div>
      <div className={boxWrapper}>
        {overallWinners.length > 1 && (
          <Link
            to={`/city/?${overallWinners[1].id}`}
            className={box}
            style={{
              height: '100px',
              width: '100%',
              backgroundColor: '#99c93c',
              color: 'white',
              borderRadius: '1rem',
              order: forFlex ? 2 : 0,
              textDecoration: 'none',
            }}
          >
            <>
              <Typography variant="subtitle1">
                <Box {...boxAward}>2nd Place</Box>
              </Typography>
              <Typography variant="h5" style={{ marginBottom: '1rem' }}>
                <Box {...boxWinner}>
                  <CityLink cityId={overallWinners[1].id}>
                    {overallWinners[1].id}
                  </CityLink>
                </Box>
              </Typography>
            </>
          </Link>
        )}
        {overallWinners.length > 0 && (
          <Link
            to={`/city/?${overallWinners[0].id}`}
            className={box}
            style={{
              height: '120px',
              width: '100%',
              backgroundColor: '#99c93c',
              color: 'white',
              borderRadius: '1rem',
              order: forFlex ? 1 : 0,
              textDecoration: 'none',
            }}
          >
            <>
              <div
                style={{
                  display: !noCrown ? 'none' : 'flex',
                  placeContent: 'center',
                  placeItems: 'center',
                  margin: '0.5rem 0 0.5rem 0',
                  fontSize: smallScreen ? '1rem' : '2rem',
                }}
              >
                <i
                  className="fas fa-crown"
                  style={{ marginTop: '2rem', color: 'white' }}
                />
              </div>
              <Typography variant="subtitle1">
                <Box {...boxAward}>1st Place</Box>
              </Typography>
              <Typography variant="h5" style={{ marginBottom: '1rem' }}>
                <Box {...boxWinner}>
                  <CityLink cityId={overallWinners[0].id}>
                    {overallWinners[0].id}
                  </CityLink>
                </Box>
              </Typography>
            </>
          </Link>
        )}
        {overallWinners.length > 2 && (
          <Link
            to={`/city/?${overallWinners[2].id}`}
            className={box}
            style={{
              height: '80px',
              width: '100%',
              backgroundColor: '#99c93c',
              color: 'white',
              borderRadius: '1rem',
              order: forFlex ? 3 : 0,
              textDecoration: 'none',
            }}
          >
            <>
              <Typography variant="subtitle1">
                <Box {...boxAward}>3rd Place</Box>
              </Typography>
              <Typography variant="h5" style={{ marginBottom: '1rem' }}>
                <Box {...boxWinner}>
                  <CityLink cityId={overallWinners[2].id}>
                    {overallWinners[2].id}
                  </CityLink>
                </Box>
              </Typography>
            </>
          </Link>
        )}
      </div>
    </section>
  );
};

export default observer(OverallWinners);
