import {
  Box, Button, Collapse, InputBase, List,
  ListItem, makeStyles, Toolbar, Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { Link, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import useCities from '../../hooks/cities';
// @ts-ignore
import hugsiLogoBlack from '../../images/hugsi_logo_rc_black.png';
// @ts-ignore
import husqvarnaLogoWhite from '../../images/husqvarna_logo_white.png';
// @ts-ignore
import hugsiLogoGreen from '../../images/logo-hugsi-green.png';
import TestDomain from '../../popups/testdomain-popup';
import RankingLink from '../link/ranking-link';
import { useSStyles } from './style';

interface Props {
  navLinkClass: string;
  showScrolledMenu: boolean;
}

/**
 * Small Toolbar component
 * @param showScrolledMenu - type of Navigation
 * @param navLinkClass - CSS properties
 */
const SmallToolbar: React.FC<Props> = ({
  showScrolledMenu,
  navLinkClass,
}) => {
  const [expanded, setExpanded] = useState(false);
  const {
    smallMenu, menuWrapper, menuItemsWrapper, navBox, navLinkRight,
    bottomLogo, subNavLink, navLinkTransparent, search, searchIcon,
    inputRoot, inputInput, } = useSStyles({});
  const { cityStore } = useCities();
  const activePage =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const variedLogoPages = ['/404', '/imprint', '/terms-of-use'];
  const hugsiLogo =
    showScrolledMenu || variedLogoPages.some(vlp => activePage.startsWith(vlp))
      ? hugsiLogoBlack
      : hugsiLogoGreen;
  const [searchKeyword, setSearchKeyword] = useState('');
  const userDomain = cityStore.user?.username
    ? cityStore.user.username?.split('@').pop()
    : '';

  const handleSearchTextChange = searchEvent => {
    searchEvent.preventDefault();
    setSearchKeyword(searchEvent.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (activePage) {
      const searchTextInURL = window.location.search.slice(1);
      if (activePage.startsWith('/search')) {
        if (!searchTextInURL) {
          navigate('/404', { replace: true });
        } else if (searchTextInURL !== searchKeyword) {
          setSearchKeyword(decodeURI(searchTextInURL));
        }
      } else {
        setSearchKeyword('');
      }
    }
  }, [window.location.href]);

  return (
    <Toolbar disableGutters={true}>
      <div className={smallMenu}>
        {expanded ? (
          <div className={menuWrapper}>
            <Box className={menuItemsWrapper}>
              <Box className={clsx(navLinkClass, navLinkRight)}>
                <i
                  onClick={() => setExpanded(false)}
                  className="fas fa-times"
                  style={{ fontSize: '1.5rem', margin: '2.5rem 1rem', color: '#fff' }}
                />
              </Box>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button style={{ textTransform: 'none' }}>
                  <Link
                    to="/"
                    style={{ marginBottom: '1rem' }}
                    className={navLinkClass}
                    onClick={() => setExpanded(false)}
                  >
                    <Typography variant="h6">
                      <Box fontWeight="fontWeightBold" style={{ color: '#fff' }}>
                        Home
                      </Box>
                    </Typography>
                  </Link>
                </Button>
                <Button style={{ textTransform: 'none' }}>
                  <Link
                    to="/ranking"
                    style={{ marginBottom: '1rem' }}
                    className={navLinkClass}
                    onClick={() => setExpanded(false)}
                  >
                    <Typography variant="h6">
                      <Box fontWeight="fontWeightBold" style={{ color: '#fff' }}>
                        How green are cities?
                      </Box>
                    </Typography>
                  </Link>
                </Button>
                <Button style={{ textTransform: 'none' }}>
                  <Link
                    to="/stories"
                    style={{ marginBottom: '1rem' }}
                    className={navLinkClass}
                    onClick={() => setExpanded(false)}
                  >
                    <Typography variant="h6">
                      <Box fontWeight="fontWeightBold" style={{ color: '#fff' }}>
                        Insights & stories
                      </Box>
                    </Typography>
                  </Link>
                </Button>
                <Button
                  style={{ textTransform: 'none', textDecoration: 'none' }}
                  onClick={handleClick}
                  className={navLinkClass}
                >
                  <Typography variant="h6">
                    <Box
                      fontWeight="bold"
                      style={{ color: '#fff', marginBottom: '1rem' }}
                      className={navBox}
                    >
                      About HUGSI
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                  </Typography>
                </Button>
                {open ?
                  <Collapse in={open} timeout="auto" unmountOnExit
                    style={{
                      backgroundColor: '#8BB736',
                      padding: '0.8rem',
                      width: '100%'
                    }}>
                    <List component="div" disablePadding >
                      <ListItem
                        style={{
                          justifyContent: 'center'
                        }}
                        onClick={() => { setExpanded(false); handleClose(); }} >
                        <Typography variant="body1">
                          <Link to="/about" className={subNavLink} >
                            How it works
                          </Link>
                        </Typography>
                      </ListItem>
                      <ListItem
                        style={{
                          justifyContent: 'center'
                        }}
                        onClick={() => { setExpanded(false); handleClose(); }} >
                        <Typography variant="body1">
                          <RankingLink
                            continentName=""
                            className={subNavLink}
                          >
                            Partners & Friends
                          </RankingLink>
                        </Typography>
                      </ListItem>
                      <ListItem
                        style={{
                          justifyContent: 'center'
                        }}
                        onClick={() => { setExpanded(false); handleClose(); }} >
                        <Typography variant="body1">
                          <Link to="https://go.hugsi.green/hugsi-for-research/"
                            target={'_blank'} className={subNavLink}  >
                            HUGSI for Research
                          </Link>
                        </Typography>
                      </ListItem>
                    </List>
                  </Collapse>
                  : ''
                }
                <Button style={{ textTransform: 'none' }}>
                  <Link
                    to="/stories"
                    style={{ marginBottom: '1rem' }}
                    className={navLinkClass}
                    onClick={() => setExpanded(false)}
                  >
                    <Typography variant="h6">
                      <Box fontWeight="fontWeightBold" style={{ color: '#fff' }}>
                        Insights {'&'} Stories
                      </Box>
                    </Typography>
                  </Link>
                </Button>
                <Button style={{ textTransform: 'none' }}>
                  <Link
                    to="/"
                    style={{ marginBottom: '1rem' }}
                    className={navLinkClass}
                    onClick={() => setExpanded(false)}
                  >
                    <Typography variant="h6">
                      <Box fontWeight="fontWeightBold" className={navBox}>
                        Who we are
                        <ExpandMore />
                      </Box>
                    </Typography>
                  </Link>
                </Button>
                <Button style={{ textTransform: 'none' }}>
                  <Link
                    to="/community"
                    style={{ marginBottom: '1rem' }}
                    className={navLinkClass}
                    onClick={() => setExpanded(false)}
                  >
                    <Typography variant="h6">
                      <Box fontWeight="fontWeightBold" style={{ color: '#fff' }}>
                        Community
                      </Box>
                    </Typography>
                  </Link>
                </Button>
                {userDomain && userDomain === 'husqvarnagroup.com' && (
                  <Popup
                    closeOnDocumentClick={false}
                    modal
                    trigger={
                      <Button style={{ textTransform: 'none' }}>
                        <Typography variant="h6">
                          {' '}
                          <Box
                            fontWeight="fontWeightBold"
                            style={{ color: '#fff' }}
                          >
                            Test Domain
                          </Box>
                        </Typography>
                      </Button>
                    }
                  >
                    {close => <TestDomain close={close} />}
                  </Popup>
                )}
              </Box>
            </Box>
            <div className={bottomLogo}>
              <Typography className={navLinkTransparent}>Powered by</Typography>
              <a href="https://husqvarna.com" target="_blank">
                <img
                  src={husqvarnaLogoWhite}
                  alt="Husqvarna logo"
                  style={{ width: '8rem', height: 'auto', margin: 0 }}
                />
              </a>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // margin: '2vh 2vw',
              minHeight: '64px',
            }}
          >
            <Link
              to="/"
              className={navLinkClass}
              style={{ marginRight: '1rem' }}
            >
              <img
                src={hugsiLogo}
                alt="HUGSI logo"
                height="auto"
                style={{ margin: 0, width: '6rem' }}
              />
            </Link>
            <div className={search}>
              <div className={searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search"
                classes={{
                  root: inputRoot,
                  input: inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchTextChange}
                onKeyPress={event => {
                  if (
                    event.key === 'Enter' &&
                    searchKeyword.length > 0 &&
                    searchKeyword.length < 50
                  ) {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                    navigate(`/search/?${searchKeyword.trim()}`, {
                      replace: true,
                    });
                  }
                }}
              />
            </div>
            <Box onClick={() => setExpanded(true)} className={navLinkClass}>
              <i className="fas fa-bars" style={{ fontSize: '1.5rem' }} />
            </Box>
          </div>
        )}
      </div>
    </Toolbar >
  );
};

export default SmallToolbar;