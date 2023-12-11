import { API_URL } from '../constants'
export const getTodosRequest = async (page = 1, limit = 10, search, completedFilter, token) => {
    const response = await fetch(`${API_URL}/getTodos?page=${page}&limit=${limit}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ search, completedFilter }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    return data
}
