import { API_URL } from '../constants'
import axios from 'axios'
export const updateTodoRequest = async (id, todo) => {
    const response = await axios.patch(`${API_URL}/todo?id=${id}`, {
        text: todo.text,
        completed: todo.completed
    });
    if (response.status == 200) return true
    throw new Error(response.error)
}
