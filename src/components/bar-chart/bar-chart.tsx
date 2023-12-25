import React from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import HSBar from 'react-horizontal-stacked-bar-chart';
import LandUsageIcons from '../rankings-table/land-usage-icons';
import { useStyles } from './style';

interface Props {
  treecanopycoverPercentage: number;
  grasscoverPercentage: number;
  watercoverPercentage: number;
  othercoverPercentage: number;
}

/**
 * Bar Chart component
 * @param treecanopycoverPercentage - tree canopy cover
 * @param grasscoverPercentage - grass cover
 * @param watercoverPercentage - water cover
 * @param othercoverPercentage - other cover (lands etc.)
 */
const BarGauge: React.FC<Props> = ({
  treecanopycoverPercentage,
  grasscoverPercentage,
  watercoverPercentage,
  othercoverPercentage,
}) => {
  const smallScreen = useMediaQuery('(max-width:900px)');
  const { barsWrapper } = useStyles({});

  return (
    <section className={barsWrapper}>
      <Box
        marginBottom="4rem"
        width={smallScreen ? '16rem' : '100%'}
        marginTop="1rem"
      >
        <div
          style={{
            fontSize: smallScreen ? '1rem' : '0rem',
            marginLeft: smallScreen ? 'unset' : '0rem',
            marginBottom: '1rem',
            width: '100%'
          }}
        >
          <HSBar
            height={'2rem'}
            data={[
              {
                value: treecanopycoverPercentage,
                description: `Trees: ${Math.floor(
                  treecanopycoverPercentage * 100
                )}%`,
                color: '#698d29',
              },
              {
                value: grasscoverPercentage,
                description: `Grass: ${Math.floor(
                  grasscoverPercentage * 100
                )}%`,
                color: '#99c93c',
              },
              {
                value: watercoverPercentage,
                description: `Water: ${Math.floor(
                  watercoverPercentage * 100
                )}%`,
                color: '#3866b0',
              },
              {
                value: othercoverPercentage,
                description: `Other: ${Math.floor(
                  othercoverPercentage * 100
                )}%`,
                color: '#cdcdcd',
              },
            ]}
          />
        </div>
        <Box style={{ float: smallScreen ? 'unset' : 'left' }} flex={1}>
          <LandUsageIcons iconsSize={'1rem'} />
        </Box>
      </Box>
    </section>
  );
};
export default BarGauge;