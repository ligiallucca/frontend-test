export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientsResponse {
  clients: Client[];
  currentPage: number;
  totalPages: number;
}

export interface ClientCreateData {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ClientUpdateData {
  name: string;
  salary: number;
  companyValuation: number;
}
