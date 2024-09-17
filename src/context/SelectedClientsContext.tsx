import React, { createContext, useContext, useState, ReactNode } from "react";
import { Client } from "../services/clientsService.types";

interface SelectedClientsContextType {
  selectedClients: Client[];
  addClient: (client: Client) => void;
  removeClient: (clientId: number) => void;
  clearClients: () => void;
}

const SelectedClientsContext = createContext<
  SelectedClientsContextType | undefined
>(undefined);

export const SelectedClientsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  const addClient = (client: Client) => {
    setSelectedClients((prev) => [...prev, client]);
  };

  const removeClient = (clientId: number) => {
    setSelectedClients((prev) =>
      prev.filter((client) => client.id !== Number(clientId))
    );
  };

  const clearClients = () => {
    setSelectedClients([]);
  };

  return (
    <SelectedClientsContext.Provider
      value={{ selectedClients, addClient, removeClient, clearClients }}
    >
      {children}
    </SelectedClientsContext.Provider>
  );
};

export const useSelectedClients = () => {
  const context = useContext(SelectedClientsContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedClients must be used within a SelectedClientsProvider"
    );
  }
  return context;
};
