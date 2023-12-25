import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Box, withStyles, Paper, useMediaQuery, Typography } from '@material-ui/core';
import { getCategoryWinners } from '../../utils/city-utils';
import { City } from '../../models';
import useCities from '../../hooks/cities';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'gatsby';
import Popup from 'reactjs-popup';
import ShareContent from '../../popups/share-content';
import { PieChart, Pie, Cell, ResponsiveContainer, } from 'recharts';
import BarGauge from '../../components/bar-chart/bar-chart';
import * as NumberUtils from '../../utils/number-utils';
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
import Slider from 'react-slick';
import { useStyles } from './style';
const box = {
  fontWeight: 'fontWeightBold',
  color: '#424242',
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NavigateBeforeIcon />,
  prevArrow: <NavigateNextIcon />,
  dotsClass: 'slick-dots sliderDot',
  autoplay: true,
  autoplaySpeed: 5000,
};

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

interface Props {
  cities?: City[];
}

/**
 * FavoriteCities component
 * @param cities - list of fav cities
 */
const FavoriteCities: React.FC<Props> = ({ cities }) => {
  const categoryWinners = useMemo(() => getCategoryWinners(cities), [cities]);
  const smallScreen = useMediaQuery('(max-width:600px)');
  const windowGlobal = typeof window !== 'undefined' && window;
  const favCitiesList =
    windowGlobal?.localStorage &&
      'favCities' in localStorage &&
      localStorage.getItem('favCities')
      ? JSON.parse(localStorage.getItem('favCities'))
      : [];
  const cityId = (favCitiesList && favCitiesList[0]) || '';
  const { getCity } = useCities();
  const res = [];
  windowGlobal?.localStorage &&
    'favCities' in localStorage &&
    localStorage.getItem('favCities')
    ? JSON.parse(localStorage.getItem('favCities'))
    : [];
  favCitiesList.map(c => {
    const city = useMemo(() => getCity(c), [cities, c]);
    res.push(city);
  });
  const style = useStyles({});
  const data03 = [
    { name: 'Group A', value: 200 },
    { name: 'Group B', value: 100 },
  ];

  const COLORS3 = ['#e9ebec', '#99c93c'];

  // Todo: loading? Spinner should in that case be in index.tsx
  if (!categoryWinners) {
    return <div />;
  }

  return (
    <section className={smallScreen ? style.smallFavRoot : style.favRoot}>
      {cityId && (
        <Paper elevation={3}>
          <Box style={{ padding: '2rem' }}>
            <Typography variant={smallScreen ? 'h5' : 'h4'}>
              <Box {...box}>
                My favorite {res?.length > 1 ? `cities` : `city`}{' '}
              </Box>
            </Typography>
            <Box style={{ marginTop: '1rem' }}>
              <Slider {...settings}>
                {res &&
                  res.length > 0 &&
                  res.map((city: any, index: number) => {
                    return (
                      <Box style={{}} key={index}>
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            variant={smallScreen ? 'body1' : 'h5'}
                            style={{ margin: smallScreen ? 'auto 0' : 'unset' }}
                          >
                            {city.id}
                          </Typography>

                          <Box style={{ float: 'right' }}>
                            <Popup
                              closeOnDocumentClick={false}
                              modal
                              trigger={
                                <Button
                                  variant="outlined"
                                  color={'primary'}
                                  style={{
                                    color: '#99c93c',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    borderColor: '#99c93c',
                                    fontSize: smallScreen ? '0.8rem' : 'unset',
                                    float: 'right',
                                    padding: smallScreen ? '0.5rem' : '0.5rem',
                                  }}
                                  size={'large'}
                                >
                                  Share this &nbsp;
                                  <i
                                    className="fas fa-share-square"
                                    aria-hidden="false"
                                  />
                                </Button>
                              }
                            >
                              {close => (
                                <ShareContent
                                  close={close}
                                  smallScreen={smallScreen}
                                  value={
                                    window.location.href +
                                    `city/?` +
                                    `${city.id}`
                                  }
                                />
                              )}
                            </Popup>
                          </Box>
                        </Box>

                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: smallScreen ? 'column' : 'row',
                          }}
                        >
                          <Box style={{}}>
                            <Box
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <Box style={{ paddingTop: '1.5rem' }}>
                                <IconBullet
                                  iconName={iconPercentage}
                                  title="Percentage of urban green space"
                                  content={' '}
                                  infoToolTipTitle="Percentage of urban green space"
                                  infoToolTipDetails="Area size of green space divided by
                              size of total urban area of a city."
                                  sizeVariant={smallScreen ? 'small' : 'medium'}
                                />
                              </Box>

                              <Box
                                style={{
                                  marginLeft: smallScreen ? 'unset' : '3rem',
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
                                      fontWeight: 'bold',
                                      transform: 'rotate(90deg)',
                                      position: 'absolute',
                                      width: '150px',
                                      zIndex: 1,
                                    }}
                                  >
                                    {/* {NumberUtils.toPercentage(
                                  city.total_green_space_percentage
                                    )} */}
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
                                              1 -
                                              city.total_green_space_percentage,
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
                                            fill={
                                              COLORS3[index % COLORS3.length]
                                            }
                                          />
                                        ))}
                                      </Pie>
                                    </PieChart>
                                  </ResponsiveContainer>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              style={{
                                width: smallScreen ? '20rem' : 'unset',
                              }}
                            >
                              <BarGauge
                                treecanopycoverPercentage={
                                  city.treecanopycover_percentage
                                }
                                grasscoverPercentage={
                                  city.grasscover_percentage
                                }
                                watercoverPercentage={
                                  city.watercover_percentage
                                }
                                othercoverPercentage={
                                  city.othercover_percentage
                                }
                              />
                            </Box>
                          </Box>
                          <Box
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              marginTop: '1.5rem',
                            }}
                          >
                            <Box
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
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
                                sizeVariant={smallScreen ? 'small' : 'medium'}
                              />
                            </Box>
                            <Box
                              style={{
                                marginLeft: smallScreen ? 'unset' : '4.5rem',
                                width: smallScreen ? '15rem' : '32rem',
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
                                    {NumberUtils.toFixed(
                                      city.ndvi_vegetation,
                                      2
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
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
                              iconName={iconCapita}
                              title="Urban green space per capita"
                              content={`${NumberUtils.toFixed(
                                city.green_per_capita,
                                1
                              )} m²`}
                              infoToolTipTitle="Urban green space per capita"
                              infoToolTipDetails="Area size of green space divided by
                        population residing in urban area of a city."
                              sizeVariant={smallScreen ? 'small' : 'medium'}
                            />

                            <IconBullet
                              iconName={iconDistribution}
                              title="Distribution of urban green space"
                              content={NumberUtils.toPercentage(
                                city.grid_median_vegetation
                              )}
                              infoToolTipTitle="Distribution of urban green space"
                              infoToolTipDetails="In our approach, the urban area of a city is
                        divided into geographical grids with size of 250m * 250m hexagon.
                        HUGSI measures distribution of green space based on the median
                        percentage of green space across all grids."
                              sizeVariant={smallScreen ? 'small' : 'medium'}
                            />
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
                              sizeVariant={smallScreen ? 'small' : 'medium'}
                            />
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
                              sizeVariant={smallScreen ? 'small' : 'medium'}
                            />
                          </IconBulletWrapper>
                        </Box>
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            float: smallScreen ? 'unset' : 'right',
                          }}
                        >
                          <Button
                            variant="outlined"
                            style={{
                              color: '#99c93c',
                              borderColor: '#99c93c',
                              textTransform: 'none',
                              fontWeight: 'bold',
                              fontSize: smallScreen ? '0.8rem' : 'unset',
                              borderRadius: '8px',
                            }}
                            size={'large'}
                            component={Link}
                            to={`/compare/?${city.id}_vs_`}
                          >
                            Compare this city
                          </Button>
                          <Button
                            variant="contained"
                            color={'primary'}
                            style={{
                              color: 'white',
                              textTransform: 'none',
                              fontWeight: 'bold',
                              borderRadius: '8px',
                              backgroundColor: '#99c93c',
                              fontSize: smallScreen ? '0.7rem' : 'unset',
                              marginLeft: smallScreen ? '1.25rem' : '2rem',
                            }}
                            size={'large'}
                            component={Link}
                            to={`/city/?${city.id}`}
                          >
                            Go to city page
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
              </Slider>
            </Box>
          </Box>
        </Paper>
      )}
    </section>
  );
};

export default observer(FavoriteCities);
