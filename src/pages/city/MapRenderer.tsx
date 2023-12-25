import React, { memo, useState, useEffect, useContext } from 'react';
import { useSiteMetadata } from '../../hooks';
import LoadingMap from '../../components/map/loading-map';
import ReactMapGL, {
  FlyToInterpolator,
  MapLoadEvent,
  ViewState,
  NavigationControl,
} from 'react-map-gl';
import * as MapboxGL from 'mapbox-gl';
import { MapContext } from 'stores/map-context';
import { FeatureCollection, featureCollection, point } from '@turf/helpers';
import bbox from '@turf/bbox';
import WebMercatorViewport from 'viewport-mercator-project';
import { observer } from 'mobx-react-lite';
import MapDrawerNew from 'components/datapage/MapDrawerNew';
import ChangesDrawer from 'components/datapage/ChangesDrawer';
import UrbanDrawer from 'components/datapage/UrbanDrawer';
import TreeGradientDrawer from 'components/datapage/TreeGradientDrawer';
import VitalityDrawer from 'components/datapage/VitalityDrawer';
import PopulationDrawer from 'components/datapage/PopulationDrawer';
import { City } from 'models';
import { makeStyles } from '@material-ui/styles';

interface Props {
  city: any;
  open: boolean;
  // activeMapInstance:any;
  activeMenu: any;
}
const defaultProps = {
  width: '100%',
  height: '100%',
};

/**
 * City and Ranking Page
 * @file ranking.tsx is the Ranking and City Page that renders city's details with ranking city details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const MapRenderer: React.FC<Props> = ({ city, activeMenu, open }) => {
  const flyToInterpolator = new FlyToInterpolator();
  const { mapboxToken } = useSiteMetadata();
  const viewportStore = useContext(MapContext);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const geoJsonStyle: MapboxGL.Layer = {
    source: 'city_geojson',
    id: 'geoJsonStyle',
    type: 'line',
    'source-layer': `${city?.city_code}_2021`,
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
    'source-layer': `${city?.city_code}_2021`,
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
    'source-layer': `${city?.city_code}_2021`,
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
    'source-layer': `${city?.city_code}_2021`,
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
    'source-layer': `${city?.city_code}_2021`,
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
    'source-layer': `${city?.city_code}_2021`,
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
    'source-layer': `${city?.city_code}_2021`,
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
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window &&
      !window.location.hash?.slice(1)
    ) {
      if (mapInstance !== null) {
        getBoundariesForCity(city);
      }
    }
  }, [mapInstance, city]);
  const getBoundariesForCity = async (c: City) => {
    try {
      // const boundaries = await fetchCityBoundaries(
      //   endpoint,
      //   `${c.city_code}_2021.geojson`
      // );
      addBoundariesForCity(mapInstance);
    } catch (err) {
      console.error(err);
    }
  };
  const addBoundariesForCity = (map: MapboxGL.Map) => {
    if (map !== undefined && map !== null) {
      if (!map?.getSource('city_geojson')) {
        map?.addSource('city_geojson', {
          type: 'vector',
          url: `mapbox://husqvarna-mapbox.${city?.city_code}_2021`,
        });
      }
      if (map?.getSource('city_geojson')) {
        if (!map?.getLayer('geoJsonStyle')) {
          // @ts-ignore
          map?.addLayer(geoJsonStyle);
        }
        if (activeMenu === 'population_heatmap') {
          if (!map?.getLayer('populationIndicator')) {
            // @ts-ignore
            mapInstance?.addLayer(populationIndicator);
          }
        } else {
          if (!map?.getLayer('classIndicator')) {
            // @ts-ignore
            map?.addLayer(classIndicator);
          }
        }
      }
      // setIsMapLoading(false);
    }
  };
  useEffect(() => {
    if (city?.latlongarr && city?.latlongarr[1] && city?.latlongarr[0]) {
      viewportStore.setViewport({
        ...viewportStore.viewport,
        longitude: city?.latlongarr[1],
        latitude: city?.latlongarr[0],
        zoom: 10,
        transitionDuration: 1000,
      });
    }
  }, [city?.latlongarr]);

  useEffect(() => {
    if (city?.latlongarr && city?.latlongarr.length > 0 && mapLoaded) {
      const latLongFeatures = featureCollection(
        city?.latlongarr.map(latlongarr => point(latlongarr))
      );
      panToMapFeature(latLongFeatures, 10);
    }
  }, [city?.latlongarr, mapLoaded]);

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
  // const onMapLoad = ({ target }: MapLoadEvent) => {
  //   // activeMapInstance(target);
  //   setMapInstance(target);
  // };
  useEffect(() => {
    removeAvailableLayers(mapInstance);
    if (activeMenu === 'changes_classes') {
      console.log('changeIndicator', changeIndicator);
      // @ts-ignore
      mapInstance?.addLayer(geoJsonStyle);
      // @ts-ignore
      mapInstance?.addLayer(changeIndicator);
    } else if (activeMenu === 'population_heatmap') {
      // @ts-ignore
      mapInstance?.addLayer(geoJsonStyle);
      // @ts-ignore
      mapInstance?.addLayer(populationIndicator);
    } else if (activeMenu === 'tree_gradient_category') {
      // @ts-ignore
      mapInstance?.addLayer(treeGradientCategoryIndicator);
    } else if (activeMenu === 'tree_vitality_category') {
      // @ts-ignore
      mapInstance?.addLayer(treeVitalityCategoryIndicator);
    } else if (activeMenu === 'veg_vitality_category') {
      // @ts-ignore
      mapInstance?.addLayer(vegVitalityCategoryIndicator);
    } else {
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
  }, [activeMenu]);

  const panToMapFeature = (feature: FeatureCollection, maxZoom?: number) => {
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);
    try {
      const newViewPort = new WebMercatorViewport({
        ...viewportStore.viewport,
      });
      const { longitude, latitude, zoom } = newViewPort.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: 120,
        }
      );
      viewportStore.setViewport({
        ...viewportStore.viewport,
        longitude,
        latitude,
        zoom: zoom > maxZoom ? maxZoom : zoom,
        transitionDuration: 1000,
      });
    } catch (err) {
      console.log('err', err);
      // Screen is too small to find a viewport that fits all features
    }
  };
  return !city ? (
    <LoadingMap message={'Loading map data'} />
  ) : (
    <>
      <ReactMapGL
        {...viewportStore.viewport}
        mapStyle={`mapbox://styles/husqvarna-mapbox/cjzxzdczy0n0u1dpa6t57qjw0?optimize=true`}
        width={defaultProps.width}
        height={defaultProps.height}
        transitionInterpolator={flyToInterpolator}
        onViewportChange={(viewport: ViewState) => {
          viewportStore.setViewport(viewport);
        }}
        mapboxApiAccessToken={mapboxToken}
        maxZoom={60}
        // minZoom={5}
        onLoad={(e: MapLoadEvent) => {
          setMapLoaded(true);
          setMapInstance(e.target);
        }}
      >
        <div>
          <div className='largenavigation'
            style={{
              right: '5%',
              position: 'absolute',
              bottom: '40px',
              padding: '10px',
            }}
          // className={view === 'ranking' ? style.rankingMap : style.cityMap}
          >
            <NavigationControl />{' '}
          </div>
        </div>
      </ReactMapGL>
      <div
        id="loading-background"
        className="flex-parent flex-parent--center-cross flex-parent--center-main
      absolute top right bottom left bg-darken10 z5"
      >
        <div id="spinner" className="flex-child loading"></div>
      </div>
      {activeMenu === 'changes_classes' && (
        <ChangesDrawer activemenu={activeMenu} />
      )}
      {/* { currentLoading > 0 && <MapLoader currentState={currentLoading}/>} */}
      {(activeMenu === 'urban_data' || activeMenu === 'summary_data') && (
        <UrbanDrawer activemenu={activeMenu} />
      )}
      {activeMenu === 'tree_gradient_category' && (
        <TreeGradientDrawer activemenu={activeMenu} />
      )}
      {activeMenu === 'tree_vitality_category' && (
        <VitalityDrawer activemenu={activeMenu} />
      )}
      {activeMenu === 'population_heatmap' && (
        <PopulationDrawer activemenu={activeMenu} />
      )}
      {activeMenu === 'veg_vitality_category' && (
        <VitalityDrawer activemenu={activeMenu} />
      )}
      <div data-tut="reactour__iso">
        <MapDrawerNew city={city?.id} mapView="" />
      </div>
    </>
  );
};
export default observer(MapRenderer);
