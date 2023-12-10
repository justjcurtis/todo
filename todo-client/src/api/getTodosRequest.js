import { API_URL } from '../constants'
export const getTodosRequest = async (page = 1, limit = 10, token) => {
    const response = await fetch(`${API_URL}/todos?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    return data
}
