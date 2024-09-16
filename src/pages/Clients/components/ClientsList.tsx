import React, { useEffect, useState } from "react";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import styled, { useTheme } from "styled-components";
import { getClients } from "../../../services/clientsService";
import { Client } from "../../../services/clientsService.types";
import CardComponent from "../../../components/CardComponent/CardComponent";
import IconButton from "../../../components/IconButtonComponent/IconButtonComponent";
import ClientsPerPage from "../components/ClientsPerPage";

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
    font-weight: 700; /* Aplica o peso da fonte ao número */
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

const ClientsList: React.FC = () => {
  const theme = useTheme();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(30); // Estado para o limite de clientes por página

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getClients(limit); // Passa o limite para a função
      setClients(response.clients);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [limit]); // Dependência do limite

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
                      onClick={() => console.log("Add")}
                    />
                    <IconButton
                      icon={<MdEdit />}
                      onClick={() => console.log("Edit")}
                    />
                    <IconButton
                      icon={<MdDelete />}
                      onClick={() => console.log("Delete")}
                      color={theme.colors.red}
                    />
                  </ButtonContainer>
                </div>
              }
            />
          ))}
        </ClientListContainer>
      )}
    </Container>
  );
};

export default ClientsList;
