import { makeStyles, withStyles } from '@material-ui/core';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';

export const useStyles = makeStyles({
  smallDemographicGrid: {
    fontSize: '0.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gridGap: '1rem',
  },
});
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