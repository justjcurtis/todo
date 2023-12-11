import { API_URL } from '../constants';
import axios from 'axios';
export const logoutRequest = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.status === 200;
}
