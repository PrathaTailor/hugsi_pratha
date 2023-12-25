import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  buttonGreen: {
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '4px',
    backgroundColor: 'rgb(243, 83, 33)',
    width: '100%',
    maxWidth: '200px',
    border: 'none',
    fontSize: '18px',
    lineHeight: '21px',
    padding: '14px',
    margin: '30px 0px 0px',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize',
  },
  bannerImage: {
    width: '100%',
    objectFit: 'cover',
    height: '99.5vh',
    display: 'flex',
    // -webkit-box-align: 'center';
    alignItems: 'center',
    background: 'url(https://mypages.husqvarna.com/login.6d3dc914.png)',
  },
  contentCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  signupForm: {
    width: '100%',
    padding: '0 15px',
  },
  errorMsg: {
    marginTop: '5px',
    fontSize: '12px',
    padding: '4px 16px',
    color: 'red',
  },
  inputHolder: {
    position: 'relative',
    marginTop: '16px',
  },
  customInput: {
    backgroundColor: '#fff',
    width: '100%',
    border: '2px solid transparent',
    borderRadius: '2px',
    '&:focus': {
      boxShadow:
        'rgb(0 0 0 / 18%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 0px 2px 0px',
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)'
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: '15px',
  },
  errorMessageRed: {
    backgroundColor: 'red',
  },
  policyTag: {
    fontSize: '0.75rem',
    display: 'inline-block',
    width: '85%',
  },
  captchaHolder: {
    display: 'flex',
    alignItems: 'center',
  },
  focusClass: {
    '& .Mui-focused': {
      color: 'red !important',
    },
  },
});