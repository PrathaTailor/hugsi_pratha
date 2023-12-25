import { makeStyles, withStyles, createStyles, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp';

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
export const useStyles = makeStyles(() =>
  createStyles({
    smallDemographicGrid: {
      fontSize: '0.5rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gridGap: '1rem',
    },
    question: {
      borderRadius: '0.5rem',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
      fontWeight: 'bold',
    },
    answer: {
      borderRadius: '0.5rem',
      fontSize: '1.2rem',
      lineHeight: '1.7rem',
      marginBottom: '1.7rem',
    },
    mainAppBar: {
      background: 'transparent',
      boxShadow: 'none',
      textTransform: 'none',
      // marginTop: '1.5rem',
      marginBottom: '1rem',
      padding: '0rem',
    },
    mainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      backgroundImage:
        'linear-gradient(to left right, rgba(0, 0, 0, 0.1), transparent)',
      textTransform: 'none',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#293845',

      width: '14.2rem',
    },
    unselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1.25rem',
      width: '14.2rem',
      backgroundImage:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
    mainSubTab: {
      textTransform: 'none',
      fontWeight: 'bold',
      color: '#293845',
      fontSize: '1rem',
      width: '60rem',
    },
    unselectedSubTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1rem',
      width: '60rem',
    },
    smallMainTab: {
      border: '0.1rem solid #e9ebec',
      borderBottom: 'none',
      borderRadius: '1rem 1rem 0rem 0rem',
      backgroundImage:
        'linear-gradient(to left right, rgba(0, 0, 0, 0.1), transparent)',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#293845',
      width: '7rem',
    },
    smallUnselectedTab: {
      textTransform: 'none',
      color: '#293845',
      fontSize: '1rem',
      width: '6rem',
      backgroundImage:
        'linear-gradient(360deg, rgba(0, 0, 0, 0.05), transparent)',
    },
  })
);
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
})(Accordion);

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
})(AccordionSummary);

export const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    borderRadius: '0.5rem',
    color: '#424242',
    // background: '#f4f5f5',
    background: '#fff',
  },
}))(AccordionDetails);

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