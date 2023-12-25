import React from 'react';
import { Button, Box, useMediaQuery, Typography } from '@material-ui/core';
import { Link } from 'gatsby';
import { useStyles } from './style';

/**
 * Related Articles component
 */
const RelatedArticles = () => {
  const { boxWrappers } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      style={{
        marginTop: '4rem',
      }}
    >
      <Typography variant={'h5'} style={{ margin: '1rem 0' }}>
        <Box fontWeight={'fontWeightBold'} color={'#424242'}>
          Related Articles
        </Box>
      </Typography>
      <div className={boxWrappers}></div>
      <div
        style={{
          margin: '2rem 0',
          display: 'flex',
          justifyContent: smallScreen ? 'center' : 'flex-end',
        }}
      >
        <Button
          variant="contained"
          color={'primary'}
          style={{
            color: 'white',
            margin: '1rem 0',
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#99c93c',
          }}
          size={'large'}
          to="/stories"
          component={Link}
        >
          See all articles
        </Button>
      </div>
    </Box>
  );
};

export default RelatedArticles;
