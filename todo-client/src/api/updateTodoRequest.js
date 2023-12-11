import { API_URL } from '../constants'
import axios from 'axios'
export const updateTodoRequest = async (id, todo) => {
    try {
        const response = await axios.patch(`${API_URL}/todo?id=${id}`, {
            text: todo.text,
            completed: todo.completed
        });
        return response.data
    } catch (err) {
        console.error(err.response.data.error)
        throw new Error(err.response.data.error);
    }
}
