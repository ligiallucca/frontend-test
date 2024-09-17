import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const Container = styled.div `
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Label = styled.label `
  font-size: 1rem;
  font-family: "Inter", sans-serif;
  color: ${({ theme }) => theme.colors.black};
`;
const Select = styled.select `
  font-size: 1rem;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
const ClientesPerPage = ({ value, onChange, }) => {
    return (_jsxs(Container, { children: [_jsx(Label, { htmlFor: "clientesPerPage", children: "Clientes por p\u00E1gina:" }), _jsx(Select, { id: "clientesPerPage", value: value, onChange: onChange, children: [...Array(100).keys()].map((num) => (_jsx("option", { value: num + 1, children: num + 1 }, num + 1))) })] }));
};
export default ClientesPerPage;
