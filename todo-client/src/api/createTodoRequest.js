import { API_URL } from '../constants';
export const createTodoRequest = async (todo, token) => {
    const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    });
    if (response.ok) return await response.json();
    const data = await response.json();
    throw new Error(data.error);
}
