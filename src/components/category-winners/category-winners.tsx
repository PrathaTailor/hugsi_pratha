import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import { getCategoryWinners } from '../../utils/city-utils';
import { City } from '../../models';
import CityLink from '../link/city-link';
import { IconBulletWrapper, IconBullet } from '../icon-bullets/index';
// @ts-ignore
import iconPercentage from '../../images/icon-percentage.png';
// @ts-ignore
import iconHealth from '../../images/icon-health.png';
// @ts-ignore
import iconDistribution from '../../images/icon-distribution.png';
// @ts-ignore
import iconCapita from '../../images/icon-capita.png';
// @ts-ignore
import iconTrees from '../../images/icon-trees.png';
// @ts-ignore
import iconGrass from '../../images/icon-grass.png';
import { box, useStyles } from './style';

interface Props {
  cities: City[];
}

/**
 * Category Winners component
 * @param cities - list of cities
 */
const CategoryWinners: React.FC<Props> = ({ cities }) => {
  const categoryWinners = useMemo(() => getCategoryWinners(cities), [cities]);
  const smallScreen = useMediaQuery('(max-width:960px)');
  const style = useStyles({});
  // Todo: loading? Spinner should in that case be in index.tsx
  if (!categoryWinners) {
    return <div />;
  }

  return (
    <section className={smallScreen ? style.smallRoot : style.root}>
      <Typography variant={smallScreen ? 'h5' : 'h4'}>
        <Box
          style={{ margin: smallScreen ? '7rem 0 1rem' : '4rem 0 0' }}
          {...box}
        >
          Recognized Achievements
        </Box>
      </Typography>
      <IconBulletWrapper>
        <IconBullet
          title="Highest percentage of urban green space"
          iconName={iconPercentage}
          content={
            <CityLink cityId={categoryWinners.greenSpace.id}>
              {categoryWinners.greenSpace.id}
            </CityLink>
          }
          infoToolTipTitle="Percentage of urban green space"
          infoToolTipDetails="Area size of green space divided by size of total urban area of a city."
        />
        <IconBullet
          title="Best health of urban vegetation"
          iconName={iconHealth}
          content={
            <CityLink cityId={categoryWinners.healthOfVegetation.id}>
              {categoryWinners.healthOfVegetation.id}
            </CityLink>
          }
          infoToolTipTitle="Average health of urban vegetation"
          infoToolTipDetails="HUGSI measures health of
vegetation with NDVI, a widely used indicator of vegetation health
based on the absorption of visible and invisible light. NDVI value of
living vegetation ranges from 0 to 1."
        />
        <IconBullet
          title="Best distribution of urban green space"
          iconName={iconDistribution}
          content={
            <CityLink cityId={categoryWinners.distributionOfGreen.id}>
              {categoryWinners.distributionOfGreen.id}
            </CityLink>
          }
          infoToolTipTitle="Distribution of urban green space"
          infoToolTipDetails="In our approach, the urban area of a city is
               divided into geographical grids with size of 250m * 250m hexagon.
                HUGSI measures distribution of green space based on the median
                 percentage of green space across all grids."
        />
        <IconBullet
          title="Most urban green space per capita"
          iconName={iconCapita}
          content={
            <CityLink cityId={categoryWinners.greenSpacePerCapita.id}>
              {categoryWinners.greenSpacePerCapita.id}
            </CityLink>
          }
          infoToolTipTitle="Urban green space per capita"
          infoToolTipDetails="Area size of green space divided by population residing in urban area of a city."
        />
        <IconBullet
          title="Highest percentage of urban area covered by trees"
          iconName={iconTrees}
          content={
            <CityLink cityId={categoryWinners.trees.id}>
              {categoryWinners.trees.id}
            </CityLink>
          }
          infoToolTipTitle="Percentage of urban green space covered by trees"
          infoToolTipDetails="HUGSI uses a machine learning model to
                differentiate trees from other vegetation
                including bush. The model is trained on visually labeled dataset
                in which vegetation over 1m height are classified as trees."
        />
        <IconBullet
          title="Highest percentage of urban area covered by grass"
          iconName={iconGrass}
          content={
            <CityLink cityId={categoryWinners.grass.id}>
              {categoryWinners.grass.id}
            </CityLink>
          }
          infoToolTipTitle="Percentage of urban green space covered by grass"
          infoToolTipDetails="HUGSI uses a machine learning model to
                differentiate grass from other vegetation. The model is trained
                on visually labeled dataset in which vegetation below 1m height
                are classified as grass."
        />
      </IconBulletWrapper>
    </section>
  );
};

export default observer(CategoryWinners);
