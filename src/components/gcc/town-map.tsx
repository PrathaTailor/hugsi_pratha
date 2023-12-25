import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MapLoadEvent } from 'react-map-gl';
import * as MapboxGL from 'mapbox-gl';
import { FeatureCollection } from '@turf/helpers';
import Map from '../map/map';
import Pin from '../map/pin';
import { City } from '../../models';
import { useSiteMetadata } from '../../hooks';
import useCities from '../../hooks/cities';
import { fetchCityBoundaries } from '../../hooks/http';

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
  activeMapInstance: any;
  open: boolean;
  urlByLocation: string;
}

/**
 * City Page
 * @file city.tsx is the City Page that renders city's details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const TownMap: React.FC<Props> = props => {
  const { cityStore } = useCities();
  const { neighborhoods } = cityStore;
  const { city, open, urlByLocation, activeMapInstance } = props;
  const { endpoint } = useSiteMetadata();
  const [cityBoundaries, setCityBoundaries] = useState<FeatureCollection>();
  const [mapInstance, setMapInstance] = useState<MapboxGL.Map>(null);
  /**
   * Toggle open state
   */

  const windowLocHash =
    typeof window !== 'undefined' ? window?.location?.hash : '';
  const extractTownName = (urlHash: string) => {
    const urlCopy = urlHash;
    const removeFromUrl = urlCopy.replaceAll('/neighbourhoods', '');
    return removeFromUrl;
  };

  let townData: string =
    windowLocHash && !windowLocHash.endsWith('./neighbourhoods')
      ? decodeURI(windowLocHash.substring(1))
      : extractTownName(windowLocHash);

  // used for the selected neighbours
  const checkCityURL = townData.split('/');
  if (checkCityURL && checkCityURL.length === 3) {
    townData = checkCityURL[0] + '/' + checkCityURL[2];
  }
  const townId = townData;

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window &&
      window.location.hash?.slice(1) &&
      urlByLocation === '-1'
    ) {
      getRasterForTown(city);
    } else {
      getRasterForNeighbourhood();
    }
  }, [mapInstance, city, townId, urlByLocation]);
  // Load raster for gcc town
  const getRasterForTown = async (c: City) => {
    try {
      addRasterImageForCity(mapInstance);
    } catch (err) {
      console.error(err);
    }
  };
  const getRasterForNeighbourhood = () => {
    try {
      addRasterImageForNeighbourhood(mapInstance);
    } catch (err) {
      console.error(err);
    }
  };

  const addRasterImageForCity = (map: MapboxGL.Map) => {
    if (map !== undefined) {
      if (map?.getLayer('image-layer')) {
        map?.removeLayer('image-layer');
      }
      if (map?.getSource('image')) {
        map?.removeSource('image');
      }

      // const townId = window?.location.hash?.slice(1);
      const townId = decodeURI(
        typeof window !== 'undefined'
          ? window?.location?.hash.indexOf('/') !== -1
            ? window?.location?.hash?.substring(
              1,
              window?.location?.hash.indexOf('/')
            )
            : window?.location?.hash?.substring(1)
          : ''
      );
      const { towns } = city.gcc;
      if (
        towns &&
        townId &&
        !window.location.hash.endsWith('/neighbourhoods')
      ) {
        const gccTownTilesetId = towns[decodeURI(townId)].town_code;
        map?.addSource('image', {
          type: 'raster',
          url: `mapbox://husqvarna-mapbox.Town_${gccTownTilesetId}_v3`,
        });
        map?.addLayer({
          id: 'image-layer',
          source: 'image',
          type: 'raster',
        });
      }
    }
  };
  const addRasterImageForNeighbourhood = (map: MapboxGL.Map) => {
    if (map !== undefined) {
      if (map?.getLayer('image-layer')) {
        map?.removeLayer('image-layer');
      }
      if (map?.getSource('image')) {
        map?.removeSource('image');
      }
      const selectedNeighbourhood: any = Object.values(neighborhoods).filter(
        (n: any) => n.naam === urlByLocation
      );
      if (selectedNeighbourhood.length) {
        map?.addSource('image', {
          type: 'raster',
          url: `mapbox://husqvarna-mapbox.Neighbourhood_${selectedNeighbourhood[0].code}_v3`,
        });
        map?.addLayer({
          id: 'image-layer',
          source: 'image',
          type: 'raster',
        });
      }
    }
  };
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
        data: `${endpoint}/hugsi_2021_100m_data/hexagon_data_test2/${city.city_code}_2021.geojson`,
      });
      map?.addLayer(geoJsonStyle);
      map?.addLayer(classIndicator);
    }
  };
  return urlByLocation !== '-1' ? (
    <Map
      mapboxApiAccessToken={
        'pk.eyJ1IjoiaHVzcXZhcm5hLW1hcGJveCIsImEiOiJjanptcGNxMWkwMTVsM25wY2lrZWxkc3FpIn0.qKficbHD3QG_kBY96ZAsrw'
      }
      mapStyle={'mapbox://styles/husqvarna-mapbox/ckw58ghac15ur15p1lhsw261i'}
      boundaries={cityBoundaries}
      boundariesOsm={``}
      onLoad={onMapLoad}
      isDrawerOpen={open}
      view="town"
      // latlongarr={
      //   typeof window !== 'undefined' &&
      //   window?.location?.hash &&
      //   city.gcc?.towns &&
      //   city.gcc.towns[
      //     decodeURI(window.location.hash).slice(1)
      //   ] &&
      //   city.gcc.towns[decodeURI(window.location.hash).slice(1)]
      //     .latlong
      // }
      latlongarr={
        typeof window !== 'undefined' &&
        window?.location?.hash &&
        city.gcc?.towns &&
        city.gcc.towns[decodeURI(townId)] &&
        city.gcc.towns[decodeURI(townId)].latlong
      }
    >
      {map => {
        const zoom = map?.getZoom();
        const isLargePin = zoom > 4;
        const isMediumPin = zoom > 2 && !isLargePin;

        return (
          <Pin
            latitude={
              typeof window !== 'undefined' &&
                window?.location?.hash &&
                city.gcc?.towns &&
                city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                ? city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                  .latlong[1]
                : city.latlongarr[0]
            }
            longitude={
              typeof window !== 'undefined' &&
                window?.location?.hash &&
                city.gcc?.towns &&
                city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                ? city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                  .latlong[0]
                : city.latlongarr[1]
            }
            city={city}
            mediumPin={isMediumPin}
            largePin={isLargePin}
            mapView=""
          />
        );
      }}
    </Map>
  ) : (
    <Map
      mapboxApiAccessToken={
        'pk.eyJ1IjoiaHVzcXZhcm5hLW1hcGJveCIsImEiOiJjanptcGNxMWkwMTVsM25wY2lrZWxkc3FpIn0.qKficbHD3QG_kBY96ZAsrw'
      }
      mapStyle={'mapbox://styles/husqvarna-mapbox/ckw58ghac15ur15p1lhsw261i'}
      boundaries={cityBoundaries}
      boundariesOsm={``}
      onLoad={onMapLoad}
      isDrawerOpen={open}
      view="town"
      // latlongarr={
      //   typeof window !== 'undefined' &&
      //   window?.location?.hash &&
      //   city.gcc?.towns &&
      //   city.gcc.towns[
      //     decodeURI(window.location.hash).slice(1)
      //   ] &&
      //   city.gcc.towns[decodeURI(window.location.hash).slice(1)]
      //     .latlong
      // }
      latlongarr={
        typeof window !== 'undefined' &&
        window?.location?.hash &&
        city.gcc?.towns &&
        city.gcc.towns[decodeURI(townId)] &&
        city.gcc.towns[decodeURI(townId)].latlong
      }
    >
      {map => {
        const zoom = map?.getZoom();
        const isLargePin = zoom > 4;
        const isMediumPin = zoom > 2 && !isLargePin;

        return (
          <Pin
            latitude={
              typeof window !== 'undefined' &&
                window?.location?.hash &&
                city.gcc?.towns &&
                city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                ? city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                  .latlong[1]
                : city.latlongarr[0]
            }
            longitude={
              typeof window !== 'undefined' &&
                window?.location?.hash &&
                city.gcc?.towns &&
                city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                ? city.gcc.towns[decodeURI(window.location.hash).slice(1)]
                  .latlong[0]
                : city.latlongarr[1]
            }
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

export default observer(TownMap);