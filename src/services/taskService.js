import axios from 'axios'

const url='/tasks/';

export const getTasks = async () => {
      const result = await axios.get(import.meta.env.VITE_URL + url);

      //setTasks(result.data);

        return result.data
}

export const createTask = async (newTask) => {
    const result = await axios.post(import.meta.env.VITE_URL + url, {taskName: newTask})
    //return result.status === 200
}

export const deleteTask = async(id) => {
    const result = await axios.delete(import.meta.env.VITE_URL + url + id)
} 

export const updateTask = async(id, updateTask) => {
    const result = await axios.put(import.meta.env.VITE_URL + url + id, {taskName: updateTask})
}