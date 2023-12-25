import React, { useEffect, useState } from 'react';
import {
  AppBar, Typography, Checkbox, Tab, Tabs,
  useMediaQuery, Select, MenuItem, makeStyles
} from '@material-ui/core';
import useCities from '../../hooks/cities';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import Box from '@material-ui/core/Box';
import { KPI_LIST } from 'models';
import { useStyles } from './style';
import { ExpandMore } from '@material-ui/icons';

interface Props {
  city: any;
  kpiAverage: any;

}
/**
 * Yearly Development component
 * @param cityId - the city
 */
const YearlyDevelopment: React.FC<Props> = ({ city, kpiAverage}) => {
  const {
    mainTab,
    smallMainTab,
    unselectedTab,
    smallUnselectedTab,
    box
  } = useStyles({});
  // console.log(city,"^^^^");
  
  const { cityStore } = useCities();
  const [subValue, setSubValue] = React.useState(0);
  const allYearsData = cityStore.getAllYearsData(city.id);
  const [isGlobalGraphEnabled, setGlobalGraphEnabled] = useState(false);
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [isRegionalGraphEnabled, setRegionalGraphEnabled] = useState(false);
  const [isClimateGraphEnabled, setClimateGraphEnabled] = useState(false);
  const [isPopulationGraphEnabled, setPopulationGraphEnabled] = useState(false);
  const [maxYear, setMaxYear]: any = useState([]);
  const [kpiVal, setKpiVal] = useState(KPI_LIST[0].value);
  const [kpiKeyVal, setKpiKeyVal] = useState(KPI_LIST[0].key);
  // console.log(kpiAverage, "+++");
  const getKpiYearlyData = () => {
    const kpiPerformance = allYearsData.map((yearData, yearIndex) => {
      // console.log(yearData, "%%%5");
      
      const getDataPoint = yearData => {
        switch (kpiKeyVal) {
          case 'percentage':
            return {
              key: 'total_green_space_percentage',
              scale: 100,
            };
          case 'health':
            return {
              key: 'ndvi_vegetation',
              scale: 1,
            };
          case 'capita':
            return {
              key: 'green_per_capita',
              scale: 1,
            };
          case 'distribution':
            return {
              key: 'grid_median_vegetation',
              scale: 100,
            };
          case 'trees':
            return {
              key: 'treecanopycover_percentage',
              scale: 100,
            };
          case 'grass':
            return {
              key: 'grasscover_percentage',
              scale: 100,
            };
          default:
            return {
              key: '',
              scale: 0,
            };
        }
      };

      if (yearData[getDataPoint(yearData)?.key]) {
        return {
          name: yearData?.year,
          uv:
            yearData[getDataPoint(yearData)?.key] * getDataPoint(yearData)?.scale,
          regAvg:
            kpiAverage?.regional[city?.continent][yearData?.year][
            getDataPoint(yearData)?.key
            ] * getDataPoint(yearData)?.scale,
          globAvg:
            kpiAverage?.global[yearData?.year][getDataPoint(yearData)?.key] *
            getDataPoint(yearData)?.scale,
          climateZones:
            kpiAverage?.climate_zones[city?.categ_latzones][yearData?.year]
            [getDataPoint(yearData)?.key] *
            getDataPoint(yearData)?.scale,
          populationCategory:
            kpiAverage?.population_category[city?.categ_population][yearData?.year]
            [getDataPoint(yearData)?.key] *
            getDataPoint(yearData)?.scale,
        };
      }
    });
    const availableKpiData = kpiPerformance.filter(
      kpiPerf => kpiPerf !== undefined
    );
    return availableKpiData;
  };
  function a22yProps(index) {
    return {
      id: `simple-subTab-${index}`,
      'aria-controls': `simple-subTabpanel-${index}`,
      textTransform: 'none',
    };
  }
  const handleSubChange = (event, newValue) => {
    setSubValue(newValue);
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

  const getYaxisUnit = () => {
    switch (kpiKeyVal) {
      case 'capita':
        return `m²`;
      case 'health':
        return '';
      default:
        return '%';
    }
  };
  useEffect(() => {
    allYearsData && allYearsData.find((item: any) => setMaxYear(item.year));
  }, []);

  const handleKpiChange = value => {
    setKpiVal(value);
    const kpiKey = KPI_LIST.find(kpi => kpi.value === value).key;
    setKpiKeyVal(kpiKey);
  };

  return (
    <>
      <Box>
        <AppBar
          position="relative"
          style={{
            backgroundColor: '#fff',
            boxShadow: 'none',
          }}
        >
          <Tabs
            onChange={handleSubChange}
            value={subValue}
            aria-label="simple subTab example"
            TabIndicatorProps={{
              style: {
                background: 'rgb(153, 201, 60)',
                height: '3px',
              },
            }}
          >
            <Tab
              label="All"
              {...a22yProps(0)}
              className={
                subValue === 0
                  ? smallScreen
                    ? smallMainTab
                    : mainTab
                  : smallScreen
                    ? smallUnselectedTab
                    : unselectedTab
              }
              style={{
                // width: city.gcc.isGccCity ? '13.2rem' : '14rem',
                width:
                  subValue === 0
                    ? smallScreen
                      ? '7rem'
                      : city.gcc.isGccCity
                        ? '13.2rem'
                        : '11.2rem'
                    : smallScreen
                      ? '4rem'
                      : city.gcc.isGccCity
                        ? '11.2rem'
                        : '13.2rem',
                fontSize: '16px',
                border: 'none',
              }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = '';
                }
              }}
            />
            <Tab
              label="Last Year"
              {...a22yProps(1)}
              className={
                subValue === 1
                  ? smallScreen
                    ? smallMainTab
                    : mainTab
                  : smallScreen
                    ? smallUnselectedTab
                    : unselectedTab
              }
              style={{
                width:
                  subValue === 1
                    ? smallScreen
                      ? '7rem'
                      : city.gcc.isGccCity
                        ? '13.2rem'
                        : '11.2rem'
                    : smallScreen
                      ? '4rem'
                      : city.gcc.isGccCity
                        ? '11.2rem'
                        : '13.2rem',
                fontSize: '16px',
                border: 'none',
              }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = '';
                }
              }}
            />
            <Tab
              label="Last 3 Years"
              {...a22yProps(2)}
              className={
                subValue === 2
                  ? smallScreen
                    ? smallMainTab
                    : mainTab
                  : smallScreen
                    ? smallUnselectedTab
                    : unselectedTab
              }
              style={{
                width:
                  subValue === 2
                    ? smallScreen
                      ? '7rem'
                      : city.gcc.isGccCity
                        ? '13.2rem'
                        : '11.2rem'
                    : smallScreen
                      ? '4rem'
                      : city.gcc.isGccCity
                        ? '11.2rem'
                        : '13.2rem',
                fontSize: '16px',
                border: 'none',
              }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = '';
                }
              }}
            />
          </Tabs>
        </AppBar>
      </Box>
      <Box marginTop="1rem">
        <Select
          disableUnderline
          labelId="kpiLabel"
          IconComponent={iconComponent}
          defaultValue={KPI_LIST[0]}
          style={{
            width: smallScreen ? 350 : 400,
            height: '2.8rem',
            border: '1px solid #99c93c',
            borderRadius: '0.2rem',
          }}
          value={kpiVal}
          onChange={event => {
            handleKpiChange(event.target.value);
          }}
        >
          {KPI_LIST.map((kpi, kpiIndex) => (
            <MenuItem
              key={kpiIndex}
              value={kpi.value}
            // classes={{ selected: kpiSelect }}
            >
              <Box style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  style={{
                    width: '1.2rem',
                    height: '1.2rem',
                    margin: smallScreen ? '0 0.5rem' : '0 1rem',
                  }}
                >
                  <img
                    src={require(`../../images/icon-${kpi.key}.png`)}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div>{kpi.value}</div>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        style={{
          fontFamily: 'sans-serif',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '3rem 0 1rem',
        }}
      >
        <TabPanel value={subValue} index={0}>
          <AreaChart
            width={smallScreen ? 380 : 800}
            height={250}
            data={getKpiYearlyData()}
            style={{ borderRadius: 'none' }}
          >
            <XAxis
              dataKey="name"
              padding={{ left: 15, right: 0 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              orientation="right"
              type="number"
              interval="preserveStartEnd"
              unit={getYaxisUnit()}
              padding={{
                top: 0,
                bottom: 0,
              }}
              // axisLine={false}
              // tickLine={false}
              // tickCount={2}
              // domain={[dataMin => dataMin, 'auto']}
              domain={[
                kpiKeyVal === 'health' ? 'dataMin' : dataMin => Math.round(dataMin - 10),
                kpiKeyVal === 'health' ? 'dataMax' : dataMax => Math.round(dataMax + 10),
              ]}
            // domain={['dataMin', 'dataMax']}
            />
            <CartesianGrid
              color="#f4f5f5"
              opacity="0.4"
              vertical={false}
            />
            <Area
              type="monotone"
              dataKey="regAvg"
              stroke="#4872b4"
              strokeWidth={!isRegionalGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="globAvg"
              stroke="#e77f81"
              strokeWidth={!isGlobalGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="climateZones"
              stroke="#e7b17f"
              strokeWidth={!isClimateGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="populationCategory"
              stroke="#7fe7cb"
              strokeWidth={!isPopulationGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#99c93c"
              strokeWidth="2.5"
              fillOpacity={0.3}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </TabPanel>
        <TabPanel value={subValue} index={1}>
          <AreaChart
            width={smallScreen ? 380 : 800}
            height={250}
            data={getKpiYearlyData()}
            style={{ borderRadius: 'none' }}
          >
            <XAxis
              dataKey="name"
              padding={{ left: 15, right: 0 }}
              axisLine={false}
              tickLine={false}
              type="number"
              domain={[minData => maxYear - 1, maxYear]}
              tickCount={2}
            />
            <YAxis
              orientation="right"
              type="number"
              interval="preserveStartEnd"
              unit={getYaxisUnit()}
              padding={{
                top: 0,
                bottom: 0,
              }}
              // axisLine={false}
              // tickLine={false}
              // tickCount={2}
              // domain={['dataMin', 'dataMax']}
              domain={[
                kpiKeyVal === 'health' ? 'dataMin' : dataMin => Math.round(dataMin - 10),
                kpiKeyVal === 'health' ? 'dataMax' : dataMax => Math.round(dataMax + 10),
              ]}
            // domain={[minData => 50,0]}
            />
            <CartesianGrid
              color="#f4f5f5"
              opacity="0.4"
              vertical={false}
            />
            <Area
              type="monotone"
              dataKey="regAvg"
              stroke="#4872b4"
              strokeWidth={!isRegionalGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="globAvg"
              stroke="#e77f81"
              strokeWidth={!isGlobalGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
                   <Area
              type="monotone"
              dataKey="climateZones"
              stroke="#e7b17f"
              strokeWidth={!isClimateGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="populationCategory"
              stroke="#7fe7cb"
              strokeWidth={!isPopulationGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#99c93c"
              strokeWidth="2.5"
              fillOpacity={0.3}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </TabPanel>
        <TabPanel value={subValue} index={2}>
          <AreaChart
            width={smallScreen ? 380 : 800}
            height={250}
            data={getKpiYearlyData()}
            style={{ borderRadius: 'none' }}
          >
            <XAxis
              dataKey="name"
              padding={{ left: 15, right: 0 }}
              axisLine={false}
              tickLine={false}
              type="number"
              domain={[minData => maxYear - 2, maxYear]}
              tickCount={3}
            />

            <YAxis
              orientation="right"
              type="number"
              interval="preserveStartEnd"
              unit={getYaxisUnit()}
              padding={{
                top: 0,
                bottom: 0,
              }}
              // axisLine={false}
              // tickLine={false}
              // tickCount={2}
              domain={[
                kpiKeyVal === 'health' ? 'dataMin' : dataMin => Math.round(dataMin - 10),
                kpiKeyVal === 'health' ? 'dataMax' : dataMax => Math.round(dataMax + 10),
              ]}

            // domain={['dataMin', 'dataMax']}
            // domain={['dataMin => Math.round(dataMin - 5)', 'auto']}
            />
            <CartesianGrid
              color="#f4f5f5"
              opacity="0.4"
              vertical={false}
            />
            <Area
              type="monotone"
              dataKey="regAvg"
              stroke="#4872b4"
              strokeWidth={!isRegionalGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="globAvg"
              stroke="#e77f81"
              strokeWidth={!isGlobalGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
                   <Area
              type="monotone"
              dataKey="climateZones"
              stroke="#e7b17f"
              strokeWidth={!isClimateGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="populationCategory"
              stroke="#7fe7cb"
              strokeWidth={!isPopulationGraphEnabled ? '2' : '0'}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#99c93c"
              strokeWidth="2.5"
              fillOpacity={0.3}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </TabPanel>
      </Box>
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: smallScreen ? 'unset' : '24rem 24rem',
        }}
      >
        <Box className={box}>
          <Checkbox
            style={{ color: '#4872b4' }}
            checked={!isRegionalGraphEnabled}
            onChange={() => {
              setRegionalGraphEnabled(!isRegionalGraphEnabled);
            }}
          ></Checkbox>
          <Box
            style={{
              alignSelf: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setRegionalGraphEnabled(!isRegionalGraphEnabled);
            }}
          >
            <Typography style={{ margin: 'auto 0' }}>
              Regional average
            </Typography>
          </Box>
        </Box>
        <Box className={box}>
          <Checkbox
            style={{ color: '#e77f81' }}
            checked={!isGlobalGraphEnabled}
            onChange={() => {
              setGlobalGraphEnabled(!isGlobalGraphEnabled);
            }}
          ></Checkbox>
          <Box
            style={{
              alignSelf: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setGlobalGraphEnabled(!isGlobalGraphEnabled);
            }}
          >
            <Typography style={{ margin: 'auto 0' }}>
              Global average
            </Typography>
          </Box>
        </Box>
        <Box className={box}>
          <Checkbox
          style={{ color:'#e7b17f' }}
          checked={!isClimateGraphEnabled}
          onChange={() => {
            setClimateGraphEnabled(!isClimateGraphEnabled);
          }}></Checkbox>
           <Box
            style={{
              alignSelf: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setClimateGraphEnabled(!isClimateGraphEnabled);
            }}
          >
            <Typography style={{ margin: 'auto 0' }}>
              Climate Zones
            </Typography>
          </Box>
        </Box>
        <Box className={box}>
          <Checkbox
            style={{ color: '#7fe7cb' }}
            checked={!isPopulationGraphEnabled}
            onChange={() => {
              setPopulationGraphEnabled(!isPopulationGraphEnabled);
            }}
          ></Checkbox>
          <Box
            style={{
              alignSelf: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setPopulationGraphEnabled(!isPopulationGraphEnabled);
            }}
          >
            <Typography style={{ margin: 'auto 0' }}>
              Population
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
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
export default YearlyDevelopment;
