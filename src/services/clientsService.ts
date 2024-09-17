import axios from "axios";
import {
  ClientCreateData,
  ClientUpdateData,
  ClientsResponse,
} from "./clientsService.types";

const API_BASE_URL = "/api";

export const getClients = async (
  page: number,
  limit: number
): Promise<ClientsResponse> => {
  const response = await axios.get<ClientsResponse>(
    `${API_BASE_URL}/users?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const createClient = async (clientData: ClientCreateData) => {
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
  clientData: ClientUpdateData
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

export const deleteClient = async (clientId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${clientId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar cliente com ID ${clientId}:`, error);
    throw error;
  }
};
