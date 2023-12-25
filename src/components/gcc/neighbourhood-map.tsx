import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MapLoadEvent } from 'react-map-gl';
import * as MapboxGL from 'mapbox-gl';
import { FeatureCollection } from '@turf/helpers';
import Map from '../map/map';
import Pin from '../map/pin';
import { City } from '../../models';
import { useSiteMetadata } from '../../hooks';
import { fetchCityBoundaries } from '../../hooks/http';

const browser = typeof window !== 'undefined' && window;

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
interface Props {
  city: any;
  townCode: any;
  activeMapInstance: any;
  open: boolean;
}

/**
 * City Page
 * @file city.tsx is the City Page that renders city's details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const NeighbourhoodMap: React.FC<Props> = props => {
  const { city, townCode, open, activeMapInstance } = props;
  if (!browser) {
    return null;
  }
  const { endpoint } = useSiteMetadata();
  const [cityBoundaries, setCityBoundaries] = useState<FeatureCollection>();
  const [mapInstance, setMapInstance] = useState<MapboxGL.Map>(null);
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window &&
      !window.location.hash?.slice(1)
    ) {
      getBoundariesForCity(city);
    }
  }, [mapInstance, city]);
  const onMapLoad = ({ target }: MapLoadEvent) => {
    setMapInstance(target);
    activeMapInstance(target);
  };
  const getBoundariesForCity = async (c: City) => {
    try {
      const boundaries = await fetchCityBoundaries(
        endpoint,
        `${c.city_code}_2021.geojson`
      );
      setCityBoundaries(boundaries);
      addBoundariesForCity(mapInstance);
    } catch (err) {
      console.error(err);
    }
  };

  const addBoundariesForCity = (map: MapboxGL.Map) => {
    if (map !== undefined) {
      map?.addSource('city_geojson', {
        type: 'geojson',
        data: `../../${city.city_code}_2021.geojson`,
      });
      // @ts-ignore
      map?.addLayer(geoJsonStyle);
      // @ts-ignore
      map?.addLayer(classIndicator);
    }
  };

  return (
    <Map
      boundaries={cityBoundaries}
      boundariesOsm={`${endpoint}/Sweco/Map/Neighbourhoods/Neighbourhoods_${townCode}.geojson`}
      onLoad={onMapLoad}
      isDrawerOpen={open}
      view="neighbour"
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
  );
};

export default observer(NeighbourhoodMap);
