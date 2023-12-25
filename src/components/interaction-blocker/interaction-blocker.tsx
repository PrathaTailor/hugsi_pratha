import React, { useState } from 'react';
import clsx from 'clsx';
import { useMediaQuery, Typography } from '@material-ui/core';
import style from './interaction-blocker.css';

export interface IInteractionBlocker {
  viewType?: string;
}
/**
 * Interaction Blocker component
 */
const InteractionBlocker: React.FC<IInteractionBlocker> = ({ viewType }) => {
  const [display, setDisplay] = useState<boolean>(true);
  const smallScreen = useMediaQuery('(max-width:700px)');
  const onClick = () => {
    setDisplay(false);
  };

  if (!display) {
    return null;
  }

  return (
    <div
      className={clsx(style.InteractionBlocker, {
        [style.smallScreen]: smallScreen,
      })}
      onClick={onClick}
    >
      <span
        className={style.text}
        style={{ left: viewType === 'vertical' ? '20%' : '50%' }}
      >
        <Typography variant="h4">Click to interact with the map</Typography>
      </span>
      <div className={style.background} />
    </div>
  );
};

export default InteractionBlocker;
