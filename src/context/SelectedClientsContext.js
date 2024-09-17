import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const SelectedClientsContext = createContext(undefined);
export const SelectedClientsProvider = ({ children, }) => {
    const [selectedClients, setSelectedClients] = useState([]);
    const addClient = (client) => {
        setSelectedClients((prev) => [...prev, client]);
    };
    const removeClient = (clientId) => {
        setSelectedClients((prev) => prev.filter((client) => client.id !== Number(clientId)));
    };
    const clearClients = () => {
        setSelectedClients([]);
    };
    return (_jsx(SelectedClientsContext.Provider, { value: { selectedClients, addClient, removeClient, clearClients }, children: children }));
};
export const useSelectedClients = () => {
    const context = useContext(SelectedClientsContext);
    if (context === undefined) {
        throw new Error("useSelectedClients must be used within a SelectedClientsProvider");
    }
    return context;
};
