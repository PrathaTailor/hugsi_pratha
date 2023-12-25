import React, { useState } from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import Carousel from 'react-elastic-carousel';
import PropTypes from 'prop-types';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useStyles } from './style';

const breakPoints = [{ width: 1, itemsToShow: 1 }];
type ItemObject = {
  // Children's props
  object: any;
  index: number;
};

/**
 * Carousel slider component in How it works page
 */
const AboutCarousel: React.FC = () => {
  const { root, smallRoot, slider } = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');
  const [cindex, setCindex] = useState<number>(0);
  const videoList = [
    {
      title: 'HUGSI Pre launch Living city 2020',
      description: `HUGSI 2020 was introduced during the Husqvarna event Living City on December 1, 2020. Erik Swan, Digital Ecosystem Strategist, walks us through the data and points out the many benefits that can be gained – for operators, business owners and entire cities – from the insights.`,

      link: 'https://www.youtube.com/embed/BuA4Fim-Cvg',
      duration: 10,
    },
    {
      title: 'HUGSI 2020 launch event',
      description:
        'HUGSI 2020 was launched at a special event on December 9, 2020. This was where we presented the updated index including a lot of new cities as well as many of the new features, we brought to you.',
      link: 'https://www.youtube.com/embed/jEahhnmYSUs',
      duration: 32,
    },
    {
      title: 'Webinar on value of Urban Green Space',
      description: `In this webinar, arranged by HUGSI & NL Greenlabel, we will provide a deeper look into what makes up sustainable urban green space and how to succeed with valuable green. Dr. Gerard Korthals will dive into the topic of soil biodiversity and link this to the world that we see.\n - Why is urban green space important?\n - What is going on in the soil?\n - What is the relation between the soil and plant?\n A perfect time to meet the experts, learn something new and get answers to your questions. The event is hosted by well-known Dutch TV-Host Lodewijk Hoekstra.`,
      link: 'https://www.youtube.com/embed/mjB1IUAIdcY',
      duration: 45,
    },
    {
      title: 'Webinar on methodology behind HUGSI',
      description: `How did we come up with the Green KPI's? How were the cities selected, how did we determine city boundaries, what was the big decisions behind our methodology? How did we make use of AI in the processing? We will cover these topics and more in this webinar arranged by HUGSI and Overstory.`,
      link: 'https://www.youtube.com/embed/aE4XeoLfLMA',
      duration: 47,
    },
    {
      title: 'Durban, South Africa - Global Green Model City of 2019',
      description: `HUGSI was first launched in 2019 and the greenest city of our index back then was the city of Durban in South Africa. One year after the award we visited Durban and interviewed the head of Parks and recreation to listen in on what the award has ment to them and to get their view on urban green space.`,
      link: 'https://www.youtube.com/embed/lJMvggeGRX0',
      duration: 3,
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NavigateBeforeIcon />,
    prevArrow: <NavigateNextIcon />,
    dotsClass: 'slick-dots sliderDot',
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className={smallScreen ? smallRoot : root}>
      <Carousel
        {...settings}
        breakPoints={breakPoints}
        disableArrowsOnEnd={true}
        isRTL={false}
        autoPlaySpeed={5000}
        enableSwipe={true}
        enableMouseSwipe={true}
        className={slider}
        onChange={(currentItemObject: ItemObject, currentPageIndex: number) => {
          setCindex(currentPageIndex);
        }}
      >
        {videoList.map((item, index) => {
          return (
            <Box key={index}  >
              <Item
                title={item.title}
                desc={item.description}
                duration={item.duration}

              >
                <iframe
                  width="100%"
                  height={smallScreen ? '400px' : '600px'}
                  src={index === cindex ? `${item.link}?rel=0` : ''}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; autoplay; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              </Item>
            </Box>
          );
        })}
      </Carousel>
    </div>
  );
};

function Item(props) {
  const { children, value, index, title, desc, duration, ...other } = props;
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: smallScreen ? '500px' : '750px',
          color: '#fff',
        }}
      >
        {children}
      </div>
      <div
        style={{
          color: '#293845',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}> {title}</div>
        <div> {`${duration} min`}</div>
        <div
          style={{
            marginTop: '1rem',
          }}
        >
          <span style={{ whiteSpace: 'pre-wrap' }}>{desc}</span>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  duration: PropTypes.number,
  desc: PropTypes.string,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default React.memo(AboutCarousel);