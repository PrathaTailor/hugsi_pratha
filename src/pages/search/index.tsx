import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, graphql } from 'gatsby';
import stringSimilarity from 'string-similarity';
import { Box, Typography, Button, useMediaQuery, Divider } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import useCities from '../../hooks/cities';
import CityLink from '../../components/link/city-link';
// @ts-ignore
import searchIndicator from '../../images/indicator-search.png';
// @ts-ignore
import gscLogo from '../../images/gsc-logo.png';
import { theme } from '../../styles/search';


export const query = graphql`
  query postPageQueryData($skip: Int, $limit: Int) {
    postsData: allContentfulArticles(skip: $skip, limit: $limit) {
      nodes {
        title
        slug
      }
    }
  }
`;

interface GqlData {
	postsData: any;
}

interface Props {
	data: GqlData;
	location: Location;
}
/**
 * Search component
 */
const SearchKeyword: React.FC<Props> = props => {
	const { cityStore } = useCities();
	const { cities, isLoadingCities, municipalities } = cityStore;
	const { towns } = municipalities || {};
	const smallScreen = useMediaQuery('(max-width:960px)');
	const [matchingKeywords, setMatchingKeywords] = useState(null);
	const [similarKeywords, setSimilarKeywords] = useState(null);
	const keywordFromURL = props.location?.search.slice(1);
	const keyword = decodeURI(keywordFromURL);
	const getCityURL = (city: string) => `/city?${city}`;
	const uniquePosts = props?.data?.postsData?.nodes.filter(
		(v, i, a) => a.findIndex(t => t.slug === v.slug) === i
	);
	const getPostURL = (post: string) => {
		let pageSlug;
		uniquePosts?.find((eachPost, index) => {
			if (eachPost.title === post) {
				pageSlug = eachPost.slug;
			}
		});
		return `/stories/${pageSlug}`;
	};
	useEffect(() => {
		const cityNames = cities.map(c => c.id);
		const countryNames = cities.map(c => c.country);
		const regionNames = cities.map(c => c.continent);
		const gccTownNames = towns && towns.map(t => t.id);
		const postNames = uniquePosts?.map(c => c.title);
		if (keyword && cities?.length > 0) {
			const matchingCities = cities.filter(c => {
				return (
					decodeURI(c.id).includes(keyword) ||
					decodeURI(c.country).includes(keyword) ||
					decodeURI(c.continent).includes(keyword) ||
					decodeURI(c.id.toLowerCase()).includes(keyword.toLowerCase()) ||
					decodeURI(c.country.toLowerCase()).includes(keyword.toLowerCase()) ||
					decodeURI(c.continent.toLowerCase()).includes(keyword.toLowerCase())
				);
			});
			const matchingRegions = [];
			matchingCities &&
				matchingCities.map(t => {
					const found = matchingRegions.some(el => el.value === t.continent);
					if (!found) {
						matchingRegions.push({ type: 'region', value: t.continent });
					}
				});
			const matchingTowns =
				(towns &&
					towns.filter(t => {
						return decodeURI(t.id.toLowerCase()).includes(
							keyword.toLowerCase()
						);
					})) ||
				[];
			const matchingPosts =
				(uniquePosts &&
					uniquePosts.filter(t => {
						return (t.title.toLowerCase()).includes(
							keyword.toLowerCase()
						);
					})) ||
				[];
			if (matchingCities?.length > 0 || matchingTowns?.length > 0 || matchingPosts?.length > 0
				|| matchingRegions.length > 0) {
				setMatchingKeywords([...matchingCities, ...matchingTowns, ...matchingPosts, ...matchingRegions]);
				setSimilarKeywords([]);
			} else {
				const similarCityMatch = stringSimilarity.findBestMatch(keyword, [
					...cityNames,
				]);

				const similarCountryMatch = stringSimilarity.findBestMatch(keyword, [
					...countryNames,
				]);
				const similarRegionMatch = stringSimilarity.findBestMatch(keyword, [
					...regionNames,
				]);

				const similarPostMatch = stringSimilarity.findBestMatch(keyword, [
					...postNames,
				]);
				const similarGccTownMatch =
					(gccTownNames &&
						stringSimilarity.findBestMatch(keyword, [...gccTownNames])) ||
					[];
				const getSortedMatch = (a, b) => {
					// return a.bestMatch.rating > b.bestMatch.rating ? a : b;
					return a.bestMatch.rating < b.bestMatch.rating
						? 1
						: b.bestMatch.rating < a.bestMatch.rating
							? -1
							: 0;
				};
				const objectWithType = [
					{ type: 'city', ...similarCityMatch },
					{ type: 'country', ...similarCountryMatch },
					{ type: 'region', ...similarRegionMatch },
					{ type: 'gccTown', ...similarGccTownMatch },
					{
						type: 'posts',
						...similarPostMatch
					},
				];
				const sortedMatches = objectWithType
					.filter(o => o.bestMatch.rating !== 0)
					.sort(getSortedMatch);
				setMatchingKeywords([]);
				sortedMatches?.length > 0 && setSimilarKeywords(sortedMatches);
			}
		}
	}, [keyword, cities, isLoadingCities, towns]);

	return (
		<ThemeProvider theme={theme}>
			{
				<Box style={{ marginTop: '6.25rem 0rem' }}>
					<Box
						style={{
							margin: smallScreen ? '8rem 1rem 0rem' : '12rem 14rem 2rem',
						}}
					>
						{cityStore.isLoadingCities || cityStore.cities.length === 0 ? (
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<img
									src={searchIndicator}
									alt="Searching..."
									style={{
										margin: 'auto',
										padding: '2rem',
									}}
								/>
								<Typography
									variant="h6"
									style={{
										margin: 'auto',
										color: '#293845',
										padding: '1rem',
									}}
								>
									Searching...
								</Typography>
							</Box>
						) : (
							<Box
								style={{
									margin: smallScreen ? '4rem 0rem 1rem' : 'unset',
								}}
							>
								<Typography variant="h5" style={{ fontWeight: 'bold' }}>
									Search results
								</Typography>
								{keyword &&
									(matchingKeywords?.length > 0 ||
										similarKeywords?.length > 0) && (
										<Box>
											{matchingKeywords.length > 0 && (
												<Typography
													variant="body2"
													style={{ margin: '2rem auto', color: '#293845' }}
												>
													Your search for{' '}
													<b>
														<i>{keyword}</i>
													</b>{' '}
													matched the following results (
													{matchingKeywords.length})
												</Typography>
											)}
										</Box>
									)}
								<Box>
									{keyword && matchingKeywords?.length === 0 && (
										<Box
											style={{
												margin: '2rem auto',
											}}
										>
											<Box style={{ color: '#293845', margin: '2rem auto' }}>
												No search results for{' '}
												<b>
													<i>{decodeURI(keyword)}</i>
												</b>
											</Box>
											{similarKeywords && similarKeywords?.length !== 0 && (
												<Box style={{ color: '#293845', margin: '2rem auto' }}>
													Did you mean
													{similarKeywords.map((sk, index) => (
														<span key={sk.type}>
															{!!index && `, or `}
															{
																<Link
																	to={
																		sk.type === 'city'
																			? getCityURL(sk.bestMatch.target)
																			: sk.type === 'posts'
																				? getPostURL(sk.bestMatch.target)
																				: `/search/?${sk.bestMatch.target}`
																	}
																	style={{
																		textDecoration: 'none',
																		color: '#698d29',
																		fontWeight: 'bold',
																		fontSize: '1.3rem',
																	}}
																>
																	{' '}
																	{sk.bestMatch.target}
																</Link>
															}
														</span>
													))}{' '}
													?
												</Box>
											)}
											<Box
												style={{
													color: '#293845',
													margin: '2rem auto',
												}}
											>
												Have a city that you want to add?
												<Link
													to={`/add-your-city/?cityName=${decodeURI(
														keyword
													)}`}
													style={{
														textDecoration: 'none',
														color: '#698d29',
														fontWeight: 'bold',
														marginLeft: '1rem',
													}}
												>
													Request your city
												</Link>
											</Box>
										</Box>
									)}
								</Box>
								<Box style={{ display: 'grid' }}>
									<Box>
										{keyword &&
											matchingKeywords?.length > 0 &&
											matchingKeywords.map((matchingKey, matchingIndex) => (
												<Box
													style={{
														margin: smallScreen ? 'auto 2rem' : 'unset',
													}}
													key={`match-${matchingIndex}`}
												>
													<Box
														style={{
															display: 'flex',
															flexDirection: 'row',
															margin: smallScreen ? '1rem 0' : '1rem 0',
														}}
													>
														{matchingKey?.gccMunicipalityName ? (
															<img
																src={gscLogo}
																alt="NL Greenlabel"
																style={{
																	maxWidth: '73px',
																	margin: '0 0.5rem',
																}}
															/>
														) : (
															<>
																{matchingKey?.slug ? <i
																	className="fas fa-book"
																	style={{
																		margin: '0.5rem',
																		color: '#99c93c',
																		fontSize: '1.1rem',
																	}}
																	aria-hidden="false"
																/> : matchingKey?.type === 'region' ? <i
																	className="fas fa-globe-europe"
																	style={{
																		margin: '0.5rem',
																		color: '#99c93c',
																		fontSize: '1.1rem',
																	}}
																	aria-hidden="false"
																/> : <i
																	className="fas fa-city"
																	style={{
																		margin: '0.5rem',
																		color: '#99c93c',
																		fontSize: '1.1rem',
																	}}
																	aria-hidden="false"
																/>}
																<Typography
																	variant="h6"
																	style={{
																		color: '#5f6a74',
																		marginLeft: '1rem',
																	}}
																>
																	{matchingKey?.slug
																		? 'Article'
																		: matchingKey?.type === 'region'
																			? 'Region'
																			: 'City page'}
																</Typography>
															</>
														)}
													</Box>
													<Typography
														variant="h5"
														style={{
															color: '#698d29',
															fontWeight: 'bold',
															margin: smallScreen
																? '0 0 0.3rem 0.5rem'
																: '0 0 0.3rem 0.5rem',
															textDecoration: 'none',
															fontSize: '1.2rem',
														}}
													>
														{matchingKey.gccMunicipalityName ? (
															<CityLink
																cityId={matchingKey.gccMunicipalityName}
																municipalityId={matchingKey.id}
																style={{
																	textDecoration: 'none',
																	color: '#698d29',
																	fontSize: '1.2rem',
																}}
															>
																{matchingKey.id}
															</CityLink>
														) : (
															<Link
																to=
																{
																	matchingKey.slug ?
																		getPostURL(matchingKey.title) :
																		matchingKey.type === 'region' ?
																			`/ranking/?mapView=standard&filter=All&region=${matchingKey.value}&tags=` :
																			getCityURL(matchingKey.id)
																}
																style={{
																	textDecoration: 'none',
																	color: '#698d29',
																	fontSize: '1.2rem',
																}}
															>
																{matchingKey.slug
																	? matchingKey.title
																	: matchingKey.type === 'region'
																		? matchingKey.value
																		: matchingKey.id}
															</Link>
														)}
													</Typography>
													{matchingKey.gccMunicipalityName && (
														<Typography
															variant="h5"
															style={{
																margin: smallScreen
																	? '0 0.5rem 0.5rem'
																	: '0 0 0.3rem 0.5rem',
															}}
														>
															<CityLink
																cityId={matchingKey.gccMunicipalityName}
																municipalityId={matchingKey.id}
															>
																<span
																	style={{
																		color: '#99c93c',
																		fontSize: '1rem',
																		fontWeight: 'normal',
																	}}
																>
																	{matchingKey.gccMunicipalityName}
																</span>
															</CityLink>
														</Typography>
													)}
													<Divider />
												</Box>
											))}
									</Box>
									{matchingKeywords?.length > 8 && (
										<Button
											variant="contained"
											color={'primary'}
											style={{
												color: 'white',
												textTransform: 'none',
												fontWeight: 'bold',
												borderRadius: '8px',
												backgroundColor: '#99c93c',
												float: smallScreen ? 'none' : 'right',
												width: '10rem',
												margin: '2rem auto',
											}}
											size={'large'}
											onClick={() => {
												window.scroll({
													top: 0,
													left: 0,
													behavior: 'smooth',
												});
											}}
										>
											Go to top{' '}
											<i
												className="fas fa-arrow-up"
												style={{ marginLeft: '0.5rem' }}
											></i>
										</Button>
									)}
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			}
		</ThemeProvider>
	);
};
export default observer(SearchKeyword);
