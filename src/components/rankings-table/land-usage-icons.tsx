import React from 'react';

interface Props {
  iconsSize: string;
}

/**
 * Land Usage Icons component
 * @param iconsSize - size of the icons
 */
const LandUsageIcons: React.FC<Props> = ({ iconsSize }) => {
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
      <div style={{ color: '#99C93C', marginRight: '1rem' }}>
        <i className="fas fa-seedling" />
        Grasses
      </div>
      <div style={{ color: '#3866B0', marginRight: '1rem' }}>
        <i className="fas fa-tint" />
        Water
      </div>
      <div style={{ color: '#CDCDCD' }}>
        <i className="fas fa-mountain" />
        Other
      </div>
    </div>
  );
};
export default LandUsageIcons;
