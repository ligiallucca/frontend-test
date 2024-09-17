import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { getClients, deleteClient } from "../../../services/clientsService";
import { useSelectedClients } from "../../../context/SelectedClientsContext";
import ClientForm from "./ClientForm/ClientForm";
import ClientsPerPage from "../components/ClientsPerPage";
import CardComponent from "../../../components/CardComponent/CardComponent";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import IconButton from "../../../components/IconButtonComponent/IconButtonComponent";
import ButtonOutlinedComponent from "../../../components/ButtonOutlinedComponent/ButtonOutlinedComponent";
const ClientDataContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;
const ClientName = styled.h3 `
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;
const ClientInfo = styled.p `
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  margin: 4px 0;
`;
const Container = styled.main `
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100vw;
  max-width: 1400px;
  padding: 140px 24px 24px 24px;
  margin: 0 auto;
`;
const TopPagination = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1190px;
`;
const ClientCount = styled.p `
  font-family: "Inter", sans-serif;
  font-size: 16px;
  margin: 0;

  span {
    font-weight: 700;
    margin-right: 4px;
  }
`;
const ClientListContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: start;
`;
const ButtonContainer = styled.div `
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: space-between;
`;
const SuccessMessage = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  text-align: center;
`;
const DeleteModalContent = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  text-align: center;

  & p {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;
const DeleteModalButtonContainer = styled.div `
  display: flex;
  gap: 16px;
  margin: 24px;

  & button {
    font-size: 1rem;
  }
`;
const PaginationContainer = styled.div `
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`;
const PaginationButton = styled.button `
  background: ${({ isActive, theme }) => isActive ? theme.colors.primary : "transparent"};
  color: ${({ isActive, theme }) => isActive ? theme.colors.white : theme.colors.black};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  font-family: "Inter", sans-serif;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;
const ClientsList = () => {
    const theme = useTheme();
    const { addClient } = useSelectedClients();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(undefined);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await getClients(currentPage, limit);
            setClients(response.clients);
            setTotalPages(response.totalPages);
        }
        catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchClients();
    }, [limit, currentPage]);
    const handleFormSuccess = () => {
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
            setIsModalOpen(false);
            fetchClients();
        }, 6000);
    };
    const handleEditClient = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };
    const handleDeleteClick = (clientId) => {
        setClientToDelete(clientId);
        setIsDeleteConfirmOpen(true);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const confirmDelete = async () => {
        if (clientToDelete !== null) {
            try {
                await deleteClient(clientToDelete);
                fetchClients();
            }
            catch (error) {
                console.error("Erro ao deletar cliente:", error);
            }
            finally {
                setClientToDelete(null);
                setIsDeleteConfirmOpen(false);
            }
        }
    };
    const cancelDelete = () => {
        setClientToDelete(null);
        setIsDeleteConfirmOpen(false);
    };
    return (_jsxs(Container, { children: [_jsxs(TopPagination, { children: [_jsx(ClientCount, { children: clients.length === 1 ? (_jsxs(_Fragment, { children: [_jsx("span", { children: "1" }), "cliente encontrado"] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: clients.length }), " clientes encontrados"] })) }), _jsx(ClientsPerPage, { value: limit, onChange: (e) => setLimit(Number(e.target.value)) })] }), loading ? (_jsx("p", { children: "Carregando..." })) : (_jsxs(_Fragment, { children: [_jsx(ClientListContainer, { children: clients.map((client) => (_jsx(CardComponent, { content: _jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [_jsxs(ClientDataContainer, { children: [_jsx(ClientName, { children: client.name }), _jsxs(ClientInfo, { children: ["Sal\u00E1rio: R$", client.salary.toLocaleString("pt-BR", {
                                                        minimumFractionDigits: 2,
                                                    })] }), _jsxs(ClientInfo, { children: ["Empresa: R$", client.companyValuation.toLocaleString("pt-BR", {
                                                        minimumFractionDigits: 2,
                                                    })] })] }), _jsxs(ButtonContainer, { children: [_jsx(IconButton, { icon: _jsx(MdAdd, {}), onClick: () => addClient(client) }), _jsx(IconButton, { icon: _jsx(MdEdit, {}), onClick: () => handleEditClient(client) }), _jsx(IconButton, { icon: _jsx(MdDelete, {}), onClick: () => handleDeleteClick(client.id), color: theme.colors.red })] })] }) }, client.id))) }), _jsx(PaginationContainer, { children: Array.from({ length: totalPages }, (_, index) => (_jsx(PaginationButton, { isActive: currentPage === index + 1, onClick: () => handlePageChange(index + 1), children: index + 1 }, index + 1))) })] })), _jsx("div", { style: { maxWidth: "1190px", marginTop: "16px" }, children: _jsx(ButtonOutlinedComponent, { text: "Criar cliente", onClick: () => setIsModalOpen(true) }) }), _jsx(ModalComponent, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), modalTitle: selectedClient ? "Editar cliente" : "Criar cliente", content: showSuccessMessage ? (_jsx(SuccessMessage, { children: _jsx("h3", { children: selectedClient
                            ? "Cliente Editado com Sucesso!"
                            : "Cliente Criado com Sucesso!" }) })) : (_jsx(ClientForm, { onSuccess: handleFormSuccess, initialValues: selectedClient || undefined })) }), _jsx(ModalComponent, { isOpen: isDeleteConfirmOpen, onClose: cancelDelete, modalTitle: "", content: _jsxs(DeleteModalContent, { children: [_jsx("p", { children: "Voc\u00EA tem certeza que deseja excluir este cliente?" }), _jsxs(DeleteModalButtonContainer, { children: [_jsx(ButtonOutlinedComponent, { text: "Cancelar", onClick: cancelDelete }), _jsx(ButtonComponent, { text: "Confirmar", onClick: confirmDelete })] })] }) })] }));
};
export default ClientsList;
