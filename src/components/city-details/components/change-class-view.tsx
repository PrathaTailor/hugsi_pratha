import React from 'react';
import { Typography, useMediaQuery, Box } from '@material-ui/core';
import { PieChart, Pie, Cell } from 'recharts';
import { CLASS_LIST, CLASS_CHANGE_LIST } from '../../../models';
import { IconBullet, IconBulletWrapper } from '../../icon-bullets';
import addComma from '../../../utils/add-comma';
// @ts-ignore
import iconCommonClass from '../../../images/icon-common-class.png';
// @ts-ignore
import iconCommonChange from '../../../images/icon-common-change.png';
// @ts-ignore
import upDownIcon from '../../../images/up-down.png';
import { useStyles } from '../style';

const ChangesClassView = ({ city }) => {
  const { smallDemographicGrid, demographicGrid } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:900px)');
  const data03 = [
    { name: 'Group A', value: 100 },
    { name: 'Group B', value: 100 },
    { name: 'Group c', value: 100 },
  ];
  const COLORS3 = ['#e9ebec', '#99c93c', ''];
  const COLORS = [
    {
      start: '#F16B5B',
      mid: '#F0DA67',
      end: '#9DC93E',
    },
  ];
  return (
    <>
      <Box
        style={{
          display: 'flex',
          width: smallScreen ? 'unset' : '100%',
          marginBottom: smallScreen ? 'unset' : '1rem',
          marginTop: '2rem',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}
        >
          City changes and classes
        </span>
      </Box>
      <Box
        style={{
          margin: '40px 0',
          display: 'flex',
          // flexDirection: 'row',
        }}
      >
        <IconBulletWrapper
          style={{
            gridTemplateColumns: '20rem 20rem',
            gap: '40px',
          }}
          pageId={smallScreen ? '' : 'city'}
        >
          <IconBullet
            iconName={upDownIcon}
            title="Negative vs Positive change"
            // content={CLASS_LIST[city.most_common_class]}
            sizeVariant={smallScreen ? 'small' : 'small'}
          />
        </IconBulletWrapper>
      </Box>
      <Box
        style={{
          margin: '40px 0',
          display: 'flex',
          flexDirection: 'row',
          // width: '50%'
        }}
      >
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={[
              {
                name: 'Group B',
                value: city?.change_positive_fraction,
                fill: '#7cb834',
              },
              {
                name: 'Group A',
                value: city?.change_negative_fraction,
                fill: 'rgb(181, 8, 11)',
              },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={70}
            fill="#7cb834"
          // label
          />
        </PieChart>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: smallScreen ? '-6rem 4rem 0' : '0 4rem',
            marginTop: '15px',
          }}
        >
          <Box>
            <Box>
              <Typography
                style={{
                  color: '#5F6A74',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 300,
                  lineHeight: '35px',
                  // marginBottom: '10px',
                  // margin: '0 10px 10px 0',
                }}
                component={'span'}
              >
                Positive change
              </Typography>
            </Box>
            <Box >
              <Typography
                style={{
                  color: '#293845',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 700,
                  lineHeight: '35px',
                  marginTop: '15px'
                  // marginBottom: '20px',
                }}
                component={'span'}
              >
                + {addComma(Math.round(city?.avg_positive_change))} m2
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color: '#5F6A74',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 300,
                  lineHeight: '35px',
                  // margin: '10px 10px 10px 0'
                  marginTop: '20px',
                }}
                component={'span'}
              >
                Negative change
              </Typography>
            </Box>
            <Box >
              <Typography
                style={{
                  color: '#293845',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 700,
                  lineHeight: '35px',
                  marginTop: '15px'
                }}
                component={'span'}
              >
                - {addComma(Math.round(city?.avg_negative_change))} m2
              </Typography>
            </Box>
          </Box>
          <Box style={{ marginLeft: '25px' }}>
            <Box>
              <Typography
                style={{
                  color: '#5F6A74',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 300,
                  lineHeight: '35px',
                  // marginBottom: '10px',
                  // margin: '0 10px 10px 0',
                }}
                component={'span'}
              >
                Change indicator
              </Typography>
            </Box>
            <Box >
              <Typography
                style={{
                  color: '#293845',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 700,
                  lineHeight: '35px',
                  marginTop: '15px'
                  // marginBottom: '20px',
                }}
                component={'span'}
              >
                {city?.change_indicator}
              </Typography>
            </Box>
            <Box>
              <Typography
                style={{
                  color: '#5F6A74',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 300,
                  lineHeight: '35px',
                  // margin: '10px 10px 10px 0'
                  marginTop: '20px',
                }}
                component={'span'}
              >
                Net change
              </Typography>
            </Box>
            <Box >
              <Typography
                style={{
                  color: '#293845',
                  fontSize: smallScreen ? '1rem' : '16px',
                  fontWeight: 700,
                  lineHeight: '35px',
                  marginTop: '15px'
                }}
                component={'span'}
              >
                {addComma(Math.round(city?.net_change_value))} m2
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <IconBulletWrapper
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          // flexDirection: 'column',
          gap: '2rem',
          width: '100%',
        }}
      // className={
      //   smallScreen ? smallDemographicGrid : demographicGrid
      // }
      >
        <IconBullet
          iconName={iconCommonClass}
          title="Most common class"
          infoToolTipTitle="Most common class"
          infoToolTipDetails="The predominant landcover of the city out of trees, grass, water or other/urban."
          content={CLASS_LIST[city.most_common_class]}
          sizeVariant={smallScreen ? 'small' : 'small'}
        />
        <IconBullet
          iconName={iconCommonChange}
          title="Most common change"
          content={CLASS_CHANGE_LIST[city.most_common_change]}
          infoToolTipTitle="Most common change"
          infoToolTipDetails="The predominant type of change in landcover from latest to previous analysis."
          sizeVariant={smallScreen ? 'small' : 'small'}
        />
      </IconBulletWrapper>
    </>
  );
};

export default ChangesClassView;
