import React, { useEffect, useState, useContext, useRef } from 'react';
import {
	Typography,
	TextField,
	CircularProgress,
	useMediaQuery,
	Box,
	Button,
	IconButton,
	Divider,
	Menu,
	MenuItem,
} from '@material-ui/core';
import Autocomplete, {
	createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react-lite';
import { MapLoadEvent } from 'react-map-gl';
import * as MapboxGL from 'mapbox-gl';
import { navigate } from 'gatsby';
import { FeatureCollection } from '@turf/helpers';
import { MapContext } from 'stores/map-context';
import Map from '../../components/map/map';
import Pin from '../../components/map/pin';
import { useSiteMetadata } from '../../hooks';
import useCities from '../../hooks/cities';
import SmallCompare from './components/SmallCompare';
import LargeCompare from './components/LargeCompare';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
const browser = typeof window !== 'undefined' && window;

const filterOptions = createFilterOptions({
	matchFrom: 'start',
	stringify: (option: any) => option.id,
});

/**
 * Compare Page
 * @file compare.tsx is the compare Page that renders a comparision of two cities
 * @param props - Uses the default props object being passes by
 * React Router internally
 */
const CityComparisonPage = props => {
	if (!browser) {
		return null;
	}

	const { getCity, cityStore } = useCities();
	const filteredCities = cityStore.cities
		? cityStore.cities.filter(c => c !== undefined)
		: [];
	const citiesList = filteredCities.sort((a, b) =>
		a?.id.localeCompare(b?.id, 'en', { sensitivity: 'base' })
	);
	const citiesIds = citiesList.length ? citiesList.map(c => c?.id) : [];
	const { endpoint } = useSiteMetadata();
	const smallScreen = useMediaQuery('(max-width:600px)');
	const [open, setOpen] = useState(false);
	// const [menuOpen, setMenuOpen] = useState(false);
	const [leftMapInstance, setLeftMapInstance] = useState<MapboxGL.Map>(null);
	const [rightMapInstance, setRightMapInstance] = useState<MapboxGL.Map>(null);
	const [endMapInstance, setEndMapInstance] = useState<MapboxGL.Map>(null);
	const [cityAtLeft, setcityAtLeft] = useState(undefined);
	const [cityAtRight, setcityAtRight] = useState(undefined);
	const [cityAtEnd, setcityAtEnd] = useState(undefined);
	const [leftCity, setLeftCity] = useState('');
	const [rightCity, setRightCity] = useState('');
	const [endCity, setEndCity] = useState('');
	const [cityBoundaries, setCityBoundaries] = useState<FeatureCollection>();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [leftMenuOpen, setLeftMenuOpen] = useState(false);
	const [rightMenuOpen, setRightMenuOpen] = useState(false);
	const [endMenuOpen, setEndMenuOpen] = useState(false);
	const [arrow, setArrow] = useState(false);
	// const menuOpen = Boolean(anchorEl);
	// const kpiBarSize = smallScreen ? 5 : 15;
	const url = window.location.search.replace('?', '').split('_vs_');
	useEffect(() => {
		setcityAtLeft(getCity(url[0]?.replaceAll('%20', ' ')));
		setcityAtRight(getCity(url[1]?.replaceAll('%20', ' ')));
		setcityAtEnd(getCity(url[2]?.replaceAll('%20', ' ')));
		setArrow(false);
	}, [window.location.pathname]);
	useEffect(() => {
		setLeftCity(url[0]?.replaceAll('%20', ' '));
		setRightCity(url[1]?.replaceAll('%20', ' '));
		// tslint:disable-next-line: ban-comma-operator
		url[2] ? (setOpen(true), setEndCity(url[2]?.replaceAll('%20', ' '))) : setOpen(false);
	}, [url[0], url[1], url[2], setOpen]);
	const getCompareLink = index => {
		if (!leftCity && !rightCity && !endCity) {
			navigate('/compare/?');
		} else if (index === 0 && endCity) {
			setcityAtLeft('');
			navigate(`/compare/?_vs_${rightCity}_vs_${endCity}`);
		} else if (index === 1 && endCity) {
			setcityAtRight('');
			navigate(`/compare/?${leftCity}_vs_${''}_vs_${endCity}`);
		} else if (index === 1) {
			setcityAtRight('');
			navigate(`/compare/?${leftCity}_vs_${''}`);
		} else if (index === 2) {
			setcityAtEnd('');
			setArrow(false);
			navigate(`/compare/?${leftCity}_vs_${rightCity}`);
		} else if (index === 0 && rightCity) {
			setcityAtLeft('');
			navigate(`/compare/?${''}_vs_${rightCity}`);
		} else {
			return navigate(`/compare/?${leftCity}_vs_${rightCity}`);
		}
	};
	const onCompareCity = () => {
		const search = typeof window !== 'undefined' ? window.location.search : '';
		const compareString = search.replace('?', '');
		const compareCities = compareString.split('_vs_');
		const cityLeft = getCity(compareCities[0]);
		setcityAtLeft(cityLeft);
		setLeftCity(cityLeft?.id);
		const cityRight = getCity(compareCities[1]);
		setcityAtRight(cityRight);
		setRightCity(cityRight?.id);
		const cityEnd = getCity(compareCities[2]);
		setcityAtEnd(cityEnd);
		setEndCity(cityEnd?.id);
	};

	const viewportStore = useContext(MapContext);
	useEffect(() => {
		cityStore.loadCities(endpoint);
	}, []);
	useEffect(() => {
		viewportStore.setViewport({
			...viewportStore.viewport,
			zoom: 0.8,
			latitude: 40,
			longitude: 8,
		});
	}, [leftCity, rightCity, endCity]);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		// setMenuOpen(true)
	};
	const handleClose = () => {
		setAnchorEl(null);
		setLeftMenuOpen(false);
		setRightMenuOpen(false);
		setEndMenuOpen(false);
	};

	const arrowHandler = () => {
		setArrow(!arrow);
	};
	return (
		<>
			{smallScreen ? (
				<SmallCompare
					open={open}
					setOpen={setOpen}
					cityAtLeft={cityAtLeft}
					cityAtRight={cityAtRight}
					cityAtEnd={cityAtEnd}
					leftCity={leftCity}
					setLeftCity={setLeftCity}
					rightCity={rightCity}
					setRightCity={setRightCity}
					endCity={endCity}
					setEndCity={setEndCity}
					leftMenuOpen={leftMenuOpen}
					setLeftMenuOpen={setLeftMenuOpen}
					rightMenuOpen={rightMenuOpen}
					setRightMenuOpen={setRightMenuOpen}
					endMenuOpen={endMenuOpen}
					setEndMenuOpen={setEndMenuOpen}
					anchorEl={anchorEl}
					handleClick={handleClick}
					handleClose={handleClose}
					getCompareLink={getCompareLink}
					onCompareCity={onCompareCity}
					citiesIds={citiesIds}
					citiesList={citiesList}
					filterOptions={filterOptions}
					setcityAtEnd={setcityAtEnd}
					arrow={arrow}
					arrowHandler={arrowHandler}
				/>
			) : (
				<LargeCompare
					open={open}
					setOpen={setOpen}
					cityAtLeft={cityAtLeft}
					cityAtRight={cityAtRight}
					cityAtEnd={cityAtEnd}
					leftCity={leftCity}
					setLeftCity={setLeftCity}
					rightCity={rightCity}
					setRightCity={setRightCity}
					endCity={endCity}
					setEndCity={setEndCity}
					leftMenuOpen={leftMenuOpen}
					setLeftMenuOpen={setLeftMenuOpen}
					rightMenuOpen={rightMenuOpen}
					setRightMenuOpen={setRightMenuOpen}
					endMenuOpen={endMenuOpen}
					setEndMenuOpen={setEndMenuOpen}
					anchorEl={anchorEl}
					handleClick={handleClick}
					handleClose={handleClose}
					getCompareLink={getCompareLink}
					onCompareCity={onCompareCity}
					citiesIds={citiesIds}
					citiesList={citiesList}
					filterOptions={filterOptions}
					setcityAtEnd={setcityAtEnd}
				/>
			)}
		</>
	);
};

export default observer(CityComparisonPage);