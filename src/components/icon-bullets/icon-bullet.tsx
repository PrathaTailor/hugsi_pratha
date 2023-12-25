import React from 'react';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import InfoTooltip from '../info-tooltip/info-tooltip';
import { useStyles } from './style';
import { Link } from 'gatsby';

const box = {
  fontWeight: 'bold',
  color: '#424242',
};

interface CategoryItemProps {
  iconName: string;
  content: string | number | React.ReactElement;
  title: string;
  inforToolTipLink: string;
  style?: React.CSSProperties;
  infoToolTipTitle?: string;
  infoToolTipDetails?: any;
  link?: string;
  anchorText?: string;
  open?: boolean;
  sizeVariant?: string;
  mainStyle: React.CSSProperties;
}

/**
 * Icon Bullet component
 * @param iconName - name of the material icon
 * @param content - description of the title
 * @param title - title of the content for the bullet icon
 * @param infoToolTipTitle - title of the content for the dialog box
 * @param infoToolTipDetails - describes the title
 * @param link - external link resource
 * @param anchorText - the name of the link
 */
const IconBullet: React.FC<CategoryItemProps> = ({
  iconName,
  content,
  title,
  infoToolTipTitle,
  infoToolTipDetails,
  inforToolTipLink,
  link,
  anchorText,
  sizeVariant,
  mainStyle
}) => {
  const style = useStyles({});
  const smallScreen = useMediaQuery('(max-width:900px)');

  return (
    <div style={mainStyle} className={smallScreen ? style.smallItem : style.item}>
      <div
        style={{
          width: smallScreen ? '2rem' : '4rem',
          height: smallScreen ? '2rem' : '4rem',
          borderRadius: smallScreen ? '1rem' : '2rem',
          display: 'flex',
          placeContent: 'spaceBetween',
          marginRight:'10px'
        }}
      >
        <img
          src={iconName}
          style={{
            width: smallScreen ? '1.5rem' : '2.5rem',
            height: smallScreen ? '1.5rem' : '2.5rem',
          }}
        />
      </div>
      <div>
        <Box display="flex" flexDirection="row" alignItems="center">
          <span
            className={sizeVariant === 'small' ? style.smallTitle : style.title}
          >
            {title}
          </span>
          {(!!infoToolTipTitle || !!infoToolTipDetails) && (
            <InfoTooltip
              title={infoToolTipTitle}
              details={infoToolTipDetails}
              link={link}
              anchorText={anchorText}
            />
          )}
        </Box>
        <Typography
          variant={'h4'}
          className={sizeVariant === 'small' ? style.smallPlace : style.place}
        >{inforToolTipLink ?
          <Box {...box}><Link to={inforToolTipLink}
           style={{
          color:'rgb(66, 66, 66)'}}> {content} </Link></Box>
          : <Box {...box}>{content}</Box>
        }
         
        </Typography>
      </div>
    </div>
  );
};

export default IconBullet;
