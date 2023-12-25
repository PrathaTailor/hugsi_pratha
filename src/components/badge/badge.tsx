import React from 'react';
import { Box } from '@material-ui/core';
import { rankingInWord } from 'utils/city-utils';
import { City } from '../../models';
// @ts-ignore
import badge from '../../images/badge.png';

interface Props {
  smallScreen: boolean;
  city: City;
  prevDataOfCity?: City;
  style?: React.CSSProperties;
}

/**
 * Badge component
 * @param smallScreen - checks if user is on mobile
 * @param city - city that has details
 * @param style - css properties
 * @param prevDataOfCity - previous data of city
 */
const Badge: React.FC<Props> = ({
  smallScreen,
  city,
  style,
  prevDataOfCity,
}) => {
  return (
    <div className="Badge" style={style}>
      <div style={{ position: 'relative' }}>
        <img
          src={badge}
          alt=""
          style={{
            height: smallScreen ? '150px' : '225px',
          }}
        />
        <div
          style={{ position: 'absolute', top: smallScreen ? '37.5px' : '50px' }}
        >
          <Box
            color="#fff"
            width={smallScreen ? '150px' : '225px'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{ paddingRight: smallScreen ? '2.5rem' : '3.50rem' }}
          >
            <div>
              <Box
                fontWeight={'fontWeightBold'}
                marginTop={smallScreen ? '0.56rem' : '0.75rem'}
                fontSize={smallScreen ? '0.56rem' : '0.9rem'}
              >
                Overall
              </Box>
            </div>
            <div>
              <Box
                display="inline-block"
                fontSize={smallScreen ? '1.5rem' : '3rem'}
                height={smallScreen ? '1.5rem' : '3rem'}
                fontWeight={'fontWeightBold'}
              >
                {city.index_ranking}
                {rankingInWord(city.index_ranking)}
              </Box>
            </div>
            <div>
              <Box
                fontSize={smallScreen ? '0.56rem' : '0.9rem'}
                fontWeight={'fontWeightBold'}
              >
                place
              </Box>
            </div>
            <Box
              marginTop={smallScreen ? '0.5rem' : '0.75rem'}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box fontSize={smallScreen ? '0.56rem' : '0.9rem'}>
                <span>
                  {prevDataOfCity.index_ranking < city.index_ranking ? (
                    <i
                      className="fas fa-arrow-up"
                      title="ranked higher than previous year"
                    />
                  ) : prevDataOfCity.index_ranking === city.index_ranking ? (
                    <i
                      className="fas fa-arrow-right"
                      title="no changes in ranking"
                    />
                  ) : (
                    <i
                      className="fas fa-arrow-down"
                      title="ranked lower than previous year"
                    />
                  )}
                </span>{' '}
                {new Date().getFullYear() - 1}
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default Badge;
