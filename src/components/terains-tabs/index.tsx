import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandLess';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import { City, TERAIN_CATEGORIES, TERAIN_CATEGORIES_COLORS } from '../../models';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { useStyles } from './style';

interface Props {
  location: any;
  cities: City[];
  activeTerainsIndex: any;
  setActiveTerainsIndex(index: string): void;
  open: boolean;

}
/**
 * Region Tabs component
 * @param cities - list of cities
 * @param activeTerainsIndex - which continent
 * @param setActiveTerainsIndex - set the continent
 */
const TerainsTabs: React.FC<Props> = ({
  activeTerainsIndex,
  setActiveTerainsIndex,
  location,
  open
}) => {
  const { root } = useStyles({});
  const [val, setVal] = useState(activeTerainsIndex);
  const smallScreen = useMediaQuery('(max-width:600px)');
  const iconComponent = props => {
    return <ExpandMoreIcon className={props.className} />;
  };
  useEffect(() => { setVal(location); }, [location]);
  function handleChangeIndex(index) {
    if (val === index) {
      return activeTerainsIndex;
    }
    setVal(index);
    setActiveTerainsIndex(index);
  }
  const TerrainKeys = Object.values(TERAIN_CATEGORIES).filter(item => item !== Number(item));
  // console.log('smallScreen', smallScreen);
  // console.log('open', open);
  return (
    <div className={root}>
      <Box>
        <Box>
          {/* Region */}
          <Select
            variant={'outlined'}
            disableUnderline
            IconComponent={iconComponent}
            defaultValue={val}
          
            style={{
              width: smallScreen ? '8rem' : '10rem',
              margin: smallScreen ? '1rem' : '0rem 0rem 0rem 2.6rem',
              padding: '0px',
              position: 'absolute',
              background: '#fff',
              zIndex: 1,
              bottom: (smallScreen) ? open === true ? '9rem':'11rem': '11rem',

            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
              },
              transformOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              getContentAnchorEl: null
            }}
            value={val}
            onChange={(event, ind2) => {
              handleChangeIndex(event.target.value);
            }}
          >
            {TERAIN_CATEGORIES_COLORS && TerrainKeys.map((index, ind) => (
              <MenuItem value={index} key={`region-${index}`}>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: TERAIN_CATEGORIES_COLORS[ind]
                  }}
                ></span>&emsp;
                {index}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </div>
  );
};

export default TerainsTabs;
