import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/LogoTeddy.png";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../Navigation/Navigation";
import { MdMenu } from "react-icons/md";
const StyledHeader = styled.header `
  width: 100vw;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  padding: 24px 120px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 2px 0px ${({ theme }) => theme.colors.blackShadow};
  z-index: 1000;

  @media (max-width: 1024px) {
    padding: 24px 16px;
  }
`;
const LogoImage = styled.img `
  width: 100px;
  height: auto;
`;
const UserGreeting = styled.p `
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
  font-family: "Inter", sans-serif;
  margin-bottom: 24px;

  @media (min-width: 1024px) {
    margin-bottom: 0;
  }

  & > .userName {
    font-weight: 700;
    text-transform: capitalize;
  }
`;
const HeaderContainer = styled.div `
  display: none;

  @media (min-width: 1024px) {
    width: 50vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const MenuIcon = styled.div `
  display: none;

  @media (max-width: 1024px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
  }
`;
const DropdownMenu = styled.div `
  position: absolute;
  top: 80px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 2px 0px ${({ theme }) => theme.colors.blackShadow};
  padding: 16px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  @media (min-width: 1024px) {
    display: none;
  }
`;
const HeaderComponent = () => {
    const { userName } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (_jsxs(StyledHeader, { children: [_jsx(LogoImage, { src: Logo, alt: "Logo Teddy" }), _jsx(MenuIcon, { onClick: () => setIsMenuOpen(!isMenuOpen), children: _jsx(MdMenu, {}) }), _jsxs(DropdownMenu, { isOpen: isMenuOpen, children: [_jsxs(UserGreeting, { children: ["Ol\u00E1, ", _jsxs("span", { className: "userName", children: [userName, "!"] })] }), _jsx(Navigation, {})] }), _jsxs(HeaderContainer, { children: [_jsx(Navigation, {}), _jsxs(UserGreeting, { children: ["Ol\u00E1, ", _jsxs("span", { className: "userName", children: [userName, "!"] })] })] })] }));
};
export default HeaderComponent;
