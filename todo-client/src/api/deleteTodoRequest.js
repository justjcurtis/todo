import { API_URL } from '../constants'
import axios from 'axios'
export const deleteTodoRequest = async (id) => {
    const response = await axios.post(`${API_URL}/deleteTodo?id=${id}`, {}, { withCredentials: true });
    if (response.status == 204) return true
    throw new Error(response.error)
}
