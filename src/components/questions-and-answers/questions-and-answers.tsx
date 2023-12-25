import React from 'react';
import { Box, Divider, Typography, useMediaQuery } from '@material-ui/core';
import {
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
  useStyles, WhiteAdd, WhiteRemove
} from './style';

/**
 * Questions and Answers component
 */
const QuestionsAndAnswers = () => {
  const { question, details, answer } = useStyles({});
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const smallScreen = useMediaQuery('(max-width:600px)');
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  const box = {
    fontWeight: 'fontWeightBold',
    color: '#424242',
  };
  return (
    <section
      style={{
        maxWidth: smallScreen ? '90vw' : '75vw',
        margin: '4rem auto 6.25rem auto',
      }}
    >
      <Typography variant={'h4'} style={{ marginBottom: '2rem' }}>
        <Box {...box}>Frequently Asked Questions</Box>
      </Typography>
      <ExpansionPanel
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={expanded === 'panel1' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel1' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{
              fontWeight: expanded === 'panel1' ? 'bold' : 'normal',
              background: expanded === 'panel1' ? '#f4f5f5' : 'white',
            }}
          >
            How should I use the index?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography className={answer}>
            We don’t intend to set any restrictions on how the index should be used. 
            You’re welcome to spread the word and be creative in how you use it.
Ideally, we expect to see the index being used to raise awareness of urban green space 
in various occasions. For example, you might cite HUGSI as a source of
 reference in a social media post or an in-person discussion with your colleagues.
            </Typography>
           
            <Typography className={answer}>
            Potentially you may use the index and KPI data to:
              <ul>
                <li>Understand the state and development of a city</li>
                <li>Compare and benchmark cities</li>
                <li>
                  Be happy about and celebrate good results and high score!
                </li>
                <li>
                  Drive for change and development of green space if you are not
                  happy with current scoring.
                </li>
                <li>
                  Safeguard the green space in your city by HUGSI monitoring the
                  development for you.
                </li>
                <li>
                  Relate our data to other indexes or research on environmental
                  and living conditions of urban areas.
                </li>
              </ul>
            </Typography>
            <Typography className={answer}>
              Remember that we focus on urban vegetation and the greenness of
              urban areas only. We do not measure other important factors such
              as biodiversity, air quality and such.
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <ExpansionPanelSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expandIcon={expanded === 'panel2' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel2' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{
              fontWeight: expanded === 'panel2' ? 'bold' : 'normal',
            }}
          >
            What’s the method used to calculate the index?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={details}>
          <Typography className={answer}>
          The index is based on range of factors such as the percentage of urban area
           covered by vegetation, health of vegetation, and how well the green space is distributed 
           across the urban area. To provide as accurate results as possible the different parameters
            have been extracted for different types of vegetation separately. Combining values from different
             categories requires a standardization process before weighing them together. For each type of
              vegetation, we use its different factors to produce as product distribution which is furthermore 
              transformed into a normal distribution. Using the cumulative distribution function of the normal
               distribution we obtain a cumulative probability score ranging from 0 to 1. After obtaining the 
               cumulative probability scores for the different types 
          of vegetation they are weighted together and re-scaled into the range 0 to 100 providing the final score.
          </Typography>
          <Typography className={answer}>
            The multiplicative nature of the computations ensures that cities
            with high values for multiple factors rank higher than cities with
            very high value for one factor but low for the others.
          </Typography>
          <Typography className={answer}>
          The rationale of including vegetation health and distribution is to
           better reflect the environmental and recreational values of urban green space.
            We believe evenly distributed green space across urban area is more accessible by
             citizens and thus higher recreational value than that concentrated at only a few spots.
              Besides, healthier vegetation has higher environmental value due to more carbon dioxide
            absorption and higher oxygen emission. The index puts twice the weight on
           trees compared to grass to recognize the higher impact they have on the environment - see reference below.
          </Typography>
          <Typography className={answer}>
            <a
              href="https://www.london.gov.uk/sites/default/files/urban_greening_factor_for_london_final_report.pdf"
              target="_blank"
            />
          </Typography>
          <Typography className={answer}>
          Contact us if you're interested in more details about 
          the statistical and analytical methods utilized in HUGSI.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          expandIcon={expanded === 'panel3' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel3' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{ fontWeight: expanded === 'panel3' ? 'bold' : 'normal' }}
          >
            How were the cities selected?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box display="flex" flexDirection="column">
            <Typography className={answer}>
              The first round of 98 cities in the initial launch 2020 was
              selected based on C40 member cities, including temporarily
              inactive cities with the addition of non C40 members; Gothenburg,
              Sweden and Marseille, France.
            </Typography>
            <Typography className={answer}>
              57 new cities were selected for 2020 to fill gaps and white space
              in Europe, North America and India.
            </Typography>
            <Typography className={answer}>
              In 2021 cities part of the 'Green City Challenge' in Netherlands
              were added. To know more, please click{' '}
              <a href="https://groenestadchallenge.nl/" target="_blank">
                here
              </a>
            </Typography>{' '}
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel5d-header"
          expandIcon={expanded === 'panel5' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel5' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{ fontWeight: expanded === 'panel5' ? 'bold' : 'normal' }}
          >
            What dataset is used in HUGSI? How is the dataset collected?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={details}>
          <Typography className={answer}>
          To calculate the index we use primarily the Sentinel
           2 satellite image dataset. This data is captured by satellites
            operated by European Space Agency (ESA) and made publicly available
             by The European Commission's Copernicus programme in collaboration
              with ESA. Additional satellite image data, 
          such as high-resolution satellite imagery from Airbus and Maxar, are used 
          to complement and validate the results.
          </Typography>
          <Typography className={answer}>
          Satellite image data is acquired from the
           Copernicus project and it has been modified in order to establish this report.
            For the avoidance of doubt, 
          it should be clarified that HUGSI is not officially endorsed or affiliated with
           any European Union institution.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel6d-header"
          expandIcon={expanded === 'panel6' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel6' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{ fontWeight: expanded === 'panel6' ? 'bold' : 'normal' }}
          >
            What techniques are used to process the dataset?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={details}>
          <Typography className={answer}>
            Deep learning techniques are utilized to process the satellite image
            data and extract relevant metrics from the raw images.
          </Typography>

          <Typography className={answer}>
            As a subset of machine learning, deep learning leverages deep neural
            networks to effectively learn from unstructured data (such as
            satellite images) and reveal patterns, characteristics and insights
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel7'}
        onChange={handleChange('panel7')}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel7d-header"
          expandIcon={expanded === 'panel7' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel7' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{ fontWeight: expanded === 'panel7' ? 'bold' : 'normal' }}
          >
            How are city boundaries, area and population defined?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={details}>
          <Typography className={answer}>
            City boundaries in HUGSI are defined based on OSM Boundaries dataset
            provided by Open Street Map.
          </Typography>
          <Typography className={answer}>
            Population data from Global Human Settlement Layer (GHS-POP) is used
            to adjust the area to analyze within OSM city boundaries. We only
            take into consideration urban areas where citizens actually reside.
          </Typography>
          <Typography className={answer}>
            GHS-POP divides a city into grids of 250 by 250 meters and measures
            average density of population in each grid. Our approach excludes
            tiles with less than 1000 people per square mile (24 people per 250m
            by 250m) and includes islands (smaller areas disconnected from the
            main body of a city) with more than 5000 people residing are
            included.
          </Typography>
          <Typography className={answer}>
            Then, we add a 300m buffer around the filtered boundaries to include
            surrounding areas. This resulting area is regarded as the urban area
            for a city which is used followed in all further calculations.
          </Typography>
          <Typography className={answer}>
            This method produce three important output:
            <ol>
              <li>Urban area to use in the analysis of a city</li>
              <li>Actual area of the city in m² that the analysis cover</li>
              <li>Estimated population for the measured area</li>
            </ol>
          </Typography>
          <Typography className={answer}>
          City boundaries identified in the report are defined based on 
          an Open Street Map (OSM) boundaries dataset, which is made available 
          <a href="https://osm-boundaries.com/Map" target="_blank">
            here
            </a> under the Open Database License (ODbL). 
          </Typography>
          <Typography className={answer}>
          Population data from Global Human Settlement Layer (GHS-POP) was used to 
          adjust city boundaries, consideration was taken to identify areas where citizens actually 
          reside. For more information on GHS-POP, please see Schiavina, Marcello; Freire, Sergio;
           MacManus, Kytt (2019): GHS population grid multitemporal (1975, 1990, 2000, 2015) R2019A. 
          Europe- an Commission, Joint Research Centre (JRC) DOI: 10.2905/42E8BE89-54FF-464E-BE7BB- 
          F9E64DA5218
          </Typography>
          <Typography className={answer}>
          PID: http://data.europa.eu/89h/0c6b9751-a71f-4062-830b-43c9f432370 
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel8'}
        onChange={handleChange('panel8')}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel8d-header"
          expandIcon={expanded === 'panel8' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel8' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{ fontWeight: expanded === 'panel8' ? 'bold' : 'normal' }}
          >
            How can satellite tell the difference between a tree and a bush?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={details}>
          <Typography className={answer}>
          HUGSI uses a machine learning model to based on height differentiate trees from
           other vegetation including bush.
           The model is trained on visually labeled dataset in which vegetation over 1m height 
           are classified as trees.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel9'}
        onChange={handleChange('panel9')}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel9d-header"
          expandIcon={expanded === 'panel9' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel9' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{ fontWeight: expanded === 'panel9' ? 'bold' : 'normal' }}
          >
            Are the results accurate?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={details}>
          <Typography className={answer}>
            The results are produced through our thorough and open methodology
          </Typography>
          <Typography className={answer}>
          HUGSI focus on globally scalable analytics and can be used to derive current state,
           development and changes for a city, cities, region and globally. The results are 
          not optimized to produce detailed and highly accurate readings for a particular city.
          </Typography>
          <Typography className={answer}>
            The results provided are validated by data scientists and domain
            experts and believed to be very accurate. A thorough approach of
            testing and validation is employed in data processing with deep
            learning to ensure deep understanding of the performance and
            continuous optimization of the algorithms.
          </Typography>
          <Typography className={answer}>
            Legal disclaimer: All results are assumptions based on our open
            methodology and the AI-models used.
            <a href="/terms-of-use" target="_blank">
              www.hugsi.green/terms-of-use
            </a>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
      <ExpansionPanel
        square
        expanded={expanded === 'panel11'}
        onChange={handleChange('panel11')}
      >
        <ExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel11d-header"
          expandIcon={expanded === 'panel11' ? <WhiteRemove /> : <WhiteAdd />}
          style={{
            background: expanded === 'panel11' ? '#f4f5f5' : 'white',
          }}
        >
          <Typography
            className={question}
            style={{ fontWeight: expanded === 'panel11' ? 'bold' : 'normal' }}
          >
            Can you provide the metrics behind the index?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={details}>
          <Typography className={answer}>
            We’re open to share the metrics for a city or area of your interest
            upon request. Drop us a message and we’re happy to discuss.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
    </section>
  );
};

export default QuestionsAndAnswers;
