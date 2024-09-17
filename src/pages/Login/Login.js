import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./../../context/AuthContext";
import InputComponent from "./../../components/InputComponent/InputComponent";
import ButtonComponent from "./../../components/ButtonComponent/ButtonComponent";
const StyledForm = styled.form `
  gap: 20px;
  width: 100%;
  padding: 24px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: 400px;
  }
`;
const StyledTitle = styled.h2 `
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
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsInputValid(value.trim() !== "");
    };
    const handleClick = (e) => {
        e.preventDefault();
        if (isInputValid) {
            login(inputValue);
            navigate("/clients");
        }
    };
    return (_jsxs(StyledForm, { children: [_jsx(StyledTitle, { children: "Ol\u00E1, seja bem-vindo!" }), _jsx(InputComponent, { name: "userName", placeholder: "Digite seu nome", required: true, value: inputValue, onChange: handleInputChange, errorMessage: "Nome \u00E9 obrigat\u00F3rio" }), _jsx(ButtonComponent, { text: "Entrar", onClick: handleClick, disabled: !isInputValid })] }));
};
export default Login;
