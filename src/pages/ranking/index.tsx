import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Drawer,
  Box,
  useMediaQuery,
  IconButton,
  Snackbar,
  SnackbarContent,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import {
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
  Close,
} from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { Link, navigate } from 'gatsby';
import SEO from '../../hooks/seo';
import Map from '../../components/map/map';
import Pin from '../../components/map/pin';
import useCities from '../../hooks/cities';
import TopComponent from '../../components/top-component/top-component';
import LoadingMap from '../../components/map/loading-map';
import RankingsTable from 'components/rankings-table/rankings-table';
import { getCitiesLatLongs } from 'utils/city-utils';
import { getRankingURL } from 'components/link/ranking-link';
import {
  CONTINENT_NAMES,
  POPULATION_CATEGORIES,
  TERAIN_CATEGORIES,
} from 'models';
import RegionTabs from 'components/region-tabs';
import PopulationTabs from 'components/population-tabs';
import MapDrawerNew from 'components/datapage/MapDrawerNew';
import queryString from 'query-string';
import TerainsTabs from 'components/terains-tabs';
import { useStyles } from '../../styles/ranking';
// @ts-ignore
import noDataImg from '../../images/widget-tree-grass.png';
import Joyride, {
  CallBackProps,
  STATUS,
  TooltipRenderProps,
} from 'react-joyride';
import TourPopupComponent from '../../components/tour-popup/TourPopupComponent';
import clsx from 'clsx';
const browser = typeof window !== 'undefined' && window;

interface Props {
  location: Location;
  data: any;
}

/**
 * City and Ranking Page
 * @file ranking.tsx is the Ranking and City Page that renders city's details with ranking city details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const RankingPage: React.FC<Props> = props => {
  if (!browser) {
    return null;
  }
  const {
    root,
    listDrawer,
    // toggleButtonShift,
    toggleButton,
    smallToggleButtonShift,
    smallToggleButton,
    ArrowBack,
    drawerPaper,
    smallDrawerPaper,
    smallDataDiv,
    largeDiv,
    smallDiv,
    helpMainBox,
    helpHeader,
    helpContent,
    helpActiveCardCount,
    helpFooterContent,
    helpFooter,
  } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [runJoyride, setRunJoyride] = useState(false);
  const [params, setParams] = useState({
    mapView: 'standard',
    filter: 'All',
    region: 'All',
    tags: '',
  });
  useEffect(() => {
    const urlParams = queryString.parse(props.location.search);
    // @ts-ignore
    const paramObj: any = Object.fromEntries(new URLSearchParams(urlParams));
    if (Object.keys(paramObj).length > 0) {
      setParams(paramObj);
    }
  }, [props.location.search]);
  const [activeCities, setActiveCities] = useState([]);
  const { cityStore } = useCities();
  const { towns } = cityStore?.municipalities || {};
  const selectedDiv = open ? largeDiv : smallDiv;
  const toggleOpen = () => setOpen(!open);
  const { citiesInActiveContinent } = useCities(
    params.region,
    'All',
    'All',
    params.tags
  );
  // console.log('cityStore', cityStore.worldDistributionMap);

  const { citiesFromPopulation } = useCities('All', params.filter);
  const { citiesFromTerains } = useCities('All', 'All', params.filter);
  // useEffect(() => {
  //   setRunJoyride(cityStore.isRankingTourfirst);
  // }, []);
  useEffect(() => {
    if (params.mapView === 'terains' && params.region === 'All') {
      setActiveCities(citiesFromTerains);
    } else if (params.mapView === 'population') {
      setActiveCities(citiesFromPopulation);
    } else if (params.mapView === 'standard') {
      setActiveCities(citiesInActiveContinent);
    }
  }, [
    citiesInActiveContinent,
    citiesFromPopulation,
    citiesFromTerains,
    params,
  ]);
  /**
   * citiesLastLongs get all the cities with latitude and longitudes
   */
  const citiesLatLongs = useMemo(() => getCitiesLatLongs(activeCities), [
    activeCities,
  ]);
  const ContinentKeys = Object.values(CONTINENT_NAMES).filter(
    item => item !== Number(item)
  );
  const setActiveContinentWithIndex = (index: string) => {
    const continentName = index;
    const url = params;
    url.region = continentName;
    url.filter = 'All';
    const u = new URLSearchParams(url).toString();
    navigate(getRankingURL(u));
  };
  const PopulationKeys = Object.values(POPULATION_CATEGORIES).filter(
    item => item !== Number(item)
  );
  const setActivePopulationWithIndex = (index: string) => {
    const populationName = index;
    const url = params;
    url.region = 'All';
    url.filter = populationName;
    const u = new URLSearchParams(url).toString();
    navigate(getRankingURL(u));
  };
  const TerrainKeys = Object.values(TERAIN_CATEGORIES).filter(
    item => item !== Number(item)
  );
  const setActiveTerainsWithIndex = (index: string) => {
    const terainsName = index;
    const url = params;
    url.filter = terainsName;
    url.region = 'All';
    const u = new URLSearchParams(url).toString();
    navigate(getRankingURL(u));
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      cityStore.isRankingTourfirst = false;
      setRunJoyride(!runJoyride);
      setOpenSnackbar(true);
      localStorage.setItem('isRankingTourPending', 'false');
    }
  };
  const handleJoyRideClose = () => {
    setRunJoyride(!runJoyride);
    localStorage.setItem('isRankingTourPending', 'false');
  };
  const handleSnackbarClon = () => {
    setOpenSnackbar(false);
  };

  const steps = [
    {
      target: '.first-step',
      content:
        'View the complete list of global countries and their rankings in the HUGSI index based on how green they are.',
      title: 'Ranking',
      disableBeacon: true,
    },
    {
      target: '.third-step',
      content:
        'Select any of the three modes (Standard, Terrain, and Population) based on your viewing preferences on this interactive map.',
      title: 'Map View',
      disableBeacon: true,
    },
    {
      target: '.forth-step',
      content:
        'Narrow your search by selecting the region of your choice from the dropdown list and see the details of relevant cities.',
      title: 'Select Region',
    },
    {
      target: '.fifth-step',
      content:
        'Find the cities along with their rankings & other details based on any of the tags that you select.',
      title: 'Filter by Tags',
    },
  ];
  function Tooltip({
    continuous,
    index,
    primaryProps,
    skipProps,
    step,
    tooltipProps,
  }: TooltipRenderProps) {
    return (
      <Box
        {...tooltipProps}
        border={false}
        maxWidth={420}
        minWidth={290}
        overflow="hidden"
        // radius="md"
        variant="black"
        className={helpMainBox}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          <div className={helpHeader}>{step.title && step.title}</div>
          <div className={helpActiveCardCount}>
            {index + 1 + ' of ' + steps.length}
          </div>
        </div>
        <div className={helpContent}>{step.content && step.content}</div>
        <div className={helpFooter}>
          {/* {!isLastStep && ( */}
          <div
            {...skipProps}
            className={helpFooterContent}
            style={{ color: '#698D29' }}
          >
            Skip All
          </div>
          {/* )} */}
          <div {...primaryProps} className={helpFooterContent}>
            {continuous ? 'Next' : 'close'}
          </div>
        </div>
      </Box>
    );
  }

  return cityStore.isLoadingCities || cityStore.cities.length === 0 ? (
    <LoadingMap message={'Loading map data'} />
  ) : (
    <div>
      {localStorage.getItem('isRankingTourPending') !== 'false' && (
        <TourPopupComponent
          onClose={handleJoyRideClose}
          // onStart={() => setRunJoyride(true)}
        />
      )}
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        autoStart
        hideCloseButton
        run={runJoyride}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        tooltipComponent={Tooltip}
      />
      <TopComponent height={'0rem'}>{''}</TopComponent>
      <div
        style={{
          display: smallScreen ? 'grid' : 'flex',
          position: 'relative',
          top: '100px',
        }}
      >
        <div
          style={{
            // display: 'flex',
            width: '100%',
            position: 'relative'
          }}
        >
          <Box>
            <SEO
              title={`HUGSI for rankings`}
              description={`Husqvarna Urban Green Space Index for rankings
              } including
              global ranking and insights about urban areas' vegetation proportion,
             health, distribution, etc.`}
            />
            <Box
              style={{
                height: smallScreen
                  ? open === false
                    ? '60vh'
                    : '30vh'
                  : '90vh',
                // width: open ? '60%' : '70%',
                width: '100%',
              }}
            >
              {!activeCities && activeCities.length === 0 ? (
                <LoadingMap message={'Loading map data'} />
              ) : (
                <TopComponent
                  style={{
                    height: smallScreen
                      ? open === false
                        ? '60vh'
                        : '30vh'
                      : '90vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <RegionTabs
                    cities={activeCities}
                    activeContinentIndex={ContinentKeys[0]}
                    setActiveContinentIndex={setActiveContinentWithIndex}
                    displayCategory={false}
                    displayCompareLink={false}
                    activeContinentVal={ContinentKeys[params.region]}
                    location={params.region}
                    tags={params?.tags}
                  />
                  {params.mapView === 'terains' && (
                    <TerainsTabs
                      open={open}
                      cities={activeCities}
                      activeTerainsIndex={TerrainKeys[0]}
                      setActiveTerainsIndex={setActiveTerainsWithIndex}
                      location={params.filter}
                      
                     
                    />
                  )}
                  {params.mapView === 'population' && (
                    <PopulationTabs
                      cities={citiesFromPopulation}
                      activePopulationIndex={PopulationKeys[0]}
                      setActivePopulationIndex={setActivePopulationWithIndex}
                      location={params.filter}
                      open={open}
                    />
                  )}

                  {cityStore.isLoadingCities ||
                  cityStore.cities.length === 0 ? (
                    <LoadingMap message={'Loading map data'} />
                  ) : (
                    <>
                      <Map
                        latLongArrs={citiesLatLongs}
                        view="ranking"
                        isDrawerOpen={open}
                        mapView={params.mapView}
                      >
                        {map => {
                          const zoom = map.getZoom();
                          const isMediumPin = zoom > 2;
                          const lsLargePin = zoom > 4;
                          return activeCities.map(city => {
                            const [latitude, longitude] = city.latlongarr;
                            return (
                              <Pin
                                key={city.id}
                                city={city}
                                latitude={latitude}
                                longitude={longitude}
                                largePin={lsLargePin}
                                mediumPin={isMediumPin}
                                mapView={params.mapView}
                                region={params.region}
                              />
                            );
                          });
                        }}
                      </Map>{' '}
                      <MapDrawerNew
                        open={open}
                        city=""
                        mapView={params.mapView}
                      />
                    </>
                  )}
                </TopComponent>
              )}
            </Box>
          </Box>
        </div>
        <div
          className={
            smallScreen
              ? clsx(smallDataDiv, smallDrawerPaper)
              : clsx(selectedDiv, drawerPaper)
          }
        >
          {/* <Drawer
          className={listDrawer}
          variant="persistent"
          BackdropProps={{ invisible: true }}
          open={open}
          onClose={() => setOpen(false)}
          anchor={smallScreen ? 'bottom' : 'right'}
          classes={{
            paper: smallScreen
              ? smallDrawerPaper
              : drawerPaper + ' ' + selectedDiv,
          }}
        > */}
          {smallScreen ? (
            <Button
              className={open ? smallToggleButtonShift : smallToggleButton}
              onClick={toggleOpen}
              style={{
                transform: 'rotate(-270deg)',
              }}
            >
              {open ? <ArrowForwardIos /> : <ArrowBackIos />}
            </Button>
          ) : (
            <Button
              className={toggleButton}
              onClick={toggleOpen}
              style={{
                minWidth: '3.1rem',
              }}
            >
              {open ? (
                <ArrowForwardIos />
              ) : (
                <ArrowBackIos className={ArrowBack} />
              )}
            </Button>
          )}
          <Box
            className={root}
            style={{
              margin: smallScreen ? '1rem 0.5rem' : '0rem 0rem',
              width: '100%',
              height: smallScreen ? open===false ? '30vh' : '60vh' : '90vh  ',
              padding: '1rem',
            }}
          >
            {params?.tags !== '' ? (
              <Button
                color="primary"
                variant="contained"
                style={{
                  color: '#fff',
                  borderRadius: '25px',
                  height: '40px',
                  alignItems: 'center',
                  marginTop: '5px',
                  marginBottom: '5px',
                }}
                onClick={() => {
                  // params.tags = ''
                  navigate(
                    `/ranking?mapView=${params.mapView}&region=${params.region}&filter=${params.filter}&tags=`
                  );
                  console.log(params.filter);
                  params.tags = '';
                }}
              >
                {params?.tags === 'isTreeCity'
                  ? 'TreeCities of the world'
                  : params?.tags
                      ?.replace('is', '')
                      ?.split(/(?=[A-Z])/)
                      ?.join(' ')}{' '}
                <IconButton>
                  <Close
                    style={{
                      color: '#fff',
                    }}
                  />
                </IconButton>
              </Button>
            ) : (
              ''
            )}
            {activeCities?.filter(item => item[params.tags] === 1) &&
            activeCities.length !== 0 ? (
              <div className="first-step">
                <RankingsTable
                  cities={activeCities}
                  tags={params?.tags}
                  filterParams={params}
                  drawerOption={open}
                  allCity={true}
                  handleMapViewClick={() => {
                    setOpen(!open);
                  }}
                />
              </div>
            ) : (
              <Box
                style={{
                  fontSize: '3rem',
                  margin: 'auto',
                  width: 'inherit',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                <Box>
                  <img
                    src={noDataImg}
                    alt="no data available"
                    width="100px"
                    height="100px"
                  />
                  
                </Box>
                <Box>No data available for selected region</Box>
                <Box
                  style={{
                    margin: smallScreen ? '0rem 1rem' : '2rem 0rem 0rem',
                  }}
                >
                  <Button
                    variant="text"
                    style={{
                      color: '#698D29',
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                    size={'large'}
                    component={Link}
                    to="/add-your-city"
                  >
                    Want to add your City? &nbsp;
                    <ArrowForward />
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          {/* </Drawer> */}
        </div>
      </div>
      <Snackbar
        style={{ maxWidth: '839px' }}
        open={openSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleSnackbarClon}
      >
        <SnackbarContent
          message="Tour finished. Now you’re a pro at using HUGSI"
          action={
            <Button color="secondary" size="small" onClick={handleSnackbarClon}>
              X{' '}
            </Button>
          }
        />
      </Snackbar>
    </div>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      key={`city-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

export default observer(RankingPage);
