import { API_URL } from '../constants';
import axios from 'axios';
export const signupRequest = async (username, password) => {
    const response = await axios.post(`${API_URL}/signup`, {
        username,
        password,
    });
    if (response.ok) {
        return true
    } else {
        const data = await response.json();
        throw new Error(data.error);
    }
}
