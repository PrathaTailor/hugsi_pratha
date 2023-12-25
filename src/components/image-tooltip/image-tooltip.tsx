import React, { useState } from 'react';
import {
  Typography, Tooltip, withStyles,
  useMediaQuery, ClickAwayListener
} from '@material-ui/core';

export interface IInfoTooltip {
  title?: string;
  details?: string;
  link?: string;
  anchorText?: string;
  iconClass?: string;
  badgeId?: string;
}

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#293845',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '12rem',
    fontSize: theme.typography.pxToRem(12),
    borderRadius: '0.5rem',
  },
}))(Tooltip);

/**
 * Info Tooltip component
 * @param title - title of the dialog
 * @param details - description of the title
 * @param link - external link resource
 * @param anchorText - name of the link itself
 */
const InfoTooltip: React.FC<IInfoTooltip> = ({
  title,
  details,
  link,
  anchorText,
  iconClass,
  badgeId,
}) => {
  const smallScreen = useMediaQuery('(max-width:900px)');

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsOpen(false);
      }}
    >
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        style={{
          display: 'flex',
          placeContent: 'center',
          placeItems: 'center',
        }}
      >
        <HtmlTooltip
          open={isOpen}
          interactive={true}
          title={
            <div
              style={{
                padding: '0.5rem',
                borderRadius: '0.75rem',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant={'body1'}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant={'subtitle1'}
                style={{
                  color: 'white',
                }}
              >
                {details}
                {/* {' '} */}
                {anchorText && (
                  <a href={link} target="_blank">
                    {anchorText}
                  </a>
                )}
              </Typography>
            </div>
          }
        >
          <i
            className={iconClass || 'fas fa-question'}
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '0.5rem',
            }}
          />
        </HtmlTooltip>
        <img
          src={require(`../../images/${badgeId}.png`)}
          style={{
            height: smallScreen ? '3.5rem' : '5rem',
            width: smallScreen ? '3.5rem' : '5rem',
          }}
          alt="Husqvarna logo"
        ></img>
      </div>
    </ClickAwayListener>
  );
};

export default InfoTooltip;
