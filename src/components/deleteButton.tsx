// Import necessary components and styles
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EntityType } from '../models';
import { deleteGovernment } from '../apis/governmentApi';
import { useDispatch } from 'react-redux';
import { deleteParty } from '../apis/partyApi';
import { deletePartyMember } from '../apis/partyMembersApi';


type ChooserProps = {
    entityUUID: string | undefined,
    entityType: EntityType,
    onSuccess: Function,
    isEnabled: boolean,
};

// Define the DeleteButton component
const DeleteButton: React.FC<ChooserProps> = ({entityUUID, entityType, onSuccess, isEnabled}) => {
  // State to manage the dialog open/close
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    if (!entityUUID){
        alert('plz select entity to delete')
        return
    }

    setOpen(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Function to handle deletion (you can customize this function)
  const handleDelete = async () => {
    if (!isEnabled){
        console.log('not enables')
        return
    }
    // Add your delete logic here    
    console.log(`Deleting ${entityType}...`);

    let addResult = undefined
    if(entityType == EntityType.government && entityUUID){
        addResult = await deleteGovernment(dispatch, entityUUID)
        onSuccess()
    }else if(entityType == EntityType.party && entityUUID){
        addResult = await deleteParty(dispatch, entityUUID)
        onSuccess()
    }else if(entityType == EntityType.partyMember && entityUUID){
        addResult = await deletePartyMember(dispatch, entityUUID)
        onSuccess()
    }

    if (addResult?.error){
        console.error(`failed to delete ${entityType}`)
        return 
    }

    handleCloseDialog();
  };

  return (
    <>
      {/* Delete button with trash icon */}
      <Button
        style={{"height": '36px', opacity: isEnabled? 1 : 0.4}}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => {isEnabled && handleOpenDialog()}}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
            <Button onClick={() => {isEnabled && handleDelete()}} color="secondary">
                Delete
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;