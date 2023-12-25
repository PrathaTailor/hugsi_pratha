import React, { useEffect, useMemo, useState, memo } from 'react';
import {
  Button,
  Typography,
  Tabs,
  AppBar,
  Tab,
  Checkbox,
  Select,
  MenuItem,
  Divider,
  ButtonGroup,
  useMediaQuery,
  Box,
  Tooltip,
} from '@material-ui/core';
import Popup from 'reactjs-popup';
import {
  ArrowForward,
  Favorite,
  ExpandMore,
  FavoriteBorder,
} from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { Link, navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import RankingsTable from 'components/rankings-table/rankings-table';
import { useSiteMetadata } from '../../hooks';
import BarGauge from '../bar-chart/bar-chart';
import {
  AverageKPI,
  FAV_CITIES_MAX_COUNT,
  CLASS_LIST,
  CLASS_CHANGE_LIST,
} from '../../models';
import MunicipalityPage from '../../pages/municipality';
import useCities from '../../hooks/cities';
import { IconBullet, IconBulletWrapper } from '../icon-bullets';
import addComma from '../../utils/add-comma';
import { checkIfCityCenter, getCategoryWinners } from '../../utils/city-utils';
import Image from 'gatsby-image';
// tslint:disable-next-line: no-duplicate-imports
import {
  SimilarCitiesDetails,
  SimilarCities,
} from '../rankings-table/similar-cities';
import CategoriesSummary from '../rankings-table/categories-summary';
import ShareContent from '../../popups/share-content';
// @ts-ignore
import iconCommonClass from '../../images/icon-common-class.png';
// @ts-ignore
import iconCommonChange from '../../images/icon-common-change.png';
// @ts-ignore
import iconPopulationChange from '../../images/icon-population.png';
// @ts-ignore
import iconAreaChange from '../../images/icon-area.png';
// @ts-ignore
import widgetTreeGrass from '../../images/widget-tree-grass.png';
// @ts-ignore
import iconEmail from '../../images/icon-email.png';
// @ts-ignore
import lockIcon from '../../images/lock-icon.png';
import Moment from 'react-moment';
import YearlyDevelopment from 'components/yearly-development/yearly-development';
import { useStyles } from './style';
import SummaryView from './components/summary-view';
import UrbanGreenSpaceView from './components/urban-green-space-view';
import ChangesClassView from './components/change-class-view';
import TreeCanopyView from './components/tree-canopy-view';
const domain = typeof window !== 'undefined' ? window.location.origin : '';
const browser = typeof window !== 'undefined' && window;
interface Props {
  location?: Location;
  city: any;
  kpiAverage: AverageKPI;
  handleMapViewClick: any;
  urlByLocation?: string;
  drawerOption?: boolean;
  data: any;
  similar: any;
  setActiveMenu: any;
  handleJoyrideAction: any;
  drawerOptionChange: any;
}

/**
 * City Page
 * @file city.tsx is the City Page that renders a city's details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const CityDetails: React.FC<Props> = props => {
  if (!browser) {
    return null;
  }
  const { cityStore } = useCities();
  const {
    root,
    smallRoot,
    shortDataAndSealedWrapper,
    shorterCityName,
    longerCityName,
    enter,
    leave,
    demographicGrid,
    smallDemographicGrid,
    mainAppBar,
    mainTab,
    smallMainTab,
    unselectedTab,
    smallUnselectedTab,
    grayBg,
    middleSection,
    viewOptions,
    selectedViewOption,
    descriptionLayout,
    descriptionSummaryLayout,
    cityWrapper,
    // insightsListWrapper,
    // storiesText,
    // imageMain,
    // insightLink,
    smallDrawer,
    smallSubDrawer,
  } = useStyles({});
  const {
    kpiAverage,
    handleMapViewClick,
    drawerOption,
    city,
    urlByLocation,
    data,
  } = props;
  const cityList =
    'favCities' in localStorage && localStorage.getItem('favCities')
      ? JSON.parse(localStorage.getItem('favCities'))
      : [];
  const [favCities, setFavCities] = useState(cityList);
  const { cities } = useCities();
  // const { loginDssEndpoint } = useSiteMetadata();
  // const accessToken = cityStore?.user?.username;
  const [expand, setExpand] = useState(false);
  const smallScreen = useMediaQuery('(max-width:900px)');
  const [isHover, setIsHover] = useState<boolean>(false);
  const categoryGlobalWinners = useMemo(() => getCategoryWinners(cities), [
    cities,
  ]);
  const [value, setValue] = React.useState(location?.hash ? 3 : 0);
  // const [filteredPosts, setFilteredPost] = useState([]);
  const { citiesInActiveContinent } = useCities(city?.continent);
  const box = {
    color: '#424242',
    fontWeight: 'bold',
  };
  // City not found
  useEffect(() => {
    if (cities.length > 0 && !city) {
      navigate('/404', { replace: true });
    }
  }, [cities, city]);
  // Get boundaries for city
  useEffect(() => {
    // setValue(0);
    {
      city && drawerOption
        ? setViewValue('summary_data')
        : setViewValue('ranking_data');
    }
  }, [drawerOption]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [value]);
  // useEffect(() => {
  //   const allUniquePosts = data?.allPosts?.nodes.filter(
  //     (v, i, a) => a.findIndex(t => t.slug === v.slug) === i
  //   );
  //   const sortedArray =
  //     allUniquePosts.length &&
  //     allUniquePosts.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  //   setFilteredPost(sortedArray);
  // }, []);
  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const handleOnMouseLeave = () => {
    setIsHover(false);
  };
  // const defValue =
  //   typeof window !== 'undefined' && window.location.hash ? 3 : 0;
  const [viewValue, setViewValue] = React.useState('summary_data');
  const handleFavChange = favEvent => {
    let favCitiesList = favCities;
    if (favEvent.target.checked && !favCitiesList.includes(city.id)) {
      setFavCities([city.id, ...favCities]);
      favCitiesList.unshift(city.id);
    } else if (!favEvent.target.checked && favCitiesList.includes(city.id)) {
      setFavCities([...favCities.filter((item: string) => item !== city.id)]);
      favCitiesList = favCitiesList.filter((item: string) => item !== city.id);
    }
    localStorage.setItem(
      'favCities',
      JSON.stringify(favCitiesList.slice(0, FAV_CITIES_MAX_COUNT))
    );
  };
  function handleChangeView(newValue) {
    setViewValue(newValue);
    props.setActiveMenu(newValue);
  }
  const handleChange = (event, newValue = 0) => {
    console.log('newValue', newValue);
    document.getElementById('tabval_1').scrollTop -= 10;
    const topPos = document.getElementById('simple-tabpanel-1').offsetTop;
    document.getElementById('tabval_1').scrollTop = topPos - 10;
    if (newValue === 2) {
      handleMapViewClick('population_heatmap');
    } else {
      handleMapViewClick('summary_data');
    }
    // props.setActiveMenu('summary_data');
    // setViewValue('summary_data');
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
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
  const getContentData = tab => {
    switch (tab) {
      case 'small_drawer':
        return `The regional/global rankings & ratings of cities are derived from pre-defined key performance indicators (KPIs). 
				These KPIs are a benchmark to review or share with anyone looking to improve urban green space management. 
				Visualize the changes & classes of cities on the interactive map. `;
      case 'area_info':
        return `Here, we extend our data metrics by going the extra mile to come up with extensive details. Therefore,
				we take a few parameters like the size of the geographical area and population density into our 
				consideration and include them in our advanced analytics for green space. `;
      case 'summary':
        return `The regional/global rankings & ratings of cities are derived from pre-defined key performance indicators (KPIs).
				These KPIs are a benchmark to review or share with anyone looking to improve urban green space management.
				Visualize the changes & classes of cities on the interactive map. `;
      default:
        return `The regional/global rankings & ratings of cities are derived from pre-defined key performance indicators (KPIs). 
				These KPIs are a benchmark to review or share with anyone looking to improve urban green space management. 
				Visualize the changes & classes of cities on the interactive map. `;
    }
  };

  console.log('city', city);
  return (
    <Box className={cityWrapper}>
      {!drawerOption && city.id && (
        <>
         <ButtonGroup
          onMouseEnter={() => setExpand(true)}
          className={expand ? smallDrawer : smallSubDrawer}
          onMouseLeave={() => setExpand(false)}
        >
          <Button
            style={{
              border: 'none',
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
              textTransform: 'none',
              marginTop: '20px',
            }}
            component={Link}
            to={`/compare/?${city.id}_vs_`}
          >
            <svg
              width="1.3rem"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.875 2.59375C18.7812 2.25 18.4688 2 18.125 
                2H14.9688C15 1.625 15 1.28125 14.9688 0.96875C14.9688 
                0.4375 14.5312 0 13.9688 0H6C5.4375 0 5 0.4375 5 0.96875C4.96875 
                1.28125 4.96875 1.625 5 2H1.84375C1.5 2 1.1875 2.25 1.09375 2.59375C1.09375
                2.6875 0.5 5.25 2.15625 7.6875C3.3125 9.4375 5.28125 10.6562 8 11.375C8.59375 
                11.5312 8.96875 12.0625 8.96875 12.6562C9 13.4062 8.375 14 7.625 14H7.5C6.65625 
                14 6 14.6875 6 15.5C6 15.7812 6.21875 16 6.46875 16H13.4375C13.7188 16 13.9062 
                15.7812 13.9062 15.5C13.9062 14.6875 13.2188 14 12.4062 14H12.25C11.5 14 10.9062
                13.4062 10.9062 12.6562C10.9062 12.0625 11.3125 11.5312 11.875 11.375C14.5938
                10.6562 16.5625 9.4375 17.75 7.6875C19.4688 5.25 18.875 2.6875 18.875 
                2.59375ZM3.40625 6.875C2.53125 5.59375 2.46875 4.25 2.5 3.5H5C5.1875 5.375
                5.65625 7.625 6.8125 9.4375C5.28125 8.8125 4.125 7.96875 3.40625 
                6.875ZM16.5625 6.875C15.8438 7.96875 14.6875 8.8125 13.1562 9.4375C14.3125 
                7.625 14.7812 5.375 14.9688 3.5H17.4688C17.5 4.25 17.4375 5.59375 16.5625
                6.875Z"
                fill={expand ? 'rgb(153, 201, 60)' : 'white'}
              />
            </svg>

            <span
              style={{
                marginLeft: '1rem',
              }}
            >
              Compare this
            </span>
          </Button>
          <Button
            style={{
              border: 'none',
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
              textTransform: 'none',
            }}
          >
            <label>
              <Checkbox
                icon={
                  <FavoriteBorder
                    style={{
                      color: expand ? 'rgb(153, 201, 60)' : 'white',
                    }}
                  />
                }
                checkedIcon={
                  <Favorite
                    style={{
                      color: expand ? 'rgb(153, 201, 60)' : 'white',
                    }}
                  />
                }
                name="favCity"
                checked={favCities && favCities.includes(city.id)}
                onChange={handleFavChange}
                style={{
                  marginLeft: '-0.6rem',
                }}
              />
              <span
                style={{
                  textAlign: 'initial',
                  marginLeft: '0.2rem',
                }}
              >
                Save as favourite
              </span>
            </label>
          </Button>
          <Popup
            closeOnDocumentClick={false}
            modal
            trigger={
              <Button
                style={{
                  border: 'none',
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                }}
              >
                <svg
                  width="1.3rem"
                  style={{ marginLeft: '0.6rem' }}
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7188 7.09375L10.2188 11.8125C9.75 12.2188 9 11.875 9 
                    11.25V8.53125C4.125 8.59375 2.0625 9.78125 3.46875 14.3125C3.625 
                    14.8125 3 15.2188 2.59375 14.9062C1.21875 13.9062 0 12 0 10.0938C0 
                    5.34375 3.96875 4.3125 9 4.25V1.78125C9 1.125 9.75 0.78125 10.2188 
                    1.1875L15.7188 5.90625C16.0625 6.25 16.0625 6.78125 15.7188 7.09375Z"
                    fill={expand ? 'rgb(153, 201, 60)' : 'white'}
                  />
                </svg>
                <span
                  style={{
                    marginLeft: '1rem',
                  }}
                >
                  Share
                </span>
              </Button>
            }
          >
            {close => (
              <ShareContent close={close} smallScreen={smallScreen} />
            )}
          </Popup>
          <Button
            style={{
              border: 'none',
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
              textTransform: 'none',
              padding: '10px 20px',
              marginBottom: '20px',
            }}
            onClick={props.handleJoyrideAction}
          >
            <label>
              <i
                className="fa fa-question-circle"
                style={{
                  color: expand ? 'rgb(153, 201, 60)' : 'white',
                  width: 16,
                  height: 16,
                }}
                aria-hidden="true"
              ></i>
              <span
                style={{
                  marginLeft: '1.2rem',
                }}
              >
                Help
              </span>
            </label>
          </Button>
        </ButtonGroup>
          <Box className={drawerOption ? grayBg : 'none'}>
            <Box
              className={shortDataAndSealedWrapper}
              style={{ width: '100%' }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: smallScreen ? '85%' : '100%',
                }}
              >
                <Box
                  className={smallScreen ? shorterCityName : longerCityName}
                  style={{
                    lineHeight: '3rem',
                    float: 'left',
                    margin: smallScreen ? 'unset' : '0rem 0rem 0rem 0rem',
                    fontSize: '1.2rem',
                    width: '70%',
                  }}
                >
                  <Box
                    {...box}
                    style={{ display: 'inherit', flexDirection: 'column' }}
                  >
                    <Box
                      style={{
                        fontSize: smallScreen ? '2rem' : '2rem',
                        lineHeight: smallScreen ? '2rem' : '2rem',
                      }}
                    >
                      {city.id}
                      {/* {checkIfCityCenter(city.id)} */}
                    </Box>
                    <span>
                      <span
                        className={`flag-icon flag-icon-${city.city_code
                          .substring(0, 2)
                          .toLowerCase()}`}
                        style={{ fontSize: '1rem' }}
                      />
                    </span>
                    <span
                      style={{
                        fontSize: '1rem',
                        marginLeft: '0.6rem',
                        fontWeight: 'normal',
                      }}
                    >
                      {city.country},{' '}
                      <Link
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                        to={`/ranking?mapView=standard&region=${city.continent}&filter=All&tags=`}
                        className={isHover ? enter : leave}
                      >
                        {city.continent}
                      </Link>
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              // margin: smallScreen ? '1rem 0' : '0 0',
              textAlign: 'justify',
            }}
          >
            <span className={descriptionLayout}>
              {getContentData('small_drawer')}
            </span>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              // margin: smallScreen ? '1rem 0' : '2rem 0',
              textAlign: 'justify',
              justifyContent: 'right',
              alignItems: 'center',
            }}
            onClick={() => props.drawerOptionChange(true)}
          >
            <Typography
              style={{
                color: '#698d29',
                fontWeight: 'bold',
                float: 'right',
                cursor: 'pointer',
              }}
            >
              Learn More{'  '}
              <ArrowForward
                style={{
                  marginLeft: '0.5em',
                  fontWeight: 'bold',
                  fontSize: '1.6rem',
                }}
              />
            </Typography>
          </Box>
          <Box
            style={{
              display: 'flex',
            }}
            className={
              smallScreen ? smallDemographicGrid : demographicGrid
            }
          >
            <IconBulletWrapper
              style={{
                display: 'flex',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
              pageId={smallScreen ? '' : 'city'}
            >
              <IconBullet
                iconName={iconAreaChange}
                title="Urban area size"
                content={`${addComma(Math.round(city.area_size))} km²`}
                infoToolTipTitle={'Urban Area'}
                infoToolTipDetails={`The value shows an increase in urban green space
                        in km² compared to the previous stats within the city borders..`}
                link={'https://hugsi.green/about'}
                anchorText={'Read more'}
                sizeVariant={smallScreen ? 'small' : 'small'}
                style={{ width: '100%' }}
              />
              <IconBullet
                iconName={iconPopulationChange}
                title="Urban area population"
                content={`${addComma(
                  city.population.toFixed()
                )} (2015)`}
                infoToolTipTitle={'Population'}
                infoToolTipDetails={`This number shows the total population residing within a s
                        pecific area (city/municipality) you have selected.`}
                link={'https://hugsi.green/about'}
                anchorText={'Read more'}
                sizeVariant={smallScreen ? 'small' : 'small'}
                style={{ width: '100%' }}
              />
            </IconBulletWrapper>
          </Box>
          <BarGauge
            treecanopycoverPercentage={city.treecanopycover_percentage}
            grasscoverPercentage={city.grasscover_percentage}
            watercoverPercentage={city.watercover_percentage}
            othercoverPercentage={city.othercover_percentage}
          />
          <Box
            style={{
              display: 'flex',
            }}
            className={
              smallScreen ? smallDemographicGrid : demographicGrid
            }
          >
            <IconBulletWrapper
              style={{
                display: 'flex',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
              pageId={smallScreen ? '' : 'city'}
            >
              <IconBullet
                iconName={iconCommonClass}
                title="Most common class"
                infoToolTipTitle="Most common class"
                infoToolTipDetails="The predominant landcover of the city out of trees, grass, water or other/urban."
                content={CLASS_LIST[city.most_common_class]}
                sizeVariant={smallScreen ? 'small' : 'small'}
                style={{ width: '100%' }}
              />
              <IconBullet
                iconName={iconCommonChange}
                title="Most common change"
                content={CLASS_CHANGE_LIST[city.most_common_change]}
                infoToolTipTitle="Most common change"
                infoToolTipDetails="The predominant type of change in landcover from latest to previous analysis."
                sizeVariant={smallScreen ? 'small' : 'small'}
                style={{ width: '100%' }}
              />
            </IconBulletWrapper>
          </Box>
          {city.id && city.related_cities && (
            <Box key={city.id}>
              <SimilarCitiesDetails
                city={city}
                cityClick={(e) => handleMapViewClick(e)}
              />
            </Box>
          )}
        </>
      )}


      
      {city && drawerOption && (
        <Box
          className={smallScreen ? smallRoot : root}
          style={{ width: '100%' }}
        >
          <Box className={drawerOption ? grayBg : 'none'}>
            <Box
              className={shortDataAndSealedWrapper}
              style={{ width: '100%' }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: smallScreen ? '85%' : '100%',
                }}
              >
                <Box
                  className={smallScreen ? shorterCityName : longerCityName}
                  style={{
                    lineHeight: '3rem',
                    float: 'left',
                    margin: smallScreen ? 'unset' : '0rem 0rem 0rem 0rem',
                    fontSize: '1.2rem',
                    width: '70%',
                  }}
                >
                  <Box
                    {...box}
                    style={{ display: 'inherit', flexDirection: 'column' }}
                  >
                    <Box
                      style={{
                        fontSize: smallScreen ? '2rem' : '2rem',
                        lineHeight: smallScreen ? '2rem' : '2rem',
                      }}
                    >
                      {city.id}
                      {/* {checkIfCityCenter(city.id)} */}
                    </Box>
                    <span>
                      <span
                        className={`flag-icon flag-icon-${city.city_code
                          .substring(0, 2)
                          .toLowerCase()}`}
                        style={{ fontSize: '1rem' }}
                      />
                    </span>
                    <span
                      style={{
                        fontSize: '1rem',
                        marginLeft: '0.6rem',
                        fontWeight: 'normal',
                      }}
                    >
                      {city.country},{' '}
                      <Link
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                        to={`/ranking?mapView=standard&region=${city.continent}&filter=All&tags=`}
                        className={isHover ? enter : leave}
                      >
                        {city.continent}
                      </Link>
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
            {drawerOption && (
              <AppBar position="relative" className={mainAppBar}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  TabIndicatorProps={{
                    style: {
                      background: '#fff',
                      overflowX: 'scroll !important'
                    },
                  }}
                // variant={'scrollable'}
                >
                  <Tab
                    label="Overview"
                    {...a11yProps(0)}
                    className={
                      value === 0
                        ? smallScreen
                          ? smallMainTab
                          : mainTab
                        : smallScreen
                          ? smallUnselectedTab
                          : unselectedTab
                    }
                    id="first-step-city"
                    style={{
                      width:
                        value === 2
                          ? smallScreen
                            ? '4rem'
                            : city.gcc.isGccCity
                              ? '6rem'
                              : '6rem'
                          : smallScreen
                            ? '4rem'
                            : city.gcc.isGccCity
                              ? '6rem'
                              : '6rem',
                    
                    }}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.hash = '';
                      }
                    }}
                  />
                  <Tab
                    label="Yearly development"
                    {...a11yProps(1)}
                    className={
                      value === 1
                        ? smallScreen
                          ? smallMainTab
                          : mainTab
                        : smallScreen
                          ? smallUnselectedTab
                          : unselectedTab
                    }
                    id="second-step-city"
                    style={{
                      width:
                        value === 2
                          ? smallScreen
                            ? '4rem'
                            : city.gcc.isGccCity
                              ? '6rem'
                              : '6rem'
                          : smallScreen
                            ? '4rem'
                            : city.gcc.isGccCity
                              ? '6rem'
                              : '6rem',
                      // fontSize: '1.1rem',
                    }}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.hash = '';
                      }
                    }}
                  />
                  <Tab
                    label="Area Info"
                    {...a11yProps(2)}
                    className={
                      value === 2
                        ? smallScreen
                          ? smallMainTab
                          : mainTab
                        : smallScreen
                          ? smallUnselectedTab
                          : unselectedTab
                    }
                    id="third-step-city"
                    style={{
                      width:
                        value === 2
                          ? smallScreen
                            ? '4rem'
                            : city?.gcc?.isGccCity
                              ? '6rem'
                              : '6rem'
                          : smallScreen
                            ? '4rem'
                            : city?.gcc?.isGccCity
                              ? '6rem'
                              : '6rem',
                      // fontSize: '1.1rem',
                    }}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.hash = '';
                      }
                    }}
                  />

                  {city?.gcc?.isGccCity && (
                    <Tab
                      label={smallScreen ? 'GSC' : 'Groene Stad Challenge'}
                      {...a11yProps(3)}
                      className={
                        value === 3
                          ? smallScreen
                            ? smallMainTab
                            : mainTab
                          : smallScreen
                            ? smallUnselectedTab
                            : unselectedTab
                      }
                      style={{
                        // width:
                        //   value === 3
                        //     ? smallScreen
                        //       ? '7rem'
                        //       : '13rem'
                        //     : smallScreen
                        //     ? '6rem'
                        //     : '11rem',
                        // fontSize: value === 3 ? '1.1rem' : '0.9rem',
                        color: '#2FA03F',
                        // fontWeight: 'bold',
                      }}
                    />
                  )}
                </Tabs>
              </AppBar>
            )}
          </Box>
          <ButtonGroup
            onMouseEnter={() => setExpand(true)}
            className={expand ? smallDrawer : smallSubDrawer}
            onMouseLeave={() => setExpand(false)}
          >
            <Button
              style={{
                border: 'none',
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-start',
                textTransform: 'none',
                marginTop: '20px',
              }}
              component={Link}
              to={`/compare/?${city.id}_vs_`}
            >
              <svg
                width="1.3rem"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.875 2.59375C18.7812 2.25 18.4688 2 18.125 
                    2H14.9688C15 1.625 15 1.28125 14.9688 0.96875C14.9688 
                    0.4375 14.5312 0 13.9688 0H6C5.4375 0 5 0.4375 5 0.96875C4.96875 
                    1.28125 4.96875 1.625 5 2H1.84375C1.5 2 1.1875 2.25 1.09375 2.59375C1.09375
                    2.6875 0.5 5.25 2.15625 7.6875C3.3125 9.4375 5.28125 10.6562 8 11.375C8.59375 
                    11.5312 8.96875 12.0625 8.96875 12.6562C9 13.4062 8.375 14 7.625 14H7.5C6.65625 
                    14 6 14.6875 6 15.5C6 15.7812 6.21875 16 6.46875 16H13.4375C13.7188 16 13.9062 
                    15.7812 13.9062 15.5C13.9062 14.6875 13.2188 14 12.4062 14H12.25C11.5 14 10.9062
                    13.4062 10.9062 12.6562C10.9062 12.0625 11.3125 11.5312 11.875 11.375C14.5938
                    10.6562 16.5625 9.4375 17.75 7.6875C19.4688 5.25 18.875 2.6875 18.875 
                    2.59375ZM3.40625 6.875C2.53125 5.59375 2.46875 4.25 2.5 3.5H5C5.1875 5.375
                    5.65625 7.625 6.8125 9.4375C5.28125 8.8125 4.125 7.96875 3.40625 
                    6.875ZM16.5625 6.875C15.8438 7.96875 14.6875 8.8125 13.1562 9.4375C14.3125 
                    7.625 14.7812 5.375 14.9688 3.5H17.4688C17.5 4.25 17.4375 5.59375 16.5625
                    6.875Z"
                  fill={expand ? 'rgb(153, 201, 60)' : 'white'}
                />
              </svg>

              <span
                style={{
                  marginLeft: '1rem',
                }}
              >
                Compare this
              </span>
            </Button>
            <Button
              style={{
                border: 'none',
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-start',
                textTransform: 'none',
              }}
            >
              <label>
                <Checkbox
                  icon={
                    <FavoriteBorder
                      style={{
                        color: expand ? 'rgb(153, 201, 60)' : 'white',
                      }}
                    />
                  }
                  checkedIcon={
                    <Favorite
                      style={{
                        color: expand ? 'rgb(153, 201, 60)' : 'white',
                      }}
                    />
                  }
                  name="favCity"
                  checked={favCities && favCities.includes(city.id)}
                  onChange={handleFavChange}
                  style={{
                    marginLeft: '-0.6rem',
                  }}
                />
                <span
                  style={{
                    textAlign: 'initial',
                    marginLeft: '0.2rem',
                  }}
                >
                  Save as favourite
                </span>
              </label>
            </Button>
            <Popup
              closeOnDocumentClick={false}
              modal
              trigger={
                <Button
                  style={{
                    border: 'none',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                  }}
                >
                  <svg
                    width="1.3rem"
                    style={{ marginLeft: '0.6rem' }}
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7188 7.09375L10.2188 11.8125C9.75 12.2188 9 11.875 9 
                        11.25V8.53125C4.125 8.59375 2.0625 9.78125 3.46875 14.3125C3.625 
                        14.8125 3 15.2188 2.59375 14.9062C1.21875 13.9062 0 12 0 10.0938C0 
                        5.34375 3.96875 4.3125 9 4.25V1.78125C9 1.125 9.75 0.78125 10.2188 
                        1.1875L15.7188 5.90625C16.0625 6.25 16.0625 6.78125 15.7188 7.09375Z"
                      fill={expand ? 'rgb(153, 201, 60)' : 'white'}
                    />
                  </svg>
                  <span
                    style={{
                      marginLeft: '1rem',
                    }}
                  >
                    Share
                  </span>
                </Button>
              }
            >
              {close => (
                <ShareContent close={close} smallScreen={smallScreen} />
              )}
            </Popup>
            <Button
              style={{
                border: 'none',
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-start',
                textTransform: 'none',
                padding: '10px 20px',
                marginBottom: '20px',
              }}
              onClick={props.handleJoyrideAction}
            >
              <label>
                <i
                  className="fa fa-question-circle"
                  style={{
                    color: expand ? 'rgb(153, 201, 60)' : 'white',
                    width: 16,
                    height: 16,
                  }}
                  aria-hidden="true"
                ></i>
                <span
                  style={{
                    marginLeft: '1.2rem',
                  }}
                >
                  Help
                </span>
              </label>
            </Button>
          </ButtonGroup>
          <Box id={`tabval_1`} className={drawerOption ? middleSection : 'none'}>
            <TabPanel value={value} index={0}>
              <Box>
                <Box
                  style={{
                    // display: 'flex',
                    // justifyContent: 'space-between',
                    width: smallScreen ? 'unset' : '100%',
                    marginBottom: smallScreen ? 'unset' : '1rem',
                  }}
                >
                  <Typography
                    style={{
                      alignContent: 'center',
                      // float: 'left',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                    }}
                    component={'span'}
                  >
                    {drawerOption &&
                      citiesInActiveContinent &&
                      citiesInActiveContinent.length !== 0 && (
                        <>
                          <Box
                            style={{
                              display: 'flex',
                              width: smallScreen ? 'unset' : '100%',
                              marginBottom: smallScreen ? 'unset' : '1rem',
                              marginTop: '2rem',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Box>
                              <span
                                style={{
                                  margin: '1.1rem 0rem 0rem 0rem',
                                  fontWeight: 'normal',
                                }}
                              >
                                Views
                              </span>

                              <Select
                                variant={'outlined'}
                                // disableUnderline
                                labelId="inputLabel"
                                IconComponent={iconComponent}
                                value={viewValue}
                                onChange={(event, ind2) => {
                                  handleChangeView(event.target.value);
                                }}
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{
                                  width: smallScreen ? '6rem' : '10rem',
                                  margin: smallScreen
                                    ? '1rem'
                                    : '0rem 0rem 0rem 2rem',
                                  padding: '0px',
                                  position: 'relative',
                                  background: '#fff',
                                }}
                                id="forth-step-city"
                              >
                                {!city && (
                                  <MenuItem value={'ranking_data'}>
                                    Ranking
                                  </MenuItem>
                                )}
                                <MenuItem value={'summary_data'}>
                                  Summary
                                </MenuItem>
                                <MenuItem value={'urban_data'}>
                                  Urban green space
                                </MenuItem>
                                <MenuItem value={'changes_classes'}>
                                  Changes and classes
                                </MenuItem>
                                <MenuItem value={'tree_gradient_category'}>
                                  Tree canopy view
                                </MenuItem>
                                {/* <MenuItem value={'veg_vitality_category'}>
                                vitality heatmap
                              </MenuItem> */}
                              </Select>
                            </Box>

                            <Box className={viewOptions}>
                              {!city && (
                                <span
                                  className={
                                    viewValue === 'ranking_data'
                                      ? selectedViewOption
                                      : undefined
                                  }
                                  onClick={() => {
                                    handleChangeView('ranking_data');
                                  }}
                                >
                                  &#8226;
                                </span>
                              )}
                              <span
                                className={
                                  viewValue === 'summary_data'
                                    ? selectedViewOption
                                    : undefined
                                }
                                onClick={() => {
                                  handleChangeView('summary_data');
                                }}
                              >
                                &#8226;
                              </span>
                              <span
                                className={
                                  viewValue === 'urban_data'
                                    ? selectedViewOption
                                    : undefined
                                }
                                onClick={() => {
                                  handleChangeView('urban_data');
                                }}
                              >
                                &#8226;
                              </span>
                              <span
                                className={
                                  viewValue === 'changes_classes'
                                    ? selectedViewOption
                                    : undefined
                                }
                                onClick={() => {
                                  handleChangeView('changes_classes');
                                }}
                              >
                                &#8226;
                              </span>
                              <span
                                className={
                                  viewValue === 'tree_gradient_category'
                                    ? selectedViewOption
                                    : undefined
                                }
                                onClick={() => {
                                  handleChangeView('tree_gradient_category');
                                }}
                              >
                                &#8226;
                              </span>
                            </Box>
                          </Box>
                        </>
                      )}

                    {/* ranking data */}
                    {drawerOption && viewValue === 'ranking_data' && (
                      <RankingsTable
                        cities={citiesInActiveContinent}
                        drawerOption={drawerOption}
                        tags={''}
                        handleMapViewClick={handleMapViewClick}
                        allCity
                      />
                    )}

                    {/* summary data */}
                    {viewValue === 'summary_data' && (
                      <SummaryView
                        data={getContentData('summary')}
                        city={city}
                        drawerOption={drawerOption}
                        categoryGlobalWinners={categoryGlobalWinners}
                        citiesInActiveContinent={citiesInActiveContinent}
                        setViewValue={setViewValue}
                      />
                    )}

                    {/* urban data */}
                    {viewValue === 'urban_data' && (
                      <UrbanGreenSpaceView
                        city={city}
                        drawerOption={drawerOption}
                        handleMapViewClick={e => handleMapViewClick(e)}
                      />
                    )}
                    {/* and Changes & classes */}
                    {viewValue === 'changes_classes' && (
                      <ChangesClassView city={city} />
                    )}
                    {/* and Tree Gradient View */}
                    {viewValue === 'tree_gradient_category' && (
                      <TreeCanopyView
                        city={city}
                        handleMapViewClick={e => handleMapViewClick(e)}
                      />
                    )}
                  </Typography>
                </Box>
              </Box>


            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
                id={`tabval_1`}
              >
                <YearlyDevelopment
                  kpiAverage={kpiAverage}
                  city={city}
              
                />
                <CategoriesSummary
                  city={city}
                  globalAverage={kpiAverage.global}
                  regionalAverage={kpiAverage.regional}
                  climateZone={kpiAverage.climate_zones}
                  populationCategory={kpiAverage.population_category}

                />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box
                style={{
                  maxWidth: smallScreen ? 'none' : '100%',
                  width: '100%',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: smallScreen ? '0rem' : '0rem',
                    textAlign: 'justify',
                  }}
                >
                  <span className={descriptionLayout}>
                    {getContentData('area_info')}
                  </span>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                  }}
                  className={
                    smallScreen ? smallDemographicGrid : demographicGrid
                  }
                >
                  <IconBulletWrapper
                    style={{
                      display: 'grid',
                      width: '100%',
                      // flexWrap: 'wrap',
                      gridTemplateColumns: '18rem 20rem',
                      justifyContent: 'space-between',
                    }}
                  // pageId={smallScreen ? '' : 'city'}
                  >
                    <IconBullet
                      iconName={iconAreaChange}
                      title="Urban area size"
                      content={`${addComma(Math.round(city.area_size))} km²`}
                      infoToolTipTitle={'Urban Area'}
                      infoToolTipDetails={`The value shows an increase in urban green space in km² 
                      compared to the previous stats within the city borders.
                      `}
                      link={'https://hugsi.green/about'}
                      anchorText={'Read more'}
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    // mainStyle={{ width: '49%' }}
                    />
                    <IconBullet
                      iconName={iconPopulationChange}
                      title="Urban area population"
                      content={`${addComma(city.population.toFixed())} (2015)`}
                      infoToolTipTitle={'Population'}
                      infoToolTipDetails={`This number shows the total population residing within a 
                      specific area (city/municipality) you have selected.`}
                      link={'https://hugsi.green/about'}
                      anchorText={'Read more'}
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    // mainStyle={{ width: '49%' }}
                    />
                    <IconBullet
                      iconName={iconPopulationChange}
                      title="Population density"
                      content={`${addComma(city?.pop_density)} people per km2`}
                      infoToolTipTitle={'Population density'}
                      infoToolTipDetails={`Shows you the population density stats per km2 of a particular city. 
                      Population density data can be used to quantify demographic information and to assess relationships 
                      with ecosystems, human health, and infrastructure.
                      `}
                      link={'https://hugsi.green/about'}
                      // anchorText={'Read more'}
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    // mainStyle={{ width: '49%' }}
                    />
                    <IconBullet
                      iconName={iconAreaChange}
                      title="Climate zone"
                      content={`${addComma(city?.categ_latzones)}`}
                      infoToolTipTitle={'Climate zone'}
                      // filter=North+Temperate+Zone&mapView=terains&region=All&tags=
                      inforToolTipLink={`/ranking?mapView=terains&region=All&filter=${(city?.categ_latzones)}&tags=`}
                      infoToolTipDetails={`By selecting the “Terrain View” on the maps, you could exactly see what 
                      climate zone your city comes under.
                       Climate zones are determined by examining the factors that commonly influence climate itself. 
                       These factors include temperature,
                       humidity, amount and type of precipitation, and passage of seasons within a specific area.`}
                      link={'https://hugsi.green/about'}
                      // anchorText={'Read more'}
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    // mainStyle={{ width: '49%' }}
                    />
                    <IconBullet
                      iconName={iconPopulationChange}
                      title="Population density category"
                      content={`${addComma(city?.categ_population)}`}
                      infoToolTipTitle={'Population density category'}
                      inforToolTipLink={`/ranking?mapView=population&region=All&filter=${(city?.categ_population)}&tags=`}
                      infoToolTipDetails={`Based on the population density numbers, the population in 
                      your city could be divided into 5 categories.`}
                      link={'https://hugsi.green/about'}
                      // anchorText={'Read more'}
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    // mainStyle={{ width: '49%' }}
                    />
                  </IconBulletWrapper>
                </Box>

                <Divider />
                {city?.isTreeCity ||
                  city?.isMegaCity ||
                  city?.isC40 ||
                  city?.isClimateAlliance ? (
                  <>
                    <Box
                      style={{
                        display: 'flex',
                        width: smallScreen ? 'unset' : '100%',
                        marginBottom: smallScreen ? 'unset' : '2rem',
                        marginTop: '2rem',
                        alignItems: 'center',
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
                        Tags
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
                      >
                        <Tooltip
                          title="Select any of the tabs (given below) of your choice to carry out the specific details."
                          arrow
                        >
                          <Typography
                            style={{
                              color: '#698d29',
                              fontWeight: 'bold',
                              fontSize: '1.2rem',
                            }}
                            component={'span'}
                          >
                            What is this?
                          </Typography>
                        </Tooltip>
                        <ArrowForward
                          style={{
                            marginLeft: '0.5em',
                            fontWeight: 'bold',
                            fontSize: '1.6rem',
                          }}
                        />
                      </Button>
                    </Box>
                    <ButtonGroup style={{ gap: '30px', marginBottom: '2rem' }}>
                      {city?.isTreeCity === 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          style={{
                            borderRadius: '20px',
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          Tree City
                        </Button>
                      )}
                      {city?.isMegaCity === 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          style={{
                            borderRadius: '20px',
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          Mega City
                        </Button>
                      )}
                      {city?.isC40 === 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          style={{
                            borderRadius: '20px',
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          C40
                        </Button>
                      )}
                      {city?.isClimateAlliance === 1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          style={{
                            borderRadius: '20px',
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          Climate Alliance
                        </Button>
                      )}
                      {/* <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{
                      borderRadius: '20px',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    Tag
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{
                      borderRadius: '20px',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    Tag
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{
                      borderRadius: '20px',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    Tag
                  </Button> */}
                    </ButtonGroup>
                    <Divider />
                  </>
                ) : (
                  ''
                )}
                {city.id && city.related_cities && (
                  <Box key={city.id}>
                    <SimilarCities
                      city={city}
                      cityClick={e => {
                        handleChange(e, 0);
                      }}
                    />
                  </Box>
                )}
                <Divider />
                <Box display="flex" width="fit-content">
                  <Box
                    style={{
                      width: '30%',
                      margin: '2rem 2rem 0rem 2rem',
                      alignSelf: 'center',
                    }}
                  >
                    <img
                      src={widgetTreeGrass}
                      alt="wiget-tree-grass"
                      height="160rem"
                      width="auto"
                    />
                  </Box>
                  <Box width="70%" className={descriptionSummaryLayout}>
                    <Box
                      style={{
                        width: smallScreen ? 'unset' : '100%',
                        marginBottom: smallScreen ? 'unset' : '2rem',
                        marginTop: '2rem',
                        alignItems: 'center',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          width: '70%',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }}
                      >
                        Got anything to share about {city.id} ?
                      </span>
                    </Box>
                    Team HUGSI is absolutely ready to help key people & decision
                    makers who could boost green spaces in their cities. If you
                    are the one who could make that possible, we’d like to hear
                    from you.
                    <p
                      style={{
                        color: '#698D29',
                        fontSize: '16px',
                        lineHeight: '24px',
                        cursor: 'pointer',
                      }}
                    >
                      <a
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        href="mailto:hello@hugsi.green?subject=HUGSI"
                      >
                        <b>Contact us</b>
                      </a>
                      <span>
                        <img
                          src={iconEmail}
                          alt="email-icon"
                          style={{
                            height: '16px',
                            width: '20px',
                            marginLeft: '10px',
                          }}
                        />
                      </span>
                    </p>
                  </Box>
                </Box>
                {/* <Divider />
                <Box
                  style={{
                    width: smallScreen ? 'unset' : '100%',
                    marginBottom: smallScreen ? 'unset' : '0rem',
                    marginTop: '2rem',
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
                    Related Stories
                  </span>
                </Box> */}
                {/* {filteredPosts ? (
                  <Box height="auto" margin="auto">
                    <ul className={insightsListWrapper}>
                      {filteredPosts.slice(0, 2).map(post => (
                        <li
                          key={post.slug}
                          style={{
                            flexDirection: smallScreen ? 'column' : 'row',
                            width: '50%',
                            padding: '20px 15px',
                            cursor: 'pointer',
                          }}
                        >
                          <Link
                            className={insightLink}
                            to={`/stories/${post?.slug}`}
                          >
                            <Image
                              backgroundColor={'#424242'}
                              className={
                                post?.isLoginRequired &&
                                accessToken === undefined &&
                                imageMain
                              }
                              style={
                                smallScreen
                                  ? {
                                    marginBottom: '2rem',
                                    border: '1px solid #99c93c',
                                  }
                                  : {
                                    border: '1px solid #99c93c',
                                    height: '270px',
                                    position: 'relative',
                                    backgroundColor: 'rgba(153,201,60,.5)',
                                  }
                              }
                              fluid={post?.primaryImage?.fluid}
                              alt={post?.title}
                            >
                              {' '}
                            </Image>
                            {post?.isLoginRequired &&
                              accessToken === undefined && (
                                <img
                                  src={lockIcon}
                                  alt=""
                                  style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    right: '20px',
                                    zIndex: 99,
                                  }}
                                />
                              )}
                          </Link>
                          <Box
                            style={{ display: 'flex' }}
                            onClick={() => {
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth',
                              });
                              post.isLoginRequired &&
                                accessToken === undefined &&
                                navigate(`/stories/${post?.slug}`, {
                                  replace: true,
                                });
                            }}
                          >
                            <Box>
                              <Link
                                style={{
                                  marginBottom: smallScreen ? '1rem' : '0',
                                  display: 'block',
                                  marginTop: '20px',
                                  color: '#698D29',
                                  fontSize: '20px',
                                  lineHeight: '1.2',
                                  textDecoration: 'none',
                                  overflow: 'hidden',
                                }}
                                to={
                                  !post?.isLoginRequired &&
                                  accessToken !== undefined &&
                                  `/stories/${post?.slug}`
                                }
                              >
                                {post?.title}{' '}
                              </Link>
                              <p className={storiesText}>
                                {`Published`}
                                {` on `}
                                {post?.publishedAt && (
                                  <Moment format="D MMM YYYY" withTitle>
                                    {post?.publishedAt}
                                  </Moment>
                                )}
                              </p>
                            </Box>

                            {post?.isLoginRequired && (
                              <a
                                href={`${loginDssEndpoint}/v1/oauth2/authorize?client_id=hugsi&redirect
                                _uri=${domain}/community`}
                                target="_blank"
                                style={{
                                  textDecoration: 'none',
                                }}
                              >
                                <Button
                                  style={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: '#99C93C',
                                    textDecoration: 'none',
                                    textTransform: 'none',
                                    borderRadius: '15px',
                                    fontSize: '1rem',
                                    width: '68px',
                                    height: '34px',
                                    marginLeft: '1.6rem',
                                    marginTop: '20px',
                                  }}
                                >
                                  Hugsi+
                                </Button>
                              </a>
                            )}
                          </Box>
                        </li>
                      ))}
                    </ul>
                  </Box>
                ) : (
                  <Box height="auto" margin="6.26rem auto" maxWidth="75vw">
                    <Typography>
                      We'll post our first article soon here.
                    </Typography>
                  </Box>
                )} */}
              </Box>
            </TabPanel>
            <TabPanel value={value} index={city?.gcc?.isGccCity ? 3 : 5}>
              <>
                <Box>
                  <MunicipalityPage
                    view="city"
                    id={city?.gcc?.municipality}
                    urlByLocation={urlByLocation}
                    city={city}
                  />
                </Box>
              </>
            </TabPanel>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const iconComponent = props => {
  const useDropDownStyles = makeStyles({
    dropdown: {
      margin: 'auto 1rem',
    },
  });
  return (
    <ExpandMore className={props.className} style={{ color: '#99c93c' }} />
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
export default memo(CityDetails);
