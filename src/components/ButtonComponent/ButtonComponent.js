import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
const StyledButton = styled.button `
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
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
const ButtonComponent = ({ text, onClick, disabled = false, type = "button", }) => {
    return (_jsx(StyledButton, { id: text.toLowerCase(), onClick: onClick, disabled: disabled, type: type, children: text }));
};
export default ButtonComponent;
