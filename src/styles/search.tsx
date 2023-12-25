import { createTheme } from '@material-ui/core/styles';

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
