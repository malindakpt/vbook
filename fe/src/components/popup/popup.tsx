import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { config } from '../../config';

interface Props {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

export const Popup: React.FC<Props> = ({isOpen, onClose, message}) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={isOpen}
        autoHideDuration={config.popupShowDuration}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}
