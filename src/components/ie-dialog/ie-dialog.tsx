import React, { useState, useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from '@material-ui/core';

/**
 * IeDialog component
 */
const IeDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
    window.open('https://www.mozilla.org/en-US/firefox/new/', '_blank');
    window.open('https://www.google.com/intl/en/chrome/', '_blank');
  };

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const isIE = /MSIE|Trident|Edge\//.test(ua);
    if (isIE) setIsOpen(true);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        It looks like your current browser is not compatible with some of the
        web technologies HUGSI web portal is built with
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          To unveil the insights about green space around the world, please
          download latest version of Google Chrome, Firefox or Microsoft Edge.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IeDialog;
