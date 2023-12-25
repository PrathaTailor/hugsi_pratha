import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MapLoadEvent } from 'react-map-gl';
import * as MapboxGL from 'mapbox-gl';
import { City } from '../../models';
import Map from '../map/map';
import Pin from '../map/pin';
import { useSiteMetadata } from '../../hooks';
import { fetchCityBoundaries } from '../../hooks/http';
import MapDrawerNew from 'components/datapage/MapDrawerNew';
import ChangesDrawer from 'components/datapage/ChangesDrawer';
import UrbanDrawer from 'components/datapage/UrbanDrawer';
import TreeGradientDrawer from 'components/datapage/TreeGradientDrawer';
import VitalityDrawer from 'components/datapage/VitalityDrawer';
import PopulationDrawer from 'components/datapage/PopulationDrawer';
import MapLoader from 'components/datapage/MapLoader';

const geoJsonStyle: MapboxGL.Layer = {
  id: 'geoJsonStyle',
  source: 'city_geojson',
  type: 'line',
  paint: {
    'line-color': '#707b7e',
    'line-width': 0.5,
    'line-opacity': 1,
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
      '#99C93C',
      'Negative',
      '#E77F81',
      'Neutral',
      '#FAF2BF',
      /* other */ '#ccc',
    ],
  },
  filter: ['!=', ['get', 'change_indication'], 'No Change'],
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
      '#138808',
      'treecanopy',
      '#004225',
      /* other */ '#ccc',
    ],
    'fill-opacity': 0.5,
  },
};

const populationIndicator: MapboxGL.Layer = {
  id: 'populationIndicator',
  source: 'city_geojson',
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['get', 'population_category'],
      '0-10% (Very Low)',
      '#ffcc00',
      '10-30% (Low)',
      '#ff9c00',
      '30-65% (Medium)',
      '#ff7701',
      '65-80% (High)',
      '#ff2400',
      '80-95% (Very High)',
      '#B5080B',
      '95% above (Extreme High)',
      '#3f0405',
      /* other */ '#ccc',
    ],
    'fill-opacity': 0.5,
  },
  // filter: ['!=', ['get', 'population_category'], 'No Change'],
};

const treeGradientCategoryIndicator: MapboxGL.Layer = {
  id: 'treeGradientCategoryIndicator',
  source: 'city_geojson',
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['get', 'tree_gradient_category'],
      '0-10% (Very Low)',
      '#99C93D',
      '10-30% (Low)',
      '#299617',
      '30-65% (Medium)',
      '#138808',
      '65-80% (High)',
      '#005c29',
      '80-95% (Very High)',
      '#004225',
      '95% above (Extreme High)',
      '#013220',
      /* other */ '#ccc',
    ],
    'fill-opacity': 0.5,
  },
  // filter: ['!=', ['get', 'population_category'], 'No Change'],
};
const vegVitalityCategoryIndicator: MapboxGL.Layer = {
  id: 'vegVitalityCategoryIndicator',
  source: 'city_geojson',
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['get', 'veg_vitality_category'],
      '-1 - 0 (Dead plants or inanimate object)',
      '#DF474A',
      '0 - 0.33 (Unhealthy Plant)',
      '#DAAF3D',
      '0.33 - 0.66 (Moderately Heathly plant)',
      '#99c93c',
      '0.66 - 1 (Very Healthy Plant)',
      '#698d29',
      /* other */ '#ccc',
    ],
    'fill-opacity': 0.5,
  },
  // filter: ['!=', ['get', 'population_category'], 'No Change'],
};

const treeVitalityCategoryIndicator: MapboxGL.Layer = {
  id: 'treeVitalityCategoryIndicator',
  source: 'city_geojson',
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['get', 'tree_vitality_category'],
      '-1 - 0 (Dead plants or inanimate object)',
      '#DF474A',
      '0 - 0.33 (Unhealthy Plant)',
      '#DAAF3D',
      '0.33 - 0.66 (Moderately Heathly plant)',
      '#99c93c',
      '0.66 - 1 (Very Healthy Plant)',
      '#698d29',
      /* other */ '#ccc',
    ],
    'fill-opacity': 0.5,
  },
  // filter: ['!=', ['get', 'population_category'], 'No Change'],
};
interface Props {
  city: any;
  boundariesOsm: any;
  activeMapInstance: any;
  open: boolean;
  activeMenu: any;
}

/**
 * City Page
 * @file city.tsx is the City Page that renders city's details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const CityMap: React.FC<Props> = props => {
  const { city, boundariesOsm,open,activeMapInstance } = props;
  const { endpoint } = useSiteMetadata();
  const [mapInstance, setMapInstance] = useState<MapboxGL.Map>(null);
  const [cityBoundaries, setCityBoundaries] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [currentLoading, setcurrentLoading] = useState(0);
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window &&
      !window.location.hash?.slice(1)
    ) {
      setcurrentLoading(1);
      if(mapInstance !== null){
      getBoundariesForCity(city);
      }
    }
  }, [mapInstance,city]);
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
    if (map?.getLayer('geoJsonStyle')) {
      map?.removeLayer('geoJsonStyle');
    }
    if (map?.getLayer('populationIndicator')) {
      map?.removeLayer('populationIndicator');
    }
    if (map?.getLayer('treeGradientCategoryIndicator')) {
      map?.removeLayer('treeGradientCategoryIndicator');
    }
    if (map?.getLayer('vegVitalityCategoryIndicator')) {
      map?.removeLayer('vegVitalityCategoryIndicator');
    }
    if (map?.getLayer('treeVitalityCategoryIndicator')) {
      map?.removeLayer('treeVitalityCategoryIndicator');
    }
  };
  useEffect(() => {
    removeAvailableLayers(mapInstance);
    console.log('props.activeMenu', props.activeMenu);
    if (props.activeMenu === 'changes_classes') {
      // @ts-ignore
      mapInstance?.addLayer(geoJsonStyle);
      // @ts-ignore
      mapInstance?.addLayer(changeIndicator);
    } else if (props.activeMenu === 'population_heatmap') {
      console.log('props.activeMenu if', props.activeMenu);
      // @ts-ignore
      mapInstance?.addLayer(geoJsonStyle);
      // @ts-ignore
      mapInstance?.addLayer(populationIndicator);
    } else if (props.activeMenu === 'tree_gradient_category') {
      // @ts-ignore
      mapInstance?.addLayer(treeGradientCategoryIndicator);
    } else if (props.activeMenu === 'tree_vitality_category') {
      // @ts-ignore
      mapInstance?.addLayer(treeVitalityCategoryIndicator);
    } else if (props.activeMenu === 'veg_vitality_category') {
      // @ts-ignore
      mapInstance?.addLayer(vegVitalityCategoryIndicator);
    } else {
      console.log('props.activeMenu else', props.activeMenu);

      if (mapInstance?.getSource('city_geojson')) {
        if (!mapInstance?.getLayer('geoJsonStyle')) {
          // @ts-ignore
          mapInstance?.addLayer(geoJsonStyle);
        }
        if (!mapInstance?.getLayer('classIndicator')) {
          // @ts-ignore
          mapInstance?.addLayer(classIndicator);
        }
      }
    }
  }, [props.activeMenu]);

  const onMapLoad = ({ target }: MapLoadEvent) => {
    activeMapInstance(target);
    setMapInstance(target);
  };

  const getBoundariesForCity = async (c: City) => {
    try {
      const boundaries = await fetchCityBoundaries(
        endpoint,
        `${c.city_code}_2021.geojson`
      );
      setcurrentLoading(2);
      setCityBoundaries(boundaries);
      addBoundariesForCity(mapInstance);
      setcurrentLoading(3);
      setcurrentLoading(0);
    } catch (err) {
      console.error(err);
    }
  };

  const addBoundariesForCity = (map: MapboxGL.Map) => {
    console.log('map', map);
    if (map !== undefined && map !== null) {
      if (!map?.getSource('city_geojson')) {
        map?.addSource('city_geojson', {
          type: 'geojson',
          data: `${endpoint}/hugsi_2021_100m_data/hugsi_data_compressed/${city.city_code}_2021.geojson`
        });
      }
      map.setZoom(15);
      if (map.getSource('city_geojson')) {
        if (!map?.getLayer('geoJsonStyle')) {
          // @ts-ignore
          map?.addLayer(geoJsonStyle);
        }
        console.log('map2', map);
        if (props.activeMenu === 'population_heatmap') {
          console.log('props.activeMenu if', props.activeMenu);
          if (!map?.getLayer('populationIndicator')) {
          // @ts-ignore
          mapInstance?.addLayer(populationIndicator);
          }
        }else{
        if (!map?.getLayer('classIndicator')) {
          // @ts-ignore
          map?.addLayer(classIndicator);
        }
      }
      }
      setIsMapLoading(false);
    }
  };
  return (
    <>
      <Map
        boundaries={cityBoundaries}
        boundariesOsm={boundariesOsm}
        onLoad={onMapLoad}
        isDrawerOpen={open}
        view="city"
      >
        {map => {
          const zoom = map?.getZoom();
          const isLargePin = zoom > 4;
          const isMediumPin = zoom > 2 && !isLargePin;
          return (
            <Pin
              latitude={city.latlongarr[0]}
              longitude={city.latlongarr[1]}
              city={city}
              mediumPin={isMediumPin}
              largePin={isLargePin}
              mapView=""
            />
          );
        }}
      </Map>
      <div
        id="loading-background"
        className="flex-parent flex-parent--center-cross flex-parent--center-main
      absolute top right bottom left bg-darken10 z5"
      >
        <div id="spinner" className="flex-child loading"></div>
      </div>
      {props.activeMenu === 'changes_classes' && (
        <ChangesDrawer activemenu={props.activeMenu} />
      )}
      { currentLoading > 0 && <MapLoader currentState={currentLoading}/>}
      {(props.activeMenu === 'urban_data' || props.activeMenu === 'summary_data')&& (
        <UrbanDrawer activemenu={props.activeMenu} />
      )}
      {props.activeMenu === 'tree_gradient_category' && (
        <TreeGradientDrawer activemenu={props.activeMenu} />
      )}
      {props.activeMenu === 'tree_vitality_category' && (
        <VitalityDrawer activemenu={props.activeMenu} />
      )}
      {props.activeMenu === 'population_heatmap' && (
        <PopulationDrawer activemenu={props.activeMenu} />
      )}
      {props.activeMenu === 'veg_vitality_category' && (
        <VitalityDrawer activemenu={props.activeMenu} />
      )}
      <div data-tut="reactour__iso">
        <MapDrawerNew city={city.id} mapView="" />
      </div>
    </>
  );
};

export default observer(CityMap);
