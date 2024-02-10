import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const YourComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToLog = () => {
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
    console.log('Textarea Value:', textareaValue);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Input 1"
            variant="outlined"
            fullWidth
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <TextField
            label="Input 2"
            variant="outlined"
            fullWidth
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            style={{ marginTop: '16px' }}
          />
          <TextareaAutosize
            aria-label="Textarea"
            placeholder="Textarea"
            minRows={3}
            style={{ width: '100%', marginTop: '16px' }}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToLog}
            style={{ marginTop: '16px' }}
          >
            Add to Log
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YourComponent;