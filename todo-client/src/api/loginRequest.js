import { API_URL } from '../constants';
import axios from 'axios';
export const loginRequest = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
    });
    if (response.status == 200) return response.data;
    throw new Error(response.error);
}
