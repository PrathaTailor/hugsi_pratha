import React from 'react';
import { Link } from 'gatsby';
interface Props {
  style?: React.CSSProperties;
}

/**
 * City Comparison Link component
 * @param style - css properties
 * @param children - components
 */
const CityComparisonLink: React.FC<Props> = ({
  style = { textDecoration: 'none', color: '#698d29' },
  children,
}) => {
  return (
    <Link to={'/compare'} style={style}>
      {children}
    </Link>
  );
};

export default CityComparisonLink;
