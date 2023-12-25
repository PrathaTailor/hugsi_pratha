import React,{useState} from 'react';
import ReactMapGL, {
    FlyToInterpolator,
    MapLoadEvent,
    ViewState,
    NavigationControl,
  } from 'react-map-gl';
  import { useSiteMetadata } from 'hooks';

function mapDemo() {
    const { mapboxToken } = useSiteMetadata();
    const [viewport, setViewport] = useState({
        latitude: -33.8430479463,
        longitude:  151.0013360359601,
        zoom: 14,
        
      });
  return (
    <ReactMapGL
    {...viewport}
    mapStyle={
      `mapbox://styles/husqvarna-mapbox/cjzxzdczy0n0u1dpa6t57qjw0?optimize=true`
    }
    width={1000}
    height={1000}
    zoom={12}
    // center={[-33.84304794634607, 151.0013360359601]}
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapboxApiAccessToken={ mapboxToken}
    onLoad={(e: MapLoadEvent) => {
      e.target.setCenter([ 151.0013360359601,-33.84304794634607]);
        e.target.addSource('mapbox-terrain', {
        type: 'vector',
        url: 'mapbox://husqvarna-mapbox.4c5mn5gi'
        });
        console.log(e.target.getSource('mapbox-terrain'));
        // e.target.setZoom(5);
        e.target.addLayer({
            source: 'mapbox-terrain',
            id: 'geoJsonStyle',
            type: 'line',
            'source-layer': 'AU_SYD_2021_1-bn925j',
            paint: {
              'line-color': '#cc1010',
              'line-width': 0.5,
              'line-opacity': 1,
            },
            });
        e.target.addLayer({
        id: 'terrain-data',
        type: 'fill',
        source: 'mapbox-terrain',
        'source-layer': 'AU_SYD_2021_1-bn925j',
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
        });
        // });
    }}/>
  );
}

export default mapDemo;