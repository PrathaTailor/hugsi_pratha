import React, { useEffect, useState, useContext } from 'react';
import {
  Typography,
  TextField,
  CircularProgress,
  useMediaQuery,
  Box,
  Button,
  IconButton,
  Divider,
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react-lite';
import { MapLoadEvent } from 'react-map-gl';
import * as MapboxGL from 'mapbox-gl';
import { navigate } from 'gatsby';
import { FeatureCollection } from '@turf/helpers';
import { MapContext } from 'stores/map-context';
import Map from '../../components/map/map';
import Pin from '../../components/map/pin';
import { useSiteMetadata } from '../../hooks';
import * as NumberUtils from '../../utils/number-utils';
import useCities from '../../hooks/cities';
import WinnerBanner from '../../components/banner/winnerBanner';
import { HealthIndicator, useStyles } from '../../styles/compare';
import { Add } from '@material-ui/icons';
// @ts-ignore
import greenScoreIcon from '../../images/icon-amount.png';
// @ts-ignore
import percentageIcon from '../../images/icon-percentage.png';
// @ts-ignore
import healthIcon from '../../images/icon-health.png';
// @ts-ignore
import distributionIcon from '../../images/icon-distribution.png';
// @ts-ignore
import capitaIcon from '../../images/icon-per-capita.png';
// @ts-ignore
import treeIcon from '../../images/icon-trees.png';
// @ts-ignore
import grassIcon from '../../images/icon-grass.png';

const browser = typeof window !== 'undefined' && window;

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: any) => option.id,
});

/**
 * Compare Page
 * @file compare.tsx is the compare Page that renders a comparision of two cities
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const CityComparisonPage = props => {
  if (!browser) {
    return null;
  }
  const { root, rootWithImage, redoBtn, rowStyle } = useStyles({});
  const { getCity, cityStore } = useCities();
  const filteredCities = cityStore.cities
    ? cityStore.cities.filter(c => c !== undefined)
    : [];
  const citiesList = filteredCities.sort((a, b) =>
    a?.id.localeCompare(b?.id, 'en', { sensitivity: 'base' })
  );
  const citiesIds = citiesList.length ? citiesList.map(c => c?.id) : [];
  const { endpoint } = useSiteMetadata();
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false);
  const [leftMapInstance, setLeftMapInstance] = useState<MapboxGL.Map>(null);
  const [rightMapInstance, setRightMapInstance] = useState<MapboxGL.Map>(null);
  const [cityAtLeft, setcityAtLeft] = useState(undefined);
  const [cityAtRight, setcityAtRight] = useState(undefined);
  const [cityAtEnd, setcityAtEnd] = useState(undefined);
  const [leftCity, setLeftCity] = useState('');
  const [rightCity, setRightCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [cityBoundaries, setCityBoundaries] = useState<FeatureCollection>();
  const kpiBarSize = smallScreen ? 5 : 15;
  const url = window.location.search.replace('?', '').split('_vs_');
  useEffect(() => {
    setcityAtLeft(getCity(url[0]));
    setcityAtRight(getCity(url[1]));
    setcityAtEnd(getCity(url[2]));
  }, []);
  const getCompareLink = (cityObj, index) => {
    if (!cityObj) {
      navigate('/compare/?_vs_');
    } else if (index === 0 && cityAtEnd) {
      setcityAtLeft('');
      navigate(`/compare/?_vs_${rightCity}_vs_${endCity}`);
    } else if (index === 1) {
      setcityAtRight('');
      navigate(`/compare/?${leftCity}_vs_${''}_vs_${endCity}`);
    } else if (index === 2) {
      setcityAtEnd('');
      navigate(`/compare/?${leftCity}_vs_${rightCity}_vs_`);
    } else {
      return index === 0
        ? navigate(`/compare/?_vs_${cityObj?.id}`)
        : navigate(`/compare/?${cityObj?.id}_vs_`);
    }
  };
  const onCompareCity = () => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const compareString = search.replace('?', '');
    const compareCities = compareString.split('_vs_');
    const cityLeft = getCity(compareCities[0]);
    setcityAtLeft(cityLeft);
    setLeftCity(cityLeft?.id);
    const cityRight = getCity(compareCities[1]);
    setcityAtRight(cityRight);
    setRightCity(cityRight?.id);
    const cityEnd = getCity(compareCities[2]);
    setcityAtEnd(cityEnd);
    setEndCity(cityEnd?.id);
  };

  const viewportStore = useContext(MapContext);
  useEffect(() => {
    cityStore.loadCities(endpoint);
  }, []);
  useEffect(() => {
    viewportStore.setViewport({
      ...viewportStore.viewport,
      zoom: 0.8,
      latitude: 40,
      longitude: 8,
    });
  }, [leftCity, rightCity, endCity]);
  const onLeftMapLoad = ({ target }: MapLoadEvent) => {
    setLeftMapInstance(target);
    leftMapInstance?.setCenter([
      cityAtLeft?.latlongarr[0],
      cityAtLeft?.latlongarr[1],
    ]);
  };
  const onRightMapLoad = ({ target }: MapLoadEvent) => {
    setRightMapInstance(target);
    rightMapInstance?.setCenter([
      cityAtRight?.latlongarr[0],
      cityAtRight?.latlongarr[1],
    ]);
  };

  return (
    <Box
      className={
        cityAtLeft && cityAtRight && cityAtLeft !== cityAtRight
          ? root
          : rootWithImage
      }
    >
      {(cityAtLeft && cityAtRight && cityAtEnd) ||
      (cityAtLeft && cityAtRight) ? (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Box
              style={{
                display: 'flex',
                float: 'left',
                height: '55vh',
                width: '49.5%',
              }}
            >
              {cityStore && cityStore?.isLoadingCities ? (
                <CircularProgress style={{ margin: 'auto' }} />
              ) : (
                <Map
                  boundaries={cityBoundaries}
                  boundariesOsm={`${endpoint}/hugsi_2021_100m_data/OSM/${cityAtLeft?.city_code}_2018.geojson`}
                  onLoad={onLeftMapLoad}
                >
                  {leftmap => {
                    const zoom = leftmap.getZoom();
                    const isLargePin = zoom > 4;
                    const isMediumPin = zoom > 2 && !isLargePin;
                    return (
                      <Pin
                        latitude={cityAtLeft?.latlongarr[0]}
                        longitude={cityAtLeft?.latlongarr[1]}
                        city={cityAtLeft}
                        mediumPin={isMediumPin}
                        largePin={isLargePin}
                        mapView={''}
                        region={''}
                      />
                    );
                  }}
                </Map>
              )}
            </Box>
            <Box
              style={{
                display: 'flex',
                float: 'right',
                height: '55vh',
                width: '49.5%',
              }}
            >
              {cityStore?.isLoadingCities ? (
                <CircularProgress style={{ margin: 'auto' }} />
              ) : (
                <Map
                  boundaries={cityBoundaries}
                  boundariesOsm={`${endpoint}/hugsi_2021_100m_data/OSM/${cityAtRight?.city_code}_2018.geojson`}
                  onLoad={onRightMapLoad}
                >
                  {rightmap => {
                    const zoom = rightmap.getZoom();
                    const isLargePin = zoom > 4;
                    const isMediumPin = zoom > 2 && !isLargePin;
                    return (
                      <Pin
                        latitude={cityAtRight?.latlongarr[0]}
                        longitude={cityAtRight?.latlongarr[1]}
                        city={cityAtRight}
                        mediumPin={isMediumPin}
                        largePin={isLargePin}
                        mapView={''}
                        region={''}
                      />
                    );
                  }}
                </Map>
              )}
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontWeight: 'bold',
                marginLeft: '10%',
                marginTop: '2rem',
              }}
            >
              And the results are in ...
            </Typography>
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '3rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <Typography variant="subtitle1">Cities</Typography>
              </Box>
              <Box style={{ display: 'flex' }}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: smallScreen ? '1rem' : '20px',
                  }}
                >
                  {cityAtLeft?.id}
                  <Button
                    className={redoBtn}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                    onClick={() => getCompareLink(cityAtRight, 0)}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#698d29',
                      }}
                    >
                      <i
                        className="fas fa-redo-alt"
                        style={{ fontSize: '1rem' }}
                      ></i>
                      <Typography
                        variant="subtitle1"
                        style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                      >
                        Change city
                      </Typography>
                    </Box>
                  </Button>
                </Typography>
              </Box>
              <Box style={{}}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: smallScreen ? '1rem' : '20px',
                  }}
                >
                  {cityAtRight?.id}
                </Typography>
                <Button
                  className={redoBtn}
                  style={{}}
                  onClick={() => getCompareLink(cityAtLeft, 1)}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      color: '#698d29',
                    }}
                  >
                    <i
                      className="fas fa-redo-alt"
                      style={{ fontSize: '1rem' }}
                    ></i>
                    <Typography
                      variant="subtitle1"
                      style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                    >
                      Change city
                    </Typography>
                  </Box>
                </Button>
              </Box>
              {cityAtEnd && (
                <Box style={{}}>
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: smallScreen ? '1rem' : '20px',
                    }}
                  >
                    {cityAtEnd?.id}
                  </Typography>
                  <Button
                    className={redoBtn}
                    style={{}}
                    onClick={() => getCompareLink(cityAtLeft, 2)}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#698d29',
                      }}
                    >
                      <i
                        className="fas fa-redo-alt"
                        style={{ fontSize: '1rem' }}
                      ></i>
                      <Typography
                        variant="subtitle1"
                        style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                      >
                        Change city
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              )}
            </Box>
            <Divider style={{ width: '80%', margin: 'auto' }} />
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <img src={greenScoreIcon} alt="green score" width="30px" />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: '10px',
                    // fontWeight: 'bold',
                    // fontSize: smallScreen ? '1rem' : '20px',
                  }}
                >
                  Green Score
                </Typography>
              </Box>
              <Box
                className={rowStyle}
                style={{
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                        Math.round(cityAtRight?.green_score * 100) / 100
                        ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                          Math.round(cityAtEnd?.green_score * 100) / 100
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : Math.round(cityAtLeft?.green_score * 100) / 100 >
                        Math.round(cityAtRight?.green_score * 100) / 100
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                        Math.round(cityAtRight?.green_score * 100) / 100
                        ? Math.round(cityAtLeft?.green_score * 100) / 100 >
                          Math.round(cityAtEnd?.green_score * 100) / 100
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : Math.round(cityAtLeft?.green_score * 100) / 100 >
                        Math.round(cityAtRight?.green_score * 100) / 100
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {Math.round(cityAtLeft?.green_score * 100) / 100}
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  borderRadius: '50px',
                  width: 'max-content',
                  padding: '7px',
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? Math.round(cityAtRight?.green_score * 100) / 100 >
                        Math.round(cityAtLeft?.green_score * 100) / 100
                        ? Math.round(cityAtRight?.green_score * 100) / 100 >
                          Math.round(cityAtEnd?.green_score * 100) / 100
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : Math.round(cityAtRight?.green_score * 100) / 100 >
                        Math.round(cityAtLeft?.green_score * 100) / 100
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? Math.round(cityAtRight?.green_score * 100) / 100 >
                        Math.round(cityAtLeft?.green_score * 100) / 100
                        ? Math.round(cityAtRight?.green_score * 100) / 100 >
                          Math.round(cityAtEnd?.green_score * 100) / 100
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : Math.round(cityAtRight?.green_score * 100) / 100 >
                        Math.round(cityAtLeft?.green_score * 100) / 100
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {Math.round(cityAtRight?.green_score * 100) / 100}
                </Typography>
              </Box>
              {cityAtEnd && (
                <Box
                  className={rowStyle}
                  style={{
                    backgroundColor:
                      Math.round(cityAtEnd?.green_score * 100) / 100 >
                      Math.round(cityAtLeft?.green_score * 100) / 100
                        ? Math.round(cityAtEnd?.green_score * 100) / 100 >
                          Math.round(cityAtRight?.green_score * 100) / 100
                          ? '#99c93c'
                          : 'white'
                        : '#fff',
                    color:
                      Math.round(cityAtEnd?.green_score * 100) / 100 >
                      Math.round(cityAtLeft?.green_score * 100) / 100
                        ? Math.round(cityAtEnd?.green_score * 100) / 100 >
                          Math.round(cityAtRight?.green_score * 100) / 100
                          ? '#fff'
                          : 'black'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      marginRight: smallScreen ? '0.5rem' : '0rem',
                    }}
                  >
                    {Math.round(cityAtEnd?.green_score * 100) / 100}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider style={{ width: '80%', margin: 'auto' }} />
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <img
                  src={percentageIcon}
                  alt="Percentage of urban green space"
                  width="30px"
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: '10px',
                    // fontWeight: 'bold',
                    // fontSize: smallScreen ? '1rem' : '20px',
                  }}
                >
                  Percentage of urban green space
                </Typography>
              </Box>
              <Box
                className={rowStyle}
                style={{
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        )
                        ? NumberUtils.toPercentage(
                            cityAtLeft?.total_green_space_percentage
                          ) >
                          NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          )
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        )
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        )
                        ? NumberUtils.toPercentage(
                            cityAtLeft?.total_green_space_percentage
                          ) >
                          NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          )
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        )
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(
                    cityAtLeft?.total_green_space_percentage
                  )}
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  borderRadius: '50px',
                  width: 'max-content',
                  padding: '7px',
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        )
                        ? NumberUtils.toPercentage(
                            cityAtRight?.total_green_space_percentage
                          ) >
                          NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          )
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        )
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        )
                        ? NumberUtils.toPercentage(
                            cityAtRight?.total_green_space_percentage
                          ) >
                          NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          )
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : NumberUtils.toPercentage(
                          cityAtRight?.total_green_space_percentage
                        ) >
                        NumberUtils.toPercentage(
                          cityAtLeft?.total_green_space_percentage
                        )
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(
                    cityAtRight?.total_green_space_percentage
                  )}
                </Typography>
              </Box>
              {cityAtEnd && (
                <Box
                  style={{
                    display: 'flex',
                    borderRadius: '50px',
                    width: 'max-content',
                    padding: '7px',
                    backgroundColor:
                      NumberUtils.toPercentage(
                        cityAtEnd?.total_green_space_percentage
                      ) >
                      NumberUtils.toPercentage(
                        cityAtLeft?.total_green_space_percentage
                      )
                        ? NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          ) >
                          NumberUtils.toPercentage(
                            cityAtRight?.total_green_space_percentage
                          )
                          ? '#99c93c'
                          : 'white'
                        : '#fff',
                    color:
                      NumberUtils.toPercentage(
                        cityAtEnd?.total_green_space_percentage
                      ) >
                      NumberUtils.toPercentage(
                        cityAtLeft?.total_green_space_percentage
                      )
                        ? NumberUtils.toPercentage(
                            cityAtEnd?.total_green_space_percentage
                          ) >
                          NumberUtils.toPercentage(
                            cityAtRight?.total_green_space_percentage
                          )
                          ? '#fff'
                          : 'black'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      marginRight: smallScreen ? '0.5rem' : '0rem',
                    }}
                  >
                    {NumberUtils.toPercentage(
                      cityAtEnd?.total_green_space_percentage
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider style={{ width: '80%', margin: 'auto' }} />
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={healthIcon}
                  alt="urban vegetation"
                  width="30px"
                  height="30px"
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: '10px',
                    // fontWeight: 'bold',
                    // fontSize: smallScreen ? '1rem' : '20px',
                  }}
                >
                  Average health of urban vegetation
                </Typography>
              </Box>
              <Box>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'fit-content',
                  }}
                >
                  <Box
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',
                      height: smallScreen ? '2rem' : '3rem',
                      borderRadius: '50px',
                      width: smallScreen ? '5rem' : '15rem',
                      marginBottom: '0.5rem',
                    }}
                  ></Box>
                  <Box
                    style={{
                      marginLeft: `${cityAtLeft.ndvi_vegetation * 100}%`,
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
                    </Box>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: '50px',
                    width: 'max-content',
                    padding: '7px',
                    backgroundColor:
                      cityAtLeft && cityAtRight && cityAtEnd
                        ? NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)
                          ? NumberUtils.toFixed(
                              cityAtLeft?.ndvi_vegetation,
                              2
                            ) >
                            NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2)
                            ? '#99c93c'
                            : 'white'
                          : '#fff'
                        : NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)
                        ? '#99c93c'
                        : 'white',
                    color:
                      cityAtLeft && cityAtRight && cityAtEnd
                        ? NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)
                          ? NumberUtils.toFixed(
                              cityAtLeft?.ndvi_vegetation,
                              2
                            ) >
                            NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2)
                            ? '#fff'
                            : 'black'
                          : 'black'
                        : NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)
                        ? '#fff'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      marginRight: smallScreen ? '0.5rem' : '0rem',
                    }}
                  >
                    {NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'fit-content',
                  }}
                >
                  <Box
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',
                      height: smallScreen ? '2rem' : '3rem',
                      borderRadius: '50px',
                      width: smallScreen ? '5rem' : '15rem',
                      marginBottom: '0.5rem',
                      marginTop: smallScreen ? '0.5rem' : '0rem',
                    }}
                  ></Box>
                  <Box
                    style={{
                      marginLeft: `${cityAtRight.ndvi_vegetation * 100}%`,
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
                    </Box>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: '50px',
                    width: 'fit-content',
                    padding: '7px',
                    backgroundColor:
                      cityAtLeft && cityAtRight && cityAtEnd
                        ? NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                          ? NumberUtils.toFixed(
                              cityAtRight?.ndvi_vegetation,
                              2
                            ) >
                            NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2)
                            ? '#99c93c'
                            : 'white'
                          : '#fff'
                        : NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                        ? '#99c93c'
                        : 'white',
                    color:
                      cityAtLeft && cityAtRight && cityAtEnd
                        ? NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                          ? NumberUtils.toFixed(
                              cityAtRight?.ndvi_vegetation,
                              2
                            ) >
                            NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2)
                            ? '#fff'
                            : 'black'
                          : 'black'
                        : NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2) >
                          NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                        ? '#fff'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      marginLeft: smallScreen ? '0.5rem' : '0rem',
                      fontSize: '20px',
                      padding: '0.5rem',
                    }}
                  >
                    {NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)}
                  </Typography>
                </Box>
              </Box>
              {cityAtEnd && (
                <Box>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 'fit-content',
                    }}
                  >
                    <Box
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',
                        height: smallScreen ? '2rem' : '3rem',
                        borderRadius: '50px',
                        width: smallScreen ? '5rem' : '15rem',
                        marginBottom: '0.5rem',
                      }}
                    ></Box>
                    <Box
                      style={{
                        marginLeft: `${cityAtEnd.ndvi_vegetation * 100}%`,
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
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      borderRadius: '50px',
                      width: 'max-content',
                      padding: '7px',
                      backgroundColor:
                        NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2) >
                        NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                          ? NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2) >
                            NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)
                            ? '#99c93c'
                            : 'white'
                          : '#fff',
                      color:
                        NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2) >
                        NumberUtils.toFixed(cityAtLeft?.ndvi_vegetation, 2)
                          ? NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2) >
                            NumberUtils.toFixed(cityAtRight?.ndvi_vegetation, 2)
                            ? '#fff'
                            : 'black'
                          : 'black',
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        marginRight: smallScreen ? '0.5rem' : '0rem',
                      }}
                    >
                      {NumberUtils.toFixed(cityAtEnd?.ndvi_vegetation, 2)}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            <Divider style={{ width: '80%', margin: 'auto' }} />
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <img
                  src={distributionIcon}
                  alt="Distribution of urban green space"
                  width="30px"
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  Distribution of urban green space
                </Typography>
              </Box>
              <Box
                className={rowStyle}
                style={{
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.grid_median_vegetation >
                        cityAtRight?.grid_median_vegetation
                        ? cityAtLeft?.grid_median_vegetation >
                          cityAtEnd?.grid_median_vegetation
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtLeft?.grid_median_vegetation >
                        cityAtRight?.grid_median_vegetation
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.grid_median_vegetation >
                        cityAtRight?.grid_median_vegetation
                        ? cityAtLeft?.grid_median_vegetation >
                          cityAtEnd?.grid_median_vegetation
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtLeft?.grid_median_vegetation >
                        cityAtRight?.grid_median_vegetation
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(cityAtLeft?.grid_median_vegetation)}
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  borderRadius: '50px',
                  width: 'max-content',
                  padding: '7px',
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.grid_median_vegetation >
                        cityAtLeft?.grid_median_vegetation
                        ? cityAtRight?.grid_median_vegetation >
                          cityAtEnd?.grid_median_vegetation
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtRight?.grid_median_vegetation >
                        cityAtLeft?.grid_median_vegetation
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.grid_median_vegetation >
                        cityAtLeft?.grid_median_vegetation
                        ? cityAtRight?.grid_median_vegetation >
                          cityAtEnd?.grid_median_vegetation
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtRight?.grid_median_vegetation >
                        cityAtLeft?.grid_median_vegetation
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(
                    cityAtRight?.grid_median_vegetation
                  )}
                </Typography>
              </Box>
              {cityAtEnd && (
                <Box
                  style={{
                    display: 'flex',
                    borderRadius: '50px',
                    width: 'max-content',
                    padding: '7px',
                    backgroundColor:
                      cityAtEnd?.grid_median_vegetation >
                      cityAtLeft?.grid_median_vegetation
                        ? cityAtEnd?.grid_median_vegetation >
                          cityAtRight?.grid_median_vegetation
                          ? '#99c93c'
                          : 'white'
                        : '#fff',
                    color:
                      cityAtEnd?.grid_median_vegetation >
                      cityAtLeft?.grid_median_vegetation
                        ? cityAtEnd?.grid_median_vegetation >
                          cityAtRight?.grid_median_vegetation
                          ? '#fff'
                          : 'black'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      marginRight: smallScreen ? '0.5rem' : '0rem',
                    }}
                  >
                    {NumberUtils.toPercentage(
                      cityAtEnd?.grid_median_vegetation
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider style={{ width: '80%', margin: 'auto' }} />
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <img
                  src={capitaIcon}
                  alt="Urban green space per capita"
                  width="30px"
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: '10px',
                    // fontWeight: 'bold',
                    // fontSize: smallScreen ? '1rem' : '20px',
                  }}
                >
                  Urban green space per capita
                </Typography>
              </Box>
              <Box
                className={rowStyle}
                style={{
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.green_per_capita >
                        cityAtRight?.green_per_capita
                        ? cityAtLeft?.green_per_capita >
                          cityAtEnd?.green_per_capita
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtLeft?.green_per_capita >
                        cityAtRight?.green_per_capita
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.green_per_capita >
                        cityAtRight?.green_per_capita
                        ? cityAtLeft?.green_per_capita >
                          cityAtEnd?.green_per_capita
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtLeft?.green_per_capita >
                        cityAtRight?.green_per_capita
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {`${NumberUtils.toFixed(cityAtLeft?.green_per_capita, 1)} m²`}
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  borderRadius: '50px',
                  width: 'max-content',
                  padding: '7px',
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.green_per_capita >
                        cityAtLeft?.green_per_capita
                        ? cityAtRight?.green_per_capita >
                          cityAtEnd?.green_per_capita
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtRight?.green_per_capita >
                        cityAtLeft?.green_per_capita
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.green_per_capita >
                        cityAtLeft?.green_per_capita
                        ? cityAtRight?.green_per_capita >
                          cityAtEnd?.green_per_capita
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtRight?.green_per_capita >
                        cityAtLeft?.green_per_capita
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {`${NumberUtils.toFixed(
                    cityAtRight?.green_per_capita,
                    1
                  )} m²`}
                </Typography>
              </Box>
              {cityAtEnd && (
                <Box
                  className={rowStyle}
                  style={{
                    backgroundColor:
                      cityAtEnd?.green_per_capita > cityAtLeft?.green_per_capita
                        ? cityAtEnd?.green_per_capita >
                          cityAtRight?.green_per_capita
                          ? '#99c93c'
                          : 'white'
                        : '#fff',
                    color:
                      cityAtEnd?.green_per_capita > cityAtLeft?.green_per_capita
                        ? cityAtEnd?.green_per_capita >
                          cityAtRight?.green_per_capita
                          ? '#fff'
                          : 'black'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      marginRight: smallScreen ? '0.5rem' : '0rem',
                    }}
                  >
                    {`${NumberUtils.toFixed(
                      cityAtEnd?.green_per_capita,
                      1
                    )} m²`}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider style={{ width: '80%', margin: 'auto' }} />
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <img
                  src={treeIcon}
                  alt="Distribution of urban green space"
                  width="30px"
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  Percentage of urban area covered by trees
                </Typography>
              </Box>
              <Box
                className={rowStyle}
                style={{
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.treecanopycover_percentage >
                        cityAtRight?.treecanopycover_percentage
                        ? cityAtLeft?.treecanopycover_percentage >
                          cityAtEnd?.treecanopycover_percentage
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtLeft?.treecanopycover_percentage >
                        cityAtRight?.treecanopycover_percentage
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.treecanopycover_percentage >
                        cityAtRight?.treecanopycover_percentage
                        ? cityAtLeft?.treecanopycover_percentage >
                          cityAtEnd?.treecanopycover_percentage
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtLeft?.treecanopycover_percentage >
                        cityAtRight?.treecanopycover_percentage
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(
                    cityAtLeft?.treecanopycover_percentage
                  )}
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  borderRadius: '50px',
                  width: 'max-content',
                  padding: '7px',
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.treecanopycover_percentage >
                        cityAtLeft?.treecanopycover_percentage
                        ? cityAtRight?.treecanopycover_percentage >
                          cityAtEnd?.treecanopycover_percentage
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtRight?.treecanopycover_percentage >
                        cityAtLeft?.treecanopycover_percentage
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.treecanopycover_percentage >
                        cityAtLeft?.treecanopycover_percentage
                        ? cityAtRight?.treecanopycover_percentage >
                          cityAtEnd?.treecanopycover_percentage
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtRight?.treecanopycover_percentage >
                        cityAtLeft?.treecanopycover_percentage
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(
                    cityAtRight?.treecanopycover_percentage
                  )}
                </Typography>
              </Box>
              {cityAtEnd && (
                <Box
                  className={rowStyle}
                  style={{
                    backgroundColor:
                      cityAtEnd?.treecanopycover_percentage >
                      cityAtLeft?.treecanopycover_percentage
                        ? cityAtEnd?.treecanopycover_percentage >
                          cityAtRight?.treecanopycover_percentage
                          ? '#99c93c'
                          : 'white'
                        : '#fff',
                    color:
                      cityAtEnd?.treecanopycover_percentage >
                      cityAtLeft?.treecanopycover_percentage
                        ? cityAtEnd?.treecanopycover_percentage >
                          cityAtRight?.treecanopycover_percentage
                          ? '#fff'
                          : 'black'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      marginRight: smallScreen ? '0.5rem' : '0rem',
                    }}
                  >
                    {NumberUtils.toPercentage(
                      cityAtEnd?.treecanopycover_percentage
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider style={{ width: '80%', margin: 'auto' }} />
            <Box
              style={{
                display: 'grid',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '15rem',
                textAlign: 'left',
                gridTemplateColumns: cityAtEnd
                  ? '7fr 5fr 5fr 5fr '
                  : '5fr 5fr 5fr',
                width: '75%',
                marginTop: '2rem',
                marginBottom: '2rem',
              }}
            >
              <Box style={{ display: 'flex' }}>
                <img
                  src={grassIcon}
                  alt="Percentage of urban area covered by grass"
                  width="30px"
                  height="30px"
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: '10px',
                    // fontWeight: 'bold',
                    // fontSize: smallScreen ? '1rem' : '20px',
                  }}
                >
                  Percentage of urban area covered by grass
                </Typography>
              </Box>
              <Box
                className={rowStyle}
                style={{
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.grasscover_percentage >
                        cityAtRight?.grasscover_percentage
                        ? cityAtLeft?.grasscover_percentage >
                          cityAtEnd?.grasscover_percentage
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtLeft?.grasscover_percentage >
                        cityAtRight?.grasscover_percentage
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtLeft?.grasscover_percentage >
                        cityAtRight?.grasscover_percentage
                        ? cityAtLeft?.grasscover_percentage >
                          cityAtEnd?.grasscover_percentage
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtLeft?.grasscover_percentage >
                        cityAtRight?.grasscover_percentage
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(cityAtLeft?.grasscover_percentage)}
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  borderRadius: '50px',
                  width: 'max-content',
                  padding: '7px',
                  backgroundColor:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.grasscover_percentage >
                        cityAtLeft?.grasscover_percentage
                        ? cityAtRight?.grasscover_percentage >
                          cityAtEnd?.grasscover_percentage
                          ? '#99c93c'
                          : 'white'
                        : '#fff'
                      : cityAtRight?.grasscover_percentage >
                        cityAtLeft?.grasscover_percentage
                      ? '#99c93c'
                      : 'white',
                  color:
                    cityAtLeft && cityAtRight && cityAtEnd
                      ? cityAtRight?.grasscover_percentage >
                        cityAtLeft?.grasscover_percentage
                        ? cityAtRight?.grasscover_percentage >
                          cityAtEnd?.grasscover_percentage
                          ? '#fff'
                          : 'black'
                        : 'black'
                      : cityAtRight?.grasscover_percentage >
                        cityAtLeft?.grasscover_percentage
                      ? '#fff'
                      : 'black',
                }}
              >
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginRight: smallScreen ? '0.5rem' : '0rem',
                  }}
                >
                  {NumberUtils.toPercentage(cityAtRight?.grasscover_percentage)}
                </Typography>
              </Box>
              {cityAtEnd && (
                <Box
                  className={rowStyle}
                  style={{
                    backgroundColor:
                      cityAtEnd?.grasscover_percentage >
                      cityAtLeft?.grasscover_percentage
                        ? cityAtEnd?.grasscover_percentage >
                          cityAtRight?.grasscover_percentage
                          ? '#99c93c'
                          : 'white'
                        : '#fff',
                    color:
                      cityAtEnd?.grasscover_percentage >
                      cityAtLeft?.grasscover_percentage
                        ? cityAtEnd?.grasscover_percentage >
                          cityAtRight?.grasscover_percentage
                          ? '#fff'
                          : 'black'
                        : 'black',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      marginRight: smallScreen ? '0.5rem' : '0rem',
                    }}
                  >
                    {NumberUtils.toPercentage(cityAtEnd?.grasscover_percentage)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <WinnerBanner
            cityAtLeft={cityAtLeft}
            cityAtRight={cityAtRight}
            cityAtEnd={cityAtEnd}
            winnerCity={
              cityAtLeft && cityAtRight && cityAtEnd
                ? cityAtLeft?.green_score > cityAtRight?.green_score &&
                  cityAtLeft?.green_score > cityAtEnd?.green_score
                  ? cityAtLeft?.id
                  : cityAtRight?.green_score > cityAtEnd?.green_score
                  ? cityAtRight?.id
                  : cityAtEnd?.id
                : cityAtLeft.green_score > cityAtRight.green_score
                ? cityAtLeft.id
                : cityAtRight.id
            }
          />
          {/* <WinnerBanner
						winnerCity={
							cityAtLeft.green_score > cityAtRight.green_score
								? cityAtLeft.id
								: cityAtRight.id
						}
					/> */}
        </Box>
      ) : (
        <Box
          style={{
            margin: smallScreen ? '2rem 2rem 0rem' : '3rem 0rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            style={{ margin: '2rem auto', fontWeight: 'bold' }}
          >
            Which city is greener?
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              margin: smallScreen ? '0rem 0rem 1rem' : '0rem 20rem 1rem',
              textAlign: 'center',
            }}
          >
            Greenness is not a competition although benchmarking cities can be a
            great learning opportunity for you to either feel proud of your
            achievements or find inspiration on how to do better.
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              margin: smallScreen ? '0rem 0rem 1rem' : '0rem 20rem 1rem',
              textAlign: 'center',
            }}
          >
            Battle two cities against each other based on their green KPI’s and
            find out who is greener.
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              margin: smallScreen ? '0rem 0rem 1rem' : '0rem 20rem 1rem',
              textAlign: 'center',
            }}
          >
            Have fun, but be nice to your opponent
          </Typography>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box style={{}}>
              {cityAtLeft && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0rem',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant={smallScreen ? 'subtitle2' : 'h6'}
                    style={{ fontWeight: 'bold' }}
                  >
                    {cityAtLeft?.id}
                  </Typography>
                  <Button
                    className={redoBtn}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                    onClick={() => getCompareLink(cityAtRight, 0)}
                  >
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#698d29',
                      }}
                    >
                      <i
                        className="fas fa-redo-alt"
                        style={{ fontSize: '1rem' }}
                      ></i>
                      <Typography
                        variant="subtitle1"
                        style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                      >
                        Change city
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              )}
              {!cityAtLeft?.id && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: 'bold' }}
                    >
                      Select city 1
                    </Typography>
                    <Autocomplete
                      id="combo-box-demo"
                      options={
                        rightCity && endCity
                          ? citiesList.filter(
                              c => c?.id !== rightCity && c?.id !== endCity
                            )
                          : citiesList
                      }
                      getOptionLabel={option => option?.id}
                      style={
                        smallScreen ? { width: '5rem' } : { width: '16rem' }
                      }
                      inputValue={leftCity}
                      filterOptions={filterOptions}
                      onInputChange={(e, v) => {
                        if (citiesIds.includes(v)) {
                          if (
                            !rightCity ||
                            !endCity ||
                            (rightCity && endCity !== v)
                          ) {
                            navigate(
                              rightCity && endCity
                                ? `/compare/?${v}_vs_${rightCity}_vs_${endCity} `
                                : `/compare/?${v}_vs_`
                            );
                          }
                          if (rightCity || endCity) {
                            window.scroll({
                              top: 0,
                              left: 0,
                              behavior: 'smooth',
                            });
                          }
                        }
                        setLeftCity(v);
                      }}
                      renderInput={params => (
                        <TextField {...params} placeholder="Enter city name" />
                      )}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            <Box>
              <Box
                style={{
                  margin: '1rem 4rem',
                  width: '0.25rem',
                  height: '30rem',
                  backgroundColor: '#f4f5f5',
                  position: 'relative',
                }}
              >
                <Box
                  style={{
                    width: '5rem',
                    height: '5rem',
                    background: '#99c93c',
                    borderRadius: '2.5rem',
                    display: 'flex',
                    placeContent: 'center',
                    placeItems: 'center',
                    justifySelf: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    position: 'absolute',
                    marginLeft: '-2.25rem',
                    top: '12rem',
                  }}
                >
                  vs
                </Box>
              </Box>
            </Box>
            <Box style={{}}>
              {cityAtRight && (
                <>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '0rem',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant={smallScreen ? 'subtitle2' : 'h5'}
                      style={{ fontWeight: 'bold' }}
                    >
                      {cityAtRight?.id}
                    </Typography>
                    <Button
                      className={redoBtn}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                      onClick={() => getCompareLink(cityAtLeft, 1)}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          color: '#698d29',
                        }}
                      >
                        <i
                          className="fas fa-redo-alt"
                          style={{ fontSize: '1rem' }}
                        ></i>
                        <Typography
                          variant="subtitle1"
                          style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                        >
                          Change city
                        </Typography>
                      </Box>
                    </Button>
                  </Box>
                </>
              )}
              {!cityAtRight?.id && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // marginLeft: '5rem'
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: 'bold' }}
                    >
                      Select city 2
                    </Typography>
                    <Autocomplete
                      id="combo-box-demo"
                      options={
                        leftCity || endCity
                          ? citiesList.filter(
                              c => c?.id !== leftCity && c?.id !== endCity
                            )
                          : citiesList
                        // cityAtLeft?.id
                        // 	? citiesList.filter(c => c?.id !== cityAtLeft?.id)
                        // 	: citiesList
                      }
                      getOptionLabel={option => option?.id}
                      style={
                        smallScreen ? { width: '5rem' } : { width: '16rem' }
                      }
                      inputValue={rightCity}
                      filterOptions={filterOptions}
                      onInputChange={(e, v) => {
                        if (citiesIds.includes(v)) {
                          if (!leftCity || (leftCity && endCity !== v)) {
                            navigate(
                              leftCity && endCity
                                ? `/compare/?${leftCity}_vs_${v}_vs_${endCity} `
                                : `/compare/?${leftCity}_vs_${v} `
                            );
                          }
                          if (leftCity || endCity) {
                            window.scroll({
                              top: 0,
                              left: 0,
                              behavior: 'smooth',
                            });
                          }
                        }
                        setRightCity(v);
                      }}
                      renderInput={params => (
                        <TextField {...params} placeholder="Enter city name" />
                      )}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            {!open && (
              <Button
                variant="outlined"
                color="primary"
                disabled={leftCity && rightCity ? false : true}
                style={{
                  borderRadius: '1000px',
                  height: 76,
                  width: 76,
                  marginLeft: 30,
                }}
                onClick={() => setOpen(true)}
              >
                <IconButton
                  color={leftCity && rightCity ? 'primary' : 'inherit'}
                >
                  <Add />
                </IconButton>
              </Button>
            )}
            {open && (
              <>
                <Box>
                  <Box
                    style={{
                      margin: '1rem 4rem',
                      width: '0.25rem',
                      height: '30rem',
                      backgroundColor: '#f4f5f5',
                      position: 'relative',
                    }}
                  >
                    <Box
                      style={{
                        width: '5rem',
                        height: '5rem',
                        background: '#99c93c',
                        borderRadius: '2.5rem',
                        display: 'flex',
                        placeContent: 'center',
                        placeItems: 'center',
                        justifySelf: 'center',
                        color: 'white',
                        fontSize: '2rem',
                        position: 'absolute',
                        marginLeft: '-2.25rem',
                        top: '12rem',
                      }}
                    >
                      vs
                    </Box>
                  </Box>
                </Box>
                <Box style={{}}>
                  {cityAtEnd && (
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '0rem',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant={smallScreen ? 'subtitle2' : 'h6'}
                        style={{ fontWeight: 'bold' }}
                      >
                        {cityAtEnd?.id}
                      </Typography>
                      <Button
                        className={redoBtn}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        onClick={() => getCompareLink(cityAtLeft, 2)}
                      >
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: '#698d29',
                          }}
                        >
                          <i
                            className="fas fa-redo-alt"
                            style={{ fontSize: '1rem' }}
                          ></i>
                          <Typography
                            variant="subtitle1"
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                          >
                            Change city
                          </Typography>
                        </Box>
                      </Button>
                    </Box>
                  )}
                  {!cityAtEnd?.id && (
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Select city 3
                        </Typography>
                        <Autocomplete
                          id="combo-box-demo"
                          options={
                            leftCity || rightCity
                              ? citiesList.filter(
                                  c => c?.id !== leftCity && c?.id !== rightCity
                                )
                              : citiesList
                          }
                          getOptionLabel={option => option?.id}
                          style={
                            smallScreen ? { width: '5rem' } : { width: '16rem' }
                          }
                          inputValue={endCity}
                          filterOptions={filterOptions}
                          onInputChange={(e, v) => {
                            if (citiesIds.includes(v)) {
                              if (!leftCity || (leftCity && rightCity !== v)) {
                                navigate(
                                  leftCity && rightCity
                                    ? `/compare/?${leftCity}_vs_${rightCity}_vs_${v}`
                                    : `/compare/?${v}_vs_`
                                );
                              }
                              if (leftCity && rightCity) {
                                window.scroll({
                                  top: 0,
                                  left: 0,
                                  behavior: 'smooth',
                                });
                              }
                            }
                            setEndCity(v);
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="Enter city name"
                            />
                          )}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            disabled={rightCity || endCity ? false : true}
            className={redoBtn}
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: '#fff',
              fontWeight: 'bold',
              marginLeft: open ? '43%' : '30%',
            }}
            onClick={onCompareCity}
          >
            Compare selected cities
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default observer(CityComparisonPage);
