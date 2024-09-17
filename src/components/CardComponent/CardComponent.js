import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
const CardContainer = styled.div `
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.colors.blackShadow};
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 285px;
  max-width: 400px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;
const CardComponent = ({ content }) => {
    return _jsx(CardContainer, { children: content });
};
export default CardComponent;
