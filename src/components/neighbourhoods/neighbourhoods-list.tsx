import React, { useState, useEffect } from 'react';
import {
  makeStyles, Button, Box, Divider, Accordion, useMediaQuery,
  AccordionSummary, AccordionDetails, Typography
} from '@material-ui/core';
import PotentialKPIs from '../potential-kpi/potential-kpi';
import RegularKPIs from '../regular-kpi/regular-kpi';
import { ArrowBack, ArrowForward, ArrowDropDown } from '@material-ui/icons';
import { RATING_LABELS } from 'models';
import Pagination from '@material-ui/lab/Pagination';
const PAGE_COUNT = 5;
const useStyles = makeStyles({});

interface Props {
  town: string;
  municipality: string;
  list: any;
  urlByLocation?: string;
}

/**
 * NeighbourhoodsList component
 * @param town - the city
 */
const NeighbourhoodsList: React.FC<Props> = ({ town, municipality, list, urlByLocation }) => {
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [neighbours, setNeighbours] = useState([]);
  const [filteredNeighbors, setFilteredNeighbors] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(-1);
  const getTownRankingColor = (label: string) => {
    switch (label) {
      case 'A':
        return '#65C080';
      case 'B':
        return '#B6D983';
      case 'C':
        return '#F0CF69';
      case 'D':
        return '#F8DC29';
      case 'E':
        return '#F3C331';
      case 'F':
        return '#F05646';
      case 'V':
        return '#E482D6';
      case 'W':
        return '#7030A0';
      case 'X':
        return '#A4329C';
      case 'Z':
        return '#D631E7';
      default:
        return '#D631E7';
    }
  };

  const getAreaType = (label: string) => {
    switch (label) {
      case 'V':
        return 'Sports terrain';
      case 'W':
        return 'Cemetery';
      case 'X':
        return 'Business or Industrial area';
      case 'Z':
        return 'Other';
      default:
        return 'Other';
    }
  };

  const getNeighboursURL = (areaName: string, locationName: string) => {
    return `#${areaName}/${locationName}/neighbourhoods`;
  };

  const handleClick = (itemNum, city, area) => {
    setActiveItem(itemNum);
    setShow(!show);
    const AreaURL = getNeighboursURL(city, area);
    window.location.hash = AreaURL;
  };

  const updateRoute = (city: string) => {
    const AreaURL = `#${city}/neighbourhoods`;
    window.location.hash = AreaURL;
  };

  useEffect(() => {
    setNeighbours(list);
    handlePageRedirect(list, activePage);
  }, []);
  useEffect(() => {
    if (urlByLocation && urlByLocation !== '-1') {
      setActiveItem(list.findIndex((x: any) => { return x.naam === urlByLocation; }));
      setShow(true);
    }
  }, [urlByLocation]);

  const handlePageRedirect = (e, value) => {
    setActivePage(value);
    const page = value;
    const perPage = PAGE_COUNT || 5;
    const offset = (page - 1) * perPage;
    const paginatedItems = list.slice(offset).slice(0, PAGE_COUNT);
    const totalPages = Math.ceil(list.length / perPage);
    setFilteredNeighbors(paginatedItems);
    setTotalPages(totalPages);
  };
  return (
    <>
      {neighbours?.length === 0 ? (
        <div style={{ display: 'flex' }}>
          <Typography
            variant="h6"
            style={{
              fontWeight: 'bold',
              color: '#e77f81',
              margin: '0.5rem auto',
            }}
          >
            {' '}
            No neighborhoods
          </Typography>
        </div>
      ) : (
        <>
          {show && activeItem >= 0 ? (
            <>
              <Button
                onClick={() => {
                  setShow(false);
                  updateRoute(neighbours[activeItem].plaatsnaam);
                }}
                style={{
                  textTransform: 'none',
                  color: '#99c93c',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}
              >
                <ArrowBack
                  style={{
                    marginRight: '0.5em',
                    fontWeight: 'bold',
                  }}
                />
                Back to neighborhoods
              </Button>
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold',
                  margin: '1rem 0',
                }}
              >
                {neighbours[activeItem].naam}
              </Typography>
              <a
                href="https://groenestadchallenge.nl/veelgesteldevragen/"
                target="_blank"
                style={{
                  // textDecoration: 'none',
                  textTransform: 'none',
                  color: '#698d29',
                  fontWeight: 'bold',
                  margin: smallScreen ? '0.5rem 0' : '1rem 0',
                  fontSize: '1rem',
                }}
              >
                Know more at Groene stad challenge
                <i
                  className="fas fa-external-link-alt"
                  style={{
                    margin: '0 0.5rem',
                    color: '#698d29',
                  }}
                ></i>
              </a>
              {neighbours[activeItem].Label &&
                RATING_LABELS.includes(neighbours[activeItem].Label) ? (
                <Box style={{}}>
                  <Typography
                    variant="h6"
                    style={{
                      color: '#868686',
                    }}
                  >
                    Rating
                  </Typography>
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
                        margin: '1rem 0',
                      }}
                    >
                      <Box
                        style={{
                          width: smallScreen ? `calc(8rem)` : `calc(10rem)`,
                          height: smallScreen ? '2rem' : '3rem',
                          background: getTownRankingColor(
                            neighbours[activeItem].Label
                          ),
                          display: 'flex',
                          color: 'white',
                          fontSize: smallScreen ? '1.2rem' : '1.2rem',
                          fontWeight: 'bold',
                          paddingLeft: '0.5rem',
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            marginTop: '0.5rem',
                            marginLeft: '0.5rem',
                          }}
                        >
                          {neighbours[activeItem].Label}
                        </Typography>
                      </Box>{' '}
                      <Box
                        style={{
                          borderTop: smallScreen
                            ? '1rem solid transparent'
                            : '1.5rem solid transparent',
                          borderBottom: smallScreen
                            ? '1rem solid transparent'
                            : '1.5rem solid transparent',
                          borderLeft: smallScreen
                            ? `1rem solid ${getTownRankingColor(
                              neighbours[activeItem].Label
                            )}`
                            : `1.5rem solid ${getTownRankingColor(
                              neighbours[activeItem].Label
                            )}`,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box style={{}}>
                  <Typography
                    variant="h6"
                    style={{
                      color: '#868686',
                    }}
                  >
                    Area Category
                  </Typography>
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
                        margin: '1rem 0',
                      }}
                    >
                      <Box
                        style={{
                          width: smallScreen ? `calc(18rem)` : `calc(20rem)`,
                          height: smallScreen ? '2rem' : '3rem',
                          background: getTownRankingColor(
                            neighbours[activeItem].Label
                          ),
                          display: 'flex',
                          color: 'white',
                          fontSize: smallScreen ? '1rem' : '1.2rem',
                          fontWeight: 'bold',
                          paddingLeft: '0.5rem',
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            // marginTop: '0.5rem',
                            // marginLeft: '0.5rem',
                            margin: smallScreen ? '0.2rem' : '0.5rem',
                          }}
                        >
                          {getAreaType(neighbours[activeItem].Label)}
                        </Typography>
                      </Box>{' '}
                    </Box>
                  </Box>
                </Box>
              )}
              <Box
                style={{
                  height: 'auto',
                  backgroundColor: '#2FA03F',
                  padding: '0.2rem',
                  marginBottom: '1rem',
                  borderRadius: '5px',
                }}
              >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDropDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                      color: '#2FA03F',
                    }}
                  >
                    <Typography
                      style={{
                        // color: 'white',
                        fontWeight: 'bold',
                      }}
                      variant="h6"
                    >
                      7 bruto potentials for greener neighborhoods
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <>
                      <PotentialKPIs region={neighbours[activeItem]} />
                    </>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <RegularKPIs region={neighbours[activeItem]} />
            </>
          ) : (
            <>
              {filteredNeighbors.map((n: any, nIndex: number) => {
                return (
                  <>
                    <Box
                      key={`${n.code}-${n.naam}-${nIndex}`}
                      style={{
                        margin: '1.5rem 0',
                        color: '#293845',
                        fontSize: '20px',
                        cursor: 'pointer'
                        // border: '2px solid #2FA03F',
                        // borderRadius: '5px',
                      }}
                      onClick={() => handleClick(nIndex, n.plaatsnaam, n.naam)}
                    >
                      {n.naam}
                      <ArrowForward
                        style={{
                          marginLeft: '0.5em',
                          fontWeight: 'bold',
                          fontSize: '1.5rem',
                          float: 'right',
                        }}
                      />
                      <Divider style={{ margin: '1rem 0' }} />
                    </Box>
                  </>
                );
              })}
              {list?.length > 5 ? (
                <Box
                  style={{
                    display: 'flex',
                    width: '100%',
                    marginTop: '10px',
                    justifyContent: 'center',
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={activePage}
                    onChange={handlePageRedirect}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  // className={classes.paginationCss}
                  />
                </Box>) :
                <></>
              }
            </>
          )}
        </>
      )}

    </>
  );
};

export default NeighbourhoodsList;