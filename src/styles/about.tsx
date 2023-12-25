import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      height: 'auto',
    },
    content: {
      fontColor: '#293845',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    center: {
      placeContent: 'center',
      placeItems: 'center',
    },
    singleDash: {
      color: '#99c93c',
      height: '0.30rem',
      width: '5rem',
      margin: '1rem 0',
    },
    twoCols: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridColumnGap: '4rem',
      margin: '0 auto 1.25rem auto',
    },
    twoRows: {
      display: 'grid',
      gridDirection: 'row',
      gridRowGap: '2rem',
    },
    previousReportsGrid: {
      fontSize: '0.9rem',
    },
  })
);
export const WhiteAdd = withStyles({
  root: {
    color: '#698d29',
  },
})(Add);

export const WhiteRemove = withStyles({
  root: {
    color: '#698d29',
    transform: 'rotate(180deg)',
  },
})(Remove);

export const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    margin: '1rem 0',
    '&:not(:last-child)': {
      borderBottom: 0,
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
    '&:before': {
      display: 'none',
      fontSize: '1rem',
      lineHeight: '1rem',
    },
    '&$expanded': {
      borderRadius: '0.5rem',
      margin: 'auto',
      fontSize: '1rem',
      lineHeight: '1rem',
    },
    fontSize: '1rem',
    lineHeight: '1rem',
  },
  expanded: {
    borderRadius: '0.5rem',
    fontSize: '1rem',
    lineHeight: '1rem',
  },
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    marginBottom: -1,
    minHeight: 56,
    color: '#fff',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',

    '&$expanded': {
      lineHeight: '1.7rem',
    },
  },
  content: {
    '&$expanded': {
      margin: '1rem 0',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
  },
  expanded: {
    fontSize: '1.2rem',
    lineHeight: '1.7rem',
  },
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    borderRadius: '0.5rem',
    padding: '1rem',
    color: '#293845',
    background: '#f4f5f5',
    display: 'grid',
    gridTemplateColumns: '4rem 4rem 4rem 4rem',
    gridGap: '0.5rem',
  },
  content: {
    borderRadius: '0.5rem',
  },
}))(MuiExpansionPanelDetails);
