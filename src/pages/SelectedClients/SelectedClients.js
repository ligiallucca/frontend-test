import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { MdRemove } from "react-icons/md";
import styled, { useTheme } from "styled-components";
import { useSelectedClients } from "../../context/SelectedClientsContext";
import CardComponent from "../../components/CardComponent/CardComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import IconButtonComponent from "../../components/IconButtonComponent/IconButtonComponent";
import ButtonOutlinedComponent from "../../components/ButtonOutlinedComponent/ButtonOutlinedComponent";
const Container = styled.main `
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100vw;
  max-width: 1400px;
  padding: 140px 24px 24px 24px;
  margin: 0 auto;
`;
const PageTitle = styled.h2 `
  font-family: "Inter", sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
`;
const ClientListContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: start;
`;
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
const ButtonContainer = styled.div `
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: end;
`;
const MessageContainer = styled.div `
  gap: 32px;
  display: flex;
  margin: 0 auto;
  max-width: 400px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 140px 24px 24px 24px;
`;
const NoClientsMessage = styled.h3 `
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
`;
const SelectedClients = () => {
    const { selectedClients, removeClient, clearClients } = useSelectedClients();
    const theme = useTheme();
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsx(HeaderComponent, {}), selectedClients.length > 0 ? (_jsxs(Container, { children: [_jsx(PageTitle, { children: "Clientes Selecionados" }), _jsx(ClientListContainer, { children: selectedClients.map((client) => (_jsx(CardComponent, { content: _jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [_jsxs(ClientDataContainer, { children: [_jsx(ClientName, { children: client.name }), _jsxs(ClientInfo, { children: ["Sal\u00E1rio: R$", client.salary.toLocaleString("pt-BR", {
                                                        minimumFractionDigits: 2,
                                                    })] }), _jsxs(ClientInfo, { children: ["Empresa: R$", client.companyValuation.toLocaleString("pt-BR", {
                                                        minimumFractionDigits: 2,
                                                    })] })] }), _jsx(ButtonContainer, { children: _jsx(IconButtonComponent, { icon: _jsx(MdRemove, {}), onClick: () => removeClient(client.id), color: theme.colors.red }) })] }) }, client.id))) }), _jsx("div", { style: { maxWidth: "1190px", marginTop: "16px" }, children: _jsx(ButtonOutlinedComponent, { text: "Limpar clientes selecionados", onClick: clearClients }) })] })) : (_jsxs(MessageContainer, { children: [_jsx(NoClientsMessage, { children: "N\u00E3o h\u00E1 clientes selecionados" }), _jsx(ButtonOutlinedComponent, { text: "Voltar para clientes", onClick: () => navigate("/clients") })] }))] }));
};
export default SelectedClients;
