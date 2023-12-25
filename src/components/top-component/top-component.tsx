import React from 'react';
import css from './top-component.css';

interface Props {
  height?: string;
  maxHeight?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Top Component
 * @param height - height of the top component
 * @param maxHeight - maximum height of the top component
 * @param style - CSS properties
 * @param children - components
 */
const TopComponent: React.FC<Props> = ({
  height,
  maxHeight,
  style,
  children,
}) => (
  <div className={css.TopComponent} style={{ height, maxHeight, ...style }}>
    {children}
  </div>
);

export default TopComponent;
