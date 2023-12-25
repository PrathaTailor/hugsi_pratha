import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, {
  FlyToInterpolator,
  MapLoadEvent,
  ViewState,
  NavigationControl,
} from 'react-map-gl';
import { FeatureCollection, featureCollection, point } from '@turf/helpers';
import bbox from '@turf/bbox';
import WebMercatorViewport from 'viewport-mercator-project';
import { useSiteMetadata } from 'hooks';
import { MapContext } from 'stores/map-context';
import { observer } from 'mobx-react-lite';
import * as MapboxGL from 'mapbox-gl';
import { useMediaQuery } from '@material-ui/core';

interface IMap {
  width?: string;
  height?: string;
  onLoad?: (e: MapLoadEvent) => void;
  latLongArrs?: number[][];
  boundaries?: FeatureCollection;
  boundariesOsm?: string;
  isDrawerOpen?: boolean;
  view?: string;
  children: React.ReactNode | ((map: MapboxGL.Map) => React.ReactNode);
  mapboxApiAccessToken?: string;
  mapStyle?: string;
  latlongarr?: number[];
  onClick?: void;
  cityName?: string;
  zone?: string;
  mapView?: string;
}

const defaultProps = {
  width: '100%',
  height: '100%',
};

const flyToInterpolator = new FlyToInterpolator();

/**
 * Map component
 * @param width - width of the map
 * @param height - height of the map
 * @param latLongArrs -latitude longitude
 * @param boundaries - boundaries of a city
 * @param boundariesOsm - boundaries of a city in OSM
 * @param onLoad - a life cycle event
 * @param isDrawerOpen - map drawer in city details
 * @param view - page view
 * @param children - other components
 * @author Johan Gustafsson
 */
const MapWrapper: React.FC<IMap> = ({
  width = defaultProps.width,
  height = defaultProps.height,
  latLongArrs,
  boundaries,
  boundariesOsm,
  onLoad,
  isDrawerOpen,
  view,
  children,
  mapboxApiAccessToken,
  mapStyle,
  latlongarr,
  mapView,
}) => {
  const viewportStore = useContext(MapContext);
  const { mapboxToken } = useSiteMetadata();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [isDetailsDrawerOpen, setDetailsDrawerOpen] = useState(isDrawerOpen);
  const smallScreen = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    if (view === 'ranking') {
      if (mapView === 'terains') {
        if (mapInstance?.getSource('frigid') === undefined) {
          mapInstance?.addSource('frigid', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [187, 90], // top right
                    [-172.411946, 90], // top left
                    [-172.411946, 65.445869], // bottom left
                    [187, 65.445869], // botton right
                  ],
                ],
              },
            },
          });

          mapInstance?.addLayer({
            id: 'frigid',
            type: 'fill',
            source: 'frigid', // reference the data source
            layout: {},
            paint: {
              'fill-color': '#359ED0', // blue color fill
              'fill-opacity': 0.3,
            },
          });
        }
        if (mapInstance?.getSource('north') === undefined) {
          mapInstance?.addSource('north', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [187, 65.445869], // top right
                    [-172.411946, 65.445869], // top left
                    [-172.411946, 23.5], // bottom left
                    [187, 23.5], // botton right
                  ],
                ],
              },
            },
          });
          mapInstance?.addLayer({
            id: 'north',
            type: 'fill',
            source: 'north', // reference the data source
            layout: {},
            paint: {
              'fill-color': '#007A01', // blue color fill
              'fill-opacity': 0.3,
            },
          });
        }
        if (mapInstance?.getSource('torrid') === undefined) {
          mapInstance?.addSource('torrid', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [-172.411946, 23.5], // top left
                    [187, 23.5], // top right
                    [187, -23.5], // bottom right
                    [-172.411946, -23.5], // bottom left
                  ],
                ],
              },
            },
          });
          mapInstance?.addLayer({
            id: 'torrid',
            type: 'fill',
            source: 'torrid', // reference the data source
            layout: {},
            paint: {
              'fill-color': '#FEE80C', // blue color fill
              'fill-opacity': 0.5,
            },
          });
        }
        if (mapInstance?.getSource('south') === undefined) {
          mapInstance?.addSource('south', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [187, -23.5], // top right
                    [-172.411946, -23.5], // top left
                    [-172.411946, -66.5], // bottom left
                    [187, -66.5], // bottom right
                  ],
                ],
              },
            },
          });
          mapInstance?.addLayer({
            id: 'south',
            type: 'fill',
            source: 'south', // reference the data source
            layout: {},
            paint: {
              'fill-color': '#FF9302', // blue color fill
              'fill-opacity': 0.3,
            },
          });
        }
        if (mapInstance?.getSource('frigid-bottom') === undefined) {
          mapInstance?.addSource('frigid-bottom', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [-172.411946, -66.5], // top left
                    [187, -66.5], // top right
                    [187, -90], // bottom right
                    [-172.411946, -90], // bottom left
                  ],
                ],
              },
            },
          });
          mapInstance?.addLayer({
            id: 'frigid-bottom',
            type: 'fill',
            source: 'frigid-bottom', // reference the data source
            layout: {},
            paint: {
              'fill-color': '#359ED0', // blue color fill
              'fill-opacity': 0.3,
            },
          });
        }
      } else {
        if (mapInstance?.getLayer('frigid')) {
          mapInstance?.removeLayer('frigid');
          mapInstance?.removeSource('frigid');
        }
        if (mapInstance?.getLayer('north')) {
          mapInstance?.removeLayer('north');
          mapInstance?.removeSource('north');
        }
        if (mapInstance?.getLayer('south')) {
          mapInstance?.removeLayer('south');
          mapInstance?.removeSource('south');
        }
        if (mapInstance?.getLayer('frigid-bottom')) {
          mapInstance?.removeLayer('frigid-bottom');
          mapInstance?.removeSource('frigid-bottom');
        }
        if (mapInstance?.getLayer('torrid')) {
          mapInstance?.removeLayer('torrid');
          mapInstance?.removeSource('torrid');
        }
      }
    }
  }, [mapView, mapInstance]);

  useEffect(() => {
    if (isDetailsDrawerOpen !== isDrawerOpen) {
      setDetailsDrawerOpen(isDrawerOpen);
    }
  }, [isDrawerOpen, isDetailsDrawerOpen]);

  useEffect(() => {
    if (latlongarr && latlongarr[1] && latlongarr[0]) {
      viewportStore.setViewport({
        ...viewportStore.viewport,
        longitude: latlongarr[1],
        latitude: latlongarr[0],
        zoom: 15,
        transitionDuration: 1000,
      });
    }
  }, [latlongarr]);

  useEffect(() => {
    if (latLongArrs && latLongArrs.length > 0 && mapLoaded) {
      const latLongFeatures = featureCollection(
        latLongArrs.map(latLongArr => point(latLongArr))
      );
      panToMapFeature(latLongFeatures, 10);
    }
  }, [latLongArrs, mapLoaded]);

  useEffect(() => {
    if (boundaries && mapLoaded) {
      panToMapFeature(boundaries);
    }
  }, [boundaries, mapLoaded]);

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
      // Screen is too small to find a viewport that fits all features
    }
  };

  const getNeighboursURL = (areaName: string, locationName: string) => {
    return `#${locationName}/${areaName}/neighbourhoods`;
  };

  const onClick = event => {
    const feature = event.features && event.features[0];
    if (
      view === 'neighbour' &&
      feature &&
      typeof feature.properties.naam !== undefined
    ) {
      const cityName: string = feature.properties.naam; // on click get the city
      const locationName: string = feature.properties.plaatsnaam; // on click get the location

      if (typeof cityName !== undefined || cityName !== 'undefined') {
        const AreaURL = getNeighboursURL(cityName, locationName);
        window.location.hash = AreaURL;
      }
    }
  };

  return (
    <ReactMapGL
      {...viewportStore.viewport}
      mapboxApiAccessToken={mapboxApiAccessToken || mapboxToken}
      mapStyle={
        mapStyle || `mapbox://styles/husqvarna-mapbox/cjzxzdczy0n0u1dpa6t57qjw0`
      }
      width={width}
      height={height}
      transitionInterpolator={flyToInterpolator}
      onViewportChange={(viewport: ViewState) => {
        viewportStore.setViewport(viewport);
      }}
      onClick={onClick}
      onLoad={(e: MapLoadEvent) => {
        if (view === 'neighbour') {
          setMapLoaded(true);
          setMapInstance(e.target);

          const layerId = 'states-layer';
          if (e.target?.getLayer(layerId)) {
            e.target.removeLayer(layerId);
          }
          if (e.target?.getSource(layerId)) {
            e.target.removeSource(layerId);
          }
          if (e.target?.getLayer('image-layer')) {
            e.target?.removeLayer('image-layer');
          }
          if (e.target?.getSource('image')) {
            e.target?.removeSource('image');
          }
          const firstSymbolId = 'nbr-layer';
          e.target?.addLayer({
            id: 'nbr-layer',
            type: 'fill',
            source: {
              type: 'geojson',
              data: boundariesOsm,
            },
            paint: {
              'fill-color': [
                'match',
                ['get', 'Label'],
                'A',
                '#65C080',
                'B',
                '#B6D983',
                'C',
                '#F0CF69',

                'D',
                '#F8DC29',
                'E',
                '#F3C331',
                'F',
                '#F05646',

                'V',
                '#E482D6',
                'W',
                '#7030A0',
                'X',
                '#A4329C',
                'Z',
                '#D631E7',

                '#D631E7',
              ],
              'fill-outline-color': 'black',
            },
          });
          e.target?.addLayer({
            id: 'nbr-label',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: boundariesOsm,
            },
            layout: {
              'text-field': ['get', 'naam'],
              'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
              'text-radial-offset': 0.2,
              'icon-image': ['get', 'icon'],
            },
          });
        } else if (view === 'town') {
          setMapLoaded(true);
          setMapInstance(e.target);
          const layerId = 'states-layer';
          if (e.target?.getLayer(layerId)) {
            e.target.removeLayer(layerId);
          }
          if (e.target?.getSource(layerId)) {
            e.target.removeSource(layerId);
          }
        } else if (view === 'ranking') {
          if (mapView === 'terains') {
            e.target.addLayer({
              id: 'states-layer',
              type: 'fill',
              source: {
                type: 'geojson',
                data: boundariesOsm,
              },
              paint: {
                'fill-color': 'rgba(153,201,60, 0.3)',
                'fill-outline-color': 'rgba(105,141,41, 1)',
              },
            });
          }
          setMapLoaded(true);
          setMapInstance(e.target);
        }
        else {
          setMapLoaded(true);
          // e.target.addLayer({
          //   id: 'states-layer',
          //   type: 'fill',
          //   source: {
          //     type: 'geojson',
          //     data: boundariesOsm,
          //   },
          //   paint: {
          //     'fill-color': 'rgba(153,201,60, 0.3)',
          //     'fill-outline-color': 'rgba(105,141,41, 1)',
          //   },
          // });
          setMapInstance(e.target);
        }
        if (onLoad) {
          onLoad(e);
        }
      }}
    >
      {view !== 'city' &&
        view !== 'town' &&
        view !== 'neighbour' &&
        typeof children === 'function'
        ? // @ts-ignore
        mapInstance && children(mapInstance)
        : children}

      {(view === 'city' ||
        view === 'town' ||
        view === 'ranking' ||
        view === 'neighbour') &&
        // !smallScreen && (
          <div>
            <div
              style={{
                right: '5%',
                position: 'absolute',
                bottom: smallScreen ? '23px' : '60px',
                padding: '20px',
              }}
            >
              <NavigationControl />{' '}
            </div>
          </div>
        // )
        }
      {typeof children !== 'function' && children}
    </ReactMapGL>
  );
};

export default observer(MapWrapper);