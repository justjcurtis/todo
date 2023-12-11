import { API_URL } from '../constants';
import axios from 'axios';
export const createTodoRequest = async (todo) => {
    try {
        const response = await axios.post(`${API_URL}/todo`, {
            text: todo.text,
            completed: todo.completed
        });
        return response.data
    } catch (err) {
        console.error(err.response.data.error)
        throw new Error(err.response.data.error);
    }
}
