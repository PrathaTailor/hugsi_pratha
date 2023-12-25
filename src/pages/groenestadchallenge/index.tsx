import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Button,
    useMediaQuery,
    Typography,
    Box
} from '@material-ui/core';
import SEO from 'hooks/seo';
import GSCTable from 'components/rankings-table/gsc-towns-table';
import Map from 'components/map/map';
import InteractionBlocker from '../../components/interaction-blocker/interaction-blocker';
import TopComponent from 'components/top-component/top-component';
import Townpin from '../../components/map/townPin';
import useCities from 'hooks/cities';
import LoadingMap from '../../components/map/loading-map';
// @ts-ignore
import gscLandscape from '../../images/gsc-landscape.png';
// @ts-ignore
import gscLogo from '../../images/gsc-logo.png';
// @ts-ignore
import hqvLogoBlack from '../../images/husqvarna_logo_black.png';
// @ts-ignore
import nlGreenLabelLogoMedium from '../../images/logo-nl-greenlabel-medium.png';
// @ts-ignore
import swecoLogo from '../../images/logo-sweco.png';
// @ts-ignore
import gscClouds from '../../images/gsc-clouds.png';
// @ts-ignore
import swecoPressKit from '../../images/sweco-press-kit.png';
import { useStyles } from '../../styles/groenestadchallenge';

interface Props {
    location: Location;
}

/**
 *  Page
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const GSCRankingPage: React.FC<Props> = props => {
    const {
        cityStore,
        townsInActiveRegion,
    } = useCities();
    const style = useStyles({});
    const { towns } = cityStore?.municipalities || {};
    const smallScreen = useMediaQuery('(max-width: 991px)');
    const [latLongList, setLatLongList] = useState([]);
    const swecoLayerRef = useRef(null);
    const townsTableHeaderRef = useRef(null);

    useEffect(() => {
        if (towns) {
            const getLatLongs = towns => {
                return towns.map(t => {
                    const [latitude, longitude] = t.latlong
                        .split(',')
                        .map(s => parseFloat(s.trim()));

                    t.latlongarr = [longitude, latitude];
                    return t.latlongarr;
                });
            };
            setLatLongList(getLatLongs(towns));
        }
    }, [towns]);

    return (
        <section>
            <SEO title="HUGSI GSC" description={`Green city challenge`} />
            <TopComponent
                height="65vh"
                style={{
                    margin: '100px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {!towns ? (
                    <LoadingMap message={'Loading map data'} />
                ) : (
                    <>
                        <InteractionBlocker viewType={'horizantal'} />
                        {latLongList?.length > 0 && (
                            <Map latLongArrs={latLongList} view="ranking">
                                {map => {
                                    const zoom = map.getZoom();

                                    const isMediumPin = zoom > 2;
                                    const isLargePin = zoom > 4;

                                    return townsInActiveRegion.map((town, townIndex) => {
                                        const [longitude, latitude] = latLongList[townIndex];
                                        return (
                                            <Townpin
                                                key={`${town.id}-${townIndex}`}
                                                town={town}
                                                latitude={latitude}
                                                longitude={longitude}
                                                largePin={isLargePin}
                                                mediumPin={isMediumPin}
                                            />
                                        );
                                    });
                                }}
                            </Map>
                        )}
                    </>
                )}
            </TopComponent>
            <Box className={style.root} style={{ margin: smallScreen ? '5rem 1rem 2rem' : '5rem' }}>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: smallScreen ? 'column' : 'row',
                    }}
                >
                    <a href="https://groenestadchallenge.nl" target="_blank">
                        <img
                            src={gscLogo}
                            alt="GSC logo"
                            style={{
                                width: smallScreen ? '350px' : '500px',
                                height: smallScreen ? '100px' : '120px',
                            }}
                        />
                    </a>
                    <Box
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gridGap: smallScreen ? '0.5rem' : '1rem',
                            margin: smallScreen ? 'auto 0rem' : 'auto 2rem',
                        }}
                    >
                        <a
                            href="https://www.husqvarna.com/"
                            target="_blank"
                            style={{ margin: 'auto 0' }}
                        >
                            <img
                                src={hqvLogoBlack}
                                alt="Husqvarna"
                                style={{
                                    width: smallScreen ? '100px' : '150px',
                                    height: '30px',
                                    margin: 'auto 0rem',
                                }}
                            />
                        </a>
                        <a
                            href="https://nlgreenlabel.nl/"
                            target="_blank"
                            style={{ margin: 'auto 0' }}
                        >
                            <img
                                src={nlGreenLabelLogoMedium}
                                alt="NL Greenlabel"
                                style={{
                                    width: smallScreen ? '100px' : '150px',
                                    height: '40px',
                                    margin: 'auto 0rem',
                                }}
                            />
                        </a>
                        <a href="https://www.swecogroup.com/" target="_blank">
                            <img
                                src={swecoLogo}
                                alt="Sweco"
                                style={{
                                    width: smallScreen ? '100px' : '150px',
                                    height: '50px',
                                    margin: 'auto 0rem',
                                }}
                            />
                        </a>
                    </Box>
                </Box>
                <Box
                    style={{
                        maxWidth: smallScreen ? 'none' : '40rem',
                        marginTop: '2rem',
                    }}
                >
                    <Typography
                        variant={smallScreen ? 'h6' : 'h4'}
                        style={{
                            color: '#698d29',
                            fontWeight: 'bold',
                            // fontSize: smallScreen ? '2rem' : '2.2rem',

                            // paddingTop: '1rem',
                            lineHeight: smallScreen ? '1.5rem' : '2.5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        {` Which municipalities are up to the challenge?`}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '0rem' }}>
                        Green cities and towns are essential to cope with climate change,
                        restore biodiversity and promote the health of citizens. That is why
                        we challenge all municipalities in the Netherlands to participate in
                        the Green City Challenged 2021! Everyone wants greener, but the
                        question is how? We believe it starts with insight. Which
                        neighborhood is the greenest? How much green space does each
                        resident have at their disposal? And where exactly is planting
                        lacking? The Green City Challenge investigates this and provides
                        in-depth insight into the greening potential per district on the
                        basis of data analyzes (including satellite, aerial photos and BGT).
                    </Typography>
                    <Button
                        style={{
                            fontWeight: 'bold',
                            color: '#698d29',
                            textDecoration: 'none',
                            textTransform: 'none',
                            margin: '1rem 0',
                            fontSize: '1.2rem',
                        }}
                        onClick={() => {
                            window.open('https://groenestadchallenge.nl/', '_blank');
                        }}
                    >
                        Learn More at: groenestadchallenge.nl
                    </Button>
                </Box>
                <Box
                    className={smallScreen ? style.smallBtnContainer : style.btnContainer}
                >
                    <Button
                        variant="contained"
                        style={{
                            color: 'white',
                            margin: smallScreen ? '1rem 0' : '0 2rem 0 0',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            backgroundColor: '#99c93c',
                        }}
                        size={'large'}
                        onClick={() => {
                            townsTableHeaderRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                            });
                        }}
                    >
                        See the leaderboard
                    </Button>
                    <Button
                        variant="outlined"
                        color={'primary'}
                        style={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            color: '#99c93c',
                            textDecoration: 'none',
                            borderColor: '#99c93c',
                        }}
                        size={'large'}
                        onClick={() => {
                            swecoLayerRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                            });
                            // window.scrollBy(0, -10);x
                        }}
                    >
                        Learn more about the new local GEO-data
                    </Button>
                </Box>
            </Box>
            <img
                src={gscLandscape}
                width="100%"
                style={{ marginTop: smallScreen ? 'unset' : '-27rem' }}
            />
            <div
                style={{ margin: smallScreen ? '0rem 0.5rem' : '0rem 12rem' }}
                ref={townsTableHeaderRef}
            >
                {towns ? (
                    <GSCTable towns={towns} />
                ) : (
                    <div style={{ display: 'flex' }}>
                        <i
                            className="fas fa-spinner fa-pulse"
                            style={{
                                color: '#99c93c',
                                margin: '2rem auto',
                                fontSize: '4rem',
                            }}
                        ></i>
                    </div>
                )}
            </div>
            <img
                src={gscClouds}
                style={{ width: '100%', height: smallScreen ? '100px' : '200px' }}
            />
            <div
                ref={swecoLayerRef}
                className={smallScreen ? style.smallLayerSec : style.layerSec}
            >
                <div>
                    <Typography
                        variant="h4"
                        style={{
                            color: '#293845',
                            margin: smallScreen ? '1rem 2rem' : '1rem auto',
                            fontWeight: 'bold',
                        }}
                    >
                        Benefit from detailed local GEO-data
                    </Typography>
                    <Box
                        style={{
                            margin: smallScreen ? '1rem 2rem' : 'unset',
                            fontSize: smallScreen ? '1rem' : '1.2rem',
                        }}
                    >
                        Sweco helps us to get the local data and bring it into
                        the mix to get an overview of the GEO data. This helps us to deep dive into
                        the green space data of a specific city or village.
                        <br />
                        Green parameters (KPIs) that we are tracking as part of the Green City
                        Challenge:
                        <ul>
                            <li>
                                % of green space in the city, divided by public and private lands
                            </li>
                            <li>
                                Build-up and area of green space in the city (trees, bushes, grass)
                            </li>
                            <li>Green space per capita</li>
                            <li>Distribution of greenspace over the city</li>
                            <li>Vitality and health of the vegetation</li>
                            <li>Benchmark with other cities part of the challenge</li>
                            <li>
                                How is the urban greenery (trees, bushes, and vegetation) distributed
                                over the city/village?{' '}
                            </li>
                        </ul>
                    </Box>
                </div>
                <Box>
                    <img
                        src={swecoPressKit}
                        style={{
                            width: '250px',
                            height: '400px',
                            margin: smallScreen ? '1rem auto' : 'unset',
                        }}
                    />
                </Box>
            </div>
        </section>
    );
};

export default observer(GSCRankingPage);