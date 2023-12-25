import React, { useState } from 'react';
import {
  Button,
  Typography,
  Divider,
  useMediaQuery,
  Box,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import BarGauge from '../../bar-chart/bar-chart';
import * as NumberUtils from '../../../utils/number-utils';
import { IconBullet, IconBulletWrapper } from '../../icon-bullets';
import addComma from '../../../utils/add-comma';
import { rankingInWord } from '../../../utils/city-utils';
// tslint:disable-next-line: no-duplicate-imports
import AchievementBadges from '../../category-winners/achievement-badges';
// @ts-ignore
import iconPercentage from '../../../images/icon-percentage.png';
// @ts-ignore
import iconDistribution from '../../../images/icon-distribution.png';
// @ts-ignore
import iconPopulationChange from '../../../images/icon-population.png';
// @ts-ignore
import iconAreaChange from '../../../images/icon-area.png';
// @ts-ignore
import widgetImproveArrow from '../../../images/widget-improve-arrow.png';
import { useStyles } from '../style';

const SummaryView = ({
  setViewValue,
  city,
  drawerOption,
  data,
  categoryGlobalWinners,
  citiesInActiveContinent,
}) => {
  const [isImproveTipOpen, setImproveTipOpen] = useState(false);
  const {
    demographicGrid,
    smallDemographicGrid,
    rankingGrid,
    smallRankingGrid,
    descriptionSummaryLayout
  } = useStyles({});
  const getRatio = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A':
        return 1;
      case 'B':
        return 0.9;
      case 'C':
        return 0.8;
      case 'D':
        return 0.7;
      case 'E':
        return 0.6;
      default:
        return 1;
    }
  };
  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A':
        return '#698d29';
      case 'B':
        return '#99c93c';
      case 'C':
        return '#fbab60';
      case 'D':
        return '#f8dc29';
      case 'E':
        return '#e77f81';
      default:
        return '#698d29';
    }
  };
  const data03 = [
    { name: 'Group A', value: 100 },
    { name: 'Group B', value: 100 },
    { name: 'Group c', value: 100 },
  ];
  const COLORS3 = ['#e9ebec', '#99c93c', ''];
  const COLORS = [
    {
      start: '#F16B5B',
      mid: '#F0DA67',
      end: '#9DC93E',
    },
  ];
  const smallScreen = useMediaQuery('(max-width:900px)');
  function handleChangeView(newValue) {
    setViewValue(newValue);
  }
  return (
    <>
      <Box
        style={{
          display: 'flex',
          width: smallScreen ? 'unset' : '100%',
          marginBottom: smallScreen ? 'unset' : '1rem',
          marginTop: '2rem',
        }}
      >
        <div className={descriptionSummaryLayout}>
          {data}
          <p
            style={{
              color: '#698D29',
              fontSize: '16px',
              lineHeight: '24px',
              cursor: 'pointer',
            }}
            onClick={() => setImproveTipOpen(!isImproveTipOpen)}
          >
            <b>More on improvements for {city.id}</b>
            <span>
              &nbsp;
              <i
                className={
                  !isImproveTipOpen ? 'fas fa-angle-down' : 'fas fa-angle-up'
                }
              />
            </span>
          </p>
        </div>

        <div
          style={{
            margin: '0rem 0rem 0rem 3rem',
          }}
        >
          <img src={widgetImproveArrow} width={'auto'} height={'160rem'} />
        </div>
      </Box>

      {drawerOption && isImproveTipOpen && (
        <Box
          style={{
            margin: '1rem 0',
            backgroundColor: '#f4f5f5',
            maxWidth: smallScreen ? '20rem' : '42rem',
            padding: '2rem 1rem',
            borderRadius: '1rem',
          }}
        >
          <Typography
            style={{
              backgroundColor: '#f4f5f5',
            }}
            component={'span'}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: city.positive_note_intro.replace(
                  city?.id,
                  '<b>' + city?.id + '</b>'
                ),
              }}
            />
            <br />
            <br />
            {city.recommended_kpis_intro}
            <br />
            <i>
              {city.recommended_kpis_1}, {city.recommended_kpis_2} and{' '}
              {city.recommended_kpis_3}
            </i>
            <br />
            <br />
            {city.recommendations_intro}
            <br />
            1. {city.recommended_kpis_1_text}
            <br />
            2. {city.recommended_kpis_2_text}
            <br />
            3. {city.recommended_kpis_3_text}
            <br />
          </Typography>
        </Box>
      )}

      <Divider style={{ width: '100%' }} />
      <Box
        style={{
          display: 'flex',
          width: smallScreen ? 'unset' : '100%',
          marginBottom: smallScreen ? 'unset' : '1rem',
          marginTop: '2rem',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: '70%',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          Ratings
        </span>
      </Box>
      <Box>
        <Typography
          variant="body1"
          style={{
            color: '#868686',
            fontSize: smallScreen ? '1rem' : '1.2rem',
          }}
          component={'span'}
        >
          Rating
        </Typography>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '0.5rem',
          }}
        >
          <Box
            style={{
              width: smallScreen
                ? `calc(8rem*${getRatio(city.green_grade)})`
                : `calc(10rem*${getRatio(city.green_grade)})`,
              height: smallScreen ? '2rem' : '3rem',
              background: `${getGradeColor(city.green_grade)}`,
              display: 'flex',
              color: 'white',
              fontSize: smallScreen ? '1.2rem' : '2rem',
              fontWeight: 'bold',

              paddingLeft: '0.5rem',
            }}
          >
            {city.green_grade}
          </Box>
          <Box
            style={{
              borderTop: smallScreen
                ? '1rem solid transparent'
                : '1.5rem solid transparent',
              borderBottom: smallScreen
                ? '1rem solid transparent'
                : '1.5rem solid transparent',
              borderLeft: smallScreen
                ? `1rem solid ${getGradeColor(city.green_grade)}`
                : `1.5rem solid ${getGradeColor(city.green_grade)}`,
            }}
          ></Box>
        </Box>
      </Box>
      {drawerOption && city.index_ranking && (
        <Box className={smallScreen ? smallRankingGrid : rankingGrid}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Typography
              style={{
                color: '#868686',
                fontSize: smallScreen ? '1rem' : '1.2rem',
              }}
              component={'span'}
            >
              Regional
            </Typography>
            <Box
              style={{
                margin: smallScreen ? '0' : '0.5rem',
              }}
            ></Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Typography
              style={{
                color: '#868686',
                fontSize: smallScreen ? '1rem' : '1.2rem',
              }}
              component={'span'}
            >
              Global
            </Typography>
            <Box
              style={{
                margin: smallScreen ? '0' : '0.5rem',
              }}
            ></Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              style={{
                color: '#99c93c',
                fontSize: smallScreen ? '1.2rem' : '2rem',
                fontWeight: 'bold',
              }}
              component={'span'}
            >
              {city?.regional_ranking}
              {rankingInWord(city?.regional_ranking)}
            </Typography>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              style={{
                fontSize: smallScreen ? '1.2rem' : '2rem',
                fontWeight: 'bold',
                color: '#99c93c',
              }}
              component={'span'}
            >
              {city.index_ranking}
              {rankingInWord(city.index_ranking)}
            </Typography>
          </Box>
        </Box>
      )}
      <Divider style={{ width: '100%' }} />
      <Box
        style={{
          width: smallScreen ? 'unset' : '100%',
          marginBottom: smallScreen ? 'unset' : '2rem',
          marginTop: '2rem',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            width: '62%',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          Urban Green Space
        </span>
        <Button
          style={{
            color: '#698d29',
            textTransform: 'none',
            fontWeight: 'bold',
            float: smallScreen ? 'none' : 'right',
            textDecoration: 'none',
            margin: smallScreen ? '1rem 0' : '0',
          }}
          size={'large'}
          onClick={() => {
            handleChangeView('urban_data');
          }}
        >
          <Typography
            style={{
              color: '#698d29',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
            component={'span'}
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
        {/* <EnhancedTableToolbar type="hugsi" /> */}
      </Box>
      <Box>
        <IconBullet
          iconName={iconPercentage}
          title="Percentage of urban green space"
          content={' '}
          style={{ width: '18rem' }}
          infoToolTipTitle="Percentage of urban green space"
          infoToolTipDetails="Area size of green space divided by
            size of total urban area of a city."
          sizeVariant={smallScreen ? 'small' : 'small'}
        />
        <Box
          style={{
            marginLeft: smallScreen ? '2rem' : '4.5rem',
            marginTop: '-1rem',
          }}
        >
          <Box
            style={{
              width: '7rem',
              height: '7rem',
              textAlign: 'center',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(270deg)',
            }}
          >
            <Box
              style={{
                color: '#293845',
                fontSize: '1.3rem',
                transform: 'rotate(90deg)',
                position: 'absolute',
                width: '150px',
                zIndex: 1,
              }}
            >
              {NumberUtils.toPercentage(city.total_green_space_percentage)}
            </Box>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: 'EmptyPart',
                      value: 1 - city.total_green_space_percentage,
                    },
                    {
                      name: 'GreenSpacePart',
                      value: city.total_green_space_percentage,
                    },
                  ]}
                  cx={50}
                  cy={50}
                  innerRadius={38}
                  outerRadius={50}
                  fill="#e9ebec"
                  dataKey="value"
                >
                  {data03.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      strokeWidth="0"
                      fill={COLORS3[index % COLORS3.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
      <Box mt="2rem">
        <IconBullet
          iconName={iconDistribution}
          title="Distribution of urban green space"
          content={NumberUtils.toPercentage(city.grid_median_vegetation)}
          style={{ width: '18rem' }}
          infoToolTipTitle="Distribution of urban green space"
          infoToolTipDetails="In our approach, the urban area of a city is
            divided into geographical grids with size of 100m across hexagon.
            HUGSI measures distribution of green space based on the median
            percentage of green space across all grids."
          sizeVariant={smallScreen ? 'small' : 'small'}
        />
        <Box width={'90%'} fontWeight={'normal'} ml="auto" mt="1rem">
          <BarGauge
            treecanopycoverPercentage={city.treecanopycover_percentage}
            grasscoverPercentage={city.grasscover_percentage}
            watercoverPercentage={city.watercover_percentage}
            othercoverPercentage={city.othercover_percentage}
          />
        </Box>
      </Box>
      <Divider style={{ width: '100%' }} />
      <Box
        style={{
          display: 'grid',
          margin: '2rem 0',
        }}
      >
        <Box
          className={smallScreen ? smallDemographicGrid : demographicGrid}
          style={{
            margin: '1rem 0',
            display: 'flex',
          }}
        >
          <IconBulletWrapper
            pageId={smallScreen ? '' : 'city'}
            style={{
              gap: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              // flexDirection: 'column',
              width: '100%',
            }}
          >

            <IconBullet
              iconName={iconAreaChange}
              title="Urban area size"
              content={`${addComma(Math.round(city.area_size))} km²`}
              infoToolTipTitle={'Urban Area'}
              infoToolTipDetails={`Urban area boundaries in HUGSI are defined based on
                  OSM Boundaries dataset provided by Open Street Map.
                  Population data from Global Human Settlement Layer (GHS-POP) is used to
                  adjust city boundaries so we only take into consideration urban areas
                  where citizens actually reside.`}
              link={'https://hugsi.green/about'}
              anchorText={'Read more'}
              sizeVariant={smallScreen ? 'small' : 'small'}
            />


            <IconBullet
              iconName={iconPopulationChange}
              title="Urban area population"
              content={`${addComma(city.population.toFixed())} (2015)`}
              infoToolTipTitle={'Population'}
              infoToolTipDetails={`Population data is extracted from Global Human Settlement Layer (GHS-POP)
                  using urban area boundaries as defined in HUGSI.`}
              link={'https://hugsi.green/about'}
              anchorText={'Read more'}
              sizeVariant={smallScreen ? 'small' : 'small'}
            />

          </IconBulletWrapper>
        </Box>
      </Box>
      {drawerOption && city && (
        <Box
          height="auto"
          margin="1rem auto"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant={'h5'}
            component={'span'}
            style={{
              color: '#424242',
              fontWeight: 'bold',
            }}
          >
            <Box>
              <AchievementBadges
                city={city}
                cities={citiesInActiveContinent}
                categoryGlobalWinners={categoryGlobalWinners}
              />
            </Box>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SummaryView;
