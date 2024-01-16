import { useEffect, useState } from 'react'
import {Box, Button} from '@mui/material'
import AddTask from './components/AddTask'
import ListTask from './components/ListTask'
import * as taskService from './services/taskService'
import axios from 'axios'
import { Autorenew }  from '@mui/icons-material'

const tasksAPI = [
  {
    task: 'tarea #1'
  },
  {
    task: 'tarea #2'
  }
]

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //INVOCO MI API
    // const getTasks = async () =>{
    //   const url='http://localhost:9090/tasks/';
    //   const result = await axios.get(url);

    //   setTasks(result.data);
    //   console.log(result.data);
    // }
    // getTasks();

    taskService.getTasks().then(data => {
      setTasks(data);
    })
  }, [])

  const handleReflesh =() => {
    taskService.getTasks().then(data => {
      setTasks(data);
    })
  }

  const handleAddTask = (newTask) => {
    console.log(newTask);
 if(newTask !== ''){
   taskService.createTask(newTask).then(data => {
     taskService.getTasks().then(tasks => setTasks(tasks))
   })
 }
    // const createTask = async () => {
    //   const url = import.meta.env.VITE_URL+'/tasks';
     
    //   const result = await axios.post(url, {taskName: newTask})
     
    //   taskService.getTasks().then(data => setTasks(data))
    // }

    // createTask()

    //setTasks(old => [...old, {taskName: newTask}]) //Ejemplo javascript moderno ECMASCRIPT 6
    // setTasks(function(old) {
    //   const nuevoArreglo = [...old] 
    //   nuevoArreglo.push(newTask)
    // })
  }

  const handleDeleteTask = (id) => {
    taskService.deleteTask(id).then(() => taskService.getTasks().then(tasks => setTasks(tasks)))
    // setTasks(old => {
    //   const oldCopy = [...old]
    //   oldCopy.splice(index,1)
    //   return oldCopy
    // })
    // setTasks(function(old) {
    //   return old.splice(index,1)
    // })
  }
  const handleUpdateTask = (updateTask, id) => { 

    setTasks(old => {
    const updateTasks = [...old];
      //['34asdasdvc', 'asdasdasd', 'asdasdas']
      //[{_id: '', taskName:''}, {}]
    const index = updateTasks.map(task => task._id).indexOf(id);
 
    updateTasks[index].taskName = updateTask;
    return updateTasks;
    });

    taskService.updateTask(id, updateTask).then(() => taskService.getTasks().then(tasks => setTasks(tasks)))

  }

  return (
    <Box sx={{
      width: '60%', 
      display: 'block', 
      margin:'auto'
    }}>
      <AddTask onAddTask={handleAddTask}/>

      <Box sx={{
        display: 'flex',
        justifyContent:'end'
      }} my={3}>
        <Button color="secondary" variant="outlined" startIcon={<Autorenew />} onClick={handleReflesh}>
          Actualizar
        </Button>
      </Box>
      <ListTask items={tasks} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask}/>
    </Box>
    )
}

export default App
