import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { getClients, deleteClient } from "../../../services/clientsService";
import { Client } from "../../../services/clientsService.types";

import { useSelectedClients } from "../../../context/SelectedClientsContext";

import ClientForm from "./ClientForm/ClientForm";
import ClientsPerPage from "../components/ClientsPerPage";
import CardComponent from "../../../components/CardComponent/CardComponent";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import IconButton from "../../../components/IconButtonComponent/IconButtonComponent";
import ButtonOutlinedComponent from "../../../components/ButtonOutlinedComponent/ButtonOutlinedComponent";

const ClientDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const ClientName = styled.h3`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const ClientInfo = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  margin: 4px 0;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100vw;
  max-width: 1400px;
  padding: 140px 24px 24px 24px;
  margin: 0 auto;
`;

const TopPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1190px;
`;

const ClientCount = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  margin: 0;

  span {
    font-weight: 700;
    margin-right: 4px;
  }
`;

const ClientListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: start;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: space-between;
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  text-align: center;
`;

const DeleteModalContent = styled.div`
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

const DeleteModalButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px;

  & button {
    font-size: 1rem;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`;

const PaginationButton = styled.button<{ isActive: boolean }>`
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : "transparent"};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.black};
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

const ClientsList: React.FC = () => {
  const theme = useTheme();
  const { addClient } = useSelectedClients();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(
    undefined
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getClients(currentPage, limit);
      setClients(response.clients);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
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

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (clientId: number) => {
    setClientToDelete(clientId);
    setIsDeleteConfirmOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const confirmDelete = async () => {
    if (clientToDelete !== null) {
      try {
        await deleteClient(clientToDelete);
        fetchClients();
      } catch (error) {
        console.error("Erro ao deletar cliente:", error);
      } finally {
        setClientToDelete(null);
        setIsDeleteConfirmOpen(false);
      }
    }
  };

  const cancelDelete = () => {
    setClientToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <Container>
      <TopPagination>
        <ClientCount>
          {clients.length === 1 ? (
            <>
              <span>1</span>cliente encontrado
            </>
          ) : (
            <>
              <span>{clients.length}</span> clientes encontrados
            </>
          )}
        </ClientCount>
        <ClientsPerPage
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />
      </TopPagination>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <ClientListContainer>
            {clients.map((client) => (
              <CardComponent
                key={client.id}
                content={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <ClientDataContainer>
                      <ClientName>{client.name}</ClientName>
                      <ClientInfo>
                        Salário: R$
                        {client.salary.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </ClientInfo>
                      <ClientInfo>
                        Empresa: R$
                        {client.companyValuation.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </ClientInfo>
                    </ClientDataContainer>
                    <ButtonContainer>
                      <IconButton
                        icon={<MdAdd />}
                        onClick={() => addClient(client)}
                      />
                      <IconButton
                        icon={<MdEdit />}
                        onClick={() => handleEditClient(client)}
                      />
                      <IconButton
                        icon={<MdDelete />}
                        onClick={() => handleDeleteClick(client.id)}
                        color={theme.colors.red}
                      />
                    </ButtonContainer>
                  </div>
                }
              />
            ))}
          </ClientListContainer>
          <PaginationContainer>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationButton
                key={index + 1}
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </PaginationContainer>
        </>
      )}
      <div style={{ maxWidth: "1190px", marginTop: "16px" }}>
        <ButtonOutlinedComponent
          text="Criar cliente"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle={selectedClient ? "Editar cliente" : "Criar cliente"}
        content={
          showSuccessMessage ? (
            <SuccessMessage>
              <h3>
                {selectedClient
                  ? "Cliente Editado com Sucesso!"
                  : "Cliente Criado com Sucesso!"}
              </h3>
            </SuccessMessage>
          ) : (
            <ClientForm
              onSuccess={handleFormSuccess}
              initialValues={selectedClient || undefined}
            />
          )
        }
      />
      <ModalComponent
        isOpen={isDeleteConfirmOpen}
        onClose={cancelDelete}
        modalTitle=""
        content={
          <DeleteModalContent>
            <p>Você tem certeza que deseja excluir este cliente?</p>
            <DeleteModalButtonContainer>
              <ButtonOutlinedComponent text="Cancelar" onClick={cancelDelete} />
              <ButtonComponent text="Confirmar" onClick={confirmDelete} />
            </DeleteModalButtonContainer>
          </DeleteModalContent>
        }
      />
    </Container>
  );
};

export default ClientsList;
