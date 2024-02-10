import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useDispatch } from 'react-redux';
import { EntityType } from '../models';
import { addEntity } from '../apis/common';
import { createGovernment } from '../apis/governmentApi';
import { createParty } from '../apis/partyApi';
import { createPartyMember as createPartyMember } from '../apis/partyMembersApi';

type ChooserProps = {
    entityType: EntityType,
    parentUUID: string | undefined,
};

const YourComponent: React.FC<ChooserProps> = ({entityType, parentUUID}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClick = async () => {
    if (!name || !imageUrl || !description){
        alert('missing fields')
        return
    }

    if ((entityType == EntityType.party || entityType == EntityType.partyMember ) && !parentUUID){
        alert('attach parent uuid ')
        return
    }

    console.log('name:', name);
    console.log('imageUrl:', imageUrl);
    console.log('description:', description);

    const data = { name, imageUrl, description }

    let addResult = undefined
    if(entityType == EntityType.government){
        addResult = await createGovernment(dispatch, name, imageUrl, description)
    }else if(entityType == EntityType.party && parentUUID){
        addResult = await createParty(dispatch, name, imageUrl, description, parentUUID)
    }else if(entityType == EntityType.partyMember && parentUUID){
        addResult = await createPartyMember(dispatch, name, imageUrl, description, parentUUID)
    }

    if (addResult && addResult.error){
        console.error(`failed to create ${entityType}`)
        return 
    }

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{'marginRight': 10}}>
        create 
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="image Url"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ marginTop: '16px' }}
          />
          <TextareaAutosize
            aria-label="Textarea"
            placeholder="description"
            minRows={3}
            style={{ width: '100%', marginTop: '16px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddClick()}
            style={{ marginTop: '16px' }}
          >
            add to db
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YourComponent;