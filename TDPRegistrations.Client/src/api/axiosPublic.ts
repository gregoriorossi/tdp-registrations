import axios from 'axios';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
const publicApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

export default publicApi;

// abilitare il cross origin

