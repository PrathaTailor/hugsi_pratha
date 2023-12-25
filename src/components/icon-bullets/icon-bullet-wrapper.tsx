import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useStyle } from './style';

interface Props {
  style?: React.CSSProperties;
  pageId?: string;
}

/**
 * Icon Bullet Wrapper component
 * @param children - elements (other components)
 * @param style - CSS properties
 */
const IconBulletWrapper: React.FC<Props> = ({ children, style, pageId }) => {
  const usedStyle = useStyle({});
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div
      className={
        pageId === 'city'
          ? usedStyle.cityPageRoot
          : pageId === 'fav'
            ? usedStyle.favRoot
            : smallScreen
              ? usedStyle.smallRoot
              : usedStyle.root
      }
      style={style}
    >
      {children}
    </div>
  );
};

export default IconBulletWrapper;