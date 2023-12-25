import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Table,
  TableCell,
  TableRow,
  Typography,
  TableBody,
  TableHead,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { City } from '../../models';
import CityLink from '../link/city-link';
import useCities from '../../hooks/cities';
import InfoTooltip from '../../components/info-tooltip/info-tooltip';
import { StyledTableCell, StyledTableRow } from './enhanced-table-misc';
import { Link } from 'gatsby';
import * as NumberUtils from '../../utils/number-utils';
import addComma from '../../utils/add-comma';

export type Order = 'asc' | 'desc';

interface SimilarCitiesHeadRow {
  disablePadding: boolean;
  id: keyof City;
  label: string;
  tooltip?: any;
}

const similarCitiesHeadRows: SimilarCitiesHeadRow[] = [
  {
    id: 'id',
    disablePadding: false,
    label: 'City',
  },
  // {
  //   id: 'country',
  //   disablePadding: false,
  //   label: 'Country',
  // },

  {
    id: 'green_grade',
    disablePadding: false,
    label: 'Grade',
    tooltip: {
      title: 'Grade',
      content: `Rating (A-F) of the urban green space performance based on our criteria’s.`,
    },
  },
  // {
  //   id: 'index_ranking',
  //   disablePadding: false,
  //   label: 'Ranking',
  //   tooltip: {
  //     title: 'Ranking',
  //     content: `Rating (A-F) of the urban green space performance based on our criteria’s.`,
  //   },
  // },
];

const box = {
  fontWeight: 'fontWeightBold',
  color: '#424242',
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
      fontSize: '0.8rem',
    },
    paper: {
      width: '100%',
    },
    table: {
      // minWidth: 700,
    },
    smallTable: {},
    tableWrapper: {
      overflowX: 'auto',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

export type UseStyles = ReturnType<typeof useStyles>;

interface Props {
  city: City;
  cityClick: any;
}

/**
 * Similar cities Table component
 * @param cityClick - click event on city link
 */
export const SimilarCitiesDetails: React.FC<Props> = ({ cityClick, city }) => {
  const classes = useStyles({});
  const { cities, getCity } = useCities();
  const similarCities = JSON.parse(
    city.related_cities.trim().replace(/'/g, '"')
  );
  const latLongCity = useMemo(() => getCity(similarCities.latlong), [
    cities,
    similarCities.latlong,
  ]);
  const greenIndexCity = useMemo(() => getCity(similarCities.green_index), [
    cities,
    similarCities.green_index,
  ]);
  const greenPerCapitaCity = useMemo(
    () => getCity(similarCities.green_per_capita),
    [cities, similarCities.green_per_capita]
  );
  const groupedCities = [
    { ...latLongCity },
    { ...greenIndexCity },
    { ...greenPerCapitaCity },
  ];

  const uniqueRelatedCities = groupedCities.filter(
    (v, i, a) => a.findIndex(t => t.id === v.id) === i
  );
  const relatedCities = uniqueRelatedCities.filter(urc => urc.id !== city.id);

  const smallScreen = useMediaQuery('(max-width:600px)');
  const getCityURL = (city: string) => `/city?${city}`;

  return (
    <div style={{ background: '#fff', margin: '2rem 0' }}>
      <Typography
        variant={smallScreen ? 'subtitle1' : 'h5'}
        style={{ margin: '1rem 0', color: '#424242', fontWeight: 'bold' }}
      >
        Similar areas
      </Typography>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table
              className={smallScreen ? classes.smallTable : classes.table}
              aria-labelledby="tableTitle"
            >
              <TableHead style={{ display: 'none' }}>
                <TableRow>
                  {similarCitiesHeadRows.map(
                    (row, rowIndex) =>
                      row.id !== null && (
                        <TableCell
                          style={{
                            fontSize: smallScreen ? '1.2em' : '1.5em',
                            color: '#5f6a74',
                          }}
                          // key={row.id}
                          key={`head-row-${rowIndex}`}
                          padding={'default'}
                        >
                          <Box
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            {row.label}
                            {/* {row.tooltip && (
                                <InfoTooltip
                                  title={row.tooltip.title}
                                  details={row.tooltip.content}
                                />
                              )} */}
                          </Box>
                        </TableCell>
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {relatedCities.map((row, relatedIndex) => {
                  return (
                    <>
                      {row.id && (
                        <StyledTableRow

                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                        >
                          <StyledTableCell
                            style={{ fontSize: '1rem' }}
                            component="th"
                            scope="row"
                          >
                            <Link
                              to={getCityURL(row.id)}
                              style={{ textDecoration: 'none' }}
                              onClick={() => {
                                window.scroll({
                                  top: 0,
                                  left: 0,
                                  behavior: 'smooth',
                                });
                              }}
                            >
                              <Box
                                {...box}
                                style={{
                                  color: '#698d29',
                                  fontSize: smallScreen ? '1rem' : '1.25rem',
                                }}
                                onClick={cityClick}
                              >
                                {row.id}
                              </Box>
                            </Link>
                          </StyledTableCell>
                          {/* <StyledTableCell style={{ fontSize: '1em' }}>
                            <CityLink cityId={row.id}>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  fontSize: smallScreen ? '1rem' : '1.25rem',
                                }}
                                onClick={cityClick}
                              >
                                <span
                                  style={{
                                    marginRight: '1rem',
                                  }}
                                  className={`flag-icon flag-icon-${row.city_code
                                    .substring(0, 2)
                                    .toLowerCase()}`}
                                />
                                <Box style={{ color: '#424242' }}>
                                  {row.country}
                                </Box>
                              </div>
                            </CityLink>
                          </StyledTableCell> */}
                          <StyledTableCell
                            style={{ fontSize: '1rem' }}
                            align="left"
                          >
                            <CityLink cityId={row.id}>
                              <Box
                                style={{
                                  color: '#424242',
                                  fontSize: smallScreen ? '1rem' : '1.25rem',
                                }}
                                onClick={cityClick}
                              >
                                {/* {row.green_grade} */}
                                {/*row.index_ranking*/}
                                {!smallScreen && (
                                  <i
                                    className="fa fa-greater-than"
                                    style={{
                                      color: 'rgb(66, 66, 66)',
                                      marginRight: '3rem',
                                      float: 'right',
                                      fontSize: '0.8rem',
                                    }}
                                  ></i>
                                )}
                              </Box>
                            </CityLink>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export const SimilarCities: React.FC<Props> = ({ cityClick, city }) => {
  const classes = useStyles({});
  const { cities, getCity } = useCities();
  const similarCities = JSON.parse(
    city.related_cities.trim().replace(/'/g, '"')
  );

  const latLongCity = useMemo(() => getCity(similarCities.latlong), [
    cities,
    similarCities.latlong,
  ]);
  const greenIndexCity = useMemo(() => getCity(similarCities.green_index), [
    cities,
    similarCities.green_index,
  ]);
  const greenPerCapitaCity = useMemo(
    () => getCity(similarCities.green_per_capita),
    [cities, similarCities.green_per_capita]
  );
  const groupedCities = [
    { ...latLongCity },
    { ...greenIndexCity },
    { ...greenPerCapitaCity },
  ];

  const uniqueRelatedCities = groupedCities.filter(
    (v, i, a) => a.findIndex(t => t.id === v.id) === i
  );
  const relatedCities = uniqueRelatedCities.filter(urc => urc.id !== city.id);
  console.log(relatedCities);

  const [open, setOpen] = useState(false);
  const smallScreen = useMediaQuery('(max-width:600px)');
  const getCityURL = (city: string) => `/city?${city}`;

  return (
    <div style={{ background: '#fff', margin: '2rem 0' }}>
      <Typography
        variant={smallScreen ? 'subtitle1' : 'h5'}
        style={{ margin: '1rem 0', color: '#424242', fontWeight: 'bold' }}
      >
        Area info with similar results
      </Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: smallScreen ? '1rem 0' : '2rem 0 0 0',
          textAlign: 'justify',
        }}
      >
        <Typography variant="body1">
          Based on quantified data, KPIs, and other details following are the similar cities compared to this one,
          along with their ratings and the country they belong to.
          Take any city as a model to follow that is higher on the list.
        </Typography>
      </Box>
      <p style={{
        color: '#698D29',
        fontSize: '16px',
        lineHeight: '24px',
        cursor: 'pointer',
        marginBottom: '2rem'
      }}
        onClick={() => setOpen(!open)}
      >
        <b>{!open ? 'Explore similar area info' : 'Hide similar area info'}</b><span>
          &nbsp;
          <i className={!open ? 'fas fa-angle-down' : 'fas fa-angle-up'} />

          {/* <img src={iconEmail} alt='email-icon'
            style={{
              height: '16px',
              width: '20px',
              marginLeft: '10px'
            }} /> */}
        </span></p>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Box
              className={smallScreen ? classes.smallTable : classes.table}
              aria-labelledby="tableTitle"
              display={open ? '' : 'none'}
            >
              <Box mb="3rem">
                <Box display="flex" width="100%" justifyContent="space-between">
                  {open && city && (
                    <>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#424242', fontWeight: 'bold' }}
                        >
                          Amount of Green Space
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#698D29', fontWeight: 'bold' }}
                        >
                          {NumberUtils.toPercentage(
                            city?.total_green_space_percentage
                          )}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Box m="1rem 0">
                  {open && relatedCities.map((row, relatedIndex) => {
                    return (
                      <>
                        <Box
                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                          display="flex"
                        >
                          {row.id && (
                            <>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  width: '100%',
                                  border: 'none'
                                }}
                              >
                                <CityLink cityId={row.id}
                                // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                >
                                  <Box {...box} style={{ color: '#698d29' }}>
                                    {row.id}
                                  </Box>
                                </CityLink>
                                {/* <Link
                                  to={getCityURL(row.id)}
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    window.scroll({
                                      top: 0,
                                      left: 0,
                                      behavior: 'smooth',
                                    });
                                    window.location.reload();
                                  }}
                                >
                                  <Typography
                                    variant={smallScreen ? 'subtitle1' : 'body1'}
                                    style={{ margin: '0.5rem 0', color: '#698D29', fontWeight: 'bold' }}
                                  >
                                    {row.id}
                                  </Typography>
                                </Link> */}
                              </Box>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  border: 'none',

                                }}
                              >
                                <Typography
                                  variant={smallScreen ? 'subtitle1' : 'body1'}
                                  style={{ margin: '0.5rem 0', color: '#868686', fontWeight: 'bold', width: 'max-content' }}
                                >
                                  {NumberUtils.toPercentage(
                                    row?.total_green_space_percentage
                                  )}
                                </Typography>
                              </Box>
                            </>

                          )}
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Box>

              <Box mb="3rem">
                <Box display="flex" width="100%" justifyContent="space-between">
                  {open && city && (
                    <>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}
                        padding={'auto'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#424242', fontWeight: 'bold' }}
                        >
                          Average health of urban vegetation
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#698D29', fontWeight: 'bold' }}
                        >
                          {NumberUtils.toFixed(city?.ndvi_vegetation, 2)}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Box m="1rem 0">
                  {open && relatedCities.map((row, relatedIndex) => {
                    return (
                      <>
                        <Box
                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                          display="flex"
                        >
                          {row.id && (
                            <>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  width: '100%',
                                  border: 'none'
                                }}
                              >
                                <CityLink cityId={row.id}
                                // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                >
                                  <Box {...box} style={{ color: '#698d29' }}>
                                    {row.id}
                                  </Box>
                                </CityLink>
                                {/* <Link
                                  to={getCityURL(row.id)}
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    window.scroll({
                                      top: 0,
                                      left: 0,
                                      behavior: 'smooth',
                                    });
                                  }}
                                >
                                  <Typography
                                    variant={smallScreen ? 'subtitle1' : 'body1'}
                                    style={{ margin: '0.5rem 0', color: '#698D29', fontWeight: 'bold' }}
                                  >
                                    {row.id}
                                  </Typography>
                                </Link> */}
                              </Box>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  border: 'none',

                                }}
                              >
                                <Typography
                                  variant={smallScreen ? 'subtitle1' : 'body1'}
                                  style={{ margin: '0.5rem 0', color: '#868686', fontWeight: 'bold' }}
                                >
                                  {NumberUtils.toFixed(row?.ndvi_vegetation, 2)}
                                </Typography>
                              </Box>
                            </>

                          )}
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Box>

              <Box mb="3rem">
                <Box display="flex" width="100%" justifyContent="space-between">
                  {open && city && (
                    <>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#424242', fontWeight: 'bold' }}
                        >
                          Urban Green Space per capita
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#698D29', fontWeight: 'bold', width: 'max-content' }}
                        >
                          {`${NumberUtils.toFixed(
                            city.green_per_capita,
                            1
                          )} m²`}

                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Box m="1rem 0">
                  {open && relatedCities.map((row, relatedIndex) => {
                    return (
                      <>
                        <Box
                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                          display="flex"
                        >
                          {row.id && (
                            <Box display="flex" width="100%">
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  width: '100%',
                                  border: 'none'
                                }}
                              >
                                {/* <Link
                                  to={getCityURL(row.id)}
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    window.scroll({
                                      top: 0,
                                      left: 0,
                                      behavior: 'smooth',
                                    });
                                  }}
                                >
                                  <Typography
                                    variant={smallScreen ? 'subtitle1' : 'body1'}
                                    style={{ margin: '0.5rem 0', color: '#698D29', fontWeight: 'bold'
                                    , width: 'max-content' }}
                                  >
                                    {row.id}
                                  </Typography>
                                </Link> */}
                                <CityLink cityId={row.id}
                                // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                >
                                  <Box {...box} style={{ color: '#698d29' }}>
                                    {row.id}
                                  </Box>
                                </CityLink>
                              </Box>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',

                                  border: 'none',

                                }}
                              >
                                <Typography
                                  variant={smallScreen ? 'subtitle1' : 'body1'}
                                  style={{ margin: '0.5rem 0', color: '#868686', fontWeight: 'bold', width: 'max-content' }}
                                >
                                  {`${NumberUtils.toFixed(
                                    row.green_per_capita,
                                    1
                                  )} m²`}
                                </Typography>
                              </Box>
                            </Box>

                          )}
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Box>

              <Box mb="3rem">
                <Box display="flex" width="100%" justifyContent="space-between">
                  {open && city && (
                    <>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}
                        padding={'auto'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#424242', fontWeight: 'bold' }}
                        >
                          Distribution of urban green space
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#698D29', fontWeight: 'bold' }}
                        >
                          {NumberUtils.toPercentage(city?.grid_median_vegetation)}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Box m="1rem 0">
                  {open && relatedCities.map((row, relatedIndex) => {
                    return (
                      <>
                        <Box
                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                          display="flex"
                        >
                          {row.id && (
                            <>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  width: '100%',
                                  border: 'none'
                                }}
                              >
                                <CityLink cityId={row.id}
                                // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                >
                                  <Box {...box} style={{ color: '#698d29' }}>
                                    {row.id}
                                  </Box>
                                </CityLink>
                                {/* <Link
                                  to={getCityURL(row.id)}
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    window.scroll({
                                      top: 0,
                                      left: 0,
                                      behavior: 'smooth',
                                    });
                                  }}
                                >
                                  <Typography
                                    variant={smallScreen ? 'subtitle1' : 'body1'}
                                    style={{ margin: '0.5rem 0', color: '#698D29', fontWeight: 'bold' }}
                                  >
                                    {row.id}
                                  </Typography>
                                </Link> */}
                              </Box>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  border: 'none',

                                }}
                              >
                                <Typography
                                  variant={smallScreen ? 'subtitle1' : 'body1'}
                                  style={{ margin: '0.5rem 0', color: '#868686', fontWeight: 'bold' }}
                                >
                                  {NumberUtils.toPercentage(row?.grid_median_vegetation)}
                                </Typography>
                              </Box>
                            </>

                          )}
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Box>

              <Box mb="3rem">
                <Box display="flex" width="100%" justifyContent="space-between">
                  {open && city && (
                    <>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}
                        padding={'auto'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#424242', fontWeight: 'bold' }}
                        >
                          Urban area Population
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#698D29', fontWeight: 'bold' }}
                        >
                          {`${addComma(city.population.toFixed())}`}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Box m="1rem 0">
                  {open && relatedCities.map((row, relatedIndex) => {
                    return (
                      <>
                        <Box
                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                          display="flex"
                        >
                          {row.id && (
                            <>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  width: '100%',
                                  border: 'none'
                                }}
                              >
                                <CityLink cityId={row.id}
                                // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                >
                                  <Box {...box} style={{ color: '#698d29' }}>
                                    {row.id}
                                  </Box>
                                </CityLink>
                                {/* <Link
                                  to={getCityURL(row.id)}
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    window.scroll({
                                      top: 0,
                                      left: 0,
                                      behavior: 'smooth',
                                    });
                                  }}
                                >
                                  <Typography
                                    variant={smallScreen ? 'subtitle1' : 'body1'}
                                    style={{ margin: '0.5rem 0', color: '#698D29', fontWeight: 'bold' }}
                                  >
                                    {row.id}
                                  </Typography>
                                </Link> */}
                              </Box>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  border: 'none',

                                }}
                              >
                                <Typography
                                  variant={smallScreen ? 'subtitle1' : 'body1'}
                                  style={{ margin: '0.5rem 0', color: '#868686', fontWeight: 'bold' }}
                                >
                                  {`${addComma(row.population.toFixed())}`}
                                </Typography>
                              </Box>
                            </>

                          )}
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Box>

              <Box mb="3rem">
                <Box display="flex" width="100%" justifyContent="space-between">
                  {open && city && (
                    <>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}
                        padding={'auto'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#424242', fontWeight: 'bold' }}
                        >
                          Urban area covered by trees
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#698D29', fontWeight: 'bold' }}
                        >
                          {NumberUtils.toPercentage(city?.treecanopycover_percentage)}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Box m="1rem 0">
                  {open && relatedCities.map((row, relatedIndex) => {
                    return (
                      <>
                        <Box
                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                          display="flex"
                        >
                          {row.id && (
                            <>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  width: '100%',
                                  border: 'none'
                                }}
                              >
                                <CityLink cityId={row.id}
                                // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                >
                                  <Box {...box} style={{ color: '#698d29' }}>
                                    {row.id}
                                  </Box>
                                </CityLink>
                                {/* <Link
                                  to={getCityURL(row.id)}
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    window.scroll({
                                      top: 0,
                                      left: 0,
                                      behavior: 'smooth',
                                    });
                                  }}
                                >
                                  <Typography
                                    variant={smallScreen ? 'subtitle1' : 'body1'}
                                    style={{ margin: '0.5rem 0', color: '#698D29', fontWeight: 'bold' }}
                                  >
                                    {row.id}
                                  </Typography>
                                </Link> */}
                              </Box>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  border: 'none',

                                }}
                              >
                                <Typography
                                  variant={smallScreen ? 'subtitle1' : 'body1'}
                                  style={{ margin: '0.5rem 0', color: '#868686', fontWeight: 'bold' }}
                                >
                                  {NumberUtils.toPercentage(row?.treecanopycover_percentage)}
                                </Typography>
                              </Box>
                            </>

                          )}
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Box>

              <Box mb="3rem">
                <Box display="flex" width="100%" justifyContent="space-between">
                  {open && city && (
                    <>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}
                        padding={'auto'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#424242', fontWeight: 'bold' }}
                        >
                          Urban area covered by grass
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          fontSize: smallScreen ? '1.2em' : '1.5em',
                          color: '#424242',
                        }}
                        // key={row.id}

                        padding={'default'}
                      >
                        <Typography
                          variant={smallScreen ? 'subtitle1' : 'h6'}
                          style={{ color: '#698D29', fontWeight: 'bold' }}
                        >
                          {NumberUtils.toPercentage(city?.grasscover_percentage)}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
                <Box m="1rem 0">
                  {open && relatedCities.map((row, relatedIndex) => {
                    return (
                      <>
                        <Box
                          role="checkbox"
                          tabIndex={-1}
                          // key={row.id}
                          key={`head-row-${relatedIndex}`}
                          display="flex"
                        >
                          {row.id && (
                            <>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  width: '100%',
                                  border: 'none'
                                }}
                              >
                                <CityLink cityId={row.id}
                                // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                >
                                  <Box {...box} style={{ color: '#698d29' }}>
                                    {row.id}
                                  </Box>
                                </CityLink>
                                {/* <Link
                                  to={getCityURL(row.id)}
                                  style={{ textDecoration: 'none' }}
                                  onClick={() => {
                                    window.scroll({
                                      top: 0,
                                      left: 0,
                                      behavior: 'smooth',
                                    });
                                  }}
                                >
                                  <Typography
                                    variant={smallScreen ? 'subtitle1' : 'body1'}
                                    style={{ margin: '0.5rem 0', color: '#698D29', fontWeight: 'bold' }}
                                  >
                                    {row.id}
                                  </Typography>
                                </Link> */}
                              </Box>
                              <Box
                                style={{
                                  fontSize: smallScreen ? '1.2em' : '1.5em',
                                  color: '#424242',
                                  border: 'none',

                                }}
                              >
                                <Typography
                                  variant={smallScreen ? 'subtitle1' : 'body1'}
                                  style={{ margin: '0.5rem 0', color: '#868686', fontWeight: 'bold' }}
                                >
                                  {NumberUtils.toPercentage(row?.grasscover_percentage)}
                                </Typography>
                              </Box>
                            </>

                          )}
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </div>
        </Paper>
      </div>
    </div>
  );
};
