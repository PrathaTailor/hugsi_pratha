import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { KPI_LIST } from '../../models';
import * as NumberUtils from '../../utils/number-utils';
import InfoTooltip from '../../components/info-tooltip/info-tooltip';
import { StyledTableCell, StyledTableRow } from './enhanced-table-misc';
import { ArrowUpward } from '@material-ui/icons';

export type Order = 'asc' | 'desc';

interface CategoriesSummaryHeadRow {
  disablePadding: boolean;
  id: string;
  label: string;
  tooltip?: any;
}

const categoriesSummaryHeadRows: CategoriesSummaryHeadRow[] = [
  {
    id: 'id',
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'country',
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'regional',
    disablePadding: false,
    label: 'Regional',
  },
  {
    id: 'global',
    disablePadding: false,
    label: 'Global',
  },
  {
    id: 'climate_zones',
    disablePadding: false,
    label: 'ClimateZone'
  },
  {
    id: 'population_category',
    disablePadding: false,
    label: 'Population'
  }
];

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
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
  city: any;
  regionalAverage: any;
  globalAverage: any;
  climateZone: any
  populationCategory: any
}

/**
 * Similar cities Table component
 * @param city - city values
 * @param globalAverage - global average
 * @param globalAverage - regional average
 * @param globalAverage - climateZone
 * @param globalAverage - populationCategory
 */
const CategoriesSummary: React.FC<Props> = ({
  city,
  globalAverage,
  regionalAverage,
  climateZone,
  populationCategory
}) => {
  const classes = useStyles({});

  const smallScreen = useMediaQuery('(max-width:600px)');
  const getLatestYear = globalAvg => {
    const years = Object.keys(globalAvg).map(y => Number(y));
    return Math.max(...years);
  };

  const latestYear = useMemo(() => getLatestYear(globalAverage), [
    globalAverage,
  ]);
  return (
    <div style={{ background: '#fff', margin: '2rem 0' }}>
      <Typography
        variant={smallScreen ? 'h6' : 'h5'}
        style={{
          margin: '1rem 0',
          color: '#424242',
          fontWeight: 'bold',
        }}
      >
        Categories summary
      </Typography>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table
              className={smallScreen ? classes.smallTable : classes.table}
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                  {categoriesSummaryHeadRows.map(
                    (row, headRowIndex) =>
                      row.id !== null && (
                        // <Box >
                        <TableCell
                          style={{
                            fontSize: smallScreen ? '1em' : '1.2em',
                            color: '#5f6a74',
                          }}
                          // key={row.id}
                          key={`categoryHead-${headRowIndex}`}
                          // padding="none"
                          padding={row.disablePadding ? 'none' : 'default'}
                        >
                          <Box
                            style={{
                              marginLeft: row.label === 'City' ? 20 : '',
                            }}
                          >
                            {row.label}
                            {row.tooltip && (
                              <InfoTooltip
                                title={row.tooltip.title}
                                details={row.tooltip.content}
                              />
                            )}
                          </Box>
                        </TableCell>
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {KPI_LIST.map((row, rowIndex) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`kpi-${rowIndex}`}
                    >
                      <StyledTableCell
                        style={{ fontSize: '1rem', color: '#293845' }}
                        component="th"
                        scope="row"
                      >
                        <Box
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 6fr',
                            gridGap: smallScreen ? '0.5rem' : '1rem',
                            // maxWidth: smallScreen ? '2rem' : 'none',
                          }}
                        >
                          <img
                            src={require(`../../images/icon-${row.key}.png`)}
                            style={{
                              width: '2.2rem',
                              height: '2.2rem',
                              // marginRight: smallScreen ? '0.5rem' : '1rem',
                            }}
                          />
                          {row.value}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          minWidth: '10rem',
                        }}
                        component="th"
                        scope="row"
                      >
                        <ArrowUpward
                          style={{
                            marginLeft: '0.5em',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: '#99C93C'
                          }}
                        /> {row.key === 'health'
                          ? NumberUtils.toFixed(city[row.property], 2)
                          : row.key === 'capita'
                            ? `${NumberUtils.toFixed(city[row.property], 1)} m²`
                            : NumberUtils.toPercentage(city[row.property])}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontSize: '1rem',
                          minWidth: smallScreen ? 'unset' : '8rem',
                          maxWidth: smallScreen ? '2rem' : 'unset',
                          // color: '#C9CDD0',
                          // opacity: 0.3,
                          // fontWeight: 'bold',
                        }}
                        component="th"
                        scope="row"
                      >
                        {regionalAverage &&
                          regionalAverage[city.continent] &&
                          (row.key === 'health'
                            ? NumberUtils.toFixed(
                              regionalAverage[city.continent][latestYear][
                              row.property
                              ],
                              2
                            )
                            : row.key === 'capita'
                              ? `${NumberUtils.toFixed(
                                regionalAverage[city.continent][latestYear][
                                row.property
                                ],
                                1
                              )} m²`
                              : NumberUtils.toPercentage(
                                regionalAverage[city.continent][latestYear][
                                row.property
                                ]
                              ))}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontSize: '1rem',
                          minWidth: smallScreen ? 'unset' : '8rem',
                          maxWidth: smallScreen ? '2rem' : 'unset',
                          // color: '#C9CDD0',
                          // opacity: 0.3,
                          // fontWeight: 'bold',
                        }}
                        component="th"
                        scope="row"
                      >
                        {globalAverage &&
                          globalAverage[latestYear] &&
                          (row.key === 'health'
                            ? NumberUtils.toFixed(
                              globalAverage[latestYear][row.property],
                              2
                            )
                            : row.key === 'capita'
                              ? `${NumberUtils.toFixed(
                                globalAverage[latestYear][row.property],
                                1
                              )} m²`
                              : NumberUtils.toPercentage(
                                globalAverage[latestYear][row.property]
                              ))}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontSize: '1rem',
                          minWidth: smallScreen ? 'unset' : '8rem',
                          maxWidth: smallScreen ? '2rem' : 'unset',
                          // color: '#C9CDD0',
                          // opacity: 0.3,
                          // fontWeight: 'bold',
                        }}
                        component="th"
                        scope="row"
                      >
                        {climateZone &&
                          climateZone[city.categ_latzones] &&
                          (row.key === 'health'
                            ? NumberUtils.toFixed(
                              climateZone[city.categ_latzones][latestYear][
                              row.property
                              ],
                              2
                            )
                            : row.key === 'capita'
                              ? `${NumberUtils.toFixed(
                                climateZone[city.categ_latzones][latestYear][
                                row.property
                                ],
                                1
                              )} m²`
                              : NumberUtils.toPercentage(
                                climateZone[city.categ_latzones][latestYear][
                                row.property
                                ]
                              ))}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          fontSize: '1rem',
                          minWidth: smallScreen ? 'unset' : '8rem',
                          maxWidth: smallScreen ? '2rem' : 'unset',
                          // color: '#C9CDD0',
                          // opacity: 0.3,
                          // fontWeight: 'bold',
                        }}
                        component="th"
                        scope="row"
                      >
                        {populationCategory &&
                          populationCategory[city.categ_population] &&
                          (row.key === 'health'
                            ? NumberUtils.toFixed(
                              populationCategory[city.categ_population][latestYear][
                              row.property
                              ],
                              2
                            )
                            : row.key === 'capita'
                              ? `${NumberUtils.toFixed(
                                populationCategory[city.categ_population][latestYear][
                                row.property
                                ],
                                1
                              )} m²`
                              : NumberUtils.toPercentage(
                                populationCategory[city.categ_population][latestYear][
                                row.property
                                ]
                              ))}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div >
    </div >
  );
};

export default CategoriesSummary;
