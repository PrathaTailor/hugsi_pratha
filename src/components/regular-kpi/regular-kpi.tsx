import React from 'react';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import { PieChart, Pie } from 'recharts';
import * as NumberUtils from '../../utils/number-utils';
import { IconBullet, IconBulletWrapper } from 'components/icon-bullets';
import GSCBarGauge from 'components/bar-chart/gsc-bar-chart';
// @ts-ignore
import iconAmount from '../../images/icon-amount.png';
// @ts-ignore
import iconArea from '../../images/icon-area.png';
// @ts-ignore
import iconPopulation from '../../images/icon-population.png';
// @ts-ignore
import iconTrees from '../../images/icon-trees.png';
// @ts-ignore
import iconShrubs from '../../images/icon-shrubs.png';
// @ts-ignore
import iconGrass from '../../images/icon-grass.png';
// @ts-ignore
import iconRatio from '../../images/icon-ratio.png';
// @ts-ignore
import iconHealth from '../../images/icon-health.png';
// @ts-ignore
import iconDistribution from '../../images/icon-distribution.png';
// @ts-ignore
import iconPerCapita from '../../images/icon-per-capita.png';
// @ts-ignore
import iconPublicCapita from '../../images/icon-public-capita.png';
import { HealthIndicator, useStyles } from './style';
interface Props {
  region: any; //
}
/**
 * Regular KPIs for GCC component
 * @param cityId - the city
 */
const regularKPIs: React.FC<Props> = ({ region }) => {
  const smallScreen = useMediaQuery('(max-width:600px)');
  const { smallDemographicGrid } = useStyles({});

  return (
    <>
      <Box
        style={{
          margin: smallScreen ? '0.5rem 0' : '1rem 0',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          ></Box>
        </Box>

        <Box
          style={{
            // margin: '2rem 0rem',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <IconBulletWrapper pageId={smallScreen ? '' : 'city'}>
            <IconBullet
              iconName={iconArea}
              title="Urban area size"
              content={`${NumberUtils.toFixed(region._area, 2)} km²`}
              infoToolTipTitle=""
              infoToolTipDetails=""
              sizeVariant="small"
            />

            <IconBullet
              iconName={iconPopulation}
              title="Urban area population"
              // content={`${NumberUtils.toFixed(
              //   region.aantal_inwoners_corr,
              //   0
              // )}`}
              content={
                region.aantal_inwoners_corr
                  ? `${Math.trunc(region.aantal_inwoners_corr)}`
                  : '-'
              }
              infoToolTipTitle=""
              infoToolTipDetails=""
              sizeVariant="small"
            />
          </IconBulletWrapper>
        </Box>
        <Box
          style={{
            margin: '1rem 0rem',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <IconBulletWrapper pageId={smallScreen ? '' : 'city'}>
            <IconBullet
              iconName={iconAmount}
              title="Ratio green and water"
              content={
                region.KPI1_VerhoudingGroenWater
                  ? `${NumberUtils.toFixed(
                    region.KPI1_VerhoudingGroenWater,
                    0
                  )}`
                  : '-'
              }
              infoToolTipTitle="Ratio green and water"
              infoToolTipDetails={
                <React.Fragment>
                  Deze score geeft de verhouding van de hoeveelheid groen en
                  water ten opzichte van het totaaloppervlak aan. Dit wordt
                  uitgedrukt in een score. In deze score is een factor gegeven
                  aan de verschillende typen groen en water, de verdeling is als
                  volgt:
                  <li>Hoge vegetatie: factor 5</li>
                  <li>Middelhoge vegetatie: factor 2</li>
                  <li>Lage vegetatie factor: 1</li>
                  <li>Water factor: 3</li>
                  De formule om deze score te bepalen is dan als volgt:
                  <br />
                  <br />
                  <b>
                    <i>
                      (% bomen x factor 5) + (% struiken x factor 2) + (% gras x
                      factor 1) + (%water x factor 3) = score
                    </i>
                  </b>
                  <br />
                  <br />
                  De score range loopt van 10 tot 410 en het gemiddelde van alle
                  geanalyseerde plaatsen is 124.
                </React.Fragment>
              }
              sizeVariant="small"
            />

            <IconBullet
              iconName={iconDistribution}
              title="Distribution of urban green space"
              content={`${NumberUtils.toFixed(
                region.KPI4_VegetationDistributionScore,
                3
              )}`}
              infoToolTipTitle="Distribution of urban green space"
              infoToolTipDetails="Deze score geeft aan in welke mate het groen over een plaats verdeeld is. Daarmee is naast hoe groen een buurt of plaats is in % of m², ook te zien of dit groen goed verdeeld is. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
              sizeVariant="small"
            />
          </IconBulletWrapper>
        </Box>
        <Box style={{ marginTop: '2rem' }}>
          <Typography
            variant="h6"
            style={{
              color: '#5f6a74',
              maxWidth: smallScreen ? '20rem' : 'unset',
              fontSize: '1rem',
            }}
          >
            What does the Urban Green Space in {region.naam} consist of?
          </Typography>
          <GSCBarGauge
            treecanopycoverPercentage={region.perc_hoge_vegetatie}
            shrubscoverPercentage={region.perc_middelhoge_vegetatie}
            grasscoverPercentage={region.perc_lage_vegetatie}
            watercoverPercentage={region.perc_water}
            // othercoverPercentage={region.perc_grijs}
            othercoverPercentage={
              100 -
              (region.perc_hoge_vegetatie +
                region.perc_middelhoge_vegetatie +
                region.perc_lage_vegetatie +
                region.perc_water)
            }
          />

          <Box
            style={{
              margin: '2rem 0rem',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <IconBulletWrapper pageId={smallScreen ? '' : 'fav'}>
              <IconBullet
                iconName={iconTrees}
                title="Area covered in trees"
                content={`${NumberUtils.toFixed(
                  region.perc_hoge_vegetatie,
                  1
                )}%`}
                infoToolTipTitle=""
                infoToolTipDetails=""
                sizeVariant="small"
              />

              <IconBullet
                iconName={iconShrubs}
                title="Area covered in shrubs"
                content={`${NumberUtils.toFixed(
                  region.perc_middelhoge_vegetatie,
                  1
                )}%`}
                infoToolTipTitle=""
                infoToolTipDetails=""
                sizeVariant="small"
              />
              <IconBullet
                iconName={iconGrass}
                title="Area covered in grass"
                content={`${NumberUtils.toFixed(
                  region.perc_lage_vegetatie,
                  1
                )}%`}
                infoToolTipTitle=""
                infoToolTipDetails=""
                sizeVariant="small"
              />
            </IconBulletWrapper>
          </Box>

          <Box
            style={{
              margin: '2rem 0rem',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <IconBulletWrapper pageId={smallScreen ? '' : 'fav'}>
              <IconBullet
                iconName={iconTrees}
                title="Distribution of trees"
                content={`${NumberUtils.toFixed(
                  region.KPI4a_HighVegetationDistributionScore,
                  3
                )}`}
                infoToolTipTitle="Distribution of trees"
                infoToolTipDetails="Deze score geeft aan in welke mate de bomen over een plaats verdeeld zijn. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
                sizeVariant="small"
              />

              <IconBullet
                iconName={iconShrubs}
                title="Distribution of shrubs"
                content={NumberUtils.toFixed(
                  region.KPI4b_middleHighVegDistributionScore,
                  3
                )}
                infoToolTipTitle="Distribution of shrubs"
                infoToolTipDetails="Deze score geeft aan in welke mate de struiken over een plaats verdeeld zijn. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
                sizeVariant="small"
              />
              <IconBullet
                iconName={iconGrass}
                title="Distribution of grass"
                content={`${NumberUtils.toFixed(
                  region.KPI4c_lowVegDistributionScore,
                  3
                )}`}
                infoToolTipTitle="Distribution of grass"
                infoToolTipDetails="Deze score geeft aan in welke mate de gazons over een plaats verdeeld zijn. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
                sizeVariant="small"
              />
            </IconBulletWrapper>
          </Box>

          <Box>
            <IconBulletWrapper pageId={smallScreen ? '' : 'city'}>
              <IconBullet
                iconName={iconRatio}
                title="Public vs Private greenspace ratio"
                content={''}
                infoToolTipTitle="Public vs Private greenspace ratio"
                infoToolTipDetails="Deze ratio geeft aan hoeveel % van het groen openbaar groen is en hoeveel % privaat groen."
                sizeVariant="small"
              />
            </IconBulletWrapper>

            <Box
              style={{
                display: smallScreen ? 'unset' : 'flex',
                flexDirection: smallScreen ? 'unset' : 'row',
              }}
            >
              <PieChart width={300} height={300}>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={[
                    {
                      name: 'Group A',
                      value: region._ratioPrivatePublicGreen?.includes(' / ')
                        ? Number(
                          region._ratioPrivatePublicGreen.split(' / ')[0]
                        )
                        : 0,
                      fill: '#086d45',
                    },
                    {
                      name: 'Group B',
                      value: region._ratioPrivatePublicGreen?.includes(' / ')
                        ? Number(
                          region._ratioPrivatePublicGreen.split(' / ')[1]
                        )
                        : 0,
                      fill: '#7cb834',
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={70}
                  fill="#7cb834"
                // label
                />
              </PieChart>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: smallScreen ? '-6rem 4rem 0' : '0 4rem',
                }}
              >
                <Box
                  style={{
                    margin: smallScreen ? '1rem' : '5rem 1rem',
                  }}
                >
                  <Box className={smallDemographicGrid}>
                    <Typography
                      style={{
                        color: '#086d45',
                        fontSize: smallScreen ? '1rem' : '1.2rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Public
                    </Typography>

                    <Typography
                      style={{
                        color: '#086d45',
                        fontSize: smallScreen ? '1rem' : '1.2rem',
                      }}
                    >
                      {region._ratioPrivatePublicGreen?.includes(' / ')
                        ? `${region._ratioPrivatePublicGreen.split(' / ')[0]} %`
                        : 0}
                    </Typography>
                    <Typography
                      style={{
                        color: '#7cb834',
                        fontSize: smallScreen ? '1rem' : '1.2rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Private
                    </Typography>
                    <Typography
                      style={{
                        color: '#7cb834',
                        fontSize: smallScreen ? '1rem' : '1.2rem',
                      }}
                    >
                      {region._ratioPrivatePublicGreen?.includes(' / ')
                        ? `${region._ratioPrivatePublicGreen.split(' / ')[1]} %`
                        : 0}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <IconBullet
              iconName={iconHealth}
              title="Average health of urban vegetation"
              content={''}
              infoToolTipTitle="Average health of urban vegetation"
              infoToolTipDetails="Deze score geeft een indicatie van de gezondheid van het groen weer. Landoppervlak met een waarde boven de 0,11 wordt door ons gezien als vegetatie. Maar deze score geeft ook een indicatie van hoe gezond de vegetatie is. Hoe hoger de score hoe gezonder de vegetatie. De score range loopt van 0,200 tot 0,450 en het gemiddelde van alle geanalyseerd plaatsen is 0,299."
              sizeVariant="small"
            />
          </Box>
          <Box
            style={{
              marginLeft: smallScreen ? 'unset' : '5.2rem',
              width: smallScreen ? '18rem' : '38rem',
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
                marginLeft: `${region.KPI5_meanNDVI * 100}%`,
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
                  {NumberUtils.toFixed(region.KPI5_meanNDVI, 3)}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              margin: smallScreen ? '0.5rem 0' : '1.5rem 0rem',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <IconBulletWrapper pageId={smallScreen ? '' : 'city'}>
              <IconBullet
                iconName={iconPerCapita}
                title="Urban green space per capita"
                content={`${NumberUtils.toFixed(
                  region.KPI3_GroenPerInwoner,
                  1
                )} m²`}
                infoToolTipTitle="Urban green space per capita"
                infoToolTipDetails="Deze KPI geeft de hoeveelheid van het totaal (openbaar + privaat) groenoppervlak per inwoner aan. De score range loopt ongeveer van 25m² tot 250m² en het gemiddelde van alle geanalyseerd plaatsen is 97m²."
                sizeVariant="small"
              />

              <IconBullet
                iconName={iconPublicCapita}
                title="Public urban green space per capita"
                content={`${NumberUtils.toFixed(
                  region.KPI2_StedelijkOpenbaarGroenPerInwoner,
                  1
                )} m²`}
                infoToolTipTitle="Public urban green space per capita"
                infoToolTipDetails="Deze KPI geeft de hoeveelheid openbaar groenoppervlak per inwoner aan. De score range loopt ongeveer van 15m² tot 150m² en het gemiddelde van alle geanalyseerd plaatsen is 50m²."
                sizeVariant="small"
              />
            </IconBulletWrapper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default regularKPIs;
