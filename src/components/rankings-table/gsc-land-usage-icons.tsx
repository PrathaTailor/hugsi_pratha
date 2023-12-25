import React from 'react';
import { IconBullet, IconBulletWrapper } from '../../components/icon-bullets';

interface Props {
  iconsSize: string;
}

/**
 * Land Usage Icons component
 * @param iconsSize - size of the icons
 */
const GSCLandUsageIcons: React.FC<Props> = ({ iconsSize }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: iconsSize,
      }}
    >
      <div style={{ color: '#698D29', marginRight: '1rem' }}>
        <i className="fas fa-tree" />
        Trees
      </div>
      <div style={{ color: '#b7e548', marginRight: '1rem' }}>
        <i className="fas fa-seedling" />
        Shrubs
      </div>
      <div style={{ color: '#99C93C', marginRight: '1rem' }}>
        <i className="fas fa-leaf" />
        Grass and lower shrubs
      </div>

      <div style={{ color: '#3866B0', marginRight: '1rem' }}>
        <i className="fas fa-tint" />
        Water
      </div>
      <div style={{ color: '#CDCDCD' }}>
        <i className="fas fa-mountain" />
        Build and paved area
      </div>
    </div>
  );
};
export default GSCLandUsageIcons;
