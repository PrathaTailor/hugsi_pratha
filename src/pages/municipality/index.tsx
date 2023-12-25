import React, { useEffect, useState } from 'react';
import {
	Button,
	Typography,
	Tabs,
	AppBar,
	Tab,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	useMediaQuery,
	Box,
	Divider
} from '@material-ui/core';
import { ArrowForward, ArrowDropDown } from '@material-ui/icons';
import {
	PieChart,
	Pie,
} from 'recharts';
import GSCBarGauge from '../../components/bar-chart/gsc-bar-chart';
import Pagination from '@material-ui/lab/Pagination';
import { observer } from 'mobx-react-lite';
import { Link, navigate } from 'gatsby';
import { useSiteMetadata } from '../../hooks';
import useCities from '../../hooks/cities';
import { IconBullet, IconBulletWrapper } from '../../components/icon-bullets';
import * as NumberUtils from '../../utils/number-utils';
import { rankingInWord } from '../../utils/city-utils';
import PotentialKPIs from 'components/potential-kpi/potential-kpi';
// @ts-ignore
import cloudWhite from '../../images/cloud-white.png';
// @ts-ignore
import cloudBottom from '../../images/cloud-bottom.png';
// @ts-ignore
import gscLogo from '../../images/gsc-logo.png';
// @ts-ignore
import iconHealth from '../../images/icon-health.png';
// @ts-ignore
import iconDistribution from '../../images/icon-distribution.png';
// @ts-ignore
import iconPerCapita from '../../images/icon-per-capita.png';
// @ts-ignore
import iconPublicCapita from '../../images/icon-public-capita.png';
// @ts-ignore
import iconAmount from '../../images/icon-amount.png';
// @ts-ignore
import iconArea from '../../images/icon-area.png';
// @ts-ignore
import iconPopulation from '../../images/icon-population.png';
// @ts-ignore
import iconTrees from '../../images/icon-trees.png';
// @ts-ignore
import iconShrubs from '../../images/icon-shrubs.png';
// @ts-ignore
import iconGrass from '../../images/icon-grass.png';
// @ts-ignore
import iconRatio from '../../images/icon-ratio.png';
// @ts-ignore
import loginCTA from '../../images/Login_Call_To_Action.png';
import NeighbourhoodsList from 'components/neighbourhoods/neighbourhoods-list';
import checkDomain from 'components/check-domain/check-domain';
import {
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	HealthIndicator,
	useStyles,
	WhiteAdd,
	WhiteRemove
} from '../../styles/municipality';
const browser = typeof window !== 'undefined' && window;

interface Props {
	location?: Location;
	city?: any;
	municipality?: any;
	view?: string;
	id?: string;
	urlByLocation?: string;
}

/**
 * Municipality Page
 * @file city.tsx is the Municipality Page that renders a city's details
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const MunicipalityPage: React.FC<Props> = props => {
	const { city = {}, view, id, urlByLocation } = props;
	if (!browser) {
		return null;
	}

	const municipalityId =
		view === 'city'
			? decodeURI(window.location?.search?.slice(1))
			: decodeURI(props.location?.search?.slice(1, -1));

	const townId = decodeURI(
		typeof window !== 'undefined'
			? window?.location?.hash.indexOf('/') !== -1
				? window?.location?.hash?.substring(
					1,
					window?.location?.hash.indexOf('/')
				)
				: window?.location?.hash?.substring(1)
			: ''
	);
	if (!municipalityId || (view !== 'city' && !townId)) {
		navigate('/404', { replace: true });
	}
	const {
		mainAppBar,
		smallMainTab,
		mainTab,
		smallUnselectedTab,
		unselectedTab,
		question,
		smallDemographicGrid,
		answer,
	} = useStyles({});
	const { cityStore } = useCities();
	const { towns, user, municipalities, neighborhoods } = cityStore;
	const [listOfTowns, setListOfTowns] = useState([]);
	const [filteredTowns, setFilteredTowns] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [activePage, setActivePage] = useState(1);
	const [expanded, setExpanded] = React.useState<string | false>(``);
	const [panelIndex, setPanelIndex] = useState(null);
	const smallScreen = useMediaQuery('(max-width:600px)');
	const [rankedCitiesCount, setRankingCitiesCount] = useState(0);
	const [rankedVillagesCount, setRankingVillagesCount] = useState(0);
	const [matchingNeighbourhoods, setMatchingNeighbourhoods] = useState([]);
	const [showPotential, setShowPotential] = useState(false);
	const [isDomainLoaded, setisDomainLoaded] = useState(false);
	const PAGE_COUNT = 5;
	const { userInputsEndpoint, apiKey } = useSiteMetadata();
	const executeScroll = elemToScrollTo => {
		elemToScrollTo.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	};
	const municipalityName =
		view === 'city' &&
			municipalityId.includes('Municipality') &&
			municipalityId.lastIndexOf(' ') !== -1
			? municipalityId.substring(0, municipalityId.lastIndexOf(' '))
			: municipalityId;
	useEffect(() => {
		if (!municipalityId || (view !== 'city' && !townId)) {
			// navigate('/404', { replace: true });
		}

		if (Object.entries(towns).length > 0) {
			const matchingTowns = Object.values(towns).filter(
				(t: any) => t.gemeentenaam === municipalityName
			);
			const sortedTowns = matchingTowns
				.slice()
				.sort((a: any, b: any) => a.plaatsnaam.localeCompare(b.plaatsnaam));
			if (sortedTowns.length > 0) {
				setListOfTowns(sortedTowns);
				const selectedTownIndex = sortedTowns.findIndex(
					(mt: any) => mt.plaatsnaam === townId
				);
				const townPanelIndex = selectedTownIndex + 1;
				const page =
					townPanelIndex >= 0 ? Math.ceil(townPanelIndex / PAGE_COUNT) : 1;
				handlePageRedirect({}, page === 0 ? 1 : page);
				if (townPanelIndex !== panelIndex) {
					if (
						typeof window !== 'undefined' &&
						window?.location?.hash &&
						window.location.hash?.endsWith('/neighbourhoods')
					) {
						setSubTabValue(1);
					} else {
						setSubTabValue(0);
					}
				}
				if (townPanelIndex >= 0) {
					setExpanded(`panel${townPanelIndex}`);
				}
				setPanelIndex(townPanelIndex);
			}
			if (towns) {
				setRankingCitiesCount(
					Object.values(towns).filter(
						(m: any) =>
							m.category && m.category === 'city' && m.town_ranking !== 0
					).length
				);
				setRankingVillagesCount(
					Object.values(towns).filter(
						(m: any) =>
							m.category && m.category === 'village' && m.town_ranking !== 0
					).length
				);
			}
			if (panelIndex) {
				const elemToScrollTo = document.getElementById(
					`townref-${panelIndex + 1}`
				);
				elemToScrollTo && executeScroll(elemToScrollTo);
			}
		}
	}, [municipalityId, townId, panelIndex, towns, municipalities]);

	useEffect(() => {
		if (municipalityName && neighborhoods) {
			const getFilteredNeighbors = (municipality: string) => {
				return Object.values(neighborhoods).filter(
					(n: any) => n.gemeentenaam === municipality
				);
			};
			const userDomain = user?.testDomain
				? user.testDomain?.split('@').pop()
				: user?.username
					? user.username?.split('@').pop()
					: '';
			if (user && user.username && userDomain) {
				checkDomain(userInputsEndpoint, apiKey, userDomain, municipalityName)
					.then(res => {
						setisDomainLoaded(true);
						if (res) {
							setMatchingNeighbourhoods(getFilteredNeighbors(municipalityName));
							setShowPotential(true);
						}
					})
					.catch(error => {
						setisDomainLoaded(true);
						setShowPotential(false);
					});
			} else {
				showPotential && setShowPotential(false);
			}
		}
	}, [user]);
	const [subTabValue, setSubTabValue] = React.useState(0);
	const handleChange = (panel: string) => (
		event: React.ChangeEvent<{}>,
		newExpanded: boolean
	) => {
		setExpanded(newExpanded ? panel : false);
		const index = panel.substring(5);
		if (typeof  window !== 'undefined') {
			window.location.hash = listOfTowns[Number(index) - 1]?.plaatsnaam;
		}
		const elemToScrollTo = document.getElementById(`townref-${index}`);
		elemToScrollTo && executeScroll(elemToScrollTo);
	};
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				key={`city-tabpanel-${index}`}
				{...other}
			>
				{value === index && (
					<Box>
						<Box>{children}</Box>
					</Box>
				)}
			</div>
		);
	}

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}
	const handleSubTabChange = (event, newValue) => {
		setSubTabValue(newValue);
	};
	const handlePageRedirect = (e, value) => {
		setActivePage(value);
		const page = value;
		const perPage = PAGE_COUNT;
		const offset = (page - 1) * perPage;
		const paginatedItems = listOfTowns.slice(offset).slice(0, PAGE_COUNT);
		const totalPages = Math.ceil(listOfTowns.length / perPage);
		setFilteredTowns(paginatedItems);
		setTotalPages(totalPages);
	};
	return (
		<Box style={{ marginTop: smallScreen ? '4rem' : 'unset' }}>
			<Box
				style={{
					margin: smallScreen ? '0rem 1rem' : '0rem',
				}}
			>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<a href="https://groenestadchallenge.nl" target="_blank">
						<img
							src={gscLogo}
							style={{
								height: smallScreen ? '70px' : '80px',
								width: smallScreen ? '200px' : '300px',
							}}
						></img>
					</a>
					<Box
						style={{
							display: 'flex',
						}}
					>
						<Button
							style={{
								color: '#698d29',
								fontWeight: 'bold',
								fontSize: '1.2rem',
								// float: 'right',
								marginTop: '0.5rem',
								textDecoration: 'none',
								textTransform: 'none',
							}}
							component={Link}
							to="/groenestadchallenge"
						>
							Learn more{' '}
							<i
								className="fa fa-info-circle"
								aria-hidden="true"
								style={{ marginLeft: smallScreen ? 'unset' : '0.5rem' }}
							></i>
						</Button>
					</Box>
				</Box>
				{!smallScreen && (
					<img src={cloudWhite} style={{ height: '100px', width: '100%' }} />
				)}
				<Box
					style={{
						display: 'flex',
						flexDirection: smallScreen ? 'column-reverse' : 'row',
						justifyContent: smallScreen ? 'unset' : 'space-between',
					}}
				></Box>
				<Divider />
				<>
					{filteredTowns?.length > 0 ? (
						<div>
							{filteredTowns.map((town, townIndex) => {
								return (
									<div
										key={`town-${townIndex +
											1 +
											PAGE_COUNT * (activePage - 1)}-${town.town_ranking}`}
										id={`townref-${townIndex +
											1 +
											PAGE_COUNT * (activePage - 1)}`}
									>
										<ExpansionPanel
											square
											expanded={
												expanded ===
												`panel${townIndex + 1 + PAGE_COUNT * (activePage - 1)}`
											}
											onChange={handleChange(`panel${townIndex + 1 + PAGE_COUNT * (activePage - 1)}`)}
											expanded={expanded === `panel${(townIndex + 1) + (PAGE_COUNT * (activePage - 1))}`}
                      						onChange={handleChange(`panel${(townIndex + 1) + (PAGE_COUNT * (activePage - 1))}`)}	
										>
											<ExpansionPanelSummary
												aria-controls="panel1d-content"
												id="panel1d-header"
												expandIcon={
													expanded ===
														`panel${townIndex +
														1 +
														PAGE_COUNT * (activePage - 1)}` ? (
														<WhiteRemove />
													) : (
														<WhiteAdd />
													)
												}
												style={{
													background: 'white',
												}}
											>
												<i
													className="fas fa-city"
													style={{
														margin: '0.5rem',
														color: '#698d29',
													}}
												></i>
												<Typography
													className={question}
													style={{
														fontWeight:
															expanded ===
																`panel${townIndex +
																1 +
																PAGE_COUNT * (activePage - 1)}`
																? 'bold'
																: 'normal',
														fontSize: smallScreen ? '1.2rem' : '1.5rem',
														background: 'white',
														margin: smallScreen ? '0' : '0 2rem',
														color: '#698d29',
													}}
												>
													{town.plaatsnaam}
												</Typography>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails>
												<AppBar position="static" className={mainAppBar}>
													{user?.first_name &&
														matchingNeighbourhoods?.length > 0 &&
														showPotential &&
														(isDomainLoaded ? (
															<Tabs
																value={subTabValue}
																onChange={handleSubTabChange}
																aria-label="simple tabs example"
															>
																<Tab
																	label="Town"
																	{...a11yProps(0)}
																	className={
																		subTabValue === 0
																			? smallScreen
																				? smallMainTab
																				: mainTab
																			: smallScreen
																				? smallUnselectedTab
																				: unselectedTab
																	}
																	style={{
																		width:
																			subTabValue === 0
																				? smallScreen
																					? '7rem'
																					: city?.gcc?.isGccCity
																						? '13.2rem'
																						: '14.2rem'
																				: smallScreen
																					? '6rem'
																					: city?.gcc?.isGccCity
																						? '11rem'
																						: '14.2rem',
																		fontSize: '1.1rem',
																	}}
																	onClick={() => {
																		const urlHash =
																			typeof window !== 'undefined' &&
																			window.location.hash;
																		if (
																			urlHash &&
																			urlHash.endsWith('/neighbourhoods')
																		) {
																			const removeFromUrl = urlHash.substr(
																				0,
																				urlHash.indexOf('/')
																			);
																			window.location.hash = removeFromUrl;
																		}
																	}}
																/>
                                  // chk11
																{user?.first_name &&
																	matchingNeighbourhoods.filter(
																		n => n.plaatsnaam === townId
																	)?.length > 0 &&
																	showPotential && (
																		<Tab
																			label={
																				matchingNeighbourhoods.filter(
																					n => n.plaatsnaam === townId
																				).length > 1
																					? `Neighborhoods (${matchingNeighbourhoods.filter(
																						n => n.plaatsnaam === townId
																					).length
																					})`
																					: `Neighborhood (1)`
																			}
																			{...a11yProps(1)}
																			className={
																				subTabValue === 1
																					? smallScreen
																						? smallMainTab
																						: mainTab
																					: smallScreen
																						? smallUnselectedTab
																						: unselectedTab
																			}
																			style={{
																				width:
																					subTabValue === 1
																						? smallScreen
																							? '11rem'
																							: city?.gcc?.isGccCity
																								? '13.2rem'
																								: '14.2rem'
																						: smallScreen
																							? '11rem'
																							: city?.gcc?.isGccCity
																								? '11rem'
																								: '14.2rem',
																				fontSize: '1.1rem',
																			}}
																			onClick={() => {
																				const urlHash =
																					typeof window !== 'undefined' &&
																					window.location.hash;
																				if (
																					urlHash &&
																					!urlHash.endsWith('/neighbourhoods')
																				) {
																					const appendUrl = urlHash.concat(
																						'/neighbourhoods'
																					);
																					window.location.hash = appendUrl;
																				}
																			}}
																		/>
																	)}
															</Tabs>
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
														))}
													<TabPanel value={subTabValue} index={0}>
														<div
															style={{
																display: 'flex',
																flexDirection: 'column',
															}}
														>
															<Box className={answer}>
																<Box
																	style={{
																		margin: smallScreen
																			? '0.5rem 0'
																			: '1rem 0',
																	}}
																>
																	{town.town_ranking !== 0 && (
																		<Box>
																			<Typography variant="h6">
																				Ranking
																			</Typography>
																			<Typography
																				style={{
																					color: '#99c93c',
																					fontSize: smallScreen
																						? '1.2rem'
																						: '2rem',
																					fontWeight: 'bold',
																					margin: smallScreen
																						? '0.5rem 0 0'
																						: '0.5rem 0 0',
																				}}
																			>
																				{town.town_ranking}
																				{rankingInWord(town.town_ranking)}
																			</Typography>
																			<Typography
																				variant="body1"
																				style={{ fontWeight: 'bold' }}
																			>
																				out of { }{' '}
																				{town.category === 'village'
																					? `${rankedVillagesCount} villages`
																					: `${rankedCitiesCount} cities`}
																			</Typography>
																		</Box>
																	)}
																	<Box
																		style={{
																			display: 'flex',
																			flexDirection: 'column',
																		}}
																	>
																		<Box
																			style={{
																				display: 'flex',
																				flexDirection: 'row',
																				marginTop: '1rem',
																				marginBottom: '1rem',
																			}}
																		></Box>
																	</Box>

																	{user?.first_name && showPotential && (
																		<>
																			<Box
																				style={{
																					// width: '20rem',
																					height: 'auto',
																					backgroundColor: '#2FA03F',
																					padding: '0.2rem',
																					marginBottom: '1rem',
																					borderRadius: '5px',
																				}}
																			>
																				<Accordion>
																					<AccordionSummary
																						expandIcon={<ArrowDropDown />}
																						aria-controls="panel1a-content"
																						id="panel1a-header"
																						style={{
																							color: '#2FA03F',
																						}}
																					>
																						<Typography
																							style={{
																								// color: 'white',
																								fontWeight: 'bold',
																							}}
																							variant="h6"
																						>
																							Total of 7 bruto potentials on
																							town level
																						</Typography>
																					</AccordionSummary>

																					<AccordionDetails>
																						<>
																							<PotentialKPIs region={town} />
																						</>
																					</AccordionDetails>
																				</Accordion>
																			</Box>
																		</>
																	)}
																	<Box
																		style={{
																			// margin: '2rem 0rem',
																			display: 'flex',
																			flexDirection: 'row',
																		}}
																	>
																		<IconBulletWrapper
																			pageId={smallScreen ? '' : 'city'}
																		>
																			<IconBullet
																				iconName={iconArea}
																				title="Urban area size"
																				content={`${NumberUtils.toFixed(
																					town._area,
																					2
																				)} km²`}
																				infoToolTipTitle=""
																				infoToolTipDetails=""
																				sizeVariant="small"
																			/>

																			<IconBullet
																				iconName={iconPopulation}
																				title="Urban area population"
																				// content={`${NumberUtils.toFixed(
																				//   town.aantal_inwoners_corr,
																				//   0
																				// )}`}
																				content={
																					town.aantal_inwoners_corr
																						? `${Math.trunc(
																							town.aantal_inwoners_corr
																						)}`
																						: '-'
																				}
																				infoToolTipTitle=""
																				infoToolTipDetails=""
																				sizeVariant="small"
																			/>
																		</IconBulletWrapper>
																	</Box>
																	<Box
																		style={{
																			margin: '1rem 0rem',
																			display: 'flex',
																			flexDirection: 'row',
																		}}
																	>
																		<IconBulletWrapper
																			pageId={smallScreen ? '' : 'city'}
																		>
																			<IconBullet
																				iconName={iconAmount}
																				title="Ratio green and water"
																				content={
																					town.KPI1_VerhoudingGroenWater
																						? `${NumberUtils.toFixed(
																							town.KPI1_VerhoudingGroenWater,
																							0
																						)}`
																						: '-'
																				}
																				infoToolTipTitle="Ratio green and water"
																				infoToolTipDetails={
																					<React.Fragment>
																						Deze score geeft de verhouding van
																						de hoeveelheid groen en water ten
																						opzichte van het totaaloppervlak
																						aan. Dit wordt uitgedrukt in een
																						score. In deze score is een factor
																						gegeven aan de verschillende typen
																						groen en water, de verdeling is
																						als volgt:
																						<li>Hoge vegetatie: factor 5</li>
																						<li>
																							Middelhoge vegetatie: factor 2
																						</li>
																						<li>Lage vegetatie factor: 1</li>
																						<li>Water factor: 3</li>
																						De formule om deze score te
																						bepalen is dan als volgt:
																						<br />
																						<br />
																						<b>
																							<i>
																								(% bomen x factor 5) + (%
																								struiken x factor 2) + (% gras
																								x factor 1) + (%water x factor
																								3) = score
																							</i>
																						</b>
																						<br />
																						<br />
																						De score range loopt van 10 tot
																						410 en het gemiddelde van alle
																						geanalyseerde plaatsen is 124.
																					</React.Fragment>
																				}
																				sizeVariant="small"
																			/>

																			<IconBullet
																				iconName={iconDistribution}
																				title="Distribution of urban green space"
																				content={`${NumberUtils.toFixed(
																					town.KPI4_VegetationDistributionScore,
																					3
																				)}`}
																				infoToolTipTitle="Distribution of urban green space"
																				infoToolTipDetails="Deze score geeft aan in welke mate het groen over een plaats verdeeld is. Daarmee is naast hoe groen een buurt of plaats is in % of m², ook te zien of dit groen goed verdeeld is. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
																				sizeVariant="small"
																			/>
																		</IconBulletWrapper>
																	</Box>
																	{!user?.first_name && (
																		<>
																			<Divider />
																			<Box
																				style={{
																					display: 'flex',
																					flexDirection: 'row',
																					margin: '1rem',
																					gap: '2rem',
																				}}
																			>
																				<Box>
																					<img
																						src={loginCTA}
																						alt="Login call to action"
																						style={{
																							width: smallScreen
																								? '4rem'
																								: 'unset',
																							height: smallScreen
																								? '4rem'
																								: 'unset',
																						}}
																					/>
																				</Box>
																				<Box
																					style={{
																						display: 'flex',
																						flexDirection: 'column',
																					}}
																				>
																					<Typography
																						variant="h6"
																						style={{
																							fontWeight: 'bold',
																						}}
																					>
																						Are you working for this
																						municipality?
																					</Typography>
																					<Typography
																						variant="body1"
																						style={{
																							margin: '1rem 0',
																							color: '#5F6A74',
																						}}
																					>
																						Unlock detailed data about your
																						urban green space and green
																						potential, for your city and each
																						of the neighborhoods included.
																						Sign up using your work email
																						address provided by the
																						municipality.
																					</Typography>
																					<Link
																						to="/signup"
																						style={{ textDecoration: 'none' }}
																					>
																						<Box
																							style={{
																								display: 'flex',
																								flexDirection: 'row',
																							}}
																						>
																							<Typography
																								variant="h6"
																								style={{
																									color: '#99c93c',
																									fontSize: '1.1rem',
																									fontWeight: 'bold',
																									textDecoration: 'none',
																								}}
																							>
																								Create account
																							</Typography>
																							<ArrowForward
																								style={{
																									marginLeft: '0.5em',
																									fontWeight: 'bold',
																									fontSize: '1.5rem',
																									color: '#99c93c',
																								}}
																							/>
																						</Box>
																					</Link>
																				</Box>
																			</Box>
																			<Divider />
																		</>
																	)}
																	<Box style={{ marginTop: '2rem' }}>
																		<Typography
																			variant="h6"
																			style={{
																				color: '#5f6a74',
																				maxWidth: smallScreen
																					? '20rem'
																					: 'unset',
																				fontSize: '1rem',
																			}}
																		>
																			What does the Urban Green Space in{' '}
																			{town.plaatsnaam} consist of?
																		</Typography>
																		<GSCBarGauge
																			treecanopycoverPercentage={
																				town.perc_hoge_vegetatie
																			}
																			shrubscoverPercentage={
																				town.perc_middelhoge_vegetatie
																			}
																			grasscoverPercentage={
																				town.perc_lage_vegetatie
																			}
																			watercoverPercentage={town.perc_water}
																			// othercoverPercentage={town.perc_grijs}
																			othercoverPercentage={
																				100 -
																				(town.perc_hoge_vegetatie +
																					town.perc_middelhoge_vegetatie +
																					town.perc_lage_vegetatie +
																					town.perc_water)
																			}
																		/>

																		<Box
																			style={{
																				margin: '2rem 0rem',
																				display: 'flex',
																				flexDirection: 'row',
																			}}
																		>
																			<IconBulletWrapper
																				pageId={smallScreen ? '' : 'fav'}
																			>
																				<IconBullet
																					iconName={iconTrees}
																					title="Area covered in trees"
																					content={`${NumberUtils.toFixed(
																						town.perc_hoge_vegetatie,
																						1
																					)}%`}
																					infoToolTipTitle=""
																					infoToolTipDetails=""
																					sizeVariant="small"
																				/>

																				<IconBullet
																					iconName={iconShrubs}
																					title="Area covered in shrubs"
																					content={`${NumberUtils.toFixed(
																						town.perc_middelhoge_vegetatie,
																						1
																					)}%`}
																					infoToolTipTitle=""
																					infoToolTipDetails=""
																					sizeVariant="small"
																				/>
																				<IconBullet
																					iconName={iconGrass}
																					title="Area covered in grass"
																					content={`${NumberUtils.toFixed(
																						town.perc_lage_vegetatie,
																						1
																					)}%`}
																					infoToolTipTitle=""
																					infoToolTipDetails=""
																					sizeVariant="small"
																				/>
																			</IconBulletWrapper>
																		</Box>

																		<Box
																			style={{
																				margin: '2rem 0rem',
																				display: 'flex',
																				flexDirection: 'row',
																			}}
																		>
																			<IconBulletWrapper
																				pageId={smallScreen ? '' : 'fav'}
																			>
																				<IconBullet
																					iconName={iconTrees}
																					title="Distribution of trees"
																					content={`${NumberUtils.toFixed(
																						town.KPI4a_HighVegetationDistributionScore,
																						3
																					)}`}
																					infoToolTipTitle="Distribution of trees"
																					infoToolTipDetails="Deze score geeft aan in welke mate de bomen over een plaats verdeeld zijn. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
																					sizeVariant="small"
																				/>

																				<IconBullet
																					iconName={iconShrubs}
																					title="Distribution of shrubs"
																					content={NumberUtils.toFixed(
																						town.KPI4b_middleHighVegDistributionScore,
																						3
																					)}
																					infoToolTipTitle="Distribution of shrubs"
																					infoToolTipDetails="Deze score geeft aan in welke mate de struiken over een plaats verdeeld zijn. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
																					sizeVariant="small"
																				/>
																				<IconBullet
																					iconName={iconGrass}
																					title="Distribution of grass"
																					content={`${NumberUtils.toFixed(
																						town.KPI4c_lowVegDistributionScore,
																						3
																					)}`}
																					infoToolTipTitle="Distribution of grass"
																					infoToolTipDetails="Deze score geeft aan in welke mate de gazons over een plaats verdeeld zijn. De score range loopt ongeveer van 0,250 tot 1,300 en het gemiddelde van alle geanalyseerd plaatsen is 0,565."
																					sizeVariant="small"
																				/>
																			</IconBulletWrapper>
																		</Box>

																		<Box>
																			<IconBulletWrapper
																				pageId={smallScreen ? '' : 'city'}
																			>
																				<IconBullet
																					iconName={iconRatio}
																					title="Public vs Private greenspace ratio"
																					content={''}
																					infoToolTipTitle="Public vs Private greenspace ratio"
																					infoToolTipDetails="Deze ratio geeft aan hoeveel % van het groen openbaar groen is en hoeveel % privaat groen."
																					sizeVariant="small"
																				/>
																			</IconBulletWrapper>

																			<Box
																				style={{
																					display: smallScreen
																						? 'unset'
																						: 'flex',
																					flexDirection: smallScreen
																						? 'unset'
																						: 'row',
																				}}
																			>
																				<PieChart width={300} height={300}>
																					<Pie
																						dataKey="value"
																						startAngle={180}
																						endAngle={0}
																						data={[
																							{
																								name: 'Group A',
																								value: town._ratioPrivatePublicGreen?.includes(
																									' / '
																								)
																									? Number(
																										town._ratioPrivatePublicGreen.split(
																											' / '
																										)[0]
																									)
																									: 0,
																								fill: '#086d45',
																							},
																							{
																								name: 'Group B',
																								value: town._ratioPrivatePublicGreen?.includes(
																									' / '
																								)
																									? Number(
																										town._ratioPrivatePublicGreen.split(
																											' / '
																										)[1]
																									)
																									: 0,
																								fill: '#7cb834',
																							},
																						]}
																						cx="50%"
																						cy="50%"
																						outerRadius={120}
																						innerRadius={70}
																						fill="#7cb834"
																					// label
																					/>
																				</PieChart>
																				<Box
																					style={{
																						display: 'flex',
																						flexDirection: 'row',
																						margin: smallScreen
																							? '-6rem 4rem 0'
																							: '0 4rem',
																					}}
																				>
																					<Box
																						style={{
																							margin: smallScreen
																								? '1rem'
																								: '5rem 1rem',
																						}}
																					>
																						<Box
																							className={smallDemographicGrid}
																						>
																							<Typography
																								style={{
																									color: '#086d45',
																									fontSize: smallScreen
																										? '1rem'
																										: '1.2rem',
																									fontWeight: 'bold',
																								}}
																							>
																								Public
																							</Typography>

																							<Typography
																								style={{
																									color: '#086d45',
																									fontSize: smallScreen
																										? '1rem'
																										: '1.2rem',
																								}}
																							>
																								{town._ratioPrivatePublicGreen?.includes(
																									' / '
																								)
																									? `${town._ratioPrivatePublicGreen.split(
																										' / '
																									)[0]
																									} %`
																									: 0}
																							</Typography>
																							<Typography
																								style={{
																									color: '#7cb834',
																									fontSize: smallScreen
																										? '1rem'
																										: '1.2rem',
																									fontWeight: 'bold',
																								}}
																							>
																								Private
																							</Typography>
																							<Typography
																								style={{
																									color: '#7cb834',
																									fontSize: smallScreen
																										? '1rem'
																										: '1.2rem',
																								}}
																							>
																								{town._ratioPrivatePublicGreen?.includes(
																									' / '
																								)
																									? `${town._ratioPrivatePublicGreen.split(
																										' / '
																									)[1]
																									} %`
																									: 0}
																							</Typography>
																						</Box>
																					</Box>
																				</Box>
																			</Box>
																		</Box>
																		{/* </ResponsiveContainer> */}
																		<Box
																			style={{
																				display: 'flex',
																				flexDirection: 'row',
																			}}
																		>
																			<IconBullet
																				iconName={iconHealth}
																				title="Average health of urban vegetation"
																				content={''}
																				infoToolTipTitle="Average health of urban vegetation"
																				infoToolTipDetails="Deze score geeft een indicatie van de gezondheid van het groen weer. Landoppervlak met een waarde boven de 0,11 wordt door ons gezien als vegetatie. Maar deze score geeft ook een indicatie van hoe gezond de vegetatie is. Hoe hoger de score hoe gezonder de vegetatie. De score range loopt van 0,200 tot 0,450 en het gemiddelde van alle geanalyseerd plaatsen is 0,299."
																				sizeVariant="small"
																			/>
																		</Box>
																		<Box
																			style={{
																				marginLeft: smallScreen
																					? 'unset'
																					: '5.2rem',
																				width: smallScreen
																					? '18rem'
																					: '38rem',
																			}}
																		>
																			<Box
																				style={{
																					height: '0.7rem',
																					backgroundImage:
																						'linear-gradient(to right, #f1695b 1%, #f5c66e 54%, #99c93c)',

																					margin: '1rem auto',
																				}}
																			></Box>
																			<Box
																				style={{
																					marginLeft: `${town.KPI5_meanNDVI *
																						100}%`,
																				}}
																			>
																				<Box
																					style={{
																						display: 'flex',
																						flexDirection: 'column',
																						width: '4rem',
																						maxWidth: '4rem',
																					}}
																				>
																					<HealthIndicator />
																					<Box
																						style={{
																							fontWeight: 'bold',
																							fontSize: '1.4rem',
																							marginLeft: '-0.5rem',
																						}}
																					>
																						{NumberUtils.toFixed(
																							town.KPI5_meanNDVI,
																							3
																						)}
																					</Box>
																				</Box>
																			</Box>
																		</Box>
																		<Box
																			style={{
																				margin: smallScreen
																					? '0.5rem 0'
																					: '1.5rem 0rem',
																				display: 'flex',
																				flexDirection: 'row',
																			}}
																		>
																			<IconBulletWrapper
																				pageId={smallScreen ? '' : 'city'}
																			>
																				<IconBullet
																					iconName={iconPerCapita}
																					title="Urban green space per capita"
																					content={`${NumberUtils.toFixed(
																						town.KPI3_GroenPerInwoner,
																						1
																					)} m²`}
																					infoToolTipTitle="Urban green space per capita"
																					infoToolTipDetails="Deze KPI geeft de hoeveelheid van het totaal (openbaar + privaat) groenoppervlak per inwoner aan. De score range loopt ongeveer van 25m² tot 250m² en het gemiddelde van alle geanalyseerd plaatsen is 97m²."
																					sizeVariant="small"
																				/>

																				<IconBullet
																					iconName={iconPublicCapita}
																					title="Public urban green space per capita"
																					content={`${NumberUtils.toFixed(
																						town.KPI2_StedelijkOpenbaarGroenPerInwoner,
																						1
																					)} m²`}
																					infoToolTipTitle="Public urban green space per capita"
																					infoToolTipDetails="Deze KPI geeft de hoeveelheid openbaar groenoppervlak per inwoner aan. De score range loopt ongeveer van 15m² tot 150m² en het gemiddelde van alle geanalyseerd plaatsen is 50m²."
																					sizeVariant="small"
																				/>
																			</IconBulletWrapper>
																		</Box>
																	</Box>
																</Box>
															</Box>
														</div>
													</TabPanel>

													<TabPanel value={subTabValue} index={1}>
														<>
															{user?.first_name &&
																showPotential &&
																matchingNeighbourhoods &&
																matchingNeighbourhoods.filter(
																	(n: any) => n.plaatsnaam === townId
																)?.length > 0 && (
																	<NeighbourhoodsList
																		town={townId}
																		municipality={municipalityId}
																		list={matchingNeighbourhoods.filter(
																			(n: any) => n.plaatsnaam === townId
																		)}
																		key={town.townId}
																		urlByLocation={urlByLocation}
																	/>
																)}
														</>
													</TabPanel>
												</AppBar>
											</ExpansionPanelDetails>
										</ExpansionPanel>
										<Divider />
									</div>
								);
							})}
							{listOfTowns?.length > 5 ? (
								<Box
									style={{
										display: 'flex',
										width: '100%',
										marginTop: '10px',
										justifyContent: 'center',
									}}
								>
									<Pagination
										count={totalPages}
										page={activePage}
										onChange={handlePageRedirect}
										defaultPage={1}
										color="primary"
										size="large"
										shape="rounded"
										showFirstButton
										showLastButton
									// className={classes.paginationCss}
									/>
								</Box>
							) : (
								<></>
							)}
						</div>
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
				</>
			</Box>
			<img src={cloudBottom} width="100%" />
		</Box>
	);
};

export default observer(MunicipalityPage);