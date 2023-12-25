import React, { useState } from 'react';
import { Box, TextField, Typography, useMediaQuery } from '@material-ui/core';
import { Link } from 'gatsby';
import { useStyles } from './style';

/**
 * Call to Action component
 */
const CallToAction = () => {
  const classes = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [isHover, setIsHover] = useState<boolean>(false);
  const activePage =
    typeof window !== 'undefined' ? window.location.pathname : '';

  const handleOnMouseEnter = () => {
    setIsHover(true);
  };
  const handleOnMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <section className={classes.root}>
      <div className={classes.box}>
        <Typography
          style={{ color: '#fff', fontWeight: 'bold', marginBottom: '2rem' }}
          variant={smallScreen ? 'h5' : 'h4'}
        >
          {!activePage.startsWith('/community')
            ? ``
            : ` Sounds interesting ? Let's begin`}
        </Typography>
        <Typography
          variant={'h4'}
          onMouseLeave={handleOnMouseLeave}
          onMouseEnter={handleOnMouseEnter}
        >
          {activePage.startsWith('/community') ? (
            <Link to="/signup" className={classes.link}>
              Create account
            </Link>
          ) : (
            // <div style={{ display: 'flex' }}>
            //   <div style={{ width: 'auto' }}>
            //     <Typography variant="h3" style={{ color: '#fff' }}>
            //       Want to know more about hugsi?
            //     </Typography>
            //   </div>
            //   <Box>
            //     <TextField inputProps={{
            //       style: {
            //         fontSize: '1.25rem',
            //         borderRadius: '0.5rem',
            //         backgroundColor: 'white',
            //       },
            //     }}
            //       InputLabelProps={{
            //         style: {
            //           color: '#698d29',
            //         },
            //       }}
            //       id="name"
            //       label="Name*"
            //       placeholder="Your Name"
            //       variant="filled">
            //     </TextField>
            //   </Box>
            // </div>
            <a
              style={{ textDecoration: 'none' }}
              className={isHover ? classes.enter : classes.leave}
              href="mailto:hello@hugsi.green?subject=HUGSI"
            >
              hello@hugsi.green
            </a>
          )}
        </Typography>
      </div>
    </section>
  );
};

export default CallToAction;