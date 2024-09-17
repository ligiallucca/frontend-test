import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/LogoTeddy.png";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../Navigation/Navigation";
import { MdMenu } from "react-icons/md";

const StyledHeader = styled.header`
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

const LogoImage = styled.img`
  width: 100px;
  height: auto;
`;

const UserGreeting = styled.p`
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

const HeaderContainer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    width: 50vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const MenuIcon = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
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

const HeaderComponent: React.FC = () => {
  const { userName } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <LogoImage src={Logo} alt="Logo Teddy" />
      <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <MdMenu />
      </MenuIcon>
      <DropdownMenu isOpen={isMenuOpen}>
        <UserGreeting>
          Olá, <span className="userName">{userName}!</span>
        </UserGreeting>
        <Navigation />
      </DropdownMenu>
      <HeaderContainer>
        <Navigation />
        <UserGreeting>
          Olá, <span className="userName">{userName}!</span>
        </UserGreeting>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default HeaderComponent;
