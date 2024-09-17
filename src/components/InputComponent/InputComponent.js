import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styled from "styled-components";
const StyledInput = styled.input `
  width: 100%;
  outline: none;
  font-size: 1.2rem;
  border-radius: 4px;
  padding: 14px 20px;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
  transition: border-color 0.3s ease-in-out;
  border: 2px solid
    ${({ error, theme }) => (error ? theme.colors.red : theme.colors.gray)};

  &:focus {
    border-color: none;
  }
`;
const ErrorMessage = styled.span `
  font-family: "Inter", sans-serif;
  margin-top: 4px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.red};
`;
const InputComponent = ({ name, type = "text", placeholder, required = false, errorMessage = "Este campo é obrigatório", value = "", onChange, }) => {
    const [error, setError] = useState(null);
    const validateInput = (e) => {
        if (required && !e.target.value.trim()) {
            setError(errorMessage);
        }
        else {
            setError(null);
        }
        if (onChange)
            onChange(e);
    };
    return (_jsxs("div", { style: { width: "100%" }, children: [_jsx(StyledInput, { id: name.toLowerCase(), name: name, type: type, placeholder: placeholder, required: required, value: value, onChange: validateInput, error: !!error }), error && _jsx(ErrorMessage, { children: error })] }));
};
export default InputComponent;
