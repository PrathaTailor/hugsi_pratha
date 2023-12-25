import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Drawer,
  Snackbar,
  SnackbarContent,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { graphql, navigate, Link } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import Box from '@material-ui/core/Box';
import SEO from '../../hooks/seo';
import { useSiteMetadata } from '../../hooks';
import useCities from '../../hooks/cities';
import { getQueryParam } from '../../utils/query-params-utils';
import TopComponent from '../../components/top-component/top-component';
import LoadingMap from '../../components/map/loading-map';
import checkDomain from '../../components/check-domain/check-domain';
import CityDetails from '../../components/city-details/city-details';
import CityMap from 'components/gcc/city-map';
import NeighbourhoodMap from 'components/gcc/neighbourhood-map';
import TownMap from 'components/gcc/town-map';
import { getCitiesLatLongs } from 'utils/city-utils';
import { getRankingURL } from 'components/link/ranking-link';
import CityTabs from 'components/city-tabs';
import * as MapboxGL from 'mapbox-gl';
// import { useStyles } from '../../styles/city';
import Joyride, {
  CallBackProps,
  STATUS,
  TooltipRenderProps,
} from 'react-joyride';
import TourPopupComponent from 'components/tour-popup/TourPopupComponent';
import MapRenderer from '../city/MapRenderer';
import clsx from 'clsx';
const browser = typeof window !== 'undefined' && window;

interface Props {
  location: Location;
  data: any;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      margin: '0 auto',
      top: 0,
      overflow: 'auto !important',
    },
    enter: {
      textDecoration: 'underline',
      color: '#698d29',
      opacity: 0.7,
      fontWeight: 'bold',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '4rem 8rem',
      gridGap: '0.5rem',
    },
    listDrawer: {
      overflow: 'auto !important',
      maxWidth: '60%',
    },
    toggleButton: {
      zIndex: 7,
      top: 'calc(100vh/2.5)',
      backgroundColor: 'white',
      color: 'primary',
      opacity: 1,
      minHeight: 100,
      width: '1rem',
      padding: 0,
      borderRadius: '1rem 0rem 0rem 1rem',
      left: 0,
      marginLeft: '-45px',
      position: 'relative',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },

    toggleButtonShift: {
      zIndex: 7,
      top: 'calc(100vh/2.5)',
      backgroundColor: 'white',
      color: 'primary',
      opacity: 1,
      minHeight: 100,
      width: '1rem',
      padding: 0,
      borderRight: '0',
      marginLeft: '-45px',
      borderRadius: '1rem 0rem 0rem 1rem',
      position: 'absolute',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    smallToggleButton: {
      zIndex: 10,
      backgroundColor: 'white',
      opacity: 1,
      height: 70,
      width: '1rem',
      minWidth: '2rem',
      padding: 0,
      // bottom: '0',
      top:'-51px',
      left: '43%',
      borderRadius: '1rem 0rem 0rem 1rem',
      position: 'absolute',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    smallToggleButtonShift: {
      zIndex: 7,
      backgroundColor: 'white',
      color: 'primary',
      opacity: 1,
      height: 70,
      width: '1rem',
      minWidth: '2rem',
      padding: 0,
      borderRight: '0',
      bottom: '97%',
      left: '43%',
      borderRadius: '1rem 0rem 0rem 1rem',
      position: 'absolute',
      '&:hover': {
        backgroundColor: 'white',
        opacity: 1,
        color: 'secondary',
      },
    },
    ArrowBack: {},
    drawerPaper: {
      zIndex: 4,
      maxWidth: '60%',
      height: '90vh',
      // width: 'calc(100vw/1.75)',
      // marginTop: '6.2rem',
      // @ts-ignore
      // visibility: 'visible !important',
      // overflow: 'auto !important',
      display: '-webkit-inline-box',
    },
    smallDrawerPaper: {
      zIndex: 9,
      height: '75%',
      // overflow: 'auto !important',
    },
    largeDiv: {
      width: '100%',
      // overflow: 'visible',
      transitionDuration: '1s !important',
      transform: 'translateX(0px) !important',
    },
    smallDiv: {
      // overflow: 'visible !important',
      width: '40%',
      transform: 'translateX(0px) !important',
      transitionDuration: '1s !important',
    },
    smallSDiv: {
      width: '100%',
      transform: 'translateX(0px) !important',
      transitionDuration: '1s !important',
    },
    helpMainBox: {
      // height: '187px',
      width: '221px',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '20px 10px',
    },
    helpHeader: {
      // marginLeft:'20px'
      fontSize: '14px',
      fontWeight: 700,
      color: '#293845',
    },
    helpActiveCardCount: {
      // marginLeft:'20px'
      fontSize: '14px',
      fontWeight: 300,
      color: '#000',
      lineHeight: '16px',
    },
    helpContent: {
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '10px',
      fontSize: '14px',
      // textAlign: 'justify',
      fontWeight: 300,
      color: '#000',
      lineHeight: '22px',
    },
    helpFooter: {
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    helpFooterContent: {
      fontSize: '14px',
      fontWeight: 300,
      color: '#000',
      lineHeight: '16px',
      cursor: 'pointer',
    },
  })
);
/**
 * City and Ranking Page
 * @file ranking.tsx is the Ranking and City Page that renders city's details with ranking city details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const CityPage: React.FC<Props> = props => {
  if (!browser) {
    return null;
  }
  const cityId = getQueryParam(props.location.search);
  if (!cityId) {
    navigate('/404', { replace: true });
  }
  const {
    root,
    listDrawer,
    toggleButtonShift,
    toggleButton,
    smallToggleButtonShift,
    smallToggleButton,
    ArrowBack,
    drawerPaper,
    smallDrawerPaper,
    largeDiv,
    smallDiv,
    smallSDiv,
    helpMainBox,
    helpHeader,
    helpContent,
    helpActiveCardCount,
    helpFooterContent,
    helpFooter,
  } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('summary_data');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const locationHash =
    (typeof window !== 'undefined' && window.location.hash) || '';
  const { cities, getCity, cityStore } = useCities();
  const [runJoyride, setRunJoyride] = useState(false);
  const { endpoint, userInputsEndpoint, apiKey } = useSiteMetadata();
  const [mapInstance, setMapInstance] = useState<MapboxGL.Map>(null);
  const [townCode, setTownCode] = useState<string>('0');
  const selectedDiv = open ? largeDiv : smallDiv;
  const toggleOpen = () => setOpen(!open);
  const city = useMemo(() => getCity(cityId), [cities, cityId]);
  const windowLocHash =
    typeof window !== 'undefined' ? window?.location?.hash : '';
  const extractTownName = (urlHash: string) => {
    const urlCopy = urlHash;
    const removeFromUrl = urlCopy.replaceAll('/neighbourhoods', '');
    return removeFromUrl;
  };
  let townData: string =
    windowLocHash && !windowLocHash.endsWith('./neighbourhoods')
      ? decodeURI(windowLocHash.substring(1))
      : extractTownName(windowLocHash);
  const checkCityURL = townData.split('/');
  if (checkCityURL && checkCityURL.length === 3) {
    townData = checkCityURL[0] + '/' + checkCityURL[2];
  }
  const townId = townData;
  // used for the selected neighbours
  const [urlByLocation, setUrlByLocation] = useState('-1');
  const url = window.location.hash.split('/');
  useEffect(() => {
    // if (localStorage.getItem('isCityTourPending') === 'null'
    // || localStorage.getItem('isCityTourPending') === 'undefined'
    //   || localStorage.getItem('isCityTourPending') === undefined) {
    //   localStorage.setItem('isCityTourPending', 'true');
    // }
    setUrlByLocation('-1');
    let lastSegment = url.pop() || url.pop();
    if (lastSegment === 'neighbourhoods') {
      lastSegment = url.slice(-1).pop();
      const urlByLocation: string = lastSegment.replace(
        /[&\/\\#,+()$~%.'":*?<>{}]20/g,
        ' '
      );
      const townDataValue = townId.split('/');
      if (townDataValue[0]) {
        townData = '#' + townDataValue[0];
      }
      if (townData !== urlByLocation) {
        setUrlByLocation(urlByLocation);
      }
    }
  }, [url]);
  const [hash, setHash] = useState(townId);
  const { data } = props;
  const { kpiAverage, user } = cityStore;

  useEffect(() => {
    if (user && user.username && townId && city.gcc.isGccCity) {
      const { towns = [] } = city.gcc;
      const extractedTownName = townId.endsWith('/neighbourhoods')
        ? extractTownName(townId)
        : townId;

      const matchingTownIndex = Object.keys(towns).findIndex(
        t => t === extractedTownName
      );
      const userDomain = user?.testDomain
        ? user.testDomain?.split('@').pop()
        : user?.username
        ? user.username?.split('@').pop()
        : '';
      if (userDomain && matchingTownIndex >= 0) {
        checkDomain(userInputsEndpoint, apiKey, userDomain, extractedTownName)
          .then(res => {
            if (res) {
              const { town_code = '0' } =
                (Object.values(towns)[matchingTownIndex] as any) || {};
              setTownCode(town_code);
            }
          })
          .catch(error => {
            setTownCode('0');
          });
      }
    }
  }, [user, townId]);

  const executeScroll = elemToScrollTo => {
    elemToScrollTo.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  const activeMapInstance = target => {
    setMapInstance(target);
  };
  const windowHash = typeof window !== 'undefined' && window.location.hash;
  if (
    city &&
    city?.gcc?.isGccCity &&
    typeof window !== 'undefined' &&
    window &&
    window.location.hash?.slice(1) &&
    !window.location.hash.endsWith('/neighbourhoods')
  ) {
    const indexPosition = Object.keys(city?.gcc?.towns).findIndex(
      town => town === townId
    );
    if (indexPosition >= 0) {
      const elemToScrollTo = document.getElementById(
        `townref-${indexPosition + 1}`
      );
      elemToScrollTo && executeScroll(elemToScrollTo);
    }
  }
  useEffect(() => {
    if (windowHash?.slice(1)) {
      setHash(windowHash.slice(1));
    } else {
      setHash('');
    }
  }, [windowHash?.slice(1)]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      cityStore.isDatapageTourfirst = false;
      setRunJoyride(!runJoyride);
      setOpenSnackbar(true);
      localStorage.setItem('isCityTourPending', 'false');
    }
  };
  const handleJoyRideClose = () => {
    setRunJoyride(!runJoyride);
    localStorage.setItem('isCityTourPending', 'false');
  };
  const handleSnackbarClon = () => {
    setOpenSnackbar(false);
  };

  const steps = [
    {
      target: '#first-step-city',
      content:
        'View geographic and demographic data, KPIs behind the rankings with scores, ratings, and regional as well as global rankings.',
      title: 'Overview',
      disableBeacon: true,
    },
    {
      target: '#second-step-city',
      content:
        'A graphical presentation of progress for the city for the selected duration. The data and results are based on the Green KPIs of the city.',
      title: 'Yearly Development',
    },
    {
      target: '#third-step-city',
      content:
        'Get all the details you need to know about the city. Explore similar cities based on Green Score. Contact us to share more info about the selected city with us.',
      title: 'Area Info',
    },
    {
      target: '#forth-step-city',
      content:
        'Understand Key Performance Indicators (KPIs) of Urban Green Space within a city, area details, ratings & rankings. Visualize green changes on the map.',
      title: 'Summary',
    },
  ];
  function Tooltip({
    backProps,
    continuous,
    index,
    isLastStep,
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
    <LoadingMap message={`Loading city map data`} />
  ) : (
    <div
      style={{
        display: smallScreen ? 'grid' : 'flex',
        width: '100%',
        minHeight: smallScreen ? '50vh' : '90vh',
        top: '100px',
        position: 'fixed',
      }}
    >
      {localStorage.getItem('isCityTourPending') !== 'false' && (
        <TourPopupComponent
          onClose={handleJoyRideClose}
          // onClose={() => {
          //   setRunJoyride(false);
          //   localStorage.setItem('isCityTourPending', 'false');
          // }}
          // onStart={() => setRunJoyride(true)}
        />
      )}

      <Joyride
        callback={handleJoyrideCallback}
        continuous
        // hideCloseButton
        run={runJoyride}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        autoStart
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        tooltipComponent={Tooltip}
      />
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
      <TopComponent height={'0rem'}>{''}</TopComponent>
      <div
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <Box>
          <SEO
            title={`HUGSI for ${city !== undefined ? city?.id : 'any cities'}`}
            description={`Husqvarna Urban Green Space Index for ${
              city !== undefined ? city?.id : 'any cities'
            } including
       global ranking and insights about urban areas' vegetation proportion,
        health, distribution, etc.`}
          />
          <Box
            style={{
              height: smallScreen ? (open === false ? '60vh' : '40vh') : '90vh',
              // width: open ? '60%' : '70%',
              width: '100%',
            }}
          >
            <TopComponent
              style={{
                display: 'flex',
                alignItems: 'top',
                justifyContent: 'left',
              }}
            >
              <Box display="flex">
                <Box
                  style={{
                    backgroundColor: 'transparent',
                    maxWidth: 'var(--pageMaxWidth)',
                    margin: `0 auto`,
                    padding: '0rem',
                    fontSize: '1rem',
                    color: '#293845',
                    position: 'absolute',
                    top: '2rem',
                    left: '0px',
                    zIndex: 9,
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      textTransform: 'none',
                      height: '35px',
                      borderRadius: '10px',
                      padding: '13px 24px',
                      color: 'white',
                      backgroundColor: '#698D29',
                      width: smallScreen ? '4rem' : '4rem',
                      margin: smallScreen ? '1rem' : '0rem 0rem 0rem 40px',
                      zIndex: 1,
                    }}
                    component={Link}
                    to={`/ranking?mapView=standard&region=${city.continent}&filter=All&tags=`}
                  >
                    <Typography variant="body2" style={{ fontWeight: 700 }}>
                      Back
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </TopComponent>
            {!city ? (
              <LoadingMap message={'Loading map data'} />
            ) : (
              <>
                {hash ||
                (typeof window !== 'undefined' &&
                  window.location.hash?.slice(1)) ? (
                  window.location.hash.endsWith('/neighbourhoods') &&
                  urlByLocation === '-1' &&
                  cityStore?.user?.first_name ? (
                    <NeighbourhoodMap
                      city={city}
                      townCode={townCode}
                      open={open}
                      activeMapInstance={activeMapInstance}
                    />
                  ) : (
                    <TownMap
                      city={city}
                      open={open}
                      activeMapInstance={target => activeMapInstance(target)}
                      urlByLocation={urlByLocation}
                    />
                  )
                ) : (
                  <MapRenderer
                    city={city}
                    open={open}
                    // activeMapInstance={target => {
                    //   activeMapInstance(target);
                    // }}
                    activeMenu={activeMenu}
                  />
                  // <CityMap
                  //   city={city}
                  //   open={open}
                  //   activeMapInstance={target => {
                  //     activeMapInstance(target);
                  //   }}
                  //   activeMenu={activeMenu} />
                )}
              </>
            )}
          </Box>
        </Box>
      </div>
      <div
        className={
          smallScreen
            ? clsx(smallSDiv, smallDrawerPaper)
            : clsx(selectedDiv, drawerPaper)
        }
      >
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
            className={open ? toggleButtonShift : toggleButton}
            onClick={toggleOpen}
            style={{
              minWidth: '3.1rem',
              zIndex: 999,
            }}
          >
            {open ? (
              <ArrowForwardIos />
            ) : (
              <ArrowBackIos className={ArrowBack} />
            )}
          </Button>
        )}
        {city && (
          <Box style={{ width: '100%' }}>
            <Box
              className={root}
              style={{
                margin: smallScreen ? '1rem 0.5rem' : '0rem',
                width: '100%',
                boxShadow: '2px 2px 0px -10px inset',
                borderTop: '1px solid #aaa',
                padding: open ? '0rem' : '2rem',
                background: open ? '#f4f5f5' : 'rgb(255, 255, 255)',
                overflow: 'auto !important',
                position: open ? 'relative' : ' ',
                top: open ? '' : 0,
                height: '90vh',
              }}
            >
              <CityDetails
                city={city}
                kpiAverage={kpiAverage}
                // latzoneAverage={latzoneAverage}
                // popAverage={popAverage}
                handleMapViewClick={e => {
                  console.log('change');
                  setActiveMenu(e);
                }}
                setActiveMenu={e => {
                  console.log('change1');
                  setActiveMenu(e);
                }}
                urlByLocation={urlByLocation}
                drawerOption={open}
                data={data}
                similar
                drawerOptionChange={e => {
                  setOpen(e);
                }}
                handleJoyrideAction={() => {
                  setRunJoyride(true);
                }}
              />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default observer(CityPage);

// export const query = graphql`
//   query allqueryAndAllquery {
//     allPosts: allContentfulArticles(sort: { fields: publishedAt, order: ASC }) {
//       nodes {
//         id
//         title
//         slug
//         publishedAt
//         author
//         tags {
//           ... on ContentfulTags {
//             id
//             title
//           }
//           ... on ContentfulAuthor {
//             id
//             name
//           }
//         }
//         content {
//           json
//         }
//         internal {
//           type
//         }
//         isLoginRequired
//         primaryImage {
//           fluid {
//             ...GatsbyContentfulFluid
//           }
//         }
//       }
//     }
//   }
// `;
