import React from 'react';
import { Typography, Button, useMediaQuery } from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
// @ts-ignore
import logoNLGreenlabel from '../../images/logo-nl-greenlabel-small.png';
// @ts-ignore
import logoNLGLSA from '../../images/widget-survey.png';
import { useStyles } from './style';

interface Props {
  type?: string;
}

/**
 *  NL Greenlabel Quiz component
 * @param type - quiz or self - assessment
 */
const NLGLTest: React.FC<Props> = props => {
  const { type } = props;
  const classes = useStyles({});
  const smallScreen = useMediaQuery('(max-width:600px)');

  return (
    <>
      <section
        style={{
          height: 'auto',
          margin: '0 auto',
        }}
      >
        <div className={
          !smallScreen ?
            type !== 'self-assessment' ?
              classes.rowGrid
              : classes.columnGrid
            : classes.mobileViewGrid}>
          <div style={{
            margin: smallScreen ? '0 auto' : 'auto 2rem',
            textAlign: 'center'
          }}>
            <img
              src={type === 'self-assessment' ? logoNLGreenlabel : logoNLGLSA}
              style={{
                height:
                  smallScreen || type === 'self-assessment' ? '5rem' : '10rem',

              }}
              alt="Quiz"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant={smallScreen || type === 'self-assessment' ? 'h6' : 'h4'}
              style={{ fontWeight: 'bold' }}
            >
              {' '}
              {type === 'self-assessment'
                ? 'How sustainable is your urban area? '
                : 'Want to share your thoughts about HUGSI with us?'}
            </Typography>
            <Typography
              variant="body1"
              style={{
                margin:
                  smallScreen || type === 'self-assessment'
                    ? '1rem 0'
                    : '2rem 4.3rem 2rem 0',
                textAlign: 'justify',    
              }}
            >
              {' '}
              {type === 'self-assessment' ? (
                <>
                  Take the <b>Terrainlabel self-assessment</b> by
                  <i>NL Greenlabel</i> and find out.
                </>
              ) : (
                `We would like to invite you all to take part in a survey about HUGSI.
                The survey is completely anonymous, and will only 
                serve as a base for further developing HUGSI and the experience.`
              )}
              {type === 'self-assessment' && (
                <a href={'/nl-green-label-self-assessment'}
                  target="_blank"
                  style={{ position: 'relative', top: '5px' }}>
                  <ArrowForward className={classes.arrow} />
                </a>
              )}
            </Typography>

            {type === 'quiz' && (
              <a
                href={'https://udnq8hf9s95.typeform.com/to/GfgnbIO6'}
                target="_blank"
                style={{
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: '#698d29',
                }}
              >
                <Button className={classes.btnTest} size={'large'}>
                  <Typography
                    style={{
                      color: '#698d29',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                    }}
                  >
                    Take the survey
                  </Typography>
                  <svg width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className={classes.arrow}
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1C8 0.46875 8.4375 0 9 0H12.9688C13.125
                     0 13.25 0.03125 13.375 0.09375C13.4688 0.125 13.5938
                     0.21875 13.6875 0.3125C13.875 0.5 13.9688 0.75 14 1V5C14 
                     5.5625 13.5312 6 13 6C12.4375 6 12 5.5625 12 5V3.4375L6.6875 
                     8.71875C6.3125 9.125 5.65625 9.125 5.28125 8.71875C4.875 8.34375 
                     4.875 7.6875 5.28125 7.3125L10.5625 2H9C8.4375 2 8 1.5625 8 1ZM0 
                     3C0 1.90625 0.875 1 2 1H5C5.53125 1 6 1.46875 6 2C6 2.5625 5.53125 
                     3 5 3H2V12H11V9C11 8.46875 11.4375 8 12 8C12.5312 8 13 8.46875 13 
                     9V12C13 13.125 12.0938 14 11 14H2C0.875 14 0 13.125 0 12V3Z" fill="#698D29"
                    />
                  </svg>
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NLGLTest;