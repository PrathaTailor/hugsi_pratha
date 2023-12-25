import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import clsx from 'clsx';
import { Town } from '../../models';
import MunicipalityLink from 'components/link/municipality-link';
import CityLink from 'components/link/city-link';
import style from './pin.css';

interface Props {
  latitude: number;
  longitude: number;
  town: Town;
  largePin: boolean;
  mediumPin: boolean;
}

/**
 * Pin component
 * @param latitude - latitude of the city
 * @param longitude - longitude of the city
 * @param city - the city
 * @param largePin - larger pin
 * @param mediumPin - smaller pin
 */
const townPin: React.FC<Props> = ({
  latitude,
  longitude,
  town,
  largePin,
  mediumPin,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { large, semiLarge } = style;
  const className = largePin ? large : mediumPin ? semiLarge : '';
  const offsetTop = largePin ? -15 : mediumPin ? -12 : -8;
  const offsetLeft = largePin ? 15 : mediumPin ? 12 : 8;

  const getCityId = row => {
    return row.gccMunicipalityName;
  };

  return (
    <>
      <Marker
        longitude={longitude}
        latitude={latitude}
        className={style.markerWrapper}
      >
        {/* <MunicipalityLink municipality={town}> */}
        {town?.gccMunicipalityName ? (
          <CityLink cityId={getCityId(town)} municipalityId={town.id}>
            <div
              className={clsx(style.pin, style.marker, className)}
              onMouseOver={() => setPopupVisible(true)}
              onMouseOut={() => setPopupVisible(false)}
            >
              <i className="fas fa-map-marker-alt" />
            </div>
          </CityLink>
        ) : (
          <MunicipalityLink municipality={town}>
            <div
              className={clsx(style.pin, style.marker, className)}
              onMouseOver={() => setPopupVisible(true)}
              onMouseOut={() => setPopupVisible(false)}
            >
              <i className="fas fa-map-marker-alt" />
            </div>
          </MunicipalityLink>
        )}
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
          <div className={style.cityId}>{town.id}</div>
          <div className={style.ranking}>
            {/* {rankingInWordWithNumber(city.index_ranking)} place
             */}
            {/* {town.gemeentenaam} */}
          </div>
        </Popup>
      )}
    </>
  );
};

export default React.memo(townPin);
