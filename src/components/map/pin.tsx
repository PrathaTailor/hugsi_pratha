import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import clsx from 'clsx';
import { City } from '../../models';
import CityLink from 'components/link/city-link';
import { rankingInWordWithNumber } from 'utils/city-utils';
import style from './pin.css';
interface Props {
  latitude: number;
  longitude: number;
  city: City;
  largePin: boolean;
  mediumPin: boolean;
  mapView: string;
  region: string;
}

/**
 * Pin component
 * @param latitude - latitude of the city
 * @param longitude - longitude of the city
 * @param city - the city
 * @param largePin - larger pin
 * @param mediumPin - smaller pin
 */
const Pin: React.FC<Props> = ({
  latitude,
  longitude,
  city,
  region,
  largePin,
  mediumPin,
  mapView
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { large, semiLarge } = style;
  const className = largePin ? large : mediumPin ? semiLarge : '';
  const offsetTop = largePin ? -15 : mediumPin ? -12 : -8;
  const offsetLeft = largePin ? 15 : mediumPin ? 12 : 8;
  let marker = '#698d29';
  if (mapView === 'population') {
    if (city.categ_population === 'Less than 500 (Very Low)') {
      // marker = '#698d29'
      marker = '#098011';
    } else if (city.categ_population === '500-1500 (Low)') {
      // marker = '#ffd700'
      marker = '#57bf0d';
    } else if (city.categ_population === '1500-3000 (Medium)') {
      // marker = '#E8870E'
      marker = '#FEE80C';
    } else if (city.categ_population === '3000-5000 (High)') {
      // marker = '#ffd700'
      marker = '#f75b00';
    } else if (city.categ_population === '5000 and above (Very High)') {
      // marker = '#FF0202'
      marker = '#f70000';
    } else {
      marker = '#698d29';
    }
  } else {
    marker;
  }

  const styleMarker = {
    color: marker,
    stroke: marker,
    fill: marker
  };
  return (
    <>
      <Marker
        longitude={longitude}
        latitude={latitude}
        className={style.markerWrapper}
      >
        <CityLink cityId={city.id}>
          <div
            style={styleMarker}
            className={clsx(style.pin, className)}
            onMouseOver={() => setPopupVisible(true)}
            onMouseOut={() => setPopupVisible(false)}
          >
            <i className="fas fa-map-marker-alt" />
          </div>
        </CityLink>
      </Marker>
      {popupVisible && (
        <Popup
          className={style.cityPopup}
          longitude={longitude}
          latitude={latitude}
          anchor="left"
          offsetTop={offsetTop}
          offsetLeft={offsetLeft}
          closeButton={false}
        >
          <div className={style.cityId}>{city.id}</div>
          <div className={style.ranking}>
            {city.index_ranking && city.regional_ranking ? (
              mapView
              ? `${rankingInWordWithNumber(city.index_ranking)} place`
              : `${rankingInWordWithNumber(city.regional_ranking)} place`
            ) : '-'}
            {/* {city.index_ranking &&
              `${rankingInWordWithNumber(city.index_ranking)} place`}
            {region && city.regional_ranking &&
              `${rankingInWordWithNumber(city.regional_ranking)} place`} */}
          </div>
        </Popup>
      )}
    </>
  );
};

export default React.memo(Pin);