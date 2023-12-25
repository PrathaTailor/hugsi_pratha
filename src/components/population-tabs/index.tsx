import React, { useEffect, useState } from 'react';
import { Select, Box, MenuItem, useMediaQuery, List, ListItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandLess';
import { City, POPULATION_CATEGORIES, POPULATION_CATEGORIES_COLORS } from '../../models';
import { useStyles } from './style';

interface Props {
  location: any;
  cities: City[];
  activePopulationIndex: any;
  setActivePopulationIndex(index: string): void;
  open: boolean;
}

/**
 * Region Tabs component
 * @param cities - list of cities
 * @param activePopulationIndex - which continent
 * @param setActivePopulationIndex - set the continent
 */
const PopulationTabs: React.FC<Props> = ({
  activePopulationIndex,
  setActivePopulationIndex,
  location,
  open
}) => {
  const { root, drawerSPan, listItem } = useStyles({});
  const [val, setVal] = useState(activePopulationIndex);
  const smallScreen = useMediaQuery('(max-width:600px)');
  const iconComponent = props => {
    return <ExpandMoreIcon className={props.className} />;
  };
  useEffect(() => {
    setVal(location);
  }, [location]);

  function handleChangeIndex(index) {
    if (val === index) {
      return activePopulationIndex;
    }
    setVal(index);
    setActivePopulationIndex(index);
  }
  const PopulationKeys = Object.values(POPULATION_CATEGORIES).filter(item => item !== Number(item));
  // const PopulationColors= Object.values(POPULATION_CATEGORIES_COLORS)
  return (
    <div className={root}>
      <Box>
        {/* <List className={drawerSPan} >
          <ListItem className={listItem}>
            <span
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#098011'
              }}
            ></span>
            <Box>Very Low</Box>
          </ListItem>
          <ListItem className={listItem}>
            <span
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#57bf0d'
              }}
            ></span>
            <Box>Low</Box>
          </ListItem>
          <ListItem className={listItem}>
            <span
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#f5f516'
              }}
            ></span>
            <Box>Medium</Box>
          </ListItem>
          <ListItem className={listItem}>
            <span
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#f75b00'
              }}
            ></span>
            <Box>High</Box>
          </ListItem>
          <ListItem className={listItem}>
            <span
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#f70000'
              }}
            ></span>
            <Box>Very High</Box>
          </ListItem>
        </List> */}
        <Box>
          {/* Region */}
          <Select
            variant={'outlined'}
            disableUnderline
            IconComponent={iconComponent}
            defaultValue={val}
            style={{
              width: smallScreen ? '8rem' : '10rem',
              margin: smallScreen ? '1rem' : '0rem 0rem 0rem 40px',
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
            {POPULATION_CATEGORIES_COLORS && PopulationKeys.map((index, ind) => (
              <MenuItem value={index} key={`region-${index}`}>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: POPULATION_CATEGORIES_COLORS[ind]
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

export default PopulationTabs;
