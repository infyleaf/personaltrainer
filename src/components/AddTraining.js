import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props) {


    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({
        date:'', duration: '', activity: '', customer: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  
     
      const handleInputChange = (event) => {
          setTraining({...training, [event.target.name]: event.target.value})
  
      }

              //Save 
              const addTraining = () => {
                props.saveTraining(training);
                handleClose();
            }

    return(
        <div>
 <Button variant="outlined" onClick={handleClickOpen}>
        Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
                autoFocus
                margin="dense"
                name = "date"
                value={training.date}
                onChange={e => handleInputChange(e)}
                label="Date"
                fullWidth
                variant="standard"
          />
                   <TextField
                
                margin="dense"
                name = "duration"
                value={training.duration}
                onChange={e => handleInputChange(e)}
                label="Duration"
                fullWidth
                variant="standard"
          />
                   <TextField
                
                margin="dense"
                name = "activity"
                value={training.activity}
                onChange={e => handleInputChange(e)}
                label="Activity"
                fullWidth
                variant="standard"
          />
                   <TextField
                
                margin="dense"
                name = "customer"
                value={training.customer}
                onChange={e => handleInputChange(e)}
                label="Customer"
                fullWidth
                variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
        </Dialog>

        </div>
    );
}
