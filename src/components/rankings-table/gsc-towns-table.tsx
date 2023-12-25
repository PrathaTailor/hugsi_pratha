import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import HSBar from 'react-horizontal-stacked-bar-chart';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { City, GCC_PAGINATION_COUNT } from '../../models';
import MunicipalityLink from '../link/municipality-link';
import { rankingInWordWithNumber } from '../../utils/city-utils';
import GSCTableHead from './gsc-table-head';
import EnhancedTableToolbar from './enhanced-table-toolbar';
import CityLink from 'components/link/city-link';
import useCities from '../../hooks/cities';
import Pagination from '@material-ui/lab/Pagination';
import { StyledTableCell, StyledTableRow } from './enhanced-table-misc';
import * as NumberUtils from '../../utils/number-utils';
import { ThemeProvider } from '@material-ui/styles';
import { Tabs, AppBar, Tab, createTheme } from '@material-ui/core';
export type Order = 'asc' | 'desc';

interface HeadRow {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
  isDefaultSorting?: boolean;
  tooltip?: object;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, getComparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = getComparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
const headRows: HeadRow[] = [
  {
    id: 'index_ranking',
    numeric: false,
    disablePadding: false,
    label: 'Ranking',
    // isDefaultSorting: true,

  },
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Town name',
    // isDefaultSorting: false,
  },
  {
    id: 'municipalityId',
    numeric: false,
    disablePadding: false,
    label: 'Municipality',
    // isDefaultSorting: true,
  },
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
    },
    paper: {
      width: '100%',
    },
    table: {
      minWidth: 750,
    },
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
    actions: {
      marginLeft: 80,
    },
    paginationButtons: {
      color: 'red',
      '.& .MuiTablePagination-toolbar': {
        color: 'green',
      },
      '& .MuiTablePagination-actions': {
        color: 'blue',
        '& .MuiIconButton-root .Mui-disabled': {
          color: 'red',
        },
      },
    },
    MuiButtonBase: {
      // The default props to change
      color: 'blue',
    },
    mainAppBar: {
      background: 'transparent',
      boxShadow: 'none',
      textTransform: 'none',
      margin: '1.5rem 0rem',
      padding: '0rem',
    },
    smallMainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      backgroundImage:
        'linear-gradient(to left right, rgba(0, 0, 0, 0.1), transparent)',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#293845',
      width: '7rem',
    },
    unselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1.1rem',
      // width: '14.2rem',
      width: '11rem',
      backgroundImage:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
    smallUnselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1rem',
      width: '6rem',
      backgroundImage:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
    mainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      backgroundImage:
        'linear-gradient(to left right, rgba(0, 0, 0, 0.1), transparent)',
      textTransform: 'none',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#293845',
    },
    paginationColor: {
      color: '#000',
    },
    paginator: {
      margin: '4rem 0',
      maxHeight: '3rem',
      fontWeight: 'bold',
      borderRadius: '8px',
      padding: '7px 21px',
      fontSize: '0.9375rem'
    },
    paginationCss: {
      '& .Mui-selected': {
        backgroundColor: 'primary !important',
        color: '#fff !important',
      },
      '& ul > li > button:not(.Mui-selected)': {
        backgroundColor: 'transparent',
        color: '#99c93c',
        border: '0.1rem solid #99c93c',
      },
      '& ul > li > div': {
        color: '#99c93c',
      }
    }
  })
);

const sortTowns = (towns: any, orderBy: any, order: Order) => {
  if (order === 'desc') {
    return stableSort(towns, (a, b) => {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    });
  }
  return stableSort(towns, (a, b) => {
    return a[orderBy] > b[orderBy] ? 1 : -1;
  });
};


const sliceCities = (towns: any, page: number, rowsPerPage: number) => {
  const start = page * rowsPerPage;
  const end = page * rowsPerPage + rowsPerPage;

  return towns.slice(start, end);
};

export type UseStyles = ReturnType<typeof useStyles>;

interface Props {
  towns: any;
}

/**
 * GSC Table component
 * @param towns - list of cities
 */
const GSCTable: React.FC<Props> = () => {
  const classes = useStyles({});
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('index_ranking');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(
    GCC_PAGINATION_COUNT
  );
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [sortedCities, setSortedCities] = React.useState<any>([]);
  const [visibleCities, setVisibleCities] = React.useState<any>([]);
  const rankingHeaderRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 120);
  const executeScroll = () => scrollToRef(rankingHeaderRef);
  const { cityStore } = useCities();
  const { towns } = cityStore?.municipalities || {};
  const [value, setValue] = React.useState(0);
  const defaultCategory = 'city';
  // const [displayCategory, setDisplayCategory] = React.useState(defaultCategory);
  // const [displayTowns, setDisplayTowns] = React.useState(
  //   towns?.filter(t => t.category === defaultCategory)
  // );
  const arrangedCities = towns
    ?.filter(t => t.category === defaultCategory && t.town_ranking !== 0)
    .sort((a, b) => (a.town_ranking > b.town_ranking ? 1 : -1))
    .concat(
      towns.filter(t => t.category === defaultCategory && t.town_ranking === 0)
    );
  const [displayTowns, setDisplayTowns] = React.useState(arrangedCities);
  const townsSortedByRank = useMemo(
    () => sortTowns(arrangedCities, 'town_ranking', 'asc'),
    [towns]
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof City
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = towns.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChange = (event, newValue) => {
    setOrderBy('index_ranking');
    setOrder('asc');
    if (value !== newValue) {
      setValue(newValue);
      if (newValue === 0) {
        const cityTowns = towns.filter(t => t.category === 'city');
        const sortedCityTowns = cityTowns
          .filter(t => t.town_ranking !== 0)
          .sort((a, b) => (a.town_ranking > b.town_ranking ? 1 : -1))
          .concat(cityTowns.filter(t => t.town_ranking === 0));
        setDisplayTowns(sortedCityTowns);
      } else {
        const villageTowns = towns.filter(t => t.category === 'village');
        const sortedVillageTowns = villageTowns
          .filter(t => t.town_ranking !== 0)
          .sort((a, b) => (a.town_ranking > b.town_ranking ? 1 : -1))
          .concat(villageTowns.filter(t => t.town_ranking === 0));
        setDisplayTowns(sortedVillageTowns);

      }
      setPage(0);
    }
  };
  useEffect(() => {
    if (orderBy === 'town_ranking') {
      const nonMunicipalityCities = towns.filter(
        c => c.town_ranking !== 0
      );
      const newSortedCities = sortTowns(
        nonMunicipalityCities.slice(),
        orderBy,
        order
      );
      const clubbedCities = [
        ...newSortedCities,
        ...towns.filter(c => c.index_ranking !== 0),
      ];
      setSortedCities(clubbedCities);
    }
    setPage(0);
  }, [towns, orderBy, order]);
  // Sort cities when cities, orderBy or order changes
  // useEffect(() => {
  //   setSortedCities(displayTowns?.slice());
  //   setPage(0);
  //   if (typeof towns === 'object') {
  //     // setTownList(sampleMun);
  //   }
  // }, [towns]);


  // Slice cities to show cities on certain page
  // when sortedCities, page or rowsPerPage change
  useEffect(() => {
    const slicedCities = sliceCities(displayTowns, page, rowsPerPage);
    setVisibleCities(slicedCities);
  }, [displayTowns, page, rowsPerPage]);

  const getCityId = row => {
    return row.gccMunicipalityName;
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const getNumberOfPageButtons = (totalCities, visibleCities) => {
    const a = Math.trunc(totalCities / GCC_PAGINATION_COUNT);
    const ans = totalCities % GCC_PAGINATION_COUNT === 0 ? a : a + 1;
    return ans;
  };

  const handlePageRedirect = (event, value) => {
    setPage(value - 1);
    executeScroll();
  };

  return (
    <div style={{ background: '#fff' }}>
      <div
        style={{
          background: 'transparent',
          overflow: 'auto',
          width: '100%',
          padding: '0 2em',
        }}
      >
        <div className={classes.root}>
          <Paper className={classes.paper}>
            {/* <EnhancedTableToolbar handleMapViewClick={towns} numSelected={selected.length} type="gsc" /> */}
            <AppBar position="static" className={classes.mainAppBar}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab
                  label="Cities"
                  {...a11yProps(0)}
                  className={
                    value === 0
                      ? smallScreen
                        ? classes.smallMainTab
                        : classes.mainTab
                      : smallScreen
                        ? classes.smallUnselectedTab
                        : classes.unselectedTab
                  }
                  style={{
                    width:
                      value === 0
                        ? smallScreen
                          ? '7rem'
                          : '14.2rem'
                        : smallScreen
                          ? '6rem'
                          : '14.2rem',
                    fontSize: '1.1rem',
                  }}
                />
                <Tab
                  label="Villages"
                  {...a11yProps(1)}
                  className={
                    value === 1
                      ? smallScreen
                        ? classes.smallMainTab
                        : classes.mainTab
                      : smallScreen
                        ? classes.smallUnselectedTab
                        : classes.unselectedTab
                  }
                  style={{
                    width:
                      value === 1
                        ? smallScreen
                          ? '7rem'
                          : '14.2rem'
                        : smallScreen
                          ? '6rem'
                          : '14.2rem',
                    fontSize: '1.1rem',
                  }}
                />
              </Tabs>
            </AppBar>
            <div className={classes.tableWrapper} ref={rankingHeaderRef}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <GSCTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={sortedCities?.length}
                  headRows={headRows}
                />
                <TableBody>
                  {stableSort(displayTowns, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <StyledTableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.plaatsnaamnr}
                        // key={`${row.category}-${row.plaatsnaamnr}`}
                        >
                          <StyledTableCell
                            style={{ fontSize: '1em', color: '#424242' }}
                          >
                            <Box style={{ fontSize: '1.2rem' }}>
                              {row.town_ranking || '-'}
                              {/* {rowIndex + 1} */}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell style={{ fontSize: '1em' }}>
                            <>
                              <Box {...box} style={{ color: '#698d29' }}>
                                {row.gccMunicipalityName ? (
                                  <CityLink
                                    cityId={getCityId(row)}
                                    municipalityId={row.id}
                                  >
                                    {' '}
                                    {row.id}{' '}
                                  </CityLink>
                                ) : (
                                  <MunicipalityLink municipality={row}>
                                    {' '}
                                    {row.id}{' '}
                                  </MunicipalityLink>
                                )}
                              </Box>
                            </>
                            {/* </MunicipalityLink> */}
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ fontSize: '1em', color: '#424242' }}
                          >
                            {/* <MunicipalityLink municipalityId={row}> */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <Box
                                style={{ color: '#424242', fontSize: '1.2rem' }}
                              >
                                {row.municipalityId}
                              </Box>
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
            {displayTowns.length > GCC_PAGINATION_COUNT && (
              <Box
                style={{
                  display: 'flex',
                  width: '100%',
                  marginTop: '10px',
                  justifyContent: 'center',
                }}
              >
                <Pagination
                  count={getNumberOfPageButtons(
                    displayTowns.length,
                    visibleCities
                  )}
                  page={page + 1}
                  onChange={handlePageRedirect}
                  defaultPage={1}
                  color="primary"
                  size="large"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  className={classes.paginationCss}
                />
              </Box>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default GSCTable;