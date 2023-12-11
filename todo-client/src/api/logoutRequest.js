import { API_URL } from '../constants';
import axios from 'axios';
export const logoutRequest = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        return response.data;
    } catch (err) {
        console.error(err.response.data.error)
        throw new Error(err.response.data.error);
    }
}
