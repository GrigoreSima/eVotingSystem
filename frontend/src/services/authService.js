import axios from 'axios';

const API_URL = 'http://localhost:8080/citizen';

export const loginCitizen = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        return response.data; // Returnează CitizenDTO
    } catch (error) {
        throw error.response?.data || "Login failed. Please check your credentials.";
    }
};

export const getSystemPublicKey = async () => {
    const response = await axios.get(`${API_URL}/public_key`);
    return response.data; // RSA 2048 bits
};