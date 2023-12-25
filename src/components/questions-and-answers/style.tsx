import { makeStyles, withStyles } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

export const useStyles = makeStyles({
  question: {
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',
    fontWeight: 'bold',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',
  },
  answer: {
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',
    marginBottom: '1.7rem',
  },
});
export const WhiteAdd = withStyles({
  root: {
    color: '#99c93c',
  },
})(Add);

export const WhiteRemove = withStyles({
  root: {
    color: '#99c93c',
  },
})(Remove);

export const ExpansionPanel = withStyles({
  root: {
    borderRadius: '0.5rem',
    boxShadow: 'none',
    margin: '1rem 0',
    '&:not(:last-child)': {
      borderRadius: '0.5rem',
      borderBottom: 0,
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
    '&:before': {
      borderRadius: '0.5rem',
      display: 'none',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
    '&$expanded': {
      borderRadius: '0.5rem',
      margin: 'auto',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
    fontSize: '1.2rem',
    lineHeight: '1.7rem',
  },
  expanded: {
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',
  },
})(MuiExpansionPanel);

export const ExpansionPanelSummary = withStyles({
  root: {
    borderRadius: '0.5rem',
    marginBottom: -1,
    minHeight: 56,
    color: '#000',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',

    '&$expanded': {
      borderRadius: '0.5rem',
      minHeight: 56,
      background: '#fff',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
  },
  content: {
    '&$expanded': {
      borderRadius: '0.5rem',
      margin: '1rem 0',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
    },
  },
  expanded: {
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    lineHeight: '1.7rem',
  },
})(MuiExpansionPanelSummary);

export const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    borderRadius: '0.5rem',
    padding: '2rem 3rem',

    color: '#424242',
    background: '#f4f5f5',
  },
  content: {
    borderRadius: '0.5rem',
  },
}))(MuiExpansionPanelDetails);