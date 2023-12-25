import React from 'react';

interface Ifixed {
  imageSrc: string;
}

/**
 * Fixed Background Image component
 * @param imageSrc - image to be rendered
 */
const FixedBackgroundImage: React.FC<Ifixed> = ({ imageSrc }) => (
  <div
    style={{
      backgroundImage: `url('${imageSrc}')`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '75vh',
    }}
  />
);

export default FixedBackgroundImage;
