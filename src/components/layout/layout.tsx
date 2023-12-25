import React, { useEffect } from 'react';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import CallToAction from 'components/call-to-action/call-to-action';
import Banner from 'components/banner/banner';
import FontawesomeCdn from 'components/fontawesome-cdn/fontawesome-cdn';
import TopComponentCSS from 'components/top-component/top-component.css';
import IeDialog from '../ie-dialog/ie-dialog';
import Box from '@material-ui/core/Box';

interface LayoutProps {
  readonly children?: React.ReactNode | readonly React.ReactNode[];
}

/**
 * Layout - the template
 * @param children - pages/component
 */
const Layout = ({ children }: LayoutProps) => {
  const activePage =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const bannerPages = ['/', 'sample'];

  useEffect(() => {
    if (localStorage.getItem('HugsiGreenCookie') === 'accepted') {
      return;
    }
  }, []);
  useEffect(() => {
    const status = localStorage.getItem('userDetailsStatus');
    if (status === 'submitted' || status === 'subscribed') {
      return;
    }
  }, []);

  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem('userDetailsStatus');
      if (item === 'submitted' || item === 'submitted') {
        return;
      }
    }
    window.addEventListener('storage', checkUserData);
    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
    // minHeight="100vh"
    // justifyContent="space-between"
    >
      {!activePage.startsWith('/signup') &&
        <Header backgroundImageSelector={`.${TopComponentCSS.TopComponent}`}
          pathname={children.props.location.pathname} />}
      <FontawesomeCdn />
      <main>
        {children}
        {bannerPages.includes(activePage) && <Banner />}
        {!activePage.startsWith('/city') &&
          !activePage.startsWith('/municipality') && !activePage.startsWith('/signup') && !activePage.startsWith('/ranking') && <CallToAction />}
      </main>
      <IeDialog />
      {!activePage.startsWith('/city') &&
        !activePage.startsWith('/municipality') && !activePage.startsWith('/signup') && !activePage.startsWith('/ranking') && <Footer />}
    </Box>
  );
};

export default Layout;