import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useMediaQuery, Typography, Box } from '@material-ui/core';
import { getCategoryWinners } from '../../utils/city-utils';
import { City } from '../../models';
import ImageTooltip from '../image-tooltip/image-tooltip';
import InfoTooltip from '../info-tooltip/info-tooltip';
import { useStyles, box } from './style';


interface Props {
  cities: City[];
  city: any;
  categoryGlobalWinners: any;
}

/**
 * Category Winners component
 * @param cities - list of cities
 */
const AchievementBadges: React.FC<Props> = ({
  city,
  cities,
  categoryGlobalWinners,
}) => {
  const categoryWinners = useMemo(() => getCategoryWinners(cities), [cities]);
  const style = useStyles({});
  const smallScreen = useMediaQuery('(max-width:900px)');
  const isGlobalWinner = (cityId: string, globalWinnerCities: object) => {
    const globalWinnersArray = Object.values(globalWinnerCities);
    const globalWinners = globalWinnersArray.map(
      globalWinner => globalWinner.id
    );
    return globalWinners.includes(cityId);
  };

  const isRegionalWinner = (cityId: string, categoryWinners) => {
    return (
      city.id === categoryWinners.greenSpace.id ||
      city.id === categoryWinners.healthOfVegetation.id ||
      city.id === categoryWinners.greenSpacePerCapita.id ||
      city.id === categoryWinners.distributionOfGreen.id ||
      city.id === categoryWinners.trees.id ||
      city.id === categoryWinners.grass.id
    );
  };

  // Todo: loading? Spinner should in that case be in index.tsx
  if (
    !categoryWinners ||
    (categoryWinners &&
      !isGlobalWinner(city, categoryGlobalWinners) &&
      !isRegionalWinner(city, categoryWinners))
  ) {
    return <div />;
  }

  return (
    <Box style={{ margin: '1rem auto' }}>
      <Box
        {...box}
        style={{
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Typography
          variant={smallScreen ? 'subtitle1' : 'h5'}
          style={{
            fontWeight: 'bold',
          }}
        >
          Achievements
        </Typography>
        <Box
          style={{
            paddingTop: '0.5rem',
            marginLeft: '0.2rem',
          }}
        >
          <InfoTooltip
            title="Achievements"
            details="All cities that have a top score for any KPI on global or regional level will be awarded with an achievements badge."
          />
        </Box>
      </Box>
      <Box
        className={style.achvroot}
        style={{ gridGap: smallScreen ? '0.8rem' : '1rem' }}
      >
        {city.id === categoryGlobalWinners.greenSpace.id && (
          <Box>
            <ImageTooltip
              title="Best green space percentage"
              details="Global level"
              badgeId={'badge-world-percentage'}
            />
          </Box>
        )}
        {city.id === categoryGlobalWinners.healthOfVegetation.id && (
          <Box>
            <ImageTooltip
              title="Best health vegetation"
              details="Global level"
              badgeId={'badge-world-health'}
            />
          </Box>
        )}
        {city.id === categoryGlobalWinners.greenSpacePerCapita.id && (
          <Box>
            <ImageTooltip
              title="Best green space per capita"
              details="Global level"
              badgeId={'badge-world-per-capita'}
            />
          </Box>
        )}
        {city.id === categoryGlobalWinners.distributionOfGreen.id && (
          <Box>
            <ImageTooltip
              title="Best green distribution"
              details="Global level"
              badgeId={'badge-world-distribution'}
            />
          </Box>
        )}
        {city.id === categoryGlobalWinners.trees.id && (
          <Box>
            <ImageTooltip
              title="Best coverage of trees"
              details="Global level"
              badgeId={'badge-world-trees'}
            />
          </Box>
        )}
        {city.id === categoryGlobalWinners.grass.id && (
          <Box>
            <ImageTooltip
              title="Best coverage of grass"
              details="Global level"
              badgeId={'badge-world-grass'}
            />
          </Box>
        )}
        {city.id === categoryWinners.greenSpace.id && (
          <Box>
            <ImageTooltip
              title="Best coverage of grass"
              details="Regional level"
              badgeId={'badge-region-percentage'}
            />
          </Box>
        )}
        {city.id === categoryWinners.healthOfVegetation.id && (
          <Box>
            <ImageTooltip
              title="Best health vegetation"
              details="Regional level"
              badgeId={'badge-region-health'}
            />
          </Box>
        )}
        {city.id === categoryWinners.greenSpacePerCapita.id && (
          <Box>
            <ImageTooltip
              title="Best green space per capita"
              details="Regional level"
              badgeId={'badge-region-per-capita'}
            />
          </Box>
        )}
        {city.id === categoryWinners.distributionOfGreen.id && (
          <Box>
            <ImageTooltip
              title="Best green distribution"
              details="Regional level"
              badgeId={'badge-region-distribution'}
            />
          </Box>
        )}
        {city.id === categoryWinners.trees.id && (
          <Box>
            <ImageTooltip
              title="Best coverage of trees"
              details="Regional level"
              badgeId={'badge-region-trees'}
            />
          </Box>
        )}
        {city.id === categoryWinners.grass.id && (
          <Box>
            <ImageTooltip
              title="Best coverage of grass"
              details="Regional level"
              badgeId={'badge-region-grass'}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default observer(AchievementBadges);
