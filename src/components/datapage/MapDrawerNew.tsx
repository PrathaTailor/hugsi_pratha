import { List, ListItem } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// @ts-ignore
import standard_one from '../../images/_Standard (1).svg';
// @ts-ignore
import standard from '../../images/_Standard.svg';
// @ts-ignore
import terrain from '../../images/_Terrain.svg';
// @ts-ignore
import population from '../../images/_Population.svg';
// @ts-ignore
import population_one from '../../images/_Population_one.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { Link } from 'gatsby';
import { smallScreen } from 'components/interaction-blocker/interaction-blocker.css';

interface Props {
  mapView: string;
  city: string;
  open: boolean;
}
const useStyles = makeStyles(() =>
  createStyles({
    smalldrawerSPan: {
      position: 'absolute',
      bottom: '-4px',
      left: '0px',
      display: 'flex',
      cursor: 'pointer',
    },
    opendrawerSpan: {
      position: 'absolute',
      bottom: '-10px',
      left: '0px',
      display: 'flex',
      cursor: 'pointer',
    },
    drawerSPan: {
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      display: 'flex',
      cursor: 'pointer',
      paddingBottom: '0px',
      marginLeft: '20px',
    },
    cursor: {
      cursor: 'default',
    },
  })
);

const MapDrawerNew: React.FC<Props> = props => {
  const { mapView, city, open } = props;
  const smallScreen = useMediaQuery('(max-width:600px)');
  const { drawerSPan, cursor, smalldrawerSPan, opendrawerSpan } = useStyles({});
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  return (
    <>
      {openViewDrawer ? (
        <>
          <List
            component="nav"
            className={
              smallScreen
                ? open === false
                  ? smalldrawerSPan
                  : opendrawerSpan
                : drawerSPan
            }
            onClick={() => setOpenViewDrawer(!openViewDrawer)}
          >
            <ListItem
              style={{
                padding: '0px',
              }}
            >
              <Link
                to={`/ranking?mapView=standard&filter=All&region=All&tags=`}
              >
                <img src={standard_one} />
              </Link>
            </ListItem>
            <ListItem
              style={{
                padding: '0px',
              }}
            >
              <Link to={`/ranking?mapView=terains&filter=All&region=All&tags=`}>
                <img src={terrain} />
              </Link>
            </ListItem>
            <ListItem
              style={{
                padding: '0px',
              }}
            >
              <Link
                to={`/ranking?mapView=population&filter=All&region=All&tags=`}
              >
                <img src={population} />
              </Link>
            </ListItem>
          </List>
        </>
      ) : (
        <List
          component="nav"
          className={`${
            smallScreen
              ? open === false
                ? smalldrawerSPan
                : opendrawerSpan
              : drawerSPan
          } third-step`}
          onClick={() => setOpenViewDrawer(!openViewDrawer)}
        >
          {mapView === 'standard' ? (
            <ListItem
              style={{
                padding: '0px',
              }}
            >
              <img src={standard} />
            </ListItem>
          ) : (
            <></>
          )}
          {mapView === 'terains' ? (
            <ListItem
              style={{
                padding: '0px',
              }}
            >
              <img src={terrain} />
              <svg
                style={{ marginLeft: '-31px', marginTop: '-15px' }}
                width="19"
                height="32"
                viewBox="0 0 19 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0H15C17.2091 0 19 1.79086 19 4V28C19 30.2091 17.2091 32 15 32H0V0Z"
                  fill="white"
                />
                <path
                  d="M8.875 20.625C8.69922 20.625 8.54297 20.5664 8.42578 20.4492C8.17187 20.2148 8.17187 19.8047 8.42578 19.5703L11.7266 16.25L8.42578 12.9492C8.17187 12.7148 8.17187 12.3047 8.42578 12.0703C8.66016 11.8164 9.07031 11.8164 9.30469 12.0703L13.0547 15.8203C13.3086 16.0547 13.3086 16.4648 13.0547 16.6992L9.30469 20.4492C9.1875 20.5664 9.03125 20.625 8.875 20.625Z"
                  fill="#293845"
                />
              </svg>
            </ListItem>
          ) : (
            <></>
          )}
          {mapView === 'population' ? (
            <ListItem
              style={{
                padding: '0px',
              }}
            >
              <img src={population_one} />
              <svg
                style={{ marginLeft: '-42px', marginTop: '-15px' }}
                width="19"
                height="32"
                viewBox="0 0 19 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0H15C17.2091 0 19 1.79086 19 4V28C19 30.2091 17.2091 32 15 32H0V0Z"
                  fill="white"
                />
                <path
                  d="M8.875 20.625C8.69922 20.625 8.54297 20.5664 8.42578 20.4492C8.17187 20.2148 8.17187 19.8047 8.42578 19.5703L11.7266 16.25L8.42578 12.9492C8.17187 12.7148 8.17187 12.3047 8.42578 12.0703C8.66016 11.8164 9.07031 11.8164 9.30469 12.0703L13.0547 15.8203C13.3086 16.0547 13.3086 16.4648 13.0547 16.6992L9.30469 20.4492C9.1875 20.5664 9.03125 20.625 8.875 20.625Z"
                  fill="#293845"
                />
              </svg>
            </ListItem>
          ) : (
            <></>
          )}
        </List>
      )}
    </>
  );
};

export default MapDrawerNew;
