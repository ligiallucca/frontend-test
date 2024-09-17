import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../../context/AuthContext";
const Nav = styled.nav `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const NavLinks = styled.div `
  gap: 32px;
  display: flex;
  flex-direction: column;
  align-items: start;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const activeStyle = css `
  @media (min-width: 1024px) {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;
const NavLink = styled(Link) `
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  ${({ isActive }) => isActive && activeStyle};
`;
const LogoutButton = styled.button `
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  margin-top: 32px;

  @media (min-width: 1024px) {
    margin-top: 0;
    margin-left: 32px;
  }
`;
const Navigation = () => {
    const { logout } = useAuth();
    const location = useLocation();
    return (_jsxs(Nav, { children: [_jsxs(NavLinks, { children: [_jsx(NavLink, { to: "/clients", isActive: location.pathname === "/clients", children: "Clientes" }), _jsx(NavLink, { to: "/selected-clients", isActive: location.pathname === "/selected-clients", children: "Clientes Selecionados" })] }), _jsx(LogoutButton, { onClick: logout, children: "Sair" })] }));
};
export default Navigation;
