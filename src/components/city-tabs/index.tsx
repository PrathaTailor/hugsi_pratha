import { Box, ButtonGroup, MenuItem, Popover, Select, Typography, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'gatsby';
import { CONTINENT_NAMES } from 'models';
import React, { useEffect, useState } from 'react';
import CategoryWinners from '../category-winners/category-winners';
import { useStyles } from './style';

interface Props {
	displayCategory?: boolean;
	displayCompareLink?: boolean;
	location: string;
	cities: any;
	activeContinentIndex: string;
	setActiveContinentIndex(index: string): any;
}

/**
 * Region Tabs component
 * @param cities - list of cities
 * @param setActiveContinentIndex - set the continent
 */
const CityTabs: React.FC<Props> = ({
	cities,
	activeContinentIndex,
	displayCategory,
	displayCompareLink,
	setActiveContinentIndex,
	location
}) => {
	const { root, hoverButton, filterBtn, smallCompareBtn, compareBtn } = useStyles({});
	const [val, setVal] = useState(activeContinentIndex);
	const smallScreen = useMediaQuery('(max-width:600px)');
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const ContinentKeys = Object.values(CONTINENT_NAMES).filter(item => item !== Number(item));
	useEffect(() => { setVal(location); }, [location]);
	// moves the menu below the select input

	const iconComponent = props => {
		return <ExpandMoreIcon className={props.className} />;
	};
	function handleChangeIndex(index) {
		if (val === index) {
			return activeContinentIndex;
		}
		setVal(index);
		setActiveContinentIndex(index);
	}

	return (
		<div className={root}>
			<Box>
				<Box>
					<Box display="flex">
						{/* Region */}
						<Select
							variant={'outlined'}
							disableUnderline
							IconComponent={iconComponent}
							defaultValue={val}
							style={{
								width: smallScreen ? '8rem' : '10rem',
								margin: smallScreen ? '1rem' : '0rem 0rem 0rem 3rem',
								padding: '0px',
								background: '#fff',
								zIndex: 1,
							}}
							value={val}
							onChange={(event) => {
								handleChangeIndex(event.target.value);
							}}
						>
							{ContinentKeys.map(index => (
								<MenuItem value={index} key={`region-${index}`}>
									{index}
								</MenuItem>
							))}
						</Select>
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							PaperProps={{
								style: {
									padding: '20px 40px'
								},
							}}
						>
							<Typography variant="h6"
								style={{
									fontWeight: 'bold'
								}}>
								Select a tag
							</Typography>
							<ButtonGroup style={{ gap: '10px' }}>
								<Button variant="contained" className={hoverButton} size="small" >Tag</Button>
								<Button variant="contained" className={hoverButton} size="small">Tag</Button>
								<Button variant="contained" className={hoverButton} size="small">Tag</Button>
							</ButtonGroup>
						</Popover>
					</Box>
					{displayCompareLink &&
						<Button className={smallScreen ? smallCompareBtn : compareBtn}
							size={'large'}
							component={Link}
							to="/compare/?_vs_"
						>
							<Typography
								style={{
									color: '#698d29',
									fontWeight: 'bold',
									fontSize: '1.2rem',
								}}
							>
								Compare cities
							</Typography>
							<ArrowForward
								style={{
									marginLeft: '0.5em',
									fontWeight: 'bold',
									fontSize: '1.5rem',
								}}
							/>
						</Button>
					}
				</Box>
			</Box>
			{
				displayCategory &&
				<div style={{ fontSize: '0.875rem' }}>
					<CategoryWinners cities={cities} />
				</div>
			}
		</div >
	);
};

export default CityTabs;