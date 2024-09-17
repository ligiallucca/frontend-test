import axios from "axios";
const API_BASE_URL = "/api";
export const getClients = async (page, limit) => {
    const response = await axios.get(`${API_BASE_URL}/users?page=${page}&limit=${limit}`);
    return response.data;
};
export const createClient = async (clientData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, clientData);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao criar cliente:", error);
        throw error;
    }
};
export const updateClient = async (clientId, clientData) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/${clientId}`, clientData);
        return response.data;
    }
    catch (error) {
        console.error(`Erro ao atualizar cliente com ID ${clientId}:`, error);
        throw error;
    }
};
export const deleteClient = async (clientId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${clientId}`);
        return response.data;
    }
    catch (error) {
        console.error(`Erro ao deletar cliente com ID ${clientId}:`, error);
        throw error;
    }
};
