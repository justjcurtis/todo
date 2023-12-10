import { API_URL } from '../constants'
export const getTodosRequest = async () => {
    const response = await fetch(`${API_URL}/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const todos = await response.json()
    return todos
}
