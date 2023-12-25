import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CategoryWinners from '../category-winners/category-winners';
import { City, CONTINENT_NAMES } from '../../models';
import {
  Select,
  Button,
  Typography,
  Box,
  MenuItem,
  useMediaQuery,
  Popover,
  ButtonGroup,
  IconButton,
} from '@material-ui/core';
import { useStyles } from './style';
import useCities from 'hooks/cities';
import { Close } from '@material-ui/icons';
import queryString from 'query-string';

interface Props {
  displayCategory?: boolean;
  displayCompareLink?: boolean;
  tags: string;
  location: any;
  cities: City[];
  activeContinentVal: string;
  activeContinentIndex: any;
  setActiveContinentIndex(index: string): any;
}
/**
 * Region Tabs component
 * @param cities - list of cities
 * @param activeContinentIndex - which continent
 * @param setActiveContinentIndex - set the continent
 */
const RegionTabs: React.FC<Props> = ({
  cities,
  activeContinentIndex,
  setActiveContinentIndex,
  displayCategory,
  tags,
  displayCompareLink,
  location,
}) => {
  const { root, hoverButton, compareBtn, smallCompareBtn } = useStyles({});
  const [val, setVal] = useState(activeContinentIndex);
  const smallScreen = useMediaQuery('(max-width:600px)');
  const { cityStore } = useCities();
  const [selected, setSelected] = useState('');
  const [filter, setFilter] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [params, setParams] = useState({
    mapView: 'standard',
    filter: 'All', 
    region: 'All',
    tags: '',
  });
// console.log(val,'###');
// console.log(tags);
console.log(params.tags);
// console.log(selected);


    
  const filters = Object.keys(cityStore.cities[0]).filter(item =>
    item?.startsWith('is')

  );

  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const ContinentKeys = Object.values(CONTINENT_NAMES).filter(
    item => item !== Number(item)
  );
  useEffect(() => {
    setVal(location);
  }, [location]);
  // moves the menu below the select input

  const iconComponent = props => {
    return <ExpandMoreIcon className={props.className} />;
  };
  function handleChangeIndex(index) {
    if (val === index) {
      return activeContinentIndex;
    }
    setVal(index);
    setActiveContinentIndex(index);
  }

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    // @ts-ignore
    setParams(urlParams);
  }, [window.location.search]);

  const handleOnClick = tags => {
    setParams(tags)
    if(tags === params.tags){
      setClicked(false);
      setSelected('')
      navigate(`/ranking?mapView=standard&region=${val}&filter=All&tags=${''}`);
    }else{
      setClicked(true);
      setSelected(tags);
      navigate(`/ranking?mapView=standard&region=${val}&filter=All&tags=${tags}`);
    }
    setFilter([...filter, selected]);  
  };
  
  useEffect(() => {
   if(params.tags) {
    setSelected(params.tags)
   }
    
  },[params.tags]) 

  return (
    <div className={root}>
      <Box>
        <Box >
          <Box style={{
            display: 'flex',
            alignItems: 'center',
          }}>
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
                background: '#fff',
                zIndex: 1,
              }}
              className="forth-step"
              value={val}
              onChange={event => {
                handleChangeIndex(event.target.value);
              }}
            >
              {ContinentKeys.map(index => (
                <MenuItem value={index} key={`region-${index}`}>
                  {index}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              style={{
                marginLeft: '20px',
                textTransform: 'none',
                width: 'auto',
                height: '55px',
                borderRadius: '10px',
                padding: '13px 24px',
                color: 'white',
                backgroundColor: '#698D29',
              }}
              aria-describedby={id}
              onClick={handleClick}
              className="fifth-step"
            >
              <Typography variant="body2" style={{ fontWeight: 700 }}>
                Filter by tags
              </Typography>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                style: {
                  padding: '50px 45px',
                },
              }}
            >
              <Box
                display="flex"
                style={{
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '40px',
                  }}
                >
                  Select a tag
                </Typography>
                <Close
                  onClick={() => handleClose()}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
              <ButtonGroup style={{ gap: '20px' }}>
                {filters &&
                  filters.map(tags => {
                    return (
                      <Button
                        variant="contained"
                        className={hoverButton}
                        onClick={() => {
                          handleOnClick(tags);
                        
                        }}
                        style={{
                          color:
                            clicked === true &&
                              selected === tags &&
                              params.tags
                              ? '#fff'
                              : 'unset',
                          backgroundColor:
                            // clicked === true &&
                            //   selected === tags &&
                              params.tags === tags
                              ? '#99c93c'
                              : 'rgb(244, 245, 245)',
                          fontWeight:
                            clicked === true &&
                              selected === tags &&
                              params.tags
                              ? 'bold'
                              : 'normal',
                          borderRadius: '25px',
                        }}
                      >
                        {tags === 'isTreeCity' ? 'TreeCities of the world' :
                          tags
                            .replace('is', '')
                            .split(/(?=[A-Z])/)
                            .join(' ')}
                      </Button>
                    );
                  })}
                {/* <Button variant="contained" onClick={(e) => {
                  setSelected('isMegaCity')
                  setFilter([...filter, selected])
                }} className={hoverButton} size="small">   City :{selected}</Button>
                <Button variant="contained" onClick={(e) => {
                  setSelected('isC40')
                  setFilter([selected])
                }} className={hoverButton} size="small">C40</Button>
                <Button variant="contained" onClick={(e) => {
                  setSelected('isClimateAlliance')
                  setFilter([selected])
                }} className={hoverButton} size="small">Climate Alliance</Button>

                <Button variant="contained" onClick={(e) => {
                  setSelected('isTreeCity')
                  setFilter([selected])
                }} className={hoverButton} size="small">Tree City</Button> */}
              </ButtonGroup>
            </Popover>
          </Box>
          {displayCompareLink && (
            <Button
              className={smallScreen ? smallCompareBtn : compareBtn}
              size={'large'}
              component={Link}
              to="/compare/?_vs_"
            >
              <Typography
                style={{
                  color: '#698d29',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                Compare cities
              </Typography>
              <ArrowForward
                style={{
                  marginLeft: '0.5em',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                }}
              />
            </Button>
          )}
        </Box>
      </Box>
      {displayCategory && (
        <div style={{ fontSize: '0.875rem' }}>
          <CategoryWinners cities={cities} />
        </div>
      )}
    </div>
  );
};

export default RegionTabs;