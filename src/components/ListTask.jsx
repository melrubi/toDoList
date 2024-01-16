import { List, ListItem, IconButton, ListItemText, Box, InputAdornment, TextField } from "@mui/material";
import {Delete as DeleteIcon, EditRounded as EditRoundedIcon, CheckRounded, CloseRounded } from '@mui/icons-material';
import { useState } from "react";

const ListTask = ({items, onDeleteTask, onUpdateTask}) => {
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(null);

  const handleInputChange = (event) => {
    setText(event.target.value);
  }

  return (
    <>
      <List sx={{
        position: 'relative',
        overflow: 'auto',
        maxHeight: '60vh'
      }}>
        {items.map((item) => 
          edit === item._id ?  
          <ListItem key={item._id}> 
            <TextField fullWidth defaultValue={item.taskName} variant="outlined" //Este es un uncontrolled component porque no estamos manhejando su estado, le estamos diciendo con el defaultValue que el mismo lo maneje internamente ( si usaramos value entonces ahi nosotros lo tendriamos que manejar y por lo tanto pasaria a ser un controlled component) 
            InputProps={{endAdornment: 
                <InputAdornment position= "end"> 
                  <IconButton onClick={() => {onUpdateTask(text, item._id); setEdit(null);}}> <CheckRounded /> </IconButton>
                  <IconButton onClick={() => setEdit(null)}> <CloseRounded /> </IconButton>
                </InputAdornment>,
            }}
            onChange={handleInputChange}/> 
          </ListItem> :
            
          <ListItem key={item._id}
            secondaryAction={
              <Box>
                <IconButton edge="end" aria-label="edit" onClick={() => setEdit(item._id)} >
                  <EditRoundedIcon />
                </IconButton>

                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          > 
            <ListItemText
              primary={item.taskName}
            />
          </ListItem>
            
        )}
        
      </List>
    </>
  );
};

export default ListTask;
