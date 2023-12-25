import React from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { City } from '../../models';
import { useStyles } from './style';

const box = {
  fontWeight: 'fontWeightBold',
};

const boxGreen = {
  ...box,
  color: '#ffffff',
};

const boxGrey = {
  ...box,
  color: '#ffffff',
  fontWeight: '500',
};

interface ItemProps {
  className: any;
  text: string | number;
  value: string | number;
}

/**
 * Counter Item component
 * @param className - CSS properties
 * @param text - name description
 * @param value - total number of being describe
 */
const CounterItem: React.FC<ItemProps> = ({ className, text, value }) => (
  <Box className={className}>
    <Typography color="secondary" style={{ fontSize: '2rem' }}>
      <Box {...boxGreen}>{value}</Box>
    </Typography>
    <Typography variant="h6">
      <Box {...boxGrey}>{text}</Box>
    </Typography>
  </Box>
);

interface Props {
  cities: City[];
}
/**
 * Counter component
 * @param cities - list of cities
 */
const Counter: React.FC<Props> = ({ cities }) => {
  const smallScreen = useMediaQuery('(max-width:600px)');
  const mobileScreen = useMediaQuery('(width:768px)');
  const { root, smallRoot, mediumRoot, content } = useStyles({});

  return (
    <section className={smallScreen ? smallRoot : mobileScreen ? mediumRoot : root}>
      <CounterItem className={content} value={cities.length} text="cities" />
      <CounterItem className={content} value="60" text="countries" />
      <CounterItem className={content} value="7" text="regions" />
    </section>
  );
};

export default Counter;
