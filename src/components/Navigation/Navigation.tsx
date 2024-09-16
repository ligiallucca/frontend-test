import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../../context/AuthContext";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLinks = styled.div`
  gap: 32px;
  display: flex;
  align-items: center;
`;

const activeStyle = css`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
`;

const NavLink = styled(Link)<{ isActive?: boolean }>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1rem;
  ${({ isActive }) => isActive && activeStyle};
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  margin-left: 32px;
`;

const Navigation = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <Nav>
      <NavLinks>
        <NavLink to="/clients" isActive={location.pathname === "/clients"}>
          Clientes
        </NavLink>
        <NavLink
          to="/selected-clients"
          isActive={location.pathname === "/selected-clients"}
        >
          Clientes Selecionados
        </NavLink>
      </NavLinks>
      <LogoutButton onClick={logout}>Sair</LogoutButton>
    </Nav>
  );
};

export default Navigation;
