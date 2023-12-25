import { Box, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './style';

/**
 * How It Works component
 */
const HowItWorks = () => {
  const { root, box, icon } = useStyles({});
  return (
    <section style={{ margin: '2rem 0' }}>
      <Typography variant={'h4'} style={{ margin: '2rem 0' }}>
        <Box fontWeight={'fontWeightBold'} color={'white'}>
          How it works
        </Box>
      </Typography>
      <div className={root}>
        <div className={box}>
          <Icon className={clsx(icon, 'fa fa-globe')} color="primary" />
          <Typography variant={'h6'} style={{ margin: '1rem 0' }}>
            What is Lorem Ipsum?
          </Typography>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Typography>
        </div>
        <div className={box}>
          <Icon className={clsx(icon, 'fa fa-camera')} color="primary" />
          <Typography variant={'h6'} style={{ margin: '1rem 0' }}>
            Why do we use it?
          </Typography>
          <Typography>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{' '}
          </Typography>
        </div>
        <div className={box}>
          <Icon className={clsx(icon, 'fa fa-eye')} color="primary" />
          <Typography variant={'h6'} style={{ margin: '1rem 0' }}>
            Where does it come from?
          </Typography>
          <Typography>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Typography>
        </div>
        <div className={box}>
          <Icon className={clsx(icon, 'fa fa-user')} color="primary" />
          <Typography variant={'h6'} style={{ margin: '1rem 0' }}>
            Where can I get some?
          </Typography>
          <Typography>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
