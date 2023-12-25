import { makeStyles, Theme, createStyles, createTheme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    withLeftAndRightSpace: {
      width: '100%',
      margin: '0 auto',
    },
    userInputField: {
      margin: '0 auto',
      height: 'auto',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
    },
    messageInputField: {
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      '& .Mui-focused': {
        backgroundColor: 'white',
      },
    },
  })
);
export const theme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiFilledInput: {
      // Name of the rule
      root: {
        // Some CSS
        backgroundColor: 'none',
        '&:focus': {
          backgroundColor: 'white',
        },
        '&:hover': {
          backgroundColor: 'white',
        },
      },
      underline: {
        borderBottom: 'none',
        '&:before': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
        '&:after': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
        '&:hover:before': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
        '&:hover:after': {
          // The MUI source seems to use this but it doesn't work
          borderBottom: 'none',
        },
      },
    },
  },
});
