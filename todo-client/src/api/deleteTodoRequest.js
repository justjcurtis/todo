import { API_URL } from '../constants'
import axios from 'axios'
export const deleteTodoRequest = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/todo?id=${id}`)
        return response.data
    } catch (err) {
        console.error(err.response.data.error)
        throw new Error(err.response.data.error)
    }
}
