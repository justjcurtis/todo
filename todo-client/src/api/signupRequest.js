import { API_URL } from '../constants';
export const signupRequest = async (username, password) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
        return true
    } else {
        const data = await response.json();
        throw new Error(data.error);
    }
}
