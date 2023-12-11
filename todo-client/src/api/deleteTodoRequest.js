import { API_URL } from '../constants'
import axios from 'axios'
export const deleteTodoRequest = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/deleteTodo?id=${id}`)
        return response.data
    } catch (err) {
        console.error(err.response.data.error)
        throw new Error(err.response.data.error)
    }
}
