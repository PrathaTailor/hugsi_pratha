import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
// @ts-ignore
import backgroundMain from '../../images/partners-background.png';
// @ts-ignore
import smallBackground from '../../images/partner-details-small-background.png';
import style from './header-video.css';

interface Props {
  videoMaxHeight: string;
}

/**
 * Header Video component
 * @param videoMaxHeight - maximum height of the video element
 */
const HeaderVideo: React.FC<Props> = ({ videoMaxHeight }) => {
  const smallScreen = useMediaQuery('(max-width:650px)');

  return (
    <div className={style.videoWrapper}>
      <img
        src={smallScreen ? smallBackground : backgroundMain}
        style={{
          width: '100%',
          marginTop: smallScreen ? '5rem' : '-2rem',
        }}
        alt="Image"
      />
    </div>
  );
};

export default HeaderVideo;
