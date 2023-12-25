import React from 'react';
import HSBar from 'react-horizontal-stacked-bar-chart';
import { Box, useMediaQuery } from '@material-ui/core';
import GSCLandUsageIcons from '../rankings-table/gsc-land-usage-icons';
import * as NumberUtils from '../../utils/number-utils';
import { useStyles } from './style';

interface Props {
  treecanopycoverPercentage: number;
  shrubscoverPercentage: number;
  grasscoverPercentage: number;
  watercoverPercentage: number;
  othercoverPercentage: number;
}

/**
 * GSC Bar Chart component
 * @param treecanopycoverPercentage - tree canopy cover
 * @param shrubscoverPercentage - shrubs cover
 * @param grasscoverPercentage - grass cover
 * @param watercoverPercentage - water cover
 * @param othercoverPercentage - other cover (lands etc.)
 */
const GSCBarGauge: React.FC<Props> = ({
  treecanopycoverPercentage,
  shrubscoverPercentage,
  grasscoverPercentage,
  watercoverPercentage,
  othercoverPercentage,
}) => {
  const smallScreen = useMediaQuery('(max-width:900px)');
  const { barsWrapper } = useStyles({});

  return (
    <section className={barsWrapper}>
      <Box
        marginBottom="3rem"
        width={smallScreen ? '18rem' : 'unset'}
        marginTop="1rem"
      >
        <div
          style={{
            fontSize: smallScreen ? '1rem' : '2.5rem',
          }}
        >
          <HSBar
            height={'2rem'}
            data={[
              {
                value: treecanopycoverPercentage,
                // description: `Trees: ${Math.ceil(treecanopycoverPercentage)}%`,
                description: `Trees: ${NumberUtils.toFixed(
                  treecanopycoverPercentage,
                  2
                )}%`,
                color: '#698d29',
              },
              {
                value: shrubscoverPercentage,
                // description: `Shrubs: ${Math.ceil(shrubscoverPercentage)}%`,
                description: `Shrubs: ${NumberUtils.toFixed(
                  shrubscoverPercentage,
                  2
                )}%`,
                color: '#99c93c',
              },
              {
                value: grasscoverPercentage,
                // description: `Grass: ${Math.ceil(grasscoverPercentage)}%`,
                description: `Grass: ${NumberUtils.toFixed(
                  grasscoverPercentage,
                  2
                )}%`,
                color: '#b7e548',
              },
              {
                value: watercoverPercentage,
                // description: `Water: ${Math.ceil(watercoverPercentage)}%`,
                description: `Water: ${NumberUtils.toFixed(
                  watercoverPercentage,
                  2
                )}%`,
                color: '#3866b0',
              },
              {
                value: othercoverPercentage,
                // description: `Other: ${Math.ceil(othercoverPercentage)}%`,
                description: `Other: ${NumberUtils.toFixed(
                  othercoverPercentage,
                  2
                )}%`,
                color: '#cdcdcd',
              },
            ]}
          />
        </div>
        <Box flex={1}>
          <GSCLandUsageIcons iconsSize={'1rem'} />
        </Box>
      </Box>
    </section>
  );
};
export default GSCBarGauge;
