import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    margin: '6rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#99c93c',
  },
  smallRoot: {
    margin: '2rem 0.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    justifyItems: 'center',
    alignItems: 'center',
    color: '#99c93c',
  },

  slider: {
    '& .rec-arrow': {
      fontSize: '2.5rem',
      color: '#99c93c',
      backgroundColor: 'white',
      boxShadow: 'none',
      display: 'show',
      '&:hover': {
        backgroundColor: 'white',
        '&:enabled': {
          backgroundColor: 'white',
          color: '#698d29',
        },
      },
      '&:enabled': {
        '&:focus': {
          backgroundColor: 'white',
          color: '#99c93c',
        },
        '&:hover': {
          backgroundColor: 'white',
          color: '#698d29',
        },
      },
      '&:disabled': {
        backgroundColor: 'white',
        boxShadow: 'none',
        color: 'grey',
        cursor: 'block'
      },
    },
    '& .rec-dot_active': {
      boxShadow: 'none',
      backgroundColor: '#99c93c',
    },
    '& .rec-dot': {
      width: '1rem',
      height: '1rem',
      borderRadius: '0.5rem',
      margin: '0.5rem',
      boxShadow: 'none',
      border: '0.1px solid #99c93c',
      '&:hover': {
        boxShadow: 'none',
        border: '0.5px solid #99c93c',
      },
      '&:focus': {
        boxShadow: 'none',
        border: '0.5px solid #99c93c',
        backgroundColor: '#99c93c',
      },
      '&:focus &:hover &:active': {
        boxShadow: 'none',
        border: '0.5px solid #99c93c',
        backgroundColor: 'orange',
      },
      '&:active': {
        boxShadow: 'none',
        border: '0.5px solid #99c93c',
        backgroundColor: '#99c93c',
      },
    },
  },

  favRoot: {
    margin: '8.5rem 0 3rem',
  },
  smallFavRoot: {
    margin: '1rem 0',
  }
});



