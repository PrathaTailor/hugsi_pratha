import React, { useState, useEffect } from 'react';
import { Link, graphql, navigate } from 'gatsby';
import Image from 'gatsby-image';
import SEO from 'hooks/seo';
import { useSiteMetadata } from '../../hooks';
import Moment from 'react-moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  FormControlLabel,
  FormGroup,
  TextField,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import addSubscriber from '../../api/addSubscriber';
import storeUserInputs from '../../api/storeUserInputs';
// @ts-ignore
import lockIcon from '../../images/lock-icon.png';
import useCities from '../../hooks/cities';
import { useStyles } from '../../styles/stories';

export const query = graphql`
  query allContentfulArticlesAndAllContentfulArticles($skip: Int, $limit: Int) {
    allPosts: allContentfulArticles(
      skip: $skip
      limit: $limit
      sort: { fields: publishedAt, order: ASC }
    ) {
      nodes {
        id
        title
        slug
        publishedAt
        author
        tags {
          ... on ContentfulTags {
            id
            title
          }
          ... on ContentfulAuthor {
            id
            name
          }
        }
        content {
          json
        }
        internal {
          type
        }
        isLoginRequired
        primaryImage {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`;
interface GqlData {
  latestPosts: any;
  allPosts: any;
  // allWebinars: any;
}

interface PageContext {
  numPages: number;
  currentPage: number;
}

interface Props {
  data: GqlData;
  pageContext: PageContext;
}

const breakPoints = [{ width: 1, itemsToShow: 1 }];
const domain = typeof window !== 'undefined' ? window.location.origin : '';

const iconComponent = props => {
  return <ExpandMoreIcon className={props.className} />;
};
const Stories: React.FC<Props> = ({ data, pageContext }) => {
  const { cityStore } = useCities();
  const accessToken = cityStore?.user?.username;
  const [allPosts, setAllPost] = useState([]);
  const [filteredPosts, setFilteredPost] = useState([]);
  const [filters, setFilters] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isSubscribed, setSubscribed] = useState(false);
  const [userEmailAddress, setUserEmailAddress] = useState<string>('');
  const [emailFieldError, setEmailFieldError] = useState('');
  const [open, setOpen] = useState(false);
  const styles = useStyles({});
  const smallScreen = useMediaQuery('(max-width:960px)');
  const { currentPage, numPages } = pageContext;
  const { apiKey, userInputsEndpoint, loginDssEndpoint } = useSiteMetadata();

  useEffect(() => {
    setLatestPosts(data?.latestPosts?.nodes);
    const allUniquePosts = data?.allPosts?.nodes.filter(
      (v, i, a) => a.findIndex(t => t.slug === v.slug) === i
    );
    const filteredArray = allUniquePosts.filter(element =>
      element.tags?.some(
        subElement => subElement?.__typename === 'ContentfulTags'
      )
    );
    setLatestPosts(filteredArray);
    // const allUniqueWebinars = data?.allWebinars?.nodes.filter(
    //   (v, i, a) => a.findIndex(t => t.slug === v.slug) === i
    // );
    const sortedArray =
      allUniquePosts.length &&
      allUniquePosts
        // .concat(allUniqueWebinars)
        .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    setAllPost(sortedArray);
    setFilteredPost(sortedArray);
  }, []);
  const filterKeys = allPosts.map(item => {
    return item?.internal?.type;
  });
  const setFilterKeys = [...new Set(filterKeys)];
  useEffect(() => {
    if (allPosts.length) {
      if (filters.length && filters.length < 2) {
        const filteredVal = [];
        filters.map(data => {
          const val = allPosts.filter(post => {
            return post.internal.type === data;
          });
          filteredVal.push(...val);
        });
        setFilteredPost(filteredVal);
      } else {
        setFilteredPost(allPosts);
      }
    }
  }, [filters]);
  const addUser = (e, status) => {
    storeUserInputs(userInputsEndpoint, apiKey, 'subscription', {
      emailAddress: userEmailAddress,
      isSubscribed: true,
    });
    addSubscriber(userInputsEndpoint, apiKey, userEmailAddress);
    setUserEmailAddress('');
    setOpen(true);
  };
  const getTotal = val => {
    const data = allPosts.filter(post => {
      return post.internal.type === val;
    });
    return data.length;
  };
  const validateEmail = (userEmailAddress: string) => {
    const regexExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexExpEmail.test(userEmailAddress);
  };

  const handleFilter = e => {
    e.persist();
    const data = [];
    if (e.target.checked) {
      // data = allPosts.filter(post => {
      //   return post.internal.type === e.target.value
      //  })
      setFilters([...filters, e.target.value]);
    } else {
      const fileredVal = [...filters];
      const index = fileredVal.indexOf(e.target.value);
      if (index !== -1) {
        fileredVal.splice(index, 1);
      }
      setFilters(fileredVal);
      // data = allPosts.filter(post => {
      //   return post.internal.type !== e.target.value
      //  })
    }
    setFilteredPost(data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadMore = () => {
    console.log('load');
  };

  return (
    <section>
      <SEO title="HUGSI' Latest Articles" />
      <Box
        className={
          smallScreen ? styles.smallInsightsContent : styles.insightsContent
        }
      >
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ border: '1ps solid #99C93C' }}
        >
          <DialogTitle id="alert-dialog-title">
            {'Thank you and welcome aboard!'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
        <section className={smallScreen ? styles.smallBanner : styles.banner}>
          <Box
            style={{ maxWidth: smallScreen ? '100%' : '60%', width: '100%' }}
          >
            <Typography variant={'h6'}>
              <Box
                fontWeight={'fontWeightBold'}
                fontSize={smallScreen ? '1.5rem' : '2.5rem'}
                lineHeight={smallScreen ? '2.5rem' : '3.5rem'}
                maxWidth={smallScreen ? '100%' : '75%'}
              >
                Every “Leaf” of content tells a story!
              </Box>
            </Typography>
            <Typography
              variant={'subtitle1'}
              style={{ margin: '1rem auto 3rem' }}
            >
              Explore the blogs, articles, and 360° content related to global
              urban green space management. Team HUGSI is working tremendously
              well to help people with effective data and support who can
              efficiently and effectively plan their cities for a sustainable
              future.
            </Typography>
            <Box width={smallScreen ? '20rem' : '100%'}>
              <Typography variant={'h6'}>
                <Box
                  fontWeight={'fontWeightBold'}
                  fontSize={smallScreen ? '1rem' : '1.4rem'}
                  marginBottom={'8px'}
                  lineHeight={'24px'}
                >
                  Subscribe to even Greener Stories
                </Box>
              </Typography>
              <TextField
                inputProps={{
                  style: {
                    fontSize: '1.25rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'white',
                    borderColor: '#99C93C',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: '#698d29',
                  },
                }}
                id="email"
                label="Your email"
                variant="outlined"
                autoComplete="off"
                onChange={event => {
                  setUserEmailAddress(event.target.value);
                }}
                onKeyPress={event => {
                  if (
                    event.key === 'Enter' &&
                    validateEmail(userEmailAddress)
                  ) {
                    addUser(event, true);
                    setSubscribed(true);
                  }
                }}
                value={userEmailAddress}
                style={{ width: smallScreen ? '20rem' : '34rem' }}
              />
              <Button
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#99C93C',
                  textDecoration: 'none',
                  textTransform: 'none',
                  borderRadius: '0.5rem',
                  fontSize: smallScreen ? '0.8rem' : '1.2rem',
                  width: smallScreen ? '5rem' : '8rem',
                  height: smallScreen ? '2.5rem' : '3.8rem',
                  marginLeft: smallScreen ? '0px' : '1.5rem',
                  marginTop: smallScreen ? '1rem' : '0',
                  // float:'right'
                }}
                onClick={e => {
                  if (validateEmail(userEmailAddress)) {
                    addUser(e, true);
                    setSubscribed(true);
                    setEmailFieldError('');
                    typeof window !== 'undefined' &&
                      localStorage.setItem('isUserSubscribed', 'Yes');
                  } else {
                    if (!userEmailAddress) {
                      setEmailFieldError('empty');
                    } else if (!validateEmail(userEmailAddress)) {
                      setEmailFieldError('invalid');
                    } else {
                      setEmailFieldError('');
                    }
                  }
                }}
              >
                Subscribe
              </Button>
              {emailFieldError === 'empty' && (
                <Box style={{ color: 'red' }}>
                  Please enter your email address
                </Box>
              )}

              {emailFieldError === 'invalid' && (
                <Box style={{ color: 'red' }}>
                  Please enter a valid email address
                </Box>
              )}
            </Box>
          </Box>
          <Box mt={smallScreen ? '2rem' : '0'}>
            <img
              src={require('../../assets/images/story-banner.svg')}
              alt="Stories Banner"
              width="100%"
            />
          </Box>
        </section>
      </Box>
      <Box
        className={
          smallScreen ? styles.smallInsightsContent : styles.latestContent
        }
      >
        <section
          className={smallScreen ? styles.smallBanner : styles.contentSection}
        >
          <Typography variant={'h6'}>
            <Box
              fontWeight={'fontWeightBold'}
              fontSize={smallScreen ? '1.5rem' : '1.8rem'}
              lineHeight={smallScreen ? '2.5rem' : '1.2'}
              maxWidth="75%"
            >
              Featured Stories
            </Box>
          </Typography>
          <Box style={{ maxWidth: '100%', width: '100%', marginTop: '40px' }}>
            {latestPosts ? (
              <Box height="auto" margin="auto">
                <ul className={styles.insightsListWrapper}>
                  {latestPosts.map(post => (
                    <li
                      key={post.id}
                      style={{
                        flexDirection: smallScreen ? 'column' : 'row',
                        width: smallScreen ? '100%' : '33.33%',
                        padding: smallScreen ? '15px 0px' : '15px',
                        cursor: 'pointer',
                      }}
                    >
                      <Link
                        className={styles.insightLink}
                        to={`/stories/${post.slug}`}
                      >
                        <Image
                          backgroundColor={'#424242'}
                          className={
                            post?.isLoginRequired &&
                            accessToken === undefined &&
                            styles.imageMain
                          }
                          style={
                            smallScreen
                              ? {
                                  marginBottom: '2rem',
                                  border: '1px solid #99c93c',
                                  height: '270px',
                                }
                              : {
                                  border: '1px solid #99c93c',
                                  height: '270px',
                                }
                          }
                          fluid={post.primaryImage.fluid}
                          alt={post.title}
                        />
                        {post?.isLoginRequired && accessToken === undefined && (
                          <img
                            src={lockIcon}
                            alt=""
                            style={{
                              position: 'absolute',
                              bottom: '20px',
                              right: '20px',
                              zIndex: 9999,
                            }}
                          />
                        )}
                      </Link>
                      <Box
                        style={{ display: 'flex' }}
                        onClick={() => {
                          window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                          });
                          post?.isLoginRequired &&
                            accessToken === undefined &&
                            navigate(`/stories/${post?.slug}`, {
                              replace: true,
                            });
                        }}
                      >
                        <Box
                          onClick={() => {
                            window.scroll({
                              top: 0,
                              left: 0,
                              behavior: 'smooth',
                            });
                            post?.isLoginRequired &&
                              accessToken === undefined &&
                              navigate(`/stories/${post?.slug}`, {
                                replace: true,
                              });
                          }}
                        >
                          <Link
                            style={{
                              marginBottom: smallScreen ? '1rem' : '0',
                              display: 'block',
                              marginTop: '20px',
                              color: '#698D29',
                              fontSize: '20px',
                              lineHeight: '1.2',
                              textDecoration: 'none',
                              // display: '-webkit-box',
                              // webkitLineClamp: '1',
                              // webkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                            to={`/stories/${post?.slug}`}
                          >
                            {post?.title}{' '}
                          </Link>
                          <p className={styles.storiesText}>
                            {`Published`}
                            {post?.author && ` by ${post?.author}`}
                            {` on `}
                            {post?.publishedAt && (
                              <Moment format="D MMM YYYY" withTitle>
                                {post?.publishedAt}
                              </Moment>
                            )}
                          </p>
                        </Box>

                        {post?.isLoginRequired && (
                          <a
                            // href="https://api.qa-customer.dss.husqvarnagroup.net/v1/oauth2/authorize?client_id=hugsi&
                            // redirect_uri=http://localhost:8080/community"
                            href={`${loginDssEndpoint}/v1/oauth2/authorize?client_id=hugsi&redirect_uri=${domain}/community`}
                            target="_blank"
                            style={{
                              textDecoration: 'none',
                            }}
                          >
                            <Button
                              style={{
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: '#99C93C',
                                textDecoration: 'none',
                                textTransform: 'none',
                                borderRadius: '15px',
                                fontSize: '1rem',
                                width: '68px',
                                height: '34px',
                                marginLeft: '1.5rem',
                                marginTop: '20px',
                              }}
                            >
                              Hugsi+
                            </Button>
                          </a>
                        )}
                      </Box>
                    </li>
                  ))}
                </ul>
              </Box>
            ) : (
              <Box height="auto" margin="6.25rem auto" maxWidth="75vw">
                <Typography>We'll post our first article soon here.</Typography>
              </Box>
            )}
          </Box>
        </section>
      </Box>
      <Box
        className={
          smallScreen ? styles.smallInsightsContent : styles.insightsContent
        }
      >
        <Box
          style={{
            width: smallScreen ? 'auto' : '40%',
            paddingTop: '15px',
            paddingRight: smallScreen ? '0px' : '100px',
          }}
        >
          <Typography variant={'h6'}>
            <Box
              fontWeight={'fontWeightBold'}
              fontSize={smallScreen ? '1.5rem' : '1.3rem'}
              lineHeight={smallScreen ? '2.5rem' : '1.2'}
              paddingBottom={'11px'}
              borderBottom={'1px solid #F4F5F5'}
              marginBottom={'11px'}
            >
              Filters
            </Box>
          </Typography>
          <Typography variant={'h6'}>
            <Box
              fontWeight={'fontWeightBold'}
              fontSize={smallScreen ? '1.5rem' : '1rem'}
              lineHeight={smallScreen ? '2.5rem' : '1.2'}
              marginBottom={'13px'}
            >
              Type
            </Box>
          </Typography>
          <Box>
            <FormGroup
              // value="category"
              // name="category"
              onChange={e => handleFilter(e)}
            >
              {setFilterKeys &&
                setFilterKeys?.map(item => {
                  return (
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: 'max-content',
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox value={item} />}
                        label={item.replace('Contentful', '')}
                      />
                      <span style={{ display: 'inline-block', padding: '9px' }}>
                        {getTotal(item)}
                      </span>
                    </Box>
                  );
                })}
            </FormGroup>
          </Box>
        </Box>
        <Box style={{ width: '100%' }}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginLeft: smallScreen ? '0px' : '-15px',
              width: smallScreen ? 'max-content' : 'unset',
            }}
          >
            <Typography
              variant={'h6'}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              Sort By
            </Typography>
            <Select
              variant={'outlined'}
              disableUnderline
              labelId="inputLabel"
              IconComponent={iconComponent}
              // defaultValue={CONTINENT_NAMES[0]}
              style={{
                width: smallScreen ? '12rem' : '10rem',
                margin: smallScreen ? '1rem' : '0rem 1rem',
              }}
              value={'recent'}
              // onChange={(event, ind2) => {
              //   handleChangeIndex(Number(event.target.value));
              // }}
            >
              <MenuItem value="recent">Most recent</MenuItem>
            </Select>
          </Box>
          {filteredPosts ? (
            <Box height="auto" margin="auto">
              <ul
                className={
                  smallScreen
                    ? styles.insightsDivListWrapper
                    : styles.insightsListWrapper
                }
              >
                {filteredPosts.map(post => (
                  <li
                    key={post.slug}
                    style={{
                      flexDirection: smallScreen ? 'column' : 'row',
                      width: smallScreen ? '100%' : '50%',
                      padding: smallScreen ? '15px 0px' : '20px 15px',
                      cursor: 'pointer',
                    }}
                  >
                    <Link
                      className={styles.insightLink}
                      to={`/stories/${post?.slug}`}
                    >
                      <Image
                        backgroundColor={'#424242'}
                        className={
                          post?.isLoginRequired &&
                          accessToken === undefined &&
                          styles.imageMain
                        }
                        style={
                          smallScreen
                            ? {
                                marginBottom: '2rem',
                                border: '1px solid #99c93c',
                                height: '270px',
                              }
                            : {
                                border: '1px solid #99c93c',
                                height: '270px',
                                position: 'relative',
                                backgroundColor: 'rgba(153,201,60,.5)',
                              }
                        }
                        fluid={post?.primaryImage?.fluid}
                        alt={post?.title}
                      >
                        {' '}
                      </Image>
                      {post?.isLoginRequired && accessToken === undefined && (
                        <img
                          src={lockIcon}
                          alt=""
                          style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                            zIndex: 99,
                          }}
                        />
                      )}
                    </Link>
                    <Box
                      style={{ display: 'flex' }}
                      onClick={() => {
                        window.scroll({
                          top: 0,
                          left: 0,
                          behavior: 'smooth',
                        });
                        post?.isLoginRequired &&
                          accessToken === undefined &&
                          navigate(`/stories/${post?.slug}`, { replace: true });
                      }}
                    >
                      <Box
                        onClick={() => {
                          window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                          });
                          post?.isLoginRequired &&
                            accessToken === undefined &&
                            navigate(`/stories/${post?.slug}`, {
                              replace: true,
                            });
                        }}
                      >
                        <Link
                          style={{
                            marginBottom: smallScreen ? '1rem' : '0',
                            display: 'block',
                            marginTop: '20px',
                            color: '#698D29',
                            fontSize: '20px',
                            lineHeight: '1.2',
                            textDecoration: 'none',
                            // display: '-webkit-box',
                            // webkitLineClamp: '1',
                            // webkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                          to={`/stories/${post?.slug}`}
                        >
                          {post?.title}{' '}
                        </Link>
                        <p className={styles.storiesText}>
                          {`Published`}
                          {post?.author && ` by ${post?.author}`}
                          {` on `}
                          {post?.publishedAt && (
                            <Moment format="D MMM YYYY" withTitle>
                              {post?.publishedAt}
                            </Moment>
                          )}
                        </p>
                      </Box>

                      {post?.isLoginRequired && (
                        <a
                          // href="https://api.qa-customer.dss.husqvarnagroup.net/v1/oauth2/authorize?client_id=hugsi&
                          // redirect_uri=http://localhost:8080/community"
                          href={`${loginDssEndpoint}/v1/oauth2/authorize?client_id=hugsi&redirect_uri=${domain}/community`}
                          target="_blank"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <Button
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              backgroundColor: '#99C93C',
                              textDecoration: 'none',
                              textTransform: 'none',
                              borderRadius: '15px',
                              fontSize: '1rem',
                              width: '68px',
                              height: '34px',
                              marginLeft: '1.5rem',
                              marginTop: '20px',
                            }}
                          >
                            Hugsi+
                          </Button>
                        </a>
                      )}
                    </Box>
                  </li>
                ))}
              </ul>
            </Box>
          ) : (
            <Box height="auto" margin="6.25rem auto" maxWidth="75vw">
              <Typography>We'll post our first article soon here.</Typography>
            </Box>
          )}
          {/* <Typography variant={'h6'} style={{display:'flex',color:'#99C93C', justifyContent:'center'}}>
            <Box
              fontWeight={'fontWeightBold'}
              fontSize={smallScreen ? '1.5rem' : '1.8rem'}
              lineHeight={smallScreen ? '2.5rem' : '1.2'}
              maxWidth="75%"
              onClick={handleLoadMore}
            >
              Load More
            </Box>
          </Typography> */}
        </Box>
      </Box>
    </section>
  );
};

export default Stories;
