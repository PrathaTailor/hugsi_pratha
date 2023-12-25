import { makeStyles, createStyles, withStyles } from '@material-ui/core';
// @ts-ignore
import boxers from '../images/leaf-background.png';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      margin: '120px auto',
    },
    rootWithImage: {
      position: 'relative',
      backgroundImage: `url('${boxers}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      margin: `120px auto 0`,
    },
    redoBtn: {
      textTransform: 'none',
    },
    rowStyle: {
      display: 'flex',
      borderRadius: '50px',
      width: 'max-content',
      padding: '7px',

    },
    boxStyle: {
      display: 'grid',
      justifyContent: 'space-between',
      gridTemplateColumns: '45% 45%'

    },
    iconBox: {
      height: '28px',
      minWidth: '28px',
      padding: '5px',
      backgroundColor: '#F4F5F5'
    },
    dividerStyle: {
      margin: '5px 0'
    }
  })
);

export const HealthIndicator = withStyles({
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