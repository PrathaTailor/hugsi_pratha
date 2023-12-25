import React, { useState } from 'react';
import StopTwoToneIcon from '@material-ui/icons/StopTwoTone';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import Box from '@material-ui/core/Box';
import { Checkbox } from '@material-ui/core';
import * as MapboxGL from 'mapbox-gl';

interface Props {
  mapInstance: any;
  urlByLocation: any;
}

const MapDrawer: React.FC<Props> = props => {
  const { mapInstance, urlByLocation } = props;
  const locationHash =
    (typeof window !== 'undefined' && window.location.hash) || '';
  const defaultMenu =
    typeof window !== 'undefined' && locationHash?.slice(1)
      ? locationHash.endsWith('/neighborhoods')
        ? 'neighbourMenu'
        : 'rasterMenu'
      : 'classMenu';
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(true);
  const [activeLayer, setActiveLayer] = useState(defaultMenu);
  const [classMenuOpen, setClassMenuOpen] = useState(false);
  const [mapMenuOpen, setMapMenuOpen] = useState(false);
  const [isChangesOpen, setChangesOpen] = useState(false);
  const [amtChangeOpen, setAmtChangeOpen] = useState(false);
  const [changesOption, setChangesOption] = useState(false);
  const [borderMenuOpen, setBorderMenuOpen] = useState(false);
  const [rasterMenuOpen, setRasterMenuOpen] = useState(false);
  const [neighbourMenuOpen, setNeighbourMenuOpen] = useState(false);
  const [commonChangeOpen, setCommonChangeOpen] = useState(false);
  const allAreaTypes = ['Urban', 'Grass', 'Trees', 'Water'];
  const allConversionTypes = ['To Urban', 'To Grass', 'To Trees', 'To Water'];
  const [checked, setChecked] = useState(allAreaTypes);
  const [conversionChecked, setConversionChecked] = useState(
    allConversionTypes
  );
  const [isToUrbanMenuOpen, setToUrbanMenuOpen] = useState(false);
  const [isToGrassMenuOpen, setToGrassMenuOpen] = useState(false);
  const [isToTreesMenuOpen, setToTreesMenuOpen] = useState(false);
  const [isToWaterMenuOpen, setToWaterMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  const geoJsonStyle: MapboxGL.Layer = {
    id: 'geoJsonStyle',
    source: 'city_geojson',
    type: 'line',
    paint: {
      'line-color': '#0098c2',
      'line-width': 0.5,
      'line-opacity': 1,
    },
  };

  const classIndicator: MapboxGL.Layer = {
    id: 'classIndicator',
    source: 'city_geojson',
    type: 'fill',
    paint: {
      'fill-color': [
        'match',
        ['get', 'prediction_2021_majority'],
        'other',
        '#d2d2d2',
        'water',
        '#3466b0',
        'grass',
        '#99c98c',
        'treecanopy',
        '#698d29',
        /* other */ '#ccc',
      ],
    },
  };

  const changeIndicator: MapboxGL.Layer = {
    id: 'changeIndicator',
    source: 'city_geojson',
    type: 'fill',
    paint: {
      'fill-color': [
        'match',
        ['get', 'change_indication'],
        'Positive',
        '#7ed07d',
        'Negative',
        '#fe697a',
        'Neutral',
        '#fbf978',
        /* other */ '#ccc',
      ],
    },
    filter: ['!=', ['get', 'change_indication'], 'No Change'],
  };

  const amountChangeIndicator: MapboxGL.Layer = {
    id: 'amountChangeIndicator',
    source: 'city_geojson',
    type: 'fill',
    paint: {
      'fill-color': [
        'case',

        ['>=', ['get', 'amount_change_percent'], 75],
        '#c11924',
        ['>=', ['get', 'amount_change_percent'], 50],
        '#f65340',
        ['>=', ['get', 'amount_change_percent'], 25],
        '#ff9062',
        ['<=', ['get', 'amount_change_percent'], 24],
        '#ffbe6e',
        '#d2d2d2',
      ],
    },
    filter: ['!=', ['get', 'amount_change_percent'], 0],
  };

  const commonChangeIndicator: MapboxGL.Layer = {
    id: 'commonChangeIndicator',
    source: 'city_geojson',
    type: 'fill',
    paint: {
      'fill-color': [
        'match',
        ['get', 'change_2020_2021_majority'],
        'grass_to_other',
        '#b3b4b7',
        'treecanopy_to_other',
        '#e6e7e8',
        'water_to_other',
        '#808285',

        'grass_to_water',
        '#2b3990',
        'treecanopy_to_water',
        '#2972b9',
        'other_to_water',
        '#27aae1',

        'treecanopy_to_grass',
        '#99d13e',
        'other_to_grass',
        '#f9ed32',
        'water_to_grass',
        '#39b54a',

        'other_to_treecanopy',
        '#fbb040',
        'water_to_treecanopy',
        '#006838',
        'grass_to_treecanopy',
        '#7e8c3c',

        '#698d29',
      ],
    },
    filter: ['!=', ['get', 'change_2020_2021_majority'], 'no change'],
  };

  const handleConversionToggle = (value: string, map: MapboxGL.Map) => () => {
    const currentConversionIndex = conversionChecked.indexOf(value);
    const newConversionChecked = [...conversionChecked];
    if (currentConversionIndex === -1) {
      newConversionChecked.push(value);
    } else {
      newConversionChecked.splice(currentConversionIndex, 1);
    }
    setConversionChecked(newConversionChecked);

    const getConversionCategoryKeys = (conversionCategory: string) => {
      switch (conversionCategory) {
        case 'To Urban':
          return ['grass_to_other', 'treecanopy_to_other', 'water_to_other'];
        case 'To Grass':
          return ['treecanopy_to_grass', 'other_to_grass', 'water_to_grass'];
        case 'To Trees':
          return [
            'other_to_treecanopy',
            'water_to_treecanopy',
            'grass_to_treecanopy',
          ];
        case 'To Water':
          return ['grass_to_water', 'treecanopy_to_water', 'other_to_water'];
      }
    };
    if (newConversionChecked.length > 0) {
      if (newConversionChecked.length === 4) {
        if (map?.getLayer('commonChangeIndicator')) {
          map?.removeLayer('commonChangeIndicator');
        }
        map?.addLayer(commonChangeIndicator);
      } else {
        if (!map?.getLayer('commonChangeIndicator')) {
          map?.addLayer(commonChangeIndicator);
        }
        const checkedConversionKeys = newConversionChecked.map(uc =>
          getConversionCategoryKeys(uc)
        );
        const flattenedKeys = checkedConversionKeys.flat();
        const newFilter = [
          'match',
          ['get', 'change_2020_2021_majority'],
          flattenedKeys,
          true,
          false,
        ];
        map?.setFilter('commonChangeIndicator', newFilter);
      }
    } else {
      removeAvailableLayers(mapInstance);
      setCommonChangeOpen(true);
    }
  };

  const isMenuOpen = (value: string) => {
    switch (value) {
      case 'To Urban':
        return isToUrbanMenuOpen;
      case 'To Grass':
        return isToGrassMenuOpen;
      case 'To Trees':
        return isToTreesMenuOpen;
      case 'To Water':
        return isToWaterMenuOpen;
    }
  };

  const getCategoryColor = category => {
    switch (category) {
      case 'Water':
        return '#3866b0';
      case 'Grass':
        return '#99c93c';
      case 'Trees':
        return '#698d29';
      default:
        return '#c9cdd0';
    }
    return '#c9cdd0';
  };

  const isLayerApplied = (layer: string, map: MapboxGL.Map) =>
    map && map?.getLayer(layer);

  const closeSubMenuOptions = () => {
    if (classMenuOpen) {
      setActiveLayer('classMenu');
      setClassMenuOpen(false);
    }
    if (changesOption) {
      setActiveLayer('changes');
      setChangesOption(false);
    }
    if (amtChangeOpen) {
      setActiveLayer('amtChanges');
      setAmtChangeOpen(false);
    }
    if (commonChangeOpen) {
      setActiveLayer('commonChanges');
      setCommonChangeOpen(false);
    }
    if (borderMenuOpen) {
      setActiveLayer('border');
      setBorderMenuOpen(false);
    }
    if (rasterMenuOpen) {
      setActiveLayer('rasterMenu');
      setRasterMenuOpen(false);
    }
    if (neighbourMenuOpen) {
      setActiveLayer('neighbourMenu');
      setNeighbourMenuOpen(false);
    }
  };
  const handleMapMenuClick = (map: MapboxGL.Map) => {
    activeMenu && setActiveMenu('');

    mapMenuOpen && closeSubMenuOptions();
    !activeMenu && setMapMenuOpen(!mapMenuOpen);
  };

  const handleMenuClick = (map: MapboxGL.Map) => {
    if (
      (activeLayer === 'classMenu' && checked.length === 0) ||
      (activeLayer !== 'classMenu' && !classMenuOpen)
    ) {
      removeAvailableLayers(mapInstance);
      // map?.addLayer(classIndicator);
      setChecked(allAreaTypes);
    }
    activeLayer !== 'classMenu' && setActiveLayer('classMenu');
    setClassMenuOpen(!classMenuOpen);
    !mapMenuOpen && setMapMenuOpen(true);
  };
  const handleAmtChangeMenuClick = (map: MapboxGL.Map) => {
    removeAvailableLayers(mapInstance);
    map?.addLayer(amountChangeIndicator);
    setAmtChangeOpen(!amtChangeOpen);
    setActiveLayer('amtChanges');
    !mapMenuOpen && setMapMenuOpen(true);
  };

  const handleChangesClick = (map: MapboxGL.Map) => {
    if (!changesOption) {
      removeAvailableLayers(mapInstance);
      map?.addLayer(changeIndicator);
    }
    setChangesOption(!changesOption);
    setActiveLayer('changes');
    !mapMenuOpen && setMapMenuOpen(true);
  };

  const handleBorderClick = (map: MapboxGL.Map) => {
    removeAvailableLayers(mapInstance);
    setActiveLayer('border');
    setBorderMenuOpen(!borderMenuOpen);
    !mapMenuOpen && setMapMenuOpen(true);
  };

  const handleVegetationClick = (map: MapboxGL.Map) => {
    removeAvailableLayers(mapInstance);
    setActiveLayer('rasterMenu');
    setRasterMenuOpen(!rasterMenuOpen);
    !mapMenuOpen && setMapMenuOpen(true);
  };

  const handleNeighbourClick = (map: MapboxGL.Map) => {
    removeAvailableLayers(mapInstance);
    setActiveLayer('neighbourMenu');
    setNeighbourMenuOpen(!neighbourMenuOpen);
    !mapMenuOpen && setMapMenuOpen(true);
  };

  const handleTownClick = (map: MapboxGL.Map) => {
    removeAvailableLayers(mapInstance);
    setActiveLayer('rasterMenu');
  };

  const handleCommonChangeClick = (map: MapboxGL.Map) => {
    if (
      (activeLayer === 'commonChanges' && conversionChecked.length === 0) ||
      (activeLayer !== 'commonChanges' && !commonChangeOpen)
    ) {
      removeAvailableLayers(mapInstance);
      map?.addLayer(commonChangeIndicator);
      setConversionChecked(allConversionTypes);
    }
    activeLayer !== 'commonChanges' && setActiveLayer('commonChanges');
    setCommonChangeOpen(!commonChangeOpen);
    !mapMenuOpen && setMapMenuOpen(true);
  };

  const [value, setValue] = React.useState(0);
  const [isAchieved, setIsAchieved] = React.useState(false);
  const [subValue, setSubValue] = React.useState(0);

  const removeAvailableLayers = (map: MapboxGL.Map) => {
    if (map?.getLayer('amountChangeIndicator')) {
      map?.removeLayer('amountChangeIndicator');
    }
    if (map?.getLayer('changeIndicator')) {
      map?.removeLayer('changeIndicator');
    }
    if (map?.getLayer('commonChangeIndicator')) {
      map?.removeLayer('commonChangeIndicator');
    }
    if (map?.getLayer('classIndicator')) {
      map?.removeLayer('classIndicator');
    }

    amtChangeOpen && setAmtChangeOpen(false);
    classMenuOpen && setClassMenuOpen(false);
    borderMenuOpen && setBorderMenuOpen(false);
    changesOption && setChangesOption(false);
    commonChangeOpen && setCommonChangeOpen(false);
  };

  function CollapseCommonChangeMenu(props) {
    const { menuItem } = props;
    const remainingTypes = allConversionTypes.filter(a => a !== menuItem);
    const remainingAreaTypes = remainingTypes.map(r => r.slice(3));
    const conversionColors = {
      'To Urban': {
        Grass: '#b3b4b7',
        Trees: '#e6e7e8',
        Water: '#808285',
      },
      'To Grass': {
        Urban: '#f9ed32',
        Trees: '#99d13e',
        Water: '#39b54a',
      },
      'To Trees': {
        Grass: '#7e8c3c',
        Urban: '#fbb040',
        Water: '#006838',
      },
      'To Water': {
        Grass: '#2b3990',
        Trees: '#2972b9',
        Urban: '#27aae1',
      },
    };
    return (
      <Collapse
        in={isMenuOpen(menuItem)}
        timeout="auto"
        unmountOnExit
        style={{ borderLeft: '8px solid #99c93c' }}
      >
        {remainingAreaTypes.map(r => (
          <ListItem>
            <ListItemIcon
              style={{
                minWidth: '30px',
              }}
            >
              <i
                className="fas fa-square"
                style={{ color: conversionColors[menuItem][r] }}
              ></i>
            </ListItemIcon>
            {r}{' '}
            <i
              className="fas fa-arrow-right"
              style={{ margin: '0 1rem', color: '#c9cdd0' }}
            ></i>
            {menuItem.slice(3)}
          </ListItem>
        ))}
      </Collapse>
    );
  }
  const handleToggle = (value: string, map: MapboxGL.Map) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const getCategoryKey = category => {
      switch (category) {
        case 'Urban':
          return 'other';
        case 'Grass':
          return 'grass';
        case 'Trees':
          return 'treecanopy';
        case 'Water':
          return 'water';
        default:
          return 'other';
      }
    };

    if (newChecked.length > 0) {
      if (!map?.getLayer('classIndicator')) {
        map?.addLayer(classIndicator);
      }
      if (newChecked.length === 4) {
        map?.setFilter('classIndicator', null);
      } else {
        const checkedKeys = newChecked.map(uc => getCategoryKey(uc));
        const newFilter = [
          'match',
          ['get', 'prediction_2021_majority'],
          checkedKeys,
          true,
          false,
        ];
        map?.setFilter('classIndicator', newFilter);
      }
    } else {
      removeAvailableLayers(mapInstance);
      setClassMenuOpen(true);
    }

    setChecked(newChecked);
  };

  const handleConversionExpansion = (value: string) => {
    switch (value) {
      case 'To Urban': {
        setToUrbanMenuOpen(!isToUrbanMenuOpen);
        return;
      }
      case 'To Grass': {
        setToGrassMenuOpen(!isToGrassMenuOpen);
        return;
      }
      case 'To Water': {
        setToWaterMenuOpen(!isToWaterMenuOpen);
        return;
      }
      case 'To Trees': {
        setToTreesMenuOpen(!isToTreesMenuOpen);
        return;
      }
    }
    return;
  };
  return (
    <Box
      style={{
        position: smallScreen ? 'absolute' : 'fixed',

        bottom: smallScreen ? (open ? '18rem' : '5rem') : '2rem',

        width:
          mapMenuOpen ||
            amtChangeOpen ||
            changesOption ||
            borderMenuOpen ||
            commonChangeOpen ||
            classMenuOpen
            ? smallScreen
              ? '14rem'
              : '18rem'
            : '3rem',
        backgroundColor:
          mapMenuOpen ||
            amtChangeOpen ||
            changesOption ||
            borderMenuOpen ||
            commonChangeOpen ||
            classMenuOpen
            ? 'white'
            : '#293845',
        color: mapMenuOpen ? '#293845' : 'unset',
        left: smallScreen ? '0.5rem' : '2rem',
        zIndex: 8,
        borderRadius: '0.5rem',
      }}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {/* Nested List Items */}
          </ListSubheader>
        }
      >
        <ListItem
          button
          onClick={() => {
            handleMapMenuClick(mapInstance);
          }}
        >
          <ListItemIcon style={{ minWidth: '30px' }}>
            <i
              className={
                mapMenuOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right'
              }
              style={{
                color: mapMenuOpen ? '#5f6a74' : 'white',
                margin: '0.2rem',
              }}
            ></i>
          </ListItemIcon>
          {mapMenuOpen && !rasterMenuOpen && (
            <ListItemText
              primary={activeMenu ? 'Back' : ''}
              style={{
                color: '#5f6a74',
              }}
            />
          )}
          <ListItemText
            primary=""
            style={{ margin: smallScreen ? 'unset' : '1rem' }}
          />
          {/* {borderMenuOpen ? <ExpandLess /> : <ExpandMore />} */}
        </ListItem>
        {!activeMenu && (
          <ListItem
            button
            onClick={() => {
              if (
                typeof window !== 'undefined' &&
                window.location.hash?.slice(1)
              ) {
                if (window.location.hash.endsWith('/neighbourhoods')) {
                  if (urlByLocation === '-1') {
                    setActiveMenu('neighbourMenu');
                    handleNeighbourClick(mapInstance);
                  } else {
                    setActiveMenu('rasterMenu');
                    handleVegetationClick(mapInstance);
                  }
                } else {
                  setActiveMenu('rasterMenu');
                  handleVegetationClick(mapInstance);
                }
              } else {
                setActiveMenu('borders');
                handleBorderClick(mapInstance);
              }
            }}
          >
            <ListItemIcon style={{ minWidth: '30px' }}>
              <i
                className="fas fa-info-circle"
                style={{
                  color:
                    activeLayer === 'border'
                      ? '#99c93c'
                      : mapMenuOpen
                        ? '#5f6a74'
                        : 'white',
                  margin: mapMenuOpen ? 'unset' : '0.5rem 0',
                }}
              ></i>
            </ListItemIcon>
            {(mapMenuOpen || rasterMenuOpen) && (
              <ListItemText
                primary={
                  typeof window !== 'undefined' && window.location.hash
                    ? window.location.hash.endsWith('/neighbourhoods')
                      ? urlByLocation === '-1'
                        ? 'Category'
                        : 'Vegetation'
                      : 'Vegetation'
                    : 'Borders'
                }
                style={{
                  color: activeLayer === 'border' ? '#99c93c' : '#5f6a74',
                  fontWeight: activeLayer === 'border' ? 'bold' : 'normal',
                }}
              />
            )}

            {mapMenuOpen && (
              <span>{borderMenuOpen ? <ExpandLess /> : <ExpandMore />}</span>
            )}
          </ListItem>
        )}

        <Collapse
          in={borderMenuOpen}
          timeout="auto"
          unmountOnExit
          style={{ borderLeft: '8px solid #99c93c' }}
        >
          <List component="div" disablePadding style={{}}>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopOutlinedIcon style={{ color: '#0198C2' }} />
              </ListItemIcon>
              <ListItemText primary="HUGSI border" />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#99c93c' }} />
              </ListItemIcon>
              <ListItemText primary="3rd party border" />
            </ListItem>
          </List>
        </Collapse>

        <Collapse
          in={rasterMenuOpen}
          timeout="auto"
          unmountOnExit
          style={{ borderLeft: '8px solid #99c93c' }}
        >
          <List component="div" disablePadding style={{}}>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#657854' }} />
              </ListItemIcon>
              <ListItemText primary="High" />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#7dbb45' }} />
              </ListItemIcon>
              <ListItemText primary="Medium" />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#cbe7b2' }} />
              </ListItemIcon>
              <ListItemText primary="Low" />
            </ListItem>
          </List>
        </Collapse>

        <Collapse
          in={neighbourMenuOpen}
          timeout="auto"
          unmountOnExit
          style={{ borderLeft: '8px solid #99c93c' }}
        >
          <List component="div" disablePadding style={{}}>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#65C080' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  smallScreen
                    ? 'Extreem veel groen (A)'
                    : 'Neighborhood with rating A (extreem groen)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#B6D983' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  smallScreen
                    ? 'Veel groen (B)'
                    : 'Neighborhood with rating B (heel groen)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#F0CF69' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  smallScreen
                    ? 'Redelijk veel groen (C)'
                    : 'Neighborhood with rating C (redelijk groen)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#F8DC29' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  smallScreen
                    ? 'Redelijk groen (D)'
                    : 'Neighborhood with rating D (groen)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#F3C331' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  smallScreen
                    ? 'Weinig groen (E)'
                    : 'Neighborhood with rating E (weinig groen)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#F05646' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  smallScreen
                    ? 'Extreem weinig groen (F)'
                    : 'Neighbourhood with rating F (extreem weinig groen)'
                }
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#E482D6' }} />
              </ListItemIcon>
              <ListItemText primary="Sports area (V)" />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#7030A0' }} />
              </ListItemIcon>
              <ListItemText primary="Cemetery (W)" />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#A4329C' }} />
              </ListItemIcon>
              <ListItemText primary="Business or Industrial area (X)" />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <StopTwoToneIcon style={{ color: '#D631E7' }} />
              </ListItemIcon>
              <ListItemText primary="Other neighborhoods (Z)" />
            </ListItem>
          </List>
        </Collapse>

        {!activeMenu && typeof window !== 'undefined' && !window.location.hash && (
          <ListItem
            button
            onClick={() => {
              if (activeMenu !== 'urbanGreenSpace') {
                setActiveMenu('urbanGreenSpace');
                setChangesOpen(true);
              } else {
                setChangesOpen(!isChangesOpen);
              }
            }}
          >
            <ListItemIcon style={{ minWidth: '30px' }}>
              <i
                className="fas fa-satellite"
                style={{
                  color:
                    activeLayer === 'classMenu' ||
                      activeLayer === 'changes' ||
                      activeLayer === 'amtChanges' ||
                      activeLayer === 'commonChanges' ||
                      activeMenu === 'urbanGreenSpace'
                      ? '#99c93c'
                      : '#5f6a74',
                  margin: mapMenuOpen ? 'unset' : '0.5rem 0',
                }}
              ></i>
            </ListItemIcon>

            {mapMenuOpen && (
              <ListItemText
                primary="Urban green space"
                style={{
                  color:
                    (borderMenuOpen && activeMenu === 'urbanGreenSpace') ||
                      activeLayer === 'classMenu' ||
                      activeLayer === 'changes' ||
                      activeLayer === 'amtChanges' ||
                      activeLayer === 'commonChanges'
                      ? '#99c93c'
                      : '#5f6a74',
                  fontWeight:
                    borderMenuOpen && activeMenu === 'urbanGreenSpace'
                      ? 'bold'
                      : 'normal',
                }}
              />
            )}
          </ListItem>
        )}
        {isChangesOpen && activeMenu === 'urbanGreenSpace' && (
          <>
            <ListItem button onClick={() => handleChangesClick(mapInstance)}>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <i
                  className="fas fa-chart-line"
                  style={{
                    color:
                      changesOption ||
                        isLayerApplied('changeIndicator', mapInstance) ||
                        activeLayer === 'changes'
                        ? '#99c93c'
                        : mapMenuOpen
                          ? '#5f6a74'
                          : 'white',
                  }}
                ></i>
              </ListItemIcon>
              {mapMenuOpen && (
                <ListItemText
                  primary="Changes"
                  style={{
                    color:
                      changesOption || activeLayer === 'changes'
                        ? '#99c93c'
                        : '#5f6a74',
                    fontWeight: changesOption ? 'bold' : 'normal',
                  }}
                />
              )}
              {mapMenuOpen && (
                <span>{changesOption ? <ExpandLess /> : <ExpandMore />}</span>
              )}
            </ListItem>
            <Collapse
              in={changesOption}
              timeout="auto"
              unmountOnExit
              style={{ borderLeft: '8px solid #99c93c' }}
            >
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="fas fa-square"
                      style={{ color: '#7ed07d' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="Positive" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="fas fa-square"
                      style={{ color: '#fbf978' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="Neutral" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="fas fa-square"
                      style={{ color: '#fe697a' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="Negative" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => handleAmtChangeMenuClick(mapInstance)}
            >
              <ListItemIcon style={{ minWidth: '30px' }}>
                <i
                  className="fas fa-percent"
                  style={{
                    color:
                      amtChangeOpen ||
                        isLayerApplied('amountChangeIndicator', mapInstance) ||
                        activeLayer === 'amtChanges'
                        ? '#99c93c'
                        : mapMenuOpen
                          ? '#5f6a74'
                          : 'white',
                  }}
                ></i>
              </ListItemIcon>
              {mapMenuOpen && (
                <ListItemText
                  primary="Amount of changes"
                  style={{
                    color:
                      amtChangeOpen ||
                        isLayerApplied('amountChangeIndicator', mapInstance) ||
                        activeLayer === 'amtChanges'
                        ? '#99c93c'
                        : '#5f6a74',
                    fontWeight:
                      amtChangeOpen ||
                        isLayerApplied('amountChangeIndicator', mapInstance)
                        ? 'bold'
                        : 'normal',
                  }}
                />
              )}
              {mapMenuOpen && (
                <span>{amtChangeOpen ? <ExpandLess /> : <ExpandMore />}</span>
              )}
            </ListItem>

            <Collapse
              in={amtChangeOpen}
              timeout="auto"
              unmountOnExit
              style={{ borderLeft: '8px solid #99c93c' }}
            >
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="far fa-square"
                      style={{ color: '#c9cdd0' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="0%" />
                </ListItem>
              </List>

              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="fas fa-square"
                      style={{ color: '#ffbe6e' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="1% to 25%" />
                </ListItem>
              </List>

              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="fas fa-square"
                      style={{ color: '#ff9062' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="More than 25%" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="fas fa-square"
                      style={{ color: '#f65340' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="More than 50%" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <i
                      className="fas fa-square"
                      style={{ color: '#c11924' }}
                    ></i>
                  </ListItemIcon>
                  <ListItemText primary="More than 75%" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => handleCommonChangeClick(mapInstance)}
            >
              <ListItemIcon style={{ minWidth: '30px' }}>
                <i
                  className="fas fa-project-diagram"
                  style={{
                    color:
                      commonChangeOpen ||
                        isLayerApplied('commonChangeIndicator', mapInstance) ||
                        activeLayer === 'commonChanges'
                        ? '#99c93c'
                        : mapMenuOpen
                          ? '#5f6a74'
                          : 'white',
                  }}
                ></i>
              </ListItemIcon>
              {mapMenuOpen && (
                <ListItemText
                  primary="Most common change"
                  style={{
                    color:
                      commonChangeOpen ||
                        isLayerApplied('commonChangeIndicator', mapInstance) ||
                        activeLayer === 'commonChanges'
                        ? '#99c93c'
                        : '#5f6a74',
                    fontWeight:
                      commonChangeOpen ||
                        isLayerApplied('commonChangeIndicator', mapInstance) ||
                        activeLayer === 'commonChanges'
                        ? 'bold'
                        : 'normal',
                  }}
                />
              )}
              {mapMenuOpen && (
                <span>
                  {commonChangeOpen ? <ExpandLess /> : <ExpandMore />}
                </span>
              )}
            </ListItem>
            <Collapse
              in={commonChangeOpen}
              timeout="auto"
              unmountOnExit
              style={{ borderLeft: '8px solid #99c93c' }}
            >
              <List component="div" disablePadding>
                {allConversionTypes.map(value => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <Box>
                      <ListItem
                        key={value}
                        role={undefined}
                        dense
                        button
                        onClick={handleConversionToggle(value, mapInstance)}
                      >
                        <ListItemIcon style={{ minWidth: '30px' }}>
                          <Checkbox
                            edge="start"
                            checked={conversionChecked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            onChange={e => { }}
                            style={{
                              color: '#99c93c',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={`${value}`}
                          style={{
                            color: '#99c93c',
                          }}
                        />
                        {
                          <span
                            onClick={e => {
                              e.stopPropagation();
                              handleConversionExpansion(value);
                            }}
                          >
                            {isMenuOpen(value) ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </span>
                        }
                      </ListItem>
                      <CollapseCommonChangeMenu menuItem={value} />
                    </Box>
                  );
                })}
              </List>
            </Collapse>
            <ListItem button onClick={() => handleMenuClick(mapInstance)}>
              <ListItemIcon style={{ minWidth: '30px' }}>
                <i
                  className="fas fa-chart-bar"
                  style={{
                    color:
                      classMenuOpen ||
                      isLayerApplied('classIndicator', mapInstance) ||
                      activeLayer === 'classMenu'
                      classIndicator? '#99c93c'
                      : mapMenuOpen
                        ? '#5f6a74'
                        : 'white',
                  }}
                ></i>
              </ListItemIcon>
              {mapMenuOpen && (
                <ListItemText
                  primary="Most common class"
                  style={{
                    color:
                      classMenuOpen ||
                        isLayerApplied('classIndicator', mapInstance) ||
                        activeLayer === 'classMenu'
                        ? '#99c93c'
                        : '#5f6a74',
                  }}
                />
              )}
              {mapMenuOpen && (
                <span>{classMenuOpen ? <ExpandLess /> : <ExpandMore />}</span>
              )}
            </ListItem>

            <Collapse
              in={classMenuOpen}
              timeout="auto"
              unmountOnExit
              style={{ borderLeft: '8px solid #99c93c' }}
            >
              <List>
                {allAreaTypes.map(value => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
                      role={undefined}
                      dense
                      button
                      onClick={handleToggle(value, mapInstance)}
                    >
                      <ListItemIcon style={{ minWidth: '30px' }}>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                          style={{ color: getCategoryColor(value) }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        )}
      </List>
    </Box>
  );
};

export default MapDrawer;
