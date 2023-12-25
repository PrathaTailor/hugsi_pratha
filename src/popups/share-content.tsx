import React from 'react';
import { Button, Box } from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  Twitter,
  Facebook,
  Pinterest,
  Whatsapp,
  Reddit,
} from 'react-social-sharing';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContent: {
      display: 'flex',
      flexDirection: 'row',
      margin: '2rem',
    },
    headerMsg: {
      width: '100%',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#293845',
    },
    closeBtn: {
      cursor: 'pointer',
      color: '#99c93c',
      lineHeight: '2rem',
      fontSize: '2rem',
      background: 'white',
      borderRadius: '0.5rem',
    },
    modal: {
      backgroundColor: 'white',
      border: '0.1rem solid #99c93c',
      borderRadius: '0.5rem',
    },
    content: {
      margin: '2rem',
    },
  })
);

interface Props {
  close?: any;
  smallScreen?: boolean;
  value?: string;
}

const ShareContent: React.FC<Props> = ({ close, smallScreen, value }) => {
  const { headerContent, headerMsg, closeBtn, modal, content } = useStyles({});
  const linkValue = value ? value : window.location.href;
  return (
    <Box
      className={modal}
      style={{
        width: smallScreen ? '95%' : '50rem',
        margin: smallScreen ? '0 0.5rem' : '0',
      }}
    >
      <Box className={headerContent}>
        <Box className={headerMsg}>Share this</Box>
        <Box className={closeBtn}>
          <a onClick={close}>&times;</a>
        </Box>
      </Box>

      <Box style={{ padding: smallScreen ? '0 1rem' : '0rem 1.5rem' }}>
        <Facebook
          link={linkValue}
          label="Facebook_Hugsi"
          name={smallScreen ? ' ' : 'Facebook'}
        />
        <Twitter
          link={linkValue}
          label="Tweet_Hugsi"
          name={smallScreen ? ' ' : 'Twitter'}
        />
        <Reddit
          link={linkValue}
          label="Sample"
          name={smallScreen ? ' ' : 'Reddit'}
        />
        {/* href is not working for linkedin, hence using origin */}
        {/* <Linkedin link={window.location.origin} label="Linkedin_Hugsis" /> */}
        <Whatsapp
          link={linkValue}
          label="Whatsapp_Hugsi"
          name={smallScreen ? ' ' : 'Whatsapp'}
        />
        <Pinterest
          link={linkValue}
          label="Pinterest_Hugsi"
          name={smallScreen ? ' ' : 'Pinterest'}
        />
      </Box>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: smallScreen ? '2rem 1rem' : '2rem',
        }}
      >
        <Box
          style={{
            border: '0.1rem solid #698d29',
            padding: '0.5rem',
            width: '70%',
            borderRight: 'none',
            borderRadius: '1rem 0rem 0rem 1rem',
          }}
        >
          <Box style={{ wordBreak: 'break-word', fontSize: '0.8rem' }}>
            {/* {window.location.href}
             */}
            {linkValue}
          </Box>
        </Box>
        <Box
          style={{
            color: '#99c93c',
          }}
        >
          <Button
            variant="contained"
            style={{
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '0rem 1rem 1rem 0',
              backgroundColor: '#99c93c',
            }}
            size={'large'}
            onClick={e => {
              e.preventDefault();
              navigator.clipboard.writeText(linkValue);
            }}
          >
            Copy share link &nbsp;
            {/* {smallScreen ? '' : 'share link '} */}
            <i className="fas fa-copy" style={{ marginLeft: '0.5rem' }}></i>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ShareContent;
