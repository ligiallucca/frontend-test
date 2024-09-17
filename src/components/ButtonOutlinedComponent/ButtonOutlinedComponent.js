import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
const StyledButton = styled.button `
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  border-radius: 4px;
  padding: 10px 20px;
  letter-spacing: 1px;
  font-size: 0.875rem;
  font-family: "Inter", sans-serif;
  transition: background-color 0.3s ease-in-out;
  color: ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
const ButtonOutlinedComponent = ({ text, onClick, disabled, }) => {
    return (_jsx(StyledButton, { id: text.toLowerCase(), onClick: onClick, disabled: disabled, children: text }));
};
export default ButtonOutlinedComponent;
