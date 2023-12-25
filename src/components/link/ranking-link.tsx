import React from 'react';
import { Link } from 'gatsby';

export const getRankingURL = params => {
  return `/ranking?${params}`;
};

interface Props {
  continentName: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Ranking Link component
 * @param continentName - continent of the city
 * @param className - CSS properties
 * @param style - CSS properties
 * @param children - components
 */
const RankingLink: React.FC<Props> = ({
  continentName,
  className,
  style,
  children,
}) => {
  return (
    <Link to={getRankingURL(continentName)} className={className} style={style}>
      {children}
    </Link>
  );
};

export default RankingLink;
