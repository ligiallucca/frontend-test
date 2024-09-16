import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAuth } from "./../../context/AuthContext";

import InputComponent from "./../../components/InputComponent/InputComponent";
import ButtonComponent from "./../../components/ButtonComponent/ButtonComponent";

const StyledForm = styled.form`
  gap: 20px;
  width: 100%;
  padding: 24px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  max-width: 82vw;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

const StyledTitle = styled.h2`
  margin: 0;
  font-weight: 400;
  font-size: 2.25rem;
  text-align: center;
  font-family: "Inter", sans-serif;
  color: ${({ theme }) => theme.colors.black};
`;

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsInputValid(value.trim() !== "");
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInputValid) {
      login(inputValue);
      navigate("/clients");
    }
  };

  return (
    <StyledForm>
      <StyledTitle>Olá, seja bem-vindo!</StyledTitle>
      <InputComponent
        name="userName"
        placeholder="Digite seu nome"
        required
        value={inputValue}
        onChange={handleInputChange}
        errorMessage="Nome é obrigatório"
      />
      <ButtonComponent
        text="Entrar"
        onClick={handleClick}
        disabled={!isInputValid}
      />
    </StyledForm>
  );
};

export default Login;
