import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { createStyles, makeStyles, Theme, Typography, Box, Button, useMediaQuery } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import { graphql, Link, navigate } from 'gatsby';
import Image from 'gatsby-image';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Popup from 'reactjs-popup';
import TopComponent from '../components/top-component/top-component';
import { useSiteMetadata } from '../hooks';
import SEO from '../hooks/seo';
import clsx from 'clsx';
import ShareContent from '../popups/share-content';
// @ts-ignore
import calculateIcon from '../images/widget-hugsi-plus.png';
// @ts-ignore
import calculated_Icon from '../images/widget_hugsi_plus.png';
// @ts-ignore
import backgroundHugsiPlus from '../images/background_hugsiplus.png';
import useCities from 'hooks/cities';
import { FavoriteBorderOutlined } from '@material-ui/icons';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postGridWrapper: {
      display: 'grid',
      gridTemplateColumns: '9rem 60rem 9rem',
      justifyItems: 'center',
      gridColumnGap: '1rem',
    },
    moreInsightsGridWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
      gridColumnGap: '2rem',
      gridRowGap: '2rem',
      marginBottom: '2rem',
    },
    smallMoreInsightsGridWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
      gridColumnGap: '2rem',
      gridRowGap: '2rem',
      marginBottom: '2rem',
    },
    title: {
      color: '#424242',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      display: 'flex',
    },
    smallTitle: {
      color: '#424242',
      fontSize: '1.6rem',
      lineHeight: '2rem',
      fontWeight: 'bold',
      margin: '1rem',
    },
    embeddedImg: {
      display: 'flex',
      placeContent: 'center',
      placeItems: 'center',
      margin: '4rem 2rem',
    },
    headerWrapper: {
      height: 'auto',
      margin: '2rem auto',
      maxWidth: '60rem',
    },
    smallHeaderWrapper: {
      height: 'auto',
      margin: '2rem',
    },
    contentWrapper: {
      height: 'auto',
      margin: '2rem auto',
      maxWidth: '60rem',
    },
    smallContentWrapper: {
      height: 'auto',
      margin: '2rem',
    },
    paragraph: {
      color: '#293845',
      fontSize: '16px',
      lineHeight: '27px',
    },
    smallParagraph: {
      color: '#293845',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    allInsights: { color: '#424242' },
    chevron: {
      marginLeft: '0.75rem',
      fontSize: '1.5rem',
      color: '#424242',
    },
    moreInsightsWrapper: {
      margin: '0 auto 6.25rem auto',
      maxWidth: '77rem',
    },
    imageContainer: {
      position: 'relative',
      border: '5px solid red',
      '&::before': {
        content: '',
        position: 'absolute',
      },
    },
    hugsiPlusBox: {
      backgroundImage: `url('${backgroundHugsiPlus}')`,
      backgroundSize: '30% 100%',
      backgroundColor: '#E9EFBB',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      padding: '3rem',
      width: '100%',
      marginTop: '-5rem'
    },
    publishBox: {
      fontSize: '16px',
      fontWeight: 300,
      lineHeight: '27px',
      maxWidth: '70rem',
      color: '#293845',
      marginTop: '10px',
      fontFamily: 'Husqvarna Gothic',
    },
    backToStories: {
      display: 'flex',
      alignItems: 'center',
      color: '#698D29',
      fontWeight: 'bold',
      justifyContent: 'center',
      margin: '15px 0px 0px 0px',
      width: '100%',
      fontSize: '16px',
      lineHeight: '24px',
    }
  })
);
export const query = graphql`
  query($slug: String!) {
    post: contentfulArticles(slug: { eq: $slug }) {
      slug
      title
      author
      publishedAt
      isLoginRequired
      content {
        json
      }
      primaryImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }

    posts: allContentfulArticles {
      nodes {
        slug

        id
        title
        publishedAt
        primaryImage {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        content {
          json
        }
      }
    }
  }
`;
interface GqlData {
  post: any;
  posts: any;
}

interface Props {
  data: GqlData;
}

const PostTemplate: React.FC<Props> = ({ data: { post, posts } }) => {
  const {
    cityStore,
  } = useCities();
  const styles = useStyles({});
  const smallScreen = useMediaQuery('(max-width:1024px)');
  const mobileScreen = useMediaQuery('(max-width:580px)');
  const { frontUrl } = useSiteMetadata();
  const { loginDssEndpoint } = useSiteMetadata();
  const accessToken = cityStore?.user?.username;
  useEffect(() => {
    axios
      .post(`${frontUrl}/stories`, {})
      .then(res => {
        return true;
      })
      .catch(error => {
        return false;
      });
  }, []);

  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const routePath = typeof window !== 'undefined' ? window.location.href : null;
  const onTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    routePath && onTop();
  }, [routePath]);

  return (
    <Box
      style={{
        backgroundColor: '#fff',
      }}
    >
      <Box
        className="image-container"
        style={
          mobileScreen
            ? { height: '490px' }
            : smallScreen
              ? { height: '450px' }
              : {}
        }
      >
        <SEO title={post.title} description={post.title} />
        <TopComponent>
          <Image
            style={
              smallScreen
                ? {
                  width: '100%',
                  height: '450px',
                  marginBottom: '2rem',
                  border: '1px solid #99c93c',
                }
                : {
                  margin: '100px 0 0',
                  width: '100%',
                  height: '450px',
                }
            }
            fluid={post.primaryImage.fluid}
            alt={post.title}
          />
        </TopComponent>
      </Box>

      <Box
        style={
          smallScreen
            ? { width: '100%' }
            : mobileScreen
              ? { width: '100%' }
              : { width: '100%', margin: 'auto' }
        }>
        <Box className="header"
          style={
            smallScreen
              ? {
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 20px',
              }
              : {
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                maxWidth: '100%',
                marginTop: '3rem',
                marginLeft: '8rem',
              }
          }>
          <Box width={smallScreen ? '100%' : '20%'}>
            <Box
              className={styles.backToStories}
              style={{
                justifyContent: smallScreen ? 'left' : 'center'
              }}
            >
              <Box
                onClick={() => {
                  window.scroll({
                    top: 0,
                    left: 0,
                  });
                  navigate('/stories', { replace: true });
                }}
                style={
                  { cursor: 'pointer', display: 'flex' }
                }
              >
                <ArrowBackIcon style={{ margin: '0px 10px 0px 0px' }} /> Back to
                all stories
              </Box>
            </Box>
          </Box>

          <Box style={{ width: smallScreen ? '100%' : '50%' }}>
            <Box
              style={
                smallScreen
                  ? { display: 'flex', flexDirection: 'column', width: '100%', padding: '15px' }
                  : { display: 'flex' }
              }
            >
              <Typography
                className={styles.title}
                style={
                  smallScreen
                    ? {

                      fontSize: '30px',
                      lineHeight: 1.2,
                      marginTop: '30px',
                      marginBottom: '15px',
                      fontFamily: 'Husqvarna Gothic',
                    }
                    : {
                      fontSize: '40px',
                      fontFamily: 'Husqvarna Gothic',
                      lineHeight: '56px',
                      width: '100%',
                      color: '#293845',
                      fontWeight: 700,

                    }
                }
              >
                {post.title}
              </Typography>
              <Box
                display={smallScreen ? 'flex' : 'grid'}
                width={smallScreen ? '100%' : '150px'}
                marginTop={smallScreen ? '2rem' : ''}
                justifyItems="center">
                <Popup
                  closeOnDocumentClick={false}
                  modal
                  trigger={
                    <Button
                      variant="outlined"
                      color={'primary'}
                      style={
                        smallScreen
                          ? {
                            width: '100%',
                            height: '50px',
                            border: 'none',
                            backgroundColor: '#99c93c',
                            color: '#fff',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            paddingLeft: '15px',
                          }
                          : mobileScreen
                            ? {
                              width: '100%',
                              color: '#698D29',
                              borderColor: '#698D29',
                            }
                            : {
                              width: '100%',
                              height: '50px',
                              border: 'none',
                              color: '#698D29',
                              borderRadius: '8px',
                              textTransform: 'none',
                              fontWeight: 'bold',
                              borderColor: 'none',
                              paddingLeft: '15px',
                            }
                      }
                      size={'large'}
                    >
                      <span
                        style={{
                          width: smallScreen ? '' : '150px',
                          display: smallScreen ? 'flex' : '',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        Share this
                        <i
                          className="fas fa-share-square"
                          aria-hidden="false"
                          style={{ marginLeft: '0.5rem' }}
                        />
                      </span>
                    </Button>
                  }
                >
                  {close => <ShareContent close={close} />}
                </Popup>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FavoriteBorderOutlined color="primary" />
                  <Typography color="primary">2</Typography>&emsp;
                  <svg width="25" height="25" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5C14 2.25 11.0625 0 7.5 0C3.90625 0 1 2.25 1 5C1 6.09375 1.4375 7.0625 2.1875 7.875C1.75 8.84375 1.0625 9.59375 1.0625 9.59375C1 9.65625 0.96875 9.78125 1 9.875C1.0625 9.96875 1.125 10 1.25 10C2.375 10 3.3125 9.625 4 9.21875C5 9.71875 6.21875 10 7.5 10C11.0625 10 14 7.78125 14 5ZM17.8125 11.875C18.5312 11.0625 19 10.0938 19 9C19 6.9375 17.3125 5.125 14.9375 4.375C14.9688 4.59375 15 4.8125 15 5C15 8.3125 11.625 11 7.5 11C7.15625 11 6.8125 11 6.5 10.9688C7.46875 12.75 9.78125 14 12.5 14C13.7812 14 14.9688 13.7188 15.9688 13.2188C16.6562 13.625 17.5938 14 18.75 14C18.8438 14 18.9375 13.9688 18.9688 13.875C19 13.7812 19 13.6562 18.9062 13.5938C18.9062 13.5938 18.2188 12.8438 17.8125 11.875Z" fill="#698D29" />
                  </svg>
                  <Typography color="primary">10</Typography>
                </span>
              </Box>
            </Box>
            <Box
              className={styles.publishBox}
              style={{
                marginTop: smallScreen ? '-6rem' : '0px',
                marginLeft: smallScreen ? '1rem' : '0px',
              }}
            >
              {`Published`}
              <span style={{ color: '#698D29', fontWeight: 'bold' }}>
                {post.author && ` by ${post.author}`}
              </span>
              {` on `}
              {post.publishedAt && (
                <Moment format="D MMM YYYY" withTitle>
                  {post.publishedAt}
                </Moment>
              )}
            </Box>
          </Box>
        </Box>
        {post?.isLoginRequired !== false && post?.isLoginRequired !== null && accessToken === undefined ?

          <Box
            style={
              smallScreen
                ? {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '15px'
                }
                : {
                  display: 'flex',
                  marginBottom: '3rem',
                  width: '70%',
                  justifyContent: 'space-around',
                  marginLeft: '9rem',
                }
            }>
            <Box width="20%"></Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width={smallScreen ? '100%' : '70%'}
              gridGap="80px"
              margin="3rem 0px"
              padding={smallScreen ? '2rem' : '0rem'}
              textAlign="justify"
            >
              <Box
                className={styles.publishBox}
                style={{
                  opacity: 0.2,
                  marginTop: smallScreen ? '1rem' : '0rem',
                }}
              >
                {/* {post?.content?.json?.content[0]?.content[0]?.value.slice(0, 250)
                  + post?.content?.json?.content[1]?.content[0]?.value.slice(0, 50)} */}
              </Box>
              <Box className={styles.hugsiPlusBox}
                style={{
                  background: smallScreen ? '#E9EFBB' : '',
                }} >
                <Box>
                  <Typography variant="body1"
                    style={{
                      fontSize: smallScreen ? '30px' : '40px',
                      fontWeight: 'bold',
                      width: smallScreen ? '100%' : '35rem',
                      marginBottom: '20px'

                    }} >Exclusive content ahead for HUGSI+ Members
                  </Typography>
                  <Typography variant="body1"
                    style={{
                      width: smallScreen ? '100%' : '35rem',
                      textAlign: 'justify',
                      marginBottom: '2rem'
                    }}>
                    Register now to get unlimited access to our most exclusive content.
                    Investing a minute of your time in doing it will get you a seamless experience
                    over the HUGSI platform. Check out the latest features and benefits the HUGSI+ members avail.
                    And the new ones are in the pipeline.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  style={{
                    color: 'white',
                    margin: smallScreen ? '1rem' : '0rem',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    backgroundColor: '#99c93c',
                  }}
                  size={'large'}
                >
                  <Link to="/signup"
                    style={{
                      // float: 'right',
                      color: 'white',
                      // fontSize: '1.1rem',
                      // fontWeight: 'bold',
                      textDecoration: 'none',
                    }}>
                    Create a new account
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    color: '#99c93c',
                    margin: smallScreen ? '1rem' : '2rem',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    borderColor: '#99c93c'
                  }}
                  size={'large'}
                >
                  <a
                    href={`${loginDssEndpoint}/v1/oauth2/authorize?client_id=hugsi&redirect_uri=${domain}/community`}
                    target="_blank"
                    style={{
                      color: '#99c93c',
                      textDecoration: 'none',
                    }}
                  >
                    Login
                  </a>
                </Button>
              </Box>
              <Box display="flex"
                flexDirection="row"
              >
                <Box>
                  <Typography variant="body1"
                    style={{
                      fontSize: '20px',
                      lineHeight: '40px',
                      fontWeight: 700,
                      marginBottom: '20px'
                    }}>Plus (+) means More </Typography>
                  <Typography variant="body1"
                    style={{
                      fontSize: '16px',
                      fontWeight: 300,
                    }}>
                    Say no to the blocks & locks. Get absolutely free
                    access to any type of content, be it blogs, articles, videos,
                    webinars, case studies, city reports, and more.
                  </Typography>
                </Box>
                <Box>
                  <img src={calculateIcon}
                    alt="calculate-icon"
                    style={{
                      width: '120px',
                      height: '120px',
                      marginLeft: '50px'
                    }} />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
              >
                <Box>
                  <img src={calculated_Icon}
                    alt="calculated-icon"
                    style={{
                      width: '120px',
                      height: '120px',
                      marginRight: '50px',

                    }} />
                </Box>
                <Box>
                  <Typography variant="body1"
                    style={{
                      fontSize: '20px',
                      lineHeight: '40px',
                      fontWeight: 700,
                      marginBottom: '20px'
                    }}>Deepest possible insights </Typography>
                  <Typography variant="body1"
                    style={{
                      fontSize: '16px',
                      fontWeight: 300,
                    }}>
                    Now get the exclusive details about the cities like
                    never before. Users can use more quality data & features to
                    take the overall experience to a whole new level.
                  </Typography>
                </Box>
              </Box>

            </Box>
          </Box>
          :
          <Box
            style={
              smallScreen
                ? {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '15px'
                }
                : {
                  display: 'flex',
                  marginBottom: '3rem',
                  width: '70%',
                  justifyContent: 'space-around',
                  marginLeft: '9rem'
                }
            }>
            <Box
              style={
                smallScreen
                  ? { width: '100%' }
                  : { width: '20%' }
              }></Box>
            <Box
              className={styles.publishBox}
              style={{
                marginTop: smallScreen ? '5rem' : '3rem',
                width: smallScreen ? '100%' : '70%',
                textAlign: 'justify',
                padding: 'inherit'
              }}
            >
              {post.content?.json &&
                documentToReactComponents(post.content.json, {
                  renderNode: {
                    // tslint:disable-next-line:variable-name
                    [BLOCKS.PARAGRAPH]: (node, children) => (
                      <p
                        className={
                          smallScreen
                            ? styles.smallParagraph
                            : styles.paragraph
                        }
                      >
                        {children}
                      </p>
                    ),
                    [BLOCKS.HEADING_2]: (node, children) => (
                      <h2
                        style={{
                          color: '#424242',
                          fontSize: smallScreen ? '1rem' : '1.5rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {children}
                      </h2>
                    ),
                    [BLOCKS.EMBEDDED_ASSET]: node => (
                      <div className={styles.embeddedImg}>
                        <img
                          src={`${node?.data?.target?.fields?.file['en-US']?.url}?w=960&q=90`}
                        />
                      </div>
                    ),
                  },
                })}
              <Box
                style={
                  smallScreen
                    ? { width: '100%' }
                    : { float: 'right', marginBottom: '30px' }
                }
              >
                <Button
                  variant="contained"
                  color={'primary'}
                  style={
                    mobileScreen
                      ? {
                        width: '100%',
                        backgroundColor: '#99c93c',
                        marginBottom: '15px',
                        marginTop: '15px',
                      }
                      : smallScreen
                        ? {
                          width: '100%',
                          backgroundColor: '#99c93c',
                          color: '#fff',
                          marginTop: '30px',
                        }
                        : {
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          backgroundColor: '#99c93c',
                        }
                  }
                  size={'large'}
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                    });
                    navigate('/stories', { replace: true });
                  }}
                >
                  See all articles
                </Button>
              </Box>
            </Box>
          </Box>
        }
      </Box>

    </Box >
  );
};

export default PostTemplate;