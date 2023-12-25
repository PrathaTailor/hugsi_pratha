import React from 'react';
import { observer } from 'mobx-react-lite';
import { useMediaQuery, Box, Divider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SEO from '../hooks/seo';
import IntroText from '../components/intro-text/intro-text';
import CategoryWinners from '../components/category-winners/category-winners';
import FavoriteCities from '../components/carousel/favorite-cities';
import LatestArticles from '../components/articles/latest-articles';
import NLGLTest from '../components/call-to-action/nl-gl-test';
import useCities from '../hooks/cities';
// @ts-ignore
import backgroundMain from '../images/landing-image.png';
// @ts-ignore
import backgroundMainMobile from '../images/landing-mobile.png';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: `0 auto`,
      maxWidth: 'var(--pageMaxWidth)',
      padding: '0 1em',
      position: 'relative',
    },
    rootWrapper: {
      position: 'relative',
      backgroundImage: `url('${backgroundMain}')`,
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat !important',
      margin: `auto 0`,
    },
    smallRootWrapper: {
      position: 'relative',
      backgroundImage: `url('${backgroundMainMobile}')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat !important',
      margin: `-20px auto `,
    },
  })
);

/**
 * Index Page
 * @file index.ts is the root page of HUGSI also the root component
 * @author Nils Ekman, Johan Gustafsson, Amr Ellafy, and Devlin Duldulao
 */
const IndexPage = () => {
  const { root, rootWrapper, smallRootWrapper } = useStyles({});
  const { cities } = useCities();
  const smallScreen = useMediaQuery('(max-width:960px)');

  return (
    <>
      <SEO
        title="Quantifying The Greenness of Global Cities"
        description={`HUGSI stands for Husqvarna Urban Green Space Index,
         an index to safeguard green spaces in urban areas. For HUGSI,
         we have monitored ${cities.length} cities around the world. As a baseline,
          we used the cities that are members of C40, the network of the
          world’s megacities committed to addressing climate change,
           representing 700+ million citizens and one-quarter of the global economy.`}
      />
      <div className={smallScreen ? smallRootWrapper : rootWrapper}>
        <div>
          <div className={root}>
            <IntroText cities={cities} />
            {/* <OverallWinners cities={cities} /> */}
            <FavoriteCities cities={cities} />
            {/* <Box
              style={{
                margin: smallScreen ? '2rem auto' : '10rem auto 4.25rem',
              }}
            >
              <CategoryWinners cities={cities} />
            </Box> */}
            {/* <Divider style={{ margin: '2rem 0' }} /> */}
            <NLGLTest type="quiz" />
            <Divider style={{ margin: '2rem 0' }} />
            <LatestArticles />
          </div>
        </div>
      </div>
    </>
  );
};
export default observer(IndexPage);