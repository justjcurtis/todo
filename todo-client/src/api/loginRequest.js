import { API_URL } from '../constants';
export const loginRequest = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
        return data;
    }
    throw new Error(data.error);
}
