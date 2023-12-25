import React from 'react';
import { Button, Box, useMediaQuery, Typography } from '@material-ui/core';
import CityComparisonLink from '../link/cities-comparison-link';
import { useStyles } from './style';
import ShareContent from 'popups/share-content';
import Popup from 'reactjs-popup';
// import { jsPDF } from "jspdf";
// import html2canvas from 'html2canvas';
import { ArrowForward } from '@material-ui/icons';

/**
 * Mail connect component
 */
const WinnerBanner = ({ winnerCity, printRef, setOpen, open, cityAtLeft, cityAtRight, cityAtEnd }) => {

  const classes = useStyles({});
  const smallScreen = useMediaQuery('(max-width:900px)');
  const winnerDeclaration = 'And the greenest city is';
  const url = window.location.search.replace('?', '').split('_vs_');
  // const printRef = useRef();

  // const createPDF = async () => {
  //   const element = printRef.current;
  //   const canvas = await html2canvas(element);
  //   const data = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF();
  //   const imgProperties = pdf.getImageProperties(data);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight =
  //     (imgProperties.height * pdfWidth) / imgProperties.width;
  //   pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(url[0] && url[1] && url[2] ? `${url[0]}_vs_${url[1]}_vs_${url[2]}.pdf` : `${url[0]}_vs_${url[1]}.pdf`);
  // };
  return (
    <div className={smallScreen ? classes.smallWinnerRoot : classes.winnerRoot}>
      <div className={smallScreen ? classes.winnersmallBox : classes.winnerBox} >
        <Box textAlign="left">
          <Typography variant="h4" style={{
            fontWeight: 'bold'
            , fontSize: smallScreen ? '20px' : ''
          }}>{winnerDeclaration}</Typography>
          <Typography
            variant="h2"
            style={{ color: '#99c93c', fontWeight: 'bold', fontSize: smallScreen ? '32px' : '' }}
          >
            {winnerCity}
          </Typography>
        </Box>
      </div>
      <Box
        style={{
          alignItems: 'end',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: smallScreen ? '0px' : '12rem'
        }}
      >
        <Box>
          <Popup
            closeOnDocumentClick={false}
            modal
            trigger={
              <Button
                color={'primary'}
                style={{
                  color: '#698D29',
                  textTransform: 'none',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: smallScreen ? '0.8rem' : 'unset',
                  // float: 'right',
                  padding: smallScreen ? '0px' : '0.5rem',
                }}

              >
                Share this &nbsp;
                <i
                  className="fas fa-share"
                  aria-hidden="false"
                />
              </Button>
            }
          >
            {close => (
              <ShareContent
                close={close}
                smallScreen={smallScreen}
                value={window.location.href}
              />
            )}
          </Popup>
        </Box>
        <Box style={{}}>
          {/* <Typography variant="subtitle1">Want to try again?</Typography>
          <Typography
            variant="h2"
            style={{ color: '#99c93c', fontWeight: 'bold' }}
          ></Typography> */}

          <Button
            color={'primary'}
            style={{
              color: '#698D29',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: smallScreen ? '0.8rem' : 'unset',
              textDecoration: 'none',
              padding: smallScreen ? '0px' : '0.5rem',
            }}

            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            <CityComparisonLink
            // style={{
            //   color: '#698D29',
            //   textTransform: 'none',
            //   fontWeight: 'bold',
            //   fontSize: smallScreen ? '0.8rem' : 'unset',
            //   textDecoration: 'none'
            // }}
            >
              Change the cities &nbsp;
            </CityComparisonLink>
            <ArrowForward />
          </Button>
        </Box>
        {url?.length < 3 && <Box>
          <Button
            color={'primary'}
            style={{
              color: '#698D29',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: smallScreen ? '0.8rem' : 'unset',
              // float: 'right',
              padding: smallScreen ? '0px' : '0.5rem',
            }}
            onClick={() => setOpen(!open)}
          >
            Add new city &nbsp;
            <ArrowForward />
          </Button>

        </Box>}

        {/* <Box>
          <Button
            color={'primary'}
            style={{
              color: '#698D29',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: smallScreen ? '0.8rem' : 'unset',
              // float: 'right',
              padding: smallScreen ? '0.5rem' : '0.5rem',
            }}

            onClick={createPDF}
          >
            Download as PDF&nbsp;
            <i
              className="fa fa-download"
              aria-hidden="false"
            />
          </Button>
        </Box> */}

      </Box>
    </div>
  );
};

export default WinnerBanner;