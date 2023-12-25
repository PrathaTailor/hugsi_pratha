import React from 'react';
import { Link } from 'gatsby';

export const getCityURL = (cityId: string) => {
  return `/city/?${cityId}`;
};

export const getMunicipalityURL = (cityId: string, municipalityId: string) => {
  return `/city/?${cityId}#${municipalityId}`;
};

interface Props {
  cityId: string;
  style?: React.CSSProperties;
  municipalityId?: string;
}

/**
 * City Link component
 * @param cityId - this is the city name
 * @param style - css properties
 * @param children - components
 */
const CityLink: React.FC<Props> = ({
  cityId,
  style = { textDecoration: 'none', color: '#698d29', fontSize: '1.2rem' },
  children,
  municipalityId,
}) => {

  return (
    <Link
      to={
        municipalityId
          ? getMunicipalityURL(cityId, municipalityId)
          : getCityURL(cityId)
      }
      style={style}
    >
      {children}
    </Link>
  );
};

export default CityLink;