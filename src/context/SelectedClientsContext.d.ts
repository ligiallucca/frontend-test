import React, { ReactNode } from "react";
import { Client } from "../services/clientsService.types";
interface SelectedClientsContextType {
    selectedClients: Client[];
    addClient: (client: Client) => void;
    removeClient: (clientId: number) => void;
    clearClients: () => void;
}
export declare const SelectedClientsProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useSelectedClients: () => SelectedClientsContextType;
export {};
//# sourceMappingURL=SelectedClientsContext.d.ts.map