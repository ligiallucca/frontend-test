import React, { useState } from "react";
import styled from "styled-components";
import { InputProps, StyledInputProps } from "./InputComponent.types";

const StyledInput = styled.input<StyledInputProps>`
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

const ErrorMessage = styled.span`
  font-family: "Inter", sans-serif;
  margin-top: 4px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.red};
`;

const InputComponent: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  required = false,
  errorMessage = "Este campo é obrigatório",
  value = "",
  onChange,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (required && !e.target.value.trim()) {
      setError(errorMessage);
    } else {
      setError(null);
    }
    if (onChange) onChange(e);
  };

  return (
    <div style={{ width: "100%" }}>
      <StyledInput
        id={name.toLowerCase()}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={validateInput}
        error={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default InputComponent;
