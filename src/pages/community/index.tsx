import React from 'react';
import { Button, Typography, Box, useMediaQuery } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import SEO from '../../hooks/seo';
// @ts-ignore
import gscLogo from '../../images/gsc-logo.png';
import useCities from '../../hooks/cities';
import { Link } from 'gatsby';
// @ts-ignore
import hugsi_symbol from '../../images/calculate.png';
// @ts-ignore
import badges from '../../images/building.png';
import TopComponent from '../../components/top-component/top-component';
import { useStyles } from '../../styles/community';

/**
 * Community Page
 * @file community.tsx the community
 */
const CommunityPage = () => {
	const smallScreen = useMediaQuery('(max-width:650px)');
	const { cityStore } = useCities();
	const { user } = cityStore;
	const {
		content,
		center,
		twoCols,
		heading,
	} = useStyles({});
	const box = {
		fontWeight: 'fontWeightBold',
		color: '#424242',
	};

	/**
	 * Only works in production. Send Google Analytics event tracking
	 * @returns void
	 */

	return (
		<section>
			<SEO
				title="Community"
				description={`The HUGSI (Husqvarna Urban Green Space Index) is an
            AI-powered satellite solution to help decision makers monitor the
             proportion and health of green spaces in cities across the globe.`}
			/>
			<TopComponent style={{ marginBottom: '12rem' }}></TopComponent>

			<main
				className={smallScreen ? 'smallRoot' : 'root'}
				style={{ padding: smallScreen ? '0 1rem' : '0 12rem' }}
			>
				<div className={twoCols}>
					<div
						style={{
							width: 'auto',
						}}
						className={center}
					>
						<Box display={'flex'} justifyContent={'center'}>
							<img
								src={badges}
								width={smallScreen ? '250px' : '400px'}
								height={'auto'}
								alt={'Community'}
							/>
						</Box>
					</div>
					<section>
						<Box {...box} className={heading} style={{ marginTop: '2rem' }}>
							{user?.first_name
								? `Welcome to the HUGSI.green community!`
								: `Create an account with HUGSI.green`}
						</Box>
						<Typography
							className={content}
							variant={'body1'}
							style={{ margin: '2rem 0' }}
						>
							{user?.first_name
								? `As a member of our community, we hope to provide you with a more personalized experience and in-depth insights about your city. To provide any feedback or to ask questions please reach out to us at hello@hugsi.green`
								: `Signup and become a member of the HUGSI.green community. With a
                login you can further customize your experience and get access to
                more information. We will treat you and your data respectfully and
                not spamming you - all in the name of a greener world.`}
						</Typography>

						<Box className={smallScreen ? 'smallBtnContainer' : 'btnContainer'}>
							{!user?.first_name && (
								<Button
									variant="contained"
									style={{
										color: 'white',
										margin: smallScreen ? '1rem' : '2rem 2rem 2rem 0rem',
										textTransform: 'none',
										fontWeight: 'bold',
										borderRadius: '8px',
										backgroundColor: '#99c93c',
									}}
									size={'large'}
								>
									<Link to="/signup"
										style={{
											color: 'white',
											textDecoration: 'none',
										}}>Create account</Link>
								</Button>
							)}
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
									window.scrollBy({
										top: smallScreen ? 300 : 350,
										// left: 0,
										behavior: 'smooth',
									});
								}}
							>
								See what you get
							</Button>
						</Box>
					</section>
				</div>

				<div
					className={twoCols}
					style={{ margin: smallScreen ? '2rem 0' : '5rem 0' }}
				>
					<section>
						<Box {...box} className={heading}>
							Get to see detailed data about your city
						</Box>
						<Typography
							className={content}
							variant={'body1'}
							style={{ margin: '2rem 0' }}
						>
							Are you working for a municipality part of the{' '}
							<i>Green City Challenge</i> in the Netherlands? Then you are
							lucky!
						</Typography>
						<Typography
							className={content}
							variant={'body1'}
							style={{ margin: '2rem 0' }}
						>
							By registering an account on HUGSI.green using your municipality
							work email address you can get detailed data on your city’s green
							potential and a detailed view of the amount of green as well as
							potentials for all neighborhoods.
						</Typography>
					</section>

					<div
						style={{
							width: 'auto',
							margin: 'auto',
						}}
						className={center}
					>
						<Box display={'flex'} justifyContent={'center'}>
							<a href="https://groenestadchallenge.nl" target="_blank">
								<img
									src={gscLogo}
									style={{
										height: smallScreen ? '70px' : '80px',
										width: smallScreen ? '200px' : '300px',
										// margin: smallScreen ? 'unset' : '0rem 2rem',
									}}
								></img>
							</a>
						</Box>
					</div>
				</div>
				<div
					className={twoCols}
					style={{ margin: smallScreen ? '2rem 0' : '4rem 0' }}
				>
					<div
						style={{
							width: 'auto',
						}}
						className={center}
					>
						<Box display={'flex'} justifyContent={'center'}>
							<img
								src={hugsi_symbol}
								width={smallScreen ? '250px' : '300px'}
								height={'auto'}
								alt={'Community img'}
							/>
						</Box>
					</div>
					<section>
						<Box {...box} className={heading} style={{ marginTop: '2rem' }}>
							More perks and benefits
						</Box>
						<Typography
							className={content}
							variant={'body1'}
							style={{ margin: '2rem 0' }}
						>
							We will keep improving the benefits of having a HUGSI.green
							account so that you can further customize your experience, get
							early access to new features, become better informed through our
							newsletters as well as taking advantage of our community of urban
							greening enthusiasts from across the globe.
						</Typography>
					</section>
				</div>
			</main>
		</section>
	);
};

export default observer(CommunityPage);