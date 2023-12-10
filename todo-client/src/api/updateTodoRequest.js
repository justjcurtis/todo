import { API_URL } from '../constants'
export const updateTodoRequest = async (id, token, todo) => {
    const response = await fetch(`${API_URL}/todos?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            text: todo.text,
            completed: todo.completed
        }),
    })
    if (response.ok) return true
    const data = await response.json()
    throw new Error(data.error)
}
