import React from 'react';
import {
  Button,
  Checkbox,
  useMediaQuery,
  Box,
  withStyles,
} from '@material-ui/core';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
import NLGLTest from '../../call-to-action/nl-gl-test';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import BarGauge from '../../bar-chart/bar-chart';
import * as NumberUtils from '../../../utils/number-utils';
import { IconBullet } from '../../icon-bullets';
// @ts-ignore
import iconPercentage from '../../../images/icon-percentage.png';
// @ts-ignore
import iconDistribution from '../../../images/icon-distribution.png';
// @ts-ignore
import iconCapita from '../../../images/icon-capita.png';
// @ts-ignore
import iconTrees from '../../../images/icon-trees.png';
// @ts-ignore
import iconGrass from '../../../images/icon-grass.png';
// @ts-ignore
import iconHealth from '../../../images/icon-health.png';
const HealthIndicator = withStyles({
  root: {
    color: '#99c93c',
    width: '0rem',
    height: '0rem',
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderBottom: '12px solid #99c93c',
    marginBottom: '0.5rem',
  },
})(ArrowDropUpSharpIcon);

const UrbanGreenSpaceView = ({ city, drawerOption, handleMapViewClick }) => {
  const smallScreen = useMediaQuery('(max-width:900px)');
  const data03 = [
    { name: 'Group A', value: 100 },
    { name: 'Group B', value: 100 },
    { name: 'Group c', value: 100 },
  ];
  const COLORS3 = ['#e9ebec', '#99c93c', ''];
  return (
    <>
      <Box
        style={{
          display: 'flex',
          width: smallScreen ? 'unset' : '100%',
          marginBottom: smallScreen ? 'unset' : '2rem',
          marginTop: '3rem',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          Urban Green Space
        </span>
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
              {NumberUtils.toPercentage(
                city.total_green_space_percentage
              )}
            </Box>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: 'EmptyPart',
                      value:
                        1 - city.total_green_space_percentage,
                    },
                    {
                      name: 'GreenSpacePart',
                      value:
                        city.total_green_space_percentage,
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
      <Box fontWeight={'normal'}>
        <IconBullet
          iconName={iconDistribution}
          title={`How ${city?.id} is distributed`}
          content=""
          infoToolTipTitle="Distribution of urban green space"
          infoToolTipDetails="In our approach, the urban area of a city is
            divided into geographical grids with size of 100m across hexagon.
            HUGSI measures distribution of green space based on the median
            percentage of green space across all grids."
          sizeVariant={smallScreen ? 'small' : 'small'}
        />
        <Box width={'90%'} fontWeight={'normal'} ml="auto" mt="-1rem">
          <BarGauge
            treecanopycoverPercentage={city.treecanopycover_percentage}
            grasscoverPercentage={city.grasscover_percentage}
            watercoverPercentage={city.watercover_percentage}
            othercoverPercentage={city.othercover_percentage}
          />
        </Box>
        {drawerOption && city.country === 'Netherlands' && (
          <div
            style={{
              border: '1px solid #99c93c',
              borderRadius: '1rem',
              padding: '1rem',
              margin: '1rem 0',
            }}
          >
            <NLGLTest type="self-assessment" />
          </div>
        )}
      </Box>
      <Box
        style={{
          display: 'flex',
          // width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IconBullet
          iconName={iconHealth}
          title="Average health of urban vegetation"
          content={' '}
          infoToolTipTitle="Average health of urban vegetation"
          infoToolTipDetails="HUGSI measures health of
  vegetation with NDVI, a widely used indicator of vegetation health
  based on the absorption of visible and invisible light. NDVI value of
  living vegetation ranges from 0 to 1."
          sizeVariant={smallScreen ? 'small' : 'small'}
        />
        <Button
          style={{
            border: 'none',
            display: 'flex',
            // width: '100%',
            // justifyContent: 'flex-start',
            textTransform: 'none',
          }}
        >
          <label>
            <Checkbox
              icon={
                <i
                  className="fas fa-map"
                  style={{
                    marginLeft: '0.5em',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                ></i>
              }
              checkedIcon={
                <i
                  className="fas fa-map"
                  style={{
                    marginLeft: '0.5em',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                ></i>
              }
              name="viewVitalityMap"
              onChange={e => {
                console.log(e.target.checked);
                handleMapViewClick(
                  e.target.checked
                    ? 'veg_vitality_category'
                    : 'urban_data'
                );
              }}
            />
            <span
              style={{
                textAlign: 'initial',
                marginLeft: '0.2rem',
              }}
            >
              View vitality heatmap
            </span>
          </label>
        </Button>

      </Box>
      <Box
        style={{
          marginLeft: smallScreen ? 'unset' : '5.2rem',
          width: smallScreen ? '18rem' : 'calc(100% - 90px)',
        }}
      >
        <Box
          style={{
            height: '0.7rem',
            backgroundImage:
              'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',

            margin: '1rem auto',
          }}
        ></Box>
        <Box
          style={{
            marginLeft: `${city.ndvi_vegetation * 100}%`,
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '4rem',
              maxWidth: '4rem',
            }}
          >
            <HealthIndicator />

            <Box
              style={{
                fontWeight: 'bold',
                fontSize: '1.4rem',
                marginLeft: '-0.5rem',
              }}
            >
              {NumberUtils.toFixed(city.ndvi_vegetation, 2)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          gap: '2rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <IconBullet
            iconName={iconDistribution}
            title="Distribution of urban green space"
            content={NumberUtils.toPercentage(
              city.grid_median_vegetation
            )}
            infoToolTipTitle="Distribution of urban green space1"
            infoToolTipDetails="In our approach, the urban area of a city is
            divided into geographical grids with size of 100m across hexagon.
            HUGSI measures distribution of green space based on the median
            percentage of green space across all grids."
            sizeVariant={smallScreen ? 'small' : 'small'}
          />
        </Box>
        <Box>
          <IconBullet
            iconName={iconCapita}
            title="Urban green space per capita"
            content={`${NumberUtils.toFixed(
              city.green_per_capita,
              1
            )} m²`}
            infoToolTipTitle="Urban green space per capita"
            infoToolTipDetails="Area size of green space divided by
              population residing in urban area of a city."
            sizeVariant={smallScreen ? 'small' : 'small'}
          />
        </Box>
        <Box>
          <IconBullet
            iconName={iconTrees}
            title="Percentage of urban green space covered by trees"
            content={NumberUtils.toPercentage(
              city.treecanopycover_percentage
            )}
            infoToolTipTitle="Percentage of urban green space covered by trees"
            infoToolTipDetails="HUGSI uses a machine learning model to
              differentiate trees from other vegetation
              including bush. The model is trained on visually labeled dataset
              in which vegetation over 1m height are classified as trees."
            sizeVariant={smallScreen ? 'small' : 'small'}
          />
        </Box>
        <Box>
          <IconBullet
            iconName={iconGrass}
            title="Percentage of urban green space covered by grass"
            content={NumberUtils.toPercentage(
              city.grasscover_percentage
            )}
            infoToolTipTitle="Percentage of urban green space covered by grass"
            infoToolTipDetails="HUGSI uses a machine learning model to
    differentiate grass from other vegetation. The model is trained
    on visually labeled dataset in which vegetation below 1m height
    are classified as grass."
            sizeVariant={smallScreen ? 'small' : 'small'}
          />
        </Box>
      </Box>
    </>
  );
};

export default UrbanGreenSpaceView;