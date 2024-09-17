import { ClientCreateData, ClientUpdateData, ClientsResponse } from "./clientsService.types";
export declare const getClients: (page: number, limit: number) => Promise<ClientsResponse>;
export declare const createClient: (clientData: ClientCreateData) => Promise<any>;
export declare const updateClient: (clientId: number, clientData: ClientUpdateData) => Promise<any>;
export declare const deleteClient: (clientId: number) => Promise<any>;
//# sourceMappingURL=clientsService.d.ts.map