import {useState, useEffect} from 'react'
import { TextField, Box, Typography, Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const AddTask = ({onAddTask}) => {
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState(false);
    const [textError, setTextError] = useState('');

    const handleChange = (e) => {
        setNewTask(e.target.value);
        setError(false);
        setTextError('');
    }

    // useEffect(() => {
    //   if(editTask){
    //     //setNewTask(editTask.item.nameTask);
    //     console.log(editTask);
    //   }
    // }, [editTask]);

    // const handleAddOrUpdateTask = () => {
    //   if (editTask) {
    //     // Actualizar la tarea existente
    //     onEditTask(newTask, editTask.index);
    //   } else {
    //     // Agregar una nueva tarea
    //     onAddTask(newTask);
    //   }
    //   // Limpiar el estado de edición
    //   setNewTask('');
    // };

    const handleAddTask = () => {
     if(newTask === '') {
        setError(true);
        setTextError('No deje el campo vacio');
    }else
        onAddTask(newTask);
      // Limpiar el estado de edición
      setNewTask('');
    }

  return (
    <>
      <Typography variant="h2" align="center" my={{ xs: 6, lg: 1 }}>
        To Do List
      </Typography>
      <Box mb={2}>
        <TextField 
          fullWidth
          id="outlined-basic"
          label="Mi nueva tarea"
          value={newTask}
          onChange={handleChange}
          variant="outlined"
          error={error}
          helperText={textError}
        />
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleAddTask}> 
          Agregar tarea
        </Button>
      </Box>
    </>
  );
};

export default AddTask;
