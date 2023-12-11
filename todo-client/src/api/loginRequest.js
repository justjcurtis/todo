import { API_URL } from '../constants';
import axios from 'axios';
export const loginRequest = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
    }, { withCredentials: true });
    return response.status === 200;
}
