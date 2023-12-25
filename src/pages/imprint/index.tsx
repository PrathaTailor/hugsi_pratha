import React from 'react';
import SEO from '../../hooks/seo';
import { Typography, useMediaQuery, Box, Divider } from '@material-ui/core';
import { useStyles } from '../../styles/imprint';
const browser = typeof window !== 'undefined' && window;

/**
 * Imprint Page
 */
export default function NotFoundPage() {
    const styles = useStyles({});
    const smallScreen = useMediaQuery('(max-width:600px)');
    if (!browser) {
        return null;
    }
    const addressLine1 = 'Drottninggatan 2';
    const addressLine2 = '561 82 Husqvarna';

    return (
        <section>
            <SEO title="Imprint" />
            <main className={styles.root}>
                <section
                    className={smallScreen ? styles.smallErrorMessage : styles.message}
                >
                    <div>
                        <section>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop: smallScreen ? '2rem' : '6rem',
                                    padding: smallScreen ? '8rem 1rem' : '0 3rem',
                                }}
                            >
                                <Typography
                                    variant={smallScreen ? 'body2' : 'h6'}
                                    style={{ fontWeight: 'bold', lineHeight: '1' }}
                                >
                                    HUGSI Imprint
                                </Typography>
                                <Typography
                                    variant={smallScreen ? 'h5' : 'h3'}
                                    style={{ fontWeight: 'bold', lineHeight: '1.4' }}
                                >
                                    Imprint
                                </Typography>

                                <Typography variant={'h6'}>
                                    Husqvarna AB
                                    <br></br>
                                    {addressLine1}<br></br>
                                    {addressLine2}
                                </Typography>
                            </div>

                            <br />
                            <section
                                style={{
                                    margin: smallScreen ? '1rem' : '2rem 3rem 0rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                <Box
                                    style={{
                                        fontSize: '1.2rem',
                                    }}
                                >
                                    <i
                                        className="fas fa-phone-alt"
                                        style={{ marginRight: '0.5rem' }}
                                    ></i>{' '}
                                    Telephone: 46 (0)36 36 40 00
                                    <br></br>
                                    <br></br>
                                    <i
                                        className="fas fa-envelope"
                                        style={{ marginRight: '0.5rem' }}
                                    ></i>{' '}
                                    <a
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        href="mailto:hello@hugsi.green?subject=HUGSI"
                                    >
                                        Contact: hello@hugsi.green
                                    </a>
                                </Box>
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
            <Divider />
        </section>
    );
}
