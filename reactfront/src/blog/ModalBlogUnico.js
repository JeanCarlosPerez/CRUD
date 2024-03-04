import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  borderRadius: 4,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ddd',
  padding: '16px',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '16px', // Ajusta el margen inferior según sea necesario
  marginTop: '16px'
};


export default function BasicModal({ title, content, onClose }) {
  return (
    <Modal
      open={Boolean(title && content)}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Box sx={headerStyle}>
        <Button onClick={onClose} style={{ position: 'absolute', top: 0, right: 0 }}>
        <CloseIcon />
        </Button>
        </Box>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={titleStyle} >
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={titleStyle}>
          {content}
        </Typography>
      </Box>
    </Modal>
  );
}
