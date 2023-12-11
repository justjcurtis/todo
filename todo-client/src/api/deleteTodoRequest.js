import { API_URL } from '../constants'
export const deleteTodoRequest = async (id, token) => {
    const response = await fetch(`${API_URL}/todo?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.ok) return true
    const data = await response.json()
    throw new Error(data.error)
}
