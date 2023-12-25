import React from 'react';
import SEO from '../../hooks/seo';
import { Link } from 'gatsby';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../styles/404';
const browser = typeof window !== 'undefined' && window;

/**
 * Not Found Page
 * Prevent 404 from flashing.
 * See: https://github.com/gatsbyjs/gatsby/issues/5329#issuecomment-484741119
 */
export default function NotFoundPage() {
  const styles = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  if (!browser) {
    return null;
  }

  return (
    <section>
      <SEO title="404: Not Found" />
      <main className={styles.root}>
        <section
          className={smallScreen ? styles.smallErrorMessage : styles.message}
        >
          <div style={{}}>
            <section>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: smallScreen ? '8rem 1rem' : '0 3rem',
                }}
              >
                <Typography
                  variant={smallScreen ? 'h5' : 'h3'}
                  style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                >
                  The grass might be greener on the other side…
                </Typography>

                <Typography variant={'h6'} style={{ margin: '2rem' }}>
                  … but it seems like you’re trying to visit a side of HUGSI
                  that doesn’t exist.
                </Typography>
              </div>
              <br />
              <section
                style={{
                  margin: smallScreen ? '1rem' : '5rem 3rem',
                  fontWeight: 'bold',
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <ArrowBack style={{ color: '#fff' }} />
                  <Box
                    style={{
                      padding: '0 1rem',
                      fontSize: '1.2rem',
                    }}
                  >
                    Go back to the start page and restart your journey
                  </Box>
                </Link>
              </section>
            </section>
          </div>
          <div
            style={{
              display: 'flex',
              placeContent: 'center',
              placeItems: 'center',
            }}
          ></div>
        </section>
      </main>
    </section>
  );
}