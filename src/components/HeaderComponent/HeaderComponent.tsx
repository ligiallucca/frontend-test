import styled from "styled-components";
import Logo from "../../assets/LogoTeddy.png";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../Navigation/Navigation";

const StyledHeader = styled.header`
  width: 100vw;
  display: flex;
  position: fixed;
  padding: 24px 120px;
  align-items: center;
  justify-content: space-between;
  backgroud-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 2px 0px ${({ theme }) => theme.colors.blackShadow};
`;

const LogoImage = styled.img`
  width: 100px;
  height: auto;
`;

const UserGreeting = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
  font-family: "Inter", sans-serif;
  & > .userName {
    font-weight: 700;
    text-transform: capitalize;
  }
`;

const HeaderComponent = () => {
  const { userName } = useAuth();
  return (
    <StyledHeader>
      <LogoImage src={Logo} alt="Logo Teddy" />
      <Navigation />
      <UserGreeting>
        Olá, <span className="userName">{userName}!</span>
      </UserGreeting>
    </StyledHeader>
  );
};

export default HeaderComponent;
