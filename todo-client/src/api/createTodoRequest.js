import { API_URL } from '../constants';
import axios from 'axios';
export const createTodoRequest = async (todo) => {
    const response = await axios.post(`${API_URL}/todo`, {
        text: todo.text,
        completed: todo.completed
    }, { withCredentials: true });
    if (response.status == 200) return response.data
    throw new Error(response.error);
}
