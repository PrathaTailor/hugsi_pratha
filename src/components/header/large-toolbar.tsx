import {
  Box, Button, InputBase, Menu,
  MenuItem, Toolbar, Typography
} from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { Link, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import useCities from '../../hooks/cities';
// @ts-ignore
import hugsiLogoBlack from '../../images/hugsi_logo_rc_black.png';
// @ts-ignore
import husqvarnaLogoBlack from '../../images/husqvarna_logo_black.png';
// @ts-ignore
import hugsiLogoGreen from '../../images/logo-hugsi-green.png';
import { MAX_CHARACTERS_SEARCH } from '../../models';
import TestDomain from '../../popups/testdomain-popup';
import RankingLink from '../link/ranking-link';
import { useLStyles } from './style';

interface Props {
  navLinkClass: string;
  pathname: string;
}

/**
 * Large Toolbar component
 * @param showScrolledMenu - type of Navigation
 * @param navLinkClass - CSS properties
 */
const LargeToolbar: React.FC<Props> = ({
  navLinkClass,
  pathname,
}) => {
  const {
    root,
    menu,
    linkButton,
    logoWrapper,
    flexCenter,
    singleDash,
    search,
    searchIcon,
    inputInput,
    inputRoot,
    subNavLinkClass
  } = useLStyles({});
  const { cityStore } = useCities();
  const logo = hugsiLogoGreen;
  const headerImage = husqvarnaLogoBlack;
  const variedLogoPages = ['/404', '/imprint', '/terms-of-use'];
  const userDomain = cityStore.user?.username
    ? cityStore.user.username?.split('@').pop()
    : '';
  const [searchKeyword, setSearchKeyword] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (pathname) {
      const searchTextInURL = window.location.search.slice(1);
      if (pathname.startsWith('/search')) {
        if (!searchTextInURL) {
          navigate('/404', { replace: true });
        } else if (searchTextInURL !== searchKeyword) {
          setSearchKeyword(decodeURI(searchTextInURL));
        }
      } else {
        setSearchKeyword('');
      }
    }
  }, [pathname]);

  const handleSearchTextChange = searchEvent => {
    searchEvent.preventDefault();
    setSearchKeyword(searchEvent.target.value);
  };

  return (
    <Toolbar className={root} disableGutters>
      <Box className={menu}>
        <Link to="/" className={navLinkClass} style={{ marginRight: '3rem' }}>
          <img
            data-testid="header-img-tag"
            src={
              variedLogoPages.some(vlp => pathname.startsWith(vlp))
                ? hugsiLogoBlack
                : logo
            }
            alt="HUGSI logo"
            height="auto"
            // width='120rem'
            style={{ marginTop: '0.2rem', width: '6rem' }}
          />
        </Link>
        {/* <div> */}
        <Button className={linkButton}
          onClick={() => {
            navigate('/ranking');
          }}>
          <Typography variant="h1">
            {' '}
            <Box fontWeight="fontWeightBold" fontSize="1rem" >
              <Link to="/ranking" className={clsx(navLinkClass, flexCenter)}>
                How green are cities?
              </Link>
            </Box>
            {pathname.startsWith('/ranking') && (
              <div className={singleDash} />
            )}
          </Typography>
        </Button>
        {/* </div> */}
        <Button className={linkButton} onClick={() => {
          navigate('/stories');
        }}>
          <Typography variant="h1">
            {' '}
            <Box fontWeight="fontWeightBold" fontSize="1rem" >
              <Link to="/stories" className={clsx(navLinkClass, flexCenter)}>
                Insights and Stories
              </Link>
            </Box>
            {pathname.startsWith('/stories') && (
              <div className={singleDash} />
            )}
          </Typography>
        </Button>
        <Button
          className={linkButton}
          onClick={handleClick}
          id="basic-menu"
          aria-controls={open ? 'basic-menu' : undefined}
        >
          <Typography variant="h1">
            {' '}
            <Box fontWeight="fontWeightBold" fontSize="1rem" className={clsx(navLinkClass, flexCenter)}  >
              About HUGSI
              {open ? <ExpandLess /> : <ExpandMore />}
            </Box>
            {
              pathname.startsWith('/about') ||
                // pathname.startsWith('/ranking') ||
                pathname.startsWith('/partners')
                // pathname.startsWith('/groenestadchallenge')
                ? (
                  <div className={singleDash} />
                ) : ''}
          </Typography>
        </Button>
        {open ?
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            style={{
              left: '0px',
            }}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: '#99c93c',
                width: '100%',
                marginLeft: '0px !important',
                marginTop: '3.5rem',
                paddingLeft: '9.5rem',
                maxWidth: '100%',
                position: 'relative',
                transform: 'translate(17px,0px)'
              },
            }}
            MenuListProps={{
              style: {
                display: 'flex',
                marginLeft: '0px !important',
                left: '0px !important',
                height: '50px'
              },
              'aria-labelledby': 'basic-menu'
            }}>
            <MenuItem onClick={() => { handleClose(); navigate('/about'); }}>
              <Link to="/about" className={subNavLinkClass} >
                How it works
              </Link>
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/partners'); }}>
              <Link to="/partners" className={subNavLinkClass} >
                Partners & Friends
              </Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <Link to="/compare" className={subNavLinkClass} >
                Compare cities
              </Link>
            </MenuItem> */}
            <Link to="https://go.hugsi.green/hugsi-for-research/" className={subNavLinkClass} target={'_blank'}>
              <MenuItem onClick={handleClose}>
                <Link to="https://go.hugsi.green/hugsi-for-research/" target={'_blank'} className={subNavLinkClass} >
                  HUGSI for Research
                </Link>
              </MenuItem>
            </Link>
          </Menu>
          : ''
        }

        <Button className={linkButton} onClick={() => {
          navigate('/groenestadchallenge');
        }}>
          <Typography variant="h1">
            {' '}
            <Box fontWeight="fontWeightBold" fontSize="1rem" >
              <Link to="/groenestadchallenge" className={clsx(navLinkClass, flexCenter)}>
                Groene Stad Challenge
              </Link>
            </Box>
            {pathname.startsWith('/groenestadchallenge') && (
              <div className={singleDash} />
            )}
          </Typography>
        </Button>
        {userDomain && userDomain === 'husqvarnagroup.com' && (
          <Popup
            closeOnDocumentClick={false}
            modal
            trigger={
              <Button className={linkButton}>
                <Typography variant="h1" className={clsx(navLinkClass, flexCenter)}>
                  {' '}
                  <Box fontWeight="fontWeightBold" fontSize="1rem">
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
      <div>
        <span
          style={{
            position: 'absolute',
            width: '14rem',
            height: '2rem',
            background: 'white',
            border: '1px solid #c9cdd0',
            borderRadius: '1rem',
            display: 'flex',
            color: '#5f6a74',
            fontSize: '1.2rem',
          }}
        ></span>
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
            value={searchKeyword}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchTextChange}
            onKeyPress={event => {
              if (
                event.key === 'Enter' &&
                searchKeyword.trim().length > 0 &&
                searchKeyword.trim().length < MAX_CHARACTERS_SEARCH
              ) {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
                navigate(`/search/?${searchKeyword.trim()}`, {});
              }
            }}
          />
        </div>
      </div>
      <div className={clsx(logoWrapper, flexCenter)}>
        <Typography
          variant="subtitle2"
          style={{
            color: 'black',
          }}
          className={flexCenter}
        >
          <Box style={{ marginRight: '0rem' }}>Powered by</Box>
        </Typography>
        <a
          href="https://husqvarna.com"
          target="_blank"
          className={navLinkClass}
        >
          <img
            src={headerImage}
            alt="Husqvarna logo"
            style={{ width: '8rem', height: 'auto', margin: 0 }}
          />
        </a>
      </div>
    </Toolbar >
  );
};

export default LargeToolbar;