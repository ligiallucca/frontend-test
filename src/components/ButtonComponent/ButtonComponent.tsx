import React from "react";
import styled from "styled-components";
import { ButtonProps } from "./ButtonComponent.types";

const StyledButton = styled.button`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 4px;
  padding: 14px 20px;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
  transition: background-color 0.3s ease-in-out;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkenPrimary};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton id={text.toLowerCase()} onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default ButtonComponent;
