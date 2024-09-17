import axios from "axios";
import { ClientData, ClientsResponse } from "./clientsService.types";

const API_BASE_URL = "/api";

// page: number = 1,
// limit: number = 30
export const getClients = async (limit: number): Promise<ClientsResponse> => {
  const response = await axios.get<ClientsResponse>(
    `${API_BASE_URL}/users?page=1&limit=${limit}`
  );
  return response.data;
};

export const createClient = async (clientData: ClientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, clientData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

export const updateClient = async (
  clientId: number,
  clientData: ClientData
) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${clientId}`,
      clientData
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${clientId}:`, error);
    throw error;
  }
};
