import axios from "axios";
import { ClientsResponse } from "./clientsService.types";

const API_BASE_URL = "/api";

// page: number = 1,
// limit: number = 30
export const getClients = async (
  limit: number = 30
): Promise<ClientsResponse> => {
  const response = await axios.get<ClientsResponse>(
    `${API_BASE_URL}/users?page=1&limit=${limit}`
  );
  return response.data;
};
