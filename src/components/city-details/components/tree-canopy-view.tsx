import React from 'react';
import {
  Button,
  Checkbox,
  useMediaQuery,
  Box,
  withStyles,
} from '@material-ui/core';
import * as NumberUtils from '../../../utils/number-utils';
import { IconBullet } from '../../icon-bullets';
import addComma from '../../../utils/add-comma';
// @ts-ignore
import iconTrees from '../../../images/icon-trees.png';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';
// @ts-ignore
import iconHealth from '../../../images/icon-health.png';
import { useStyles } from '../style';
const HealthIndicator = withStyles({
  root: {
    color: '#99c93c',
    width: '0rem',
    height: '0rem',
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderBottom: '12px solid #99c93c',
    marginBottom: '0.5rem',
  },
})(ArrowDropUpSharpIcon);

const TreeCanopyView = ({ city, handleMapViewClick }) => {
  const {
    demographicGrid,
    smallDemographicGrid
  } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:900px)');
  return (
    <>
      <Box
        style={{
          display: 'flex',
          width: smallScreen ? 'unset' : '100%',
          marginBottom: smallScreen ? 'unset' : '1rem',
          marginTop: '2rem',
          justifyContent: 'between',
        }}
      >
        <span
          style={{
            width: '50%',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          Tree canopy view
        </span>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >

        <IconBullet
          iconName={iconHealth}
          title="Average health of urban canopy"
          content={' '}
          infoToolTipTitle="Average health of urban canopy"
          infoToolTipDetails="HUGSI measures health of
  vegetation with NDVI, a widely used indicator of vegetation health
  based on the absorption of visible and invisible light. NDVI value of
  living vegetation ranges from 0 to 1."
          sizeVariant={smallScreen ? 'small' : 'small'}
        />

        <Button
          style={{
            border: 'none',
            display: 'flex',
            // justifyContent: 'flex-start',
            alignItems: 'center',
            textTransform: 'none',
          }}
        >
          <label>
            <Checkbox
              icon={
                <i
                  className="fas fa-map"
                  style={{
                    marginLeft: '0.5em',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                ></i>
              }
              checkedIcon={
                <i
                  className="fas fa-map"
                  style={{
                    marginLeft: '0.5em',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                ></i>
              }
              name="viewVitalityMap"
              onChange={e => {
                console.log(e.target.checked);
                handleMapViewClick(
                  e.target.checked
                    ? 'tree_vitality_category'
                    : 'tree_gradient_category'
                );
              }}
            />
            View vitality heatmap
          </label>
        </Button>

      </Box>
      <Box
        style={{
          marginLeft: smallScreen ? 'unset' : '5.2rem',
          width: smallScreen ? '18rem' : 'calc(100% - 90px)',
        }}
      >
        <Box
          style={{
            height: '0.7rem',
            backgroundImage:
              'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',

            margin: '1rem auto',
          }}
        ></Box>
        <Box
          style={{
            marginLeft: `${city.ndvi_tree_canopy * 100}%`,
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '4rem',
              maxWidth: '4rem',
            }}
          >
            <HealthIndicator />

            <Box
              style={{
                fontWeight: 'bold',
                fontSize: '1.4rem',
                marginLeft: '-0.5rem',
              }}
            >
              {NumberUtils.toFixed(city.ndvi_tree_canopy, 2)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',

        }}
        className={
          smallScreen ? smallDemographicGrid : demographicGrid
        }
      >

        <IconBullet
          iconName={iconTrees}
          title="Urban canopy cover percentage"
          infoToolTipTitle="Urban canopy cover percentage"
          infoToolTipDetails="The predominant landcover of the city out of trees, grass, water or other/urban."
          content={NumberUtils.toPercentage(
            city.treecanopycover_percentage
          )}
          sizeVariant={smallScreen ? 'small' : 'small'}
          style={{
            display: 'flex',
          }}
        />

        {/* <IconBullet
          iconName={iconTrees}
          title="Urban canopy vitality"
          content={NumberUtils.toPercentage(
            city.ndvi_tree_canopy
          )}
          infoToolTipTitle="Urban canopy vitality"
          infoToolTipDetails="The predominant type of change in landcover from latest to previous analysis."
          sizeVariant={smallScreen ? 'small' : 'small'}
          style={{
            display: 'flex',
          }}
        /> */}
        <IconBullet
          iconName={iconTrees}
          title="Urban canopy cover km2"
          infoToolTipTitle="Urban canopy cover percentage"
          infoToolTipDetails="The predominant landcover of the city out of trees, grass, water or other/urban."
          content={`${addComma(Math.round(city?.treecanopycover))} km²`}
          sizeVariant={smallScreen ? 'small' : 'small'}
          style={{
            display: 'flex',
          }}
        />
      </Box>
    </>
  );
};

export default TreeCanopyView;