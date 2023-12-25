import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import {
  City,
  PAGINATION_COUNT,
  AverageKPI,
  FAV_CITIES_MAX_COUNT,
  CLASS_LIST,
  CLASS_CHANGE_LIST,
} from '../../models';
import CityLink from '../link/city-link';
import { rankingInWordWithNumber } from '../../utils/city-utils';
import addComma from '../../utils/add-comma';
import * as NumberUtils from '../../utils/number-utils';
import EnhancedTableHead from './enhanced-table-head';
import EnhancedTableToolbar from './enhanced-table-toolbar';
import useCities from '../../hooks/cities';
import { StyledTableCell, StyledTableRow } from './enhanced-table-misc';
// @ts-ignore
import iconCommonClass from '../../images/icon-common-class.png';
// @ts-ignore
import iconCommonChange from '../../images/icon-common-change.png';
// @ts-ignore
import iconPopulationChange from '../../images/icon-population.png';
// @ts-ignore
import iconAreaChange from '../../images/icon-area.png';
import Pagination from '@material-ui/lab/Pagination';
import { IconBullet, IconBulletWrapper } from '../icon-bullets';
// @ts-ignore
import iconPercentage from '../../images/icon-percentage.png';
// @ts-ignore
import iconGrass from '../../images/icon-grass.png';
// @ts-ignore
import iconCapita from '../../images/icon-capita.png';
// @ts-ignore
import iconHealth from '../../images/icon-health.png';
// @ts-ignore
import iconTrees from '../../images/icon-trees.png';
import BarGauge from '../bar-chart/bar-chart';

export type Order = 'asc' | 'desc';

interface HeadRow {
  disablePadding: boolean;
  id: keyof City;
  label: string;
  numeric: boolean;
  isDefaultSorting?: boolean;
  tooltip?: object;
}

function stableSort(array: any[], cmp: (a: any, b: any) => number) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;

    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headRows: HeadRow[] = [
  {
    id: 'index_ranking',
    numeric: false,
    disablePadding: true,
    label: 'Place',
    isDefaultSorting: true,
  },
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'country',
    numeric: false,
    disablePadding: false,
    label: 'Country',
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
      background: 'transparent',
    },
    paper: {
      width: '100%',
      background: 'transparent',
      boxShadow: 'none'
    },
    table: {
      minWidth: '100%',
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    smallTable: {},
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
      },
      '& ul': {
        marginBottom: '10vh',
        marginTop: '2vh',
      },
    },
    MuiButtonBase: {
      // The default props to change
      color: 'blue',
    },
    RankingLabel: {
      margin: '1rem 3rem 1rem 0rem',
      color: '#99c93c',
      fontSize: '1.2rem',
    },
    DisplayInLine: {
      display: 'inline-flex',
      // borderBottom: '1px solid rgba(224, 224, 224, 1)',
      width: '100%',
    },
    TopCity: {
      margin: '1rem 10rem 1rem 0rem',
      color: 'rgb(105, 141, 41)',
    },
    AllCity: {
      marginLeft: '4rem 4rem 4rem 4rem',
    },
    SingleCity: {
      margin: '2rem 1rem 0rem 0rem',
    },
    demographicGrid: {
      fontSize: '1.25rem',
      display: 'grid',
      gridTemplateColumns: '18rem 18rem',
      gridGap: '0.3rem',
      margin: '40px 0',
    },
    smallDemographicGrid: {
      fontSize: '0.5rem',
      gridTemplateColumns: '1fr 1.2fr',
      gridGap: '1rem',
    },
    descriptionLayout: {
      color: '#293845',
      lineHeight: '27px',
      fontSize: '16px',
    },
  })
);

const sortCities = (cities: City[], orderBy: keyof City, order: Order) => {
  const newOrderBy = orderBy === 'green_grade' ? 'green_score' : orderBy;
  if (order === 'desc') {
    return stableSort(cities, (a, b) => {
      return a[newOrderBy] > b[newOrderBy] ? -1 : 1;
    });
  }
  return stableSort(cities, (a, b) => {
    return a[newOrderBy] > b[newOrderBy] ? 1 : -1;
  });
};

const sliceCities = (
  cities: City[],
  page: number,
  rowsPerPage: number,
  tags: string
) => {
  const start = page * rowsPerPage;
  const end = page * rowsPerPage + rowsPerPage;

  return cities?.slice(start, end);
};

export type UseStyles = ReturnType<typeof useStyles>;

interface Props {
  cities: City[];
  drawerOption: boolean | null;
  allCity: boolean | null;
  handleMapViewClick: any;
  tags: string;
  filterParams : any;
}

interface CategoriesSummaryHeadRow {
  disablePadding: boolean;
  id: string;
  label: string;
  tooltip?: any;
}

/**
 * Rankings Table component
 * @param cities - list of cities
 */
const RankingsTable: React.FC<Props> = ({
  cities,
  drawerOption,
  allCity,
  handleMapViewClick,
  tags,
  filterParams
}) => {


  const classes = useStyles({});
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof City>(
    headRows.find(s => s.isDefaultSorting).id
  );
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(15);
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [sortedCities, setSortedCities] = React.useState<City[]>([]);
  const [visibleCities, setVisibleCities] = React.useState<City[]>([]);
  const rankingHeaderRef = useRef(null);
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop - 120);
  const executeScroll = () => scrollToRef(rankingHeaderRef);

  const { cityStore } = useCities();
  const [classDistributionData, setClassDistributionData] = useState({});
  const [kpiData, setKpiData] = useState({});
  // console.log('WorldDistributionData',cityStore?.worldDistributionMap.world[0]?.world_values);
  // console.log('KPIDATA', cityStore?.worldKpiDataMap.world[0]?.world_kpis);
  

  
  const citiesSortedByRank = useMemo(
    () =>
      sortCities(
        cities.filter(c => c.index_ranking !== null),
        'index_ranking',
        'asc'
      ),
    [cities]
  );

  const getCityRelativeRanking = useCallback(
    (cityId: string) =>
      citiesSortedByRank.findIndex(city => city.id === cityId) + 1,
    [citiesSortedByRank]
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
      const newSelecteds = cities.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handlePageRedirect = (event, value) => {
    setPage(value - 1);
    executeScroll();
  };

  const contData = cityStore?.categoryDistributionMap?.region.find(data => 
    data.continent === filterParams?.region ? data?.values : '');
  const categoryKpi = cityStore?.categoryKpiDataMap?.region.find(item => 
    item.continent === filterParams?.region ? item?.values : '');
  // console.log(filterParams.filter); 
  useEffect(() => {
    if(filterParams?.region === 'All'){
      if(filterParams?.mapView === 'terains' && filterParams?.filter !== 'All' ){
        const latzoneData = cityStore?.categoryDistributionMap?.latzone.find(data => 
          data.latzone_category === filterParams?.filter);
        const latzoneKpiData = cityStore?.categoryKpiDataMap?.latzone.find(data => 
          data.latzone_category === filterParams?.filter);
        setClassDistributionData(latzoneData.values); 
        setKpiData( latzoneKpiData.values); 

      }else if(filterParams?.mapView === 'population' && filterParams?.filter !== 'All' ){
        const populationData = cityStore?.categoryDistributionMap?.population.find(data => 
          data.population_category === filterParams?.filter);
        const populationKpiData = cityStore?.categoryKpiDataMap?.population.find(data => 
          data.population_category === filterParams?.filter);
        setClassDistributionData(populationData.values );
        setKpiData(populationKpiData.values);

      }else{
        setClassDistributionData(cityStore?.worldDistributionMap.world[0]?.world_values);
        setKpiData( cityStore?.worldKpiDataMap?.world[0]?.world_kpis);
      }
    }else{
      setClassDistributionData(contData?.values);
      setKpiData(categoryKpi?.values);
    }
  }, [filterParams]);
 

  useEffect(() => {
    if (orderBy === 'index_ranking') {
      const nonMunicipalityCities = cities.filter(
        c => c.index_ranking !== null
      );
      const newSortedCities = sortCities(
        nonMunicipalityCities.slice(),
        orderBy,
        order
      );
      const clubbedCities = [
        ...newSortedCities,
        ...cities.filter(c => c.index_ranking === null),
      ];
      const taggedCities =
        tags !== ''
          ? clubbedCities.filter(item => {
              return item[tags] === 1;
            })
          : clubbedCities;

      // console.log(taggedCities);
      setSortedCities(taggedCities);
    } else {
      const newSortedCities = sortCities(cities.slice(), orderBy, order);
      setSortedCities(newSortedCities);
    }

    setPage(0);
  }, [cities, orderBy, order, tags]);

  // Slice cities to show cities on certain page
  // when sortedCities, page or rowsPerPage change
  useEffect(() => {
    const slicedCities = sliceCities(sortedCities, page, rowsPerPage, tags);
    setVisibleCities(slicedCities);
  }, [sortedCities, page, rowsPerPage, tags]);

  const getNumberOfPageButtons = (totalCities, visibleCities) => {
    const a = Math.ceil(totalCities / PAGINATION_COUNT);
    // const ans = totalCities % PAGINATION_COUNT === 0 ? a + 1 : a;
    // console.log(a, visibleCities, "+++++++", totalCities, "sdfds", PAGINATION_COUNT);
    return a;
  };

  const topFiveCity = sortedCities.slice(0, 5);
  return (
    <div
      style={{
        background: 'transparent',
        overflow: 'auto',
        width: '100%',
        padding: '0 2em',
        marginTop: '5px',
      }}
    >
      {/* <div className={allCity ? classes.AllCity : classes.SingleCity}> */}
      {drawerOption ? (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              handleMapViewClick
              numSelected={selected.length}
              type="hugsi"
            />
            <div className={classes.tableWrapper} ref={rankingHeaderRef}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={sortedCities.length}
                  headRows={headRows}
                />
                <TableBody>
                  {visibleCities.map(row => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <StyledTableCell style={{ fontSize: '1em' }}>
                          <CityLink
                            cityId={row.id}
                            // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                          >
                            <Box {...box}>
                              {row.index_ranking
                                ? rankingInWordWithNumber(
                                    getCityRelativeRanking(row.id)
                                  )
                                : `-`}
                            </Box>
                          </CityLink>
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ fontSize: '1rem' }}
                          component="th"
                          scope="row"
                        >
                          <CityLink
                            cityId={row.id}
                            // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                          >
                            <Box {...box} style={{ color: '#698d29' }}>
                              {row.id}
                            </Box>
                          </CityLink>
                        </StyledTableCell>
                        <StyledTableCell style={{ fontSize: '1em' }}>
                          <CityLink
                            cityId={row.id}
                            // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
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
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {sortedCities.length >= PAGINATION_COUNT && (
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
                      sortedCities.length,
                      sortedCities
                    )}
                    page={page + 1}
                    onChange={handlePageRedirect}
                    // defaultPage={1}
                    color="primary"
                    size="large"
                    shape="rounded"
                    className={classes.paginationCss}
                  />
                </Box>
              )}
            </div>
          </Paper>
        </div>
      ) : (
        <Box>
          <EnhancedTableToolbar
            numSelected={selected.length}
            type="category"
            handleMapViewClick={handleMapViewClick}
          />
          {topFiveCity.length > 0 && (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <div
                  className={classes.tableWrapper}
                  style={{ fontWeight: 'bold' }}
                >
                  {topFiveCity.length > 0 && (
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <div
                          className={classes.tableWrapper}
                          style={{ fontWeight: 'bold' }}
                        >
                          {topFiveCity.map((row, index) => {
                            return (
                              <div className={classes.DisplayInLine}>
                                <div className={classes.RankingLabel}>
                                  {row.index_ranking &&
                                    rankingInWordWithNumber(
                                      getCityRelativeRanking(row.id)
                                    )}
                                </div>
                                <div className={classes.TopCity}>
                                  <CityLink
                                    cityId={row.id}
                                    // municipalityId={row.gcc.isGccCity ? Object.keys(row.gcc.towns)[0] : null}
                                  >
                                    {row.id}
                                  </CityLink>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Paper>
                    </div>
                  )}
                </div>

                <Box
                  style={{
                    display: 'flex',
                  }}
                  className={
                    smallScreen
                      ? classes?.smallDemographicGrid
                      : classes?.demographicGrid
                  }
                >
                  <IconBulletWrapper
                    style={{
                      display: 'flex',
                      width: '100%',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                    pageId={smallScreen ? '' : 'city'}
                  >  
                    <IconBullet
                      iconName={iconAreaChange}
                      title="Urban area size"
                      content={`${addComma(Math.round(classDistributionData?.avg_total_area_size) 
                      )} km²`}
                      infoToolTipTitle={'Urban Area'}
                      infoToolTipDetails={`Urban area boundaries in HUGSI are defined based on
                                    OSM Boundaries dataset provided by Open Street Map.
                                    Population data from Global Human Settlement Layer (GHS-POP) is used to
                                    adjust city boundaries so we only take into consideration urban areas
                                    where citizens actually reside.`}
                      link={'https://hugsi.green/about'}
                      anchorText={'Read more'}
                      sizeVariant={smallScreen ? 'small' : 'small'}
                      style={{ width: '100%' }}
                    />
                    <IconBullet
                      iconName={iconPopulationChange}
                      title="Urban area population"
                      content={`${addComma(classDistributionData?.avg_total_population?.toFixed())} (2021)`}
                      infoToolTipTitle={'Population'}
                      infoToolTipDetails={`Population data is extracted from Global Human Settlement Layer (GHS-POP)
                                  using urban area boundaries as defined in HUGSI.`}
                      link={'https://hugsi.green/about'}
                      anchorText={'Read more'}
                      sizeVariant={smallScreen ? 'small' : 'small'}
                      style={{ width: '100%' }}
                    />
                  </IconBulletWrapper>
                </Box>
                <BarGauge
                  treecanopycoverPercentage={classDistributionData?.avg_treecanopycover_percentage }
                  grasscoverPercentage={classDistributionData?.avg_grasscover_percentage   }
                  watercoverPercentage={classDistributionData?.avg_watercover_percentage }
                  othercoverPercentage={classDistributionData?.avg_othercover_percentage}  
                />

                <Box
                  style={{
                    display: 'flex',
                  }}
                  className={
                    smallScreen
                      ? classes?.smallDemographicGrid
                      : classes?.demographicGrid
                  }
                >
                  <IconBulletWrapper
                    style={{
                      display: 'flex',
                      width: '100%',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                    pageId={smallScreen ? '' : 'city'}
                  >
                    <IconBullet
                      iconName={iconPercentage}
                      title="Average green space"
                      content={NumberUtils.toPercentage(kpiData?.avg_total_green_space_percentage)}
                      infoToolTipTitle="Distribution of urban green space1"
                      infoToolTipDetails="In our approach, the urban area of a city is
                      divided into geographical grids with size of 100m across hexagon.
                      HUGSI measures distribution of green space based on the median
                      percentage of green space across all grids."
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    />
                    <IconBullet
                      iconName={iconCapita}
                      title="Average green capita"
                      content={`${NumberUtils.toFixed(kpiData?.avg_green_per_capita,1)} m²`}
                      infoToolTipTitle="Distribution of urban green space1"
                      infoToolTipDetails="In our approach, the urban area of a city is
                      divided into geographical grids with size of 100m across hexagon.
                      HUGSI measures distribution of green space based on the median
                      percentage of green space across all grids."
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    />
                    <IconBullet
                      iconName={iconHealth}
                      title="Average ndvi vegetation"
                      content={NumberUtils.toPercentage(kpiData?.avg_ndvi_vegetation)}
                      infoToolTipTitle="Distribution of urban green space1"
                      infoToolTipDetails="In our approach, the urban area of a city is
                      divided into geographical grids with size of 100m across hexagon.
                      HUGSI measures distribution of green space based on the median
                      percentage of green space across all grids."
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    />
                    <IconBullet
                      iconName={iconGrass}
                      title="Average grasscover"
                      content={NumberUtils.toPercentage(kpiData?.avg_grasscover_percentage)}
                      infoToolTipTitle="Distribution of urban green space1"
                      infoToolTipDetails="In our approach, the urban area of a city is
                      divided into geographical grids with size of 100m across hexagon.
                      HUGSI measures distribution of green space based on the median
                      percentage of green space across all grids."
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    />

                    <IconBullet
                      iconName={iconTrees}
                      title="Average treecanopycover"
                      content={NumberUtils.toPercentage(kpiData?.avg_treecanopycover_percentage)}
                      infoToolTipTitle="Distribution of urban green space1"
                      infoToolTipDetails="In our approach, the urban area of a city is
                           divided into geographical grids with size of 100m across hexagon.
                           HUGSI measures distribution of green space based on the median
                           percentage of green space across all grids."
                   
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    />
                    <IconBullet
                      iconName={iconHealth}
                      title="Average grid median vegetation"
                      content={NumberUtils.toPercentage(kpiData?.avg_grid_median_vegetation)}
                      infoToolTipTitle="Distribution of urban green space1"
                      infoToolTipDetails="In our approach, the urban area of a city is
                      divided into geographical grids with size of 100m across hexagon.
                      HUGSI measures distribution of green space based on the median
                      percentage of green space across all grids."
                      sizeVariant={smallScreen ? 'small' : 'small'}
                    />
                  </IconBulletWrapper>
                </Box>
              </Paper>
            </div>
          )}
        </Box>
      )}
    </div>
    // </div>
  );
};

export default RankingsTable;
