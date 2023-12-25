import React, { useState } from 'react';
import SEO from '../../hooks/seo';
import { Link } from 'gatsby';
import IndexHeaderImage from '../../components/header-bg-images/index-header-image';
import ArrowForward from '@material-ui/icons/ArrowForward';
// @ts-ignore
import hugsi_symbol from '../../images/logo-self-assessment.png';
// @ts-ignore
import greenlabelTeam from '../../images/greenlabel-team.png';
// @ts-ignore
import nlGreenLabelLogoMedium from '../../images/logo-nl-greenlabel-medium.png';
// @ts-ignore
import badges from '../../images/green-passport.png';
import { Box, useMediaQuery, Typography } from '@material-ui/core';
import TopComponent from '../../components/top-component/top-component';
import PartnerConnect from '../../components/mail-connect/partner-connect';
import { useStyles } from './style';

/**
 * About Page
 * @file about.tsx the How it works
 */
const PartnerDetails = () => {
  const smallScreen = useMediaQuery('(max-width:650px)');
  const {
    root,
    rootWrapper,
    center,
    twoCols,
    founderGrid,
  } = useStyles({});
  const isSubscribed =
    typeof window !== 'undefined' &&
    localStorage.getItem('isUserSubscribed') === 'Yes';
  const box = {
    fontWeight: 'fontWeightBold',
    color: '#424242',
  };

  // @ts-ignore
  return (
    <section>
      <SEO
        title="NL Greenlabel"
        description={`The HUGSI (Husqvarna Urban Green Space Index) is an
            AI-powered satellite solution to help decision makers monitor the
             proportion and health of green spaces in cities across the globe.`}
      />
      <TopComponent maxHeight={smallScreen ? '40vh' : '65vh'} style={{
        margin: '100px 0'
      }}>
        <IndexHeaderImage />
      </TopComponent>
      <div className={rootWrapper}>
        <div
          className={root}
          style={{ margin: smallScreen ? '1rem auto' : '5rem auto' }}
        >
          <div
            style={{
              maxWidth: smallScreen ? 'unset' : '30rem',
              color: '#293845',
            }}
          >
            <Typography variant={'subtitle1'}>
              <Box
                style={{ fontSize: smallScreen ? '1rem' : '1.2rem' }}
                lineHeight={smallScreen ? '2.5rem' : '3.5rem'}
                maxWidth="75%"
              >
                <Link
                  to="/partners"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Partners {'&'} Friends
                </Link>

                <span
                  style={{
                    color: '#698d29',
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  / NL Greenlabel
                </span>
              </Box>
            </Typography>
          </div>
          <div className={twoCols}>
            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box {...box} className={'heading'}>
                  Ahead of the future
                </Box>
              </Typography>
              <Typography
                variant={'subtitle1'}
                style={{ margin: smallScreen ? '2rem auto' : '3rem auto' }}
              >
                NL Greenlabel provides an ecolabel for the living environment.
                Initiated by two well known green pioneers, the Dutch
                organization has developed into a platform which today is
                supported by more than 160 partners. All the partners contribute
                to a network containing a range of disciplines, from architects,
                NGO’s and scientists to green professionals, start-ups and so
                on. The mission is to bring man and nature together into a state
                of balance. Concerned with global challenges like biodiversity,
                climate adaptation, loss of landscape and human wellbeing, our
                methodology draws on measurements like nature-based solutions
                and green innovations to create healthy and thriving
                environments. With all the challenges ahead, like environmental
                issues, ever-growing cities and the loss of biodiversity, it is
                clearer than ever that a different way is needed for the way we
                live and the way we organize and manage our own habitat.
              </Typography>

              <Typography variant={'subtitle1'} style={{ margin: '3rem auto' }}>
                It took ten years of research, development and experimenting to
                become a front leader in the assessment of a sustainable living
                environment. Unique tools and services help to assess
                sustainability with so-called passports for plants, products and
                materials. Moreover, we assess the living environment.
                Distinguishing different scales and sizes, it can be used to
                asses area's like suburbs and industrial parks, middle sized
                projects like sport parks and school yards, and thirdly, private
                gardens. The unique selling point is the way this system works.
                It is simple and practical for all the stakeholders involved and
                it allows to assess sustainability to formulate and guarantee
                ambitions. A board of renowned scientists validates the concept
                on a regular base and provides valuable input.
              </Typography>
            </section>
            <section>
              <Box display="flex" flexDirection="column">
                <img
                  src={nlGreenLabelLogoMedium}
                  style={{
                    width: smallScreen ? '15rem' : '20rem',
                    height: '5rem',
                    margin: '100px 0 3rem',
                  }}
                ></img>
                <Box
                  display="flex"
                  flexDirection="row"
                  style={{
                    width: smallScreen ? '20rem' : '30rem',
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    style={{ marginRight: '2rem' }}
                  >
                    <div
                      className={founderGrid}
                      style={{
                        gridTemplateColumns: smallScreen
                          ? '8rem 10rem'
                          : '8rem 20rem',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>
                        Founders
                      </Typography>

                      <Typography>
                        Nico Wissing and Lodewijk Hoekstra
                      </Typography>
                    </div>

                    <div
                      className={founderGrid}
                      style={{
                        gridTemplateColumns: smallScreen
                          ? '8rem 10rem'
                          : '8rem 20rem',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>
                        Founded in year
                      </Typography>

                      <Typography>2010</Typography>
                    </div>
                    <div
                      className={founderGrid}
                      style={{
                        gridTemplateColumns: smallScreen
                          ? '8rem 10rem'
                          : '8rem 20rem',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>
                        Country
                      </Typography>

                      <Typography>Netherlands</Typography>
                    </div>
                    <div
                      className={founderGrid}
                      style={{
                        gridTemplateColumns: smallScreen
                          ? '8rem 10rem'
                          : '8rem 20rem',
                      }}
                    >
                      <Typography style={{ fontWeight: 'bold' }}>
                        Team size
                      </Typography>

                      <Typography>13</Typography>
                    </div>

                    <div
                      className={founderGrid}
                      style={{
                        gridTemplateColumns: smallScreen
                          ? '8rem 10rem'
                          : '8rem 20rem',
                      }}
                    >
                      <Link
                        to="https://nlgreenlabel.nl/"
                        target="_blank"
                        style={{
                          textDecoration: 'none',
                          color: '#698d29',
                          marginTop: '1rem',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                          float: 'right',
                        }}
                      >
                        nlgreenlabel.nl
                      </Link>
                    </div>
                  </Box>
                </Box>
              </Box>
            </section>
          </div>
        </div>
      </div>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '3rem',
        }}
      >
        <Typography
          variant={smallScreen ? 'subtitle1' : 'h5'}
          style={{
            textAlign: 'center',
            lineHeight: '2.5rem ',
            fontWeight: 'bold',
            width: smallScreen ? '18rem' : '50rem',
          }}
        >
          “Adding NL Greenlabel as a partner will contribute with vital
          knowledge, experience and network to add qualitative sustainability
          services on top of the quantitative HUGSI data.”
        </Typography>
        <Typography variant={'subtitle1'} style={{ margin: '1rem 0 2rem' }}>
          — Team HUGSI
        </Typography>
      </Box>
      <div className={rootWrapper}>
        <div
          className={root}
          style={{
            padding: smallScreen ? '0 1rem' : '0 auto',
            margin: smallScreen ? '0 1rem' : '0 auto',
          }}
        >
          <div className={twoCols}>
            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box {...box} className={'heading'}>
                  {/* Self-assessment tools */}
                  Terrainlabel self-assessment for more sustainable green spaces
                </Box>
              </Typography>
              <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
                Together with HUGSI we make the Terrainlabel accessible for self
                assessments. In this tool you can review the development of your
                terrain or the current status to gain insight into the integral
                sustainability of your project. It also gives the potential to
                enhance the sustainability. The self assessment tool guides you
                through different sustainability aspects and asks questions of
                which not everyone might think. By being aware of the choices
                that can be made, it is easier to make the green and sustainable
                ones!{' '}
                <>
                  Take the <b>Terrainlabel self-assessment </b>
                </>
                <a
                  href={'/nl-green-label-self-assessment'}
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <i
                    className="fas fa-arrow-right"
                    style={{
                      marginLeft: '1rem',
                      fontWeight: 'bold',
                      fontSize: '1.4rem',
                      color: '#698d29',
                    }}
                  ></i>
                </a>
              </Typography>
            </section>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
              className={center}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                style={{
                  float: 'right',
                }}
              >
                <a href={'/nl-green-label-self-assessment'} target="_blank">
                  <img
                    src={hugsi_symbol}
                    width={smallScreen ? '300px' : '400px'}
                    height={smallScreen ? '200px' : '250px'}
                    alt={'satellite'}
                  />
                </a>
              </Box>
            </div>
          </div>
        </div>
        <div className={root} style={{ margin: '0 auto' }}>
          <div className={twoCols}>
            <div
              style={{
                width: 'auto',
                gridRow: smallScreen ? 2 : 1,
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              className={center}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                style={{ float: 'left' }}
              >
                <img
                  src={badges}
                  width={smallScreen ? '250px' : '400px'}
                  height={smallScreen ? '200px' : '250px'}
                  alt={'Achievement badges'}
                />
              </Box>
            </div>

            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box
                  {...box}
                  className={'heading'}
                  style={{ marginTop: '2rem' }}
                >
                  Green passports
                </Box>
              </Typography>
              <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
                When we review an area, it gets a sustainability passport/label.
                This is a way of communicating the contribution to
                sustainability and the quality which you realised.
                Sustainability passports go further than just the greenness of
                an area, by looking at the materialisation, water balance,
                social cohesion, maintenance and so on. For now, only official
                passports have been issued our home country, The Netherlands,
                but in the future we want to go international. The self
                assessments which have been filled out on HUGSI area also
                indicated on the map.
              </Typography>
            </section>
          </div>
        </div>

        <Box style={{}} className="center">
          <img src={greenlabelTeam} width="100%"></img>
          <figcaption style={{ margin: '1rem 2rem' }}>
            The team behind NL Greenlabel
          </figcaption>
        </Box>
        <div className={root} style={{ margin: '2rem auto' }}>
          <div className={twoCols}>
            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box
                  {...box}
                  className={'heading'}
                  style={{ marginTop: '2rem' }}
                >
                  Scalability
                </Box>
              </Typography>
              <Typography variant={'subtitle1'} style={{ margin: '2rem auto' }}>
                The world is changing in a rapid way. Like Husqvarna, NL
                Greenlabel pioneers to anticipate future developments. In the
                last years, we have been focussing on creating a strong network
                of partners and making people aware of the solutions we offer.
                Today we are working to make our products more digital-based and
                scalable. The goal is to share the method and knowledge through
                training programs in order to provide others with the knowledge
                and tools they need to make living environments greener and more
                sustainable. A nice example of today’s approach is the
                implementation of our new terrain label, which is applicable to
                medium-sized projects like solar and sport parks. We are now
                providing these tools in an accessible way for everyone to do a
                quick scan themselves as an self-assessment.
              </Typography>
            </section>
            <section>
              <Typography variant={smallScreen ? 'h5' : 'h4'}>
                <Box
                  {...box}
                  className={'heading'}
                  style={{ margin: '2rem 0' }}
                >
                  Services
                </Box>
              </Typography>
              <Typography variant={'subtitle1'}>
                Combining available data about health, climate and biodiversity
                with the data collected by processing the Terrain label results
                in better substantiated choices and a more integrated approach
                while doing it in a practical way. This way, the users of an
                area can become more relevant in the process of city development
                and can contribute to more liveable area. In the future, data
                from satellites and local sensors on machines, plants or in the
                soil can provide relevant information. Nowadays we can already
                help to make ambitions for sustainability real by facilitating
                the process of sustainable city planning with our methodology.
                In the future, we believe we can enrich this process by feeding
                in real-time data and cooperate with partners to create a world
                in which men and nature are truly in balance. Area management
                according to our vision on a sustainable living environment can
                contribute directly, and measurable, to climate, health and the
                quality of the cities as a whole. Besides sharing the tools NL
                Greenlabel will feed the HUGSI platform with knowledge and
                relevant content which contributes building and managing green
                and sustainable cities.
              </Typography>
              <br />
              <Typography variant={'subtitle1'}>
                See{' '}
                <a
                  href={'https://nlgreenlabel.nl/'}
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {'www.nlgreenlabel.nl'}
                </a>{' '}
                for more information about the terrain or area label and advice
                on integral sustainability.
              </Typography>
            </section>
          </div>
          <Box
            style={{
              float: 'right',
              margin: '-5rem  0rem',
              fontSize: smallScreen ? '1rem' : '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Learn more about NL Greenlabel at{' '}
            <Link
              to="https://nlgreenlabel.nl/"
              target="_blank"
              style={{
                textDecoration: 'none',
                color: '#698d29',
                margin: '1rem 0',
                whiteSpace: 'nowrap',
              }}
            >
              nlgreenlabel.nl
              <ArrowForward
                style={{
                  paddingTop: '1.2rem',
                  fontWeight: 'bold',
                  fontSize: '2.2rem',
                  color: '#698d29',
                }}
              />
            </Link>
          </Box>
        </div>
      </div>
      <PartnerConnect />
    </section>
  );
};

export default PartnerDetails;
