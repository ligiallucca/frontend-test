import { useNavigate } from "react-router-dom";
import { MdRemove } from "react-icons/md";
import styled, { useTheme } from "styled-components";

import { useSelectedClients } from "../../context/SelectedClientsContext";

import CardComponent from "../../components/CardComponent/CardComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import IconButtonComponent from "../../components/IconButtonComponent/IconButtonComponent";
import ButtonOutlinedComponent from "../../components/ButtonOutlinedComponent/ButtonOutlinedComponent";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100vw;
  max-width: 1400px;
  padding: 140px 24px 24px 24px;
  margin: 0 auto;
`;

const PageTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
`;

const ClientListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: start;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: end;
`;

const MessageContainer = styled.div`
  gap: 32px;
  display: flex;
  margin: 0 auto;
  max-width: 400px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 140px 24px 24px 24px;
`;

const NoClientsMessage = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
`;

const SelectedClients = () => {
  const { selectedClients, removeClient, clearClients } = useSelectedClients();
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent />
      {selectedClients.length > 0 ? (
        <Container>
          <PageTitle>Clientes Selecionados</PageTitle>
          <ClientListContainer>
            {selectedClients.map((client) => (
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
                      <IconButtonComponent
                        icon={<MdRemove />}
                        onClick={() => removeClient(client.id)}
                        color={theme.colors.red}
                      />
                    </ButtonContainer>
                  </div>
                }
              />
            ))}
          </ClientListContainer>
          <div style={{ maxWidth: "1190px", marginTop: "16px" }}>
            <ButtonOutlinedComponent
              text="Limpar clientes selecionados"
              onClick={clearClients}
            />
          </div>
        </Container>
      ) : (
        <MessageContainer>
          <NoClientsMessage>Não há clientes selecionados</NoClientsMessage>
          <ButtonOutlinedComponent
            text="Voltar para clientes"
            onClick={() => navigate("/clients")}
          />
        </MessageContainer>
      )}
    </>
  );
};

export default SelectedClients;
