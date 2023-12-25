import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import SEO from '../../hooks/seo';
import {
  withStyles,
} from '@material-ui/core/styles';
// @ts-ignore
import hugsi_symbol from '../../images/widget-tree-grass.png';
// @ts-ignore
import widget_1 from '../../images/widget-satellite.png';
// @ts-ignore
import widget_2 from '../../images/widget-computer-vision.png';
// @ts-ignore
import widget_3 from '../../images/widget-calculation.png';
// @ts-ignore
import dashes from '../../images/dashes.png';
// @ts-ignore
import badges from '../../images/about-achievement-badges.png';
// @ts-ignore
import webinars from '../../images/webinars.png';
// @ts-ignore
import pdf_2019 from '../../assets/files/hugsi_space_index_2019_report_v2_1.pdf';
// @ts-ignore
import pdf_2020 from '../../assets/files/hugsi_space_index_2020_report.pdf';
// @ts-ignore
import pdf_2021 from '../../assets/files/hugsi_space_index_2021_report.pdf';
import Popup from 'reactjs-popup';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import Box from '@material-ui/core/Box';
import AboutCarousel from '../../components/carousel/about-carousel';
import QuestionsAndAnswers from '../../components/questions-and-answers/questions-and-answers';
import TopComponent from '../../components/top-component/top-component';
import UserConnect from '../../popups/user-connect';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  useStyles,
  WhiteAdd,
  WhiteRemove
} from '../../styles/about';

/**
 * About Page
 * @file about.tsx the How it works
 */
const AboutPage = () => {
  const smallScreen = useMediaQuery('(max-width:650px)');
  const {
    root,
    content,
    center,
    singleDash,
    twoCols,
    previousReportsGrid,
    twoRows,
  } = useStyles({});
  const [expanded, setExpanded] = React.useState<string | false>('');
  const isSubscribed =
    typeof window !== 'undefined' &&
    localStorage.getItem('isUserSubscribed') === 'Yes';
  const [showCarousel, setShowCarousel] = useState<boolean>(isSubscribed);
  const [status, setStatus] = useState<boolean>(false);
  const box = {
    fontWeight: 'fontWeightBold',
    color: '#424242',
  };

  /**
   * Only works in production. Send Google Analytics event tracking
   * @returns void
   */
  const handleTrackEvent = year => {
    if (
      status ||
      (typeof window !== 'undefined' &&
        localStorage.getItem('isUserSubscribed') === 'Yes')
    ) {
      // year === 2020 ? window.open(pdf_2020) : window.open(pdf_2019);

      switch (year) {
        case 2019:
          window.open(pdf_2019);
          break;
        case 2020:
          window.open(pdf_2020);
          break;
        case 2021:
          window.open(pdf_2021);
          break;
        default:
          window.open(pdf_2021);
      }
    } else {
      window.scrollTo(0, 0.8 * document.body.scrollHeight);
    }
  };

  const handleChange = (expanded: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? expanded : false);
  };

  // @ts-ignore
  return (
    <>
      <SEO
        title="About"
        description={`The HUGSI (Husqvarna Urban Green Space Index) is an
            AI-powered satellite solution to help decision makers monitor the
             proportion and health of green spaces in cities across the globe.`}
      />
      <Box
        style={{
          maxWidth: smallScreen ? 'unset' : '50rem',
          margin: smallScreen ? '120px 20px 0px' : '200px 0 0 14rem',
          color: '#293845',
        }}
      >
        <Typography variant={'h6'}>
          <Box
            fontWeight={'fontWeightBold'}
            fontSize={smallScreen ? '1.5rem' : '2.5rem'}
            lineHeight={smallScreen ? '2.5rem' : '3.5rem'}
            maxWidth="75%"
          >
            Supporting the greening ambition of global cities through
            satellite analysis and data
          </Box>
        </Typography>

        <Typography variant={'subtitle1'} style={{ margin: '3rem auto' }}>
          The Husqvarna Urban Green Space Index (HUGSI) is an AI-powered satellite
          solution that indicates how green cities are by analyzing their urban areas and how
          they are developing. Our aim is to support cities to safeguard
          and grow urban green areas across the globe. Since 2019, HUGSI has conducted annual
          surveys of a growing number of cities in the world.
        </Typography>
        <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
          With HUGSI.green we provide cities with data about the current <b>quantity of
            green space</b> in urban areas, with <b>yearly scans</b> we can
          share the development over time and through a <b>standardized methodology</b> and global
          data sets cities can also benchmark numbers.
        </Typography>
      </Box>

      <section
        className={root}
        style={{
          backgroundColor: '#99c93c',
          height: 'auto',
          marginBottom: '6.25rem',
        }}
      >
        <Box height="auto" margin="0 auto" padding="3rem 0" maxWidth="75vw">
          <Typography
            variant={'h5'}
            style={{
              fontWeight: 'bold',
              color: '#fff',
              margin: '0 auto',
            }}
          >
            How it works
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
              marginTop: '2rem',
            }}
          >
            <div>
              <div className={center}>
                <img
                  src={widget_1}
                  width={'auto'}
                  height={'240rem'}
                  alt={'satellite'}
                />
              </div>
              <div className={center}>
                <div className={singleDash} />
              </div>
            </div>
            {!smallScreen && (
              <div className={center}>
                <img
                  src={dashes}
                  width={'auto'}
                  height={'240rem'}
                  alt={'dashes'}
                />
              </div>
            )}
            <div>
              <div className={center}>
                <img
                  src={widget_2}
                  width={'auto'}
                  height={'240rem'}
                  alt={'satellite'}
                />
              </div>
              <div className={center}>
                <div className={singleDash} />
              </div>

            </div>
            {!smallScreen && (
              <div className={center}>
                <img src={dashes} width={'auto'} height={'240rem'} />
              </div>
            )}
            <div>
              <div className={center}>
                <img
                  src={widget_3}
                  width={'auto'}
                  height={'240rem'}
                  alt={'satellite'}
                />
              </div>
              <div className={center}>
                <div className={singleDash} />
              </div>

            </div>
          </div>
          <Typography style={{
            color: 'rgb(255, 255, 255)',
            fontSize: '1.2rem',
          }}>
            <ul>
              <li>Cities apply to become part of HUGSI.green (link to Add your city)</li>
              <li>City boundaries are defined based on OSM administrative boundaries (Open Street Map)</li>
              <li>
                Define urban/populated areas, at least 24 people per 250m grid in
                GHS-POP (Global Human Settlement Layer)
              </li>
              <li>Define best vegetative day of year for the city
              </li>
              <li>Retrieve data satellite data for defined area and
                best day (Copernicus / Sentinel 2)
              </li>
              <li>Analyze data (Overstory)
              </li>
              <li>Calculate KPI’s, Index ranking and rating
              </li>
              <li>Publish public KPI’s and maps on HUGSI.green
              </li>
            </ul>
          </Typography>
        </Box>
      </section>
      <main
        className={smallScreen ? 'smallRoot' : 'root'}
        style={{ padding: smallScreen ? '0 1rem' : '0 12rem' }}
      >
        <QuestionsAndAnswers />
      </main>
    </>
  );
};

export default AboutPage;
