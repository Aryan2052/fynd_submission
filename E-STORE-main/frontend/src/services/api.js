import axios from 'axios';

const API_URL = 'https://fynd-submission.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default api; 