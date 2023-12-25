import React, { useState } from 'react';
import { Typography, Tooltip, withStyles, ClickAwayListener } from '@material-ui/core';

export interface IInfoTooltip {
  title?: string;
  details?: any;
  link?: string;
  anchorText?: string;
  iconClass?: string;
}

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#fafcf5',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 340,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: '0.5rem',
    boxShadow: '0.1rem 0.1rem #d3d3d3',
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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          marginLeft: '0.5rem',
          width: '1rem',
          height: '1rem',
          background: '#99c93c',
          borderRadius: '0.5rem',
          display: 'flex',
          placeContent: 'center',
          placeItems: 'center',
          cursor: 'pointer',
        }}
      >
        <HtmlTooltip
          open={isOpen}
          interactive={true}
          title={
            <div
              style={{
                padding: '2rem',
                borderRadius: '0.75rem',
              }}
            >
              <Typography
                variant={'h6'}
                style={{
                  color: '#424242',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant={'body1'}
                style={{
                  color: '#424242',
                  wordWrap: 'break-word',
                }}
              >
                {details}{' '}
                {
                  <a href={link} target="_blank">
                    {anchorText}
                  </a>
                }
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
      </div>
    </ClickAwayListener>
  );
};

export default InfoTooltip;
