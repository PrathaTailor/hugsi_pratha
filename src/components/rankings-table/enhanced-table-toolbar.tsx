import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { lighten } from '@material-ui/core/styles';
import ArrowForward from '@material-ui/icons/ArrowForward';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import Button from '@material-ui/core/Button';
import { Link } from 'gatsby';
import { ButtonGroup } from '@material-ui/core';

const useToolbarStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    headerTitle: {
      marginBottom: '5px',
    },
  })
);

const box = {
  fontWeight: 'fontWeightBold',
  color: '#424242',
};

interface EnhancedTableToolbarProps {
  numSelected: number;
  type?: string;
  handleMapViewClick: any;
}

/**
 * Enhanced Table Toolbar
 * @param numSelected - which is selected
 */
const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  numSelected,
  type,
  handleMapViewClick,
}) => {
  const smallScreen = useMediaQuery('(max-width:600px)');
  const classes = useToolbarStyles({});

  return (
    <section className={clsx(classes.headerTitle)}>
      {type === 'category' ?
        <>
          <Button
            onClick={handleMapViewClick}
            style={{
              textTransform: 'none',
              fontWeight: 'bold',
              float: smallScreen ? 'none' : 'right',
              // backgroundColor: 'white',
              alignItems: 'center',
              alignContent: 'center',
              textDecoration: 'none',
              margin: smallScreen ? '1rem 0' : '0',
            }}
            size={'large'}
          >
            <Typography
              style={{
                color: '#698d29',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              {type === 'category' ? 'Full ranking' : ''}
            </Typography>
            <ArrowForward
              style={{
                marginLeft: '0.5em',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            />
          </Button>
        </>
        :
        <>
          <Button            
            style={{
              color: '#698d29',
              textTransform: 'none',
              fontWeight: 'bold',
              float: smallScreen ? 'none' : 'right',
              // backgroundColor: 'white',
              alignItems: 'center',
              alignContent: 'center',
              textDecoration: 'none',
              margin: smallScreen ? '1rem 0' : '0',
            }}
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
              {type === 'category' ? 'Full ranking' : ''}
            </Typography>
            {/* <ArrowForward
              style={{
                marginLeft: '0.5em',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            /> */}
          </Button>
        </>
      }

      {type === 'category' ?
        <Typography variant={'h6'}>
          <Box {...box}>
            {type === 'category' ? 'Top 5 cities' : ''}{' '}
          </Box>
      
        </Typography>
        :
        <Typography variant={'h6'}>
          <Box {...box}>
            {type === 'gsc' ? 'Ranking of towns' : 'Ranking'}{' '}
          </Box>
        </Typography>
      }

    </section>
  );
};

export default EnhancedTableToolbar;