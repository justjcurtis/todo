import { API_URL } from '../constants'
import axios from 'axios'
export const getTodosRequest = async (page = 1, limit = 10, search, completedFilter) => {
    try {
        const response = await axios.post(`${API_URL}/getTodos?page=${page}&limit=${limit}`, {
            search,
            completedFilter
        });
        return response.data
    } catch (err) {
        console.error(err.response.data.error)
        throw new Error(err.response.data.error);
    }
}
