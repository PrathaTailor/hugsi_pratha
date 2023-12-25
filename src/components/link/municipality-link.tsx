import React from 'react';
import { Link } from 'gatsby';

export const getMunicipalityURL = municipality => {
  return `/municipality/?${municipality?.municipalityId}/#${municipality?.id}`;
};

interface Props {
  municipality: any;
  style?: React.CSSProperties;
}

/**
 * City Link component
 * @param municipalityId - this is the municipality name
 * @param style - css properties
 * @param children - components
 */
const MunicipalityLink: React.FC<Props> = ({
  municipality,
  style = { textDecoration: 'none', color: '#698d29', fontSize: '1.2rem' },
  children,
}) => {
  return (
    <Link to={getMunicipalityURL(municipality)} style={style}>
      {children}
    </Link>
  );
};

export default MunicipalityLink;
