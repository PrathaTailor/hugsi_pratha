import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  navContainer: {
    backgroundColor: 'white',
    color: '#424242',
    overflow: 'hidden',
    width: ' 100%',
    position: 'absolute',
    padding: '0px',
  },
  navLink: {
    color: '#424242',
    textDecoration: 'none',
    margin: '0 1rem',
    cursor: 'pointer',
  },
  customizeToolbar: {
    minHeight: 36,
    maxHeight: '2rem',
    display: 'flex',
    justifyContent: 'flex-end',
    transform: 'translate(0px,0px)'
  },
  headerBox: {
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: '10px',
  }
});


export const useLStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: '-0.5rem auto',
    width: '100%',
    maxWidth: '100%',
    height: '80px',
  },
  linkButton: {
    textTransform: 'none'
  },
  menu: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoWrapper: {
    color: 'gray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  singleDash: {
    backgroundColor: '#293845',
    height: '0.1rem',
    width: '80%',
    margin: '0 2rem 0 1rem',
    padding: '0.1rem 0',
  },
  search: {
    position: 'relative',
    borderRadius: '2rem',
    background: 'transparent',
    marginLeft: 0,
    width: '100%',
    fontSize: '1rem',
  },
  searchIcon: {
    padding: '1rem',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  inputRoot: {
    color: 'inherit',
    marginLeft: '3rem',
  },
  inputInput: {
    width: '100%',
  },
  subNavLinkClass: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
});

export const useSStyles = makeStyles({
  smallMenu: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  navLinkRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  navLinkTransparent: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 1rem',
  },
  navBox: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center'
  },
  subNavLink: {
    color: '#fff',
    textDecoration: 'none',
    textTransform: 'none',
    fontWeight: 'bold'
  },
  bottomLogo: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2em',
    backgroundColor: '#424242',
  },
  menuWrapper: {
    background: '#99c93c',
    height: '100vh',
  },
  menuItemsWrapper: {
    padding: '0px',
  },
  search: {
    position: 'relative',
    borderRadius: '2rem',
    background: 'transparent',
    marginLeft: 0,
    width: '100%',
    fontSize: '1rem',
  },
  searchIcon: {
    padding: '1rem',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: '3rem',
    width: '100%',
    border: '1px solid #c9cdd0',
    borderRadius: '1rem',
  },
});

