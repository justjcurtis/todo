import { API_URL } from '../constants'
import axios from 'axios'
export const getTodosRequest = async (page = 1, limit = 10, search, completedFilter) => {
    const response = await axios.post(`${API_URL}/getTodos?page=${page}&limit=${limit}`, {
        search,
        completedFilter
    }, { withCredentials: true });
    if (response.status != 200) throw new Error(response.error)
    return response.data
}
