import { API_URL } from '../constants'
export const deleteTodoRequest = async (id, token) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}
