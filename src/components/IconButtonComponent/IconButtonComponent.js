import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
const IconButtonWrapper = styled.button `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg,
  .icon {
    color: ${({ color, theme }) => color || theme.colors.black};
    font-size: 20px;
    width: 20px;
    height: 20px;
  }
`;
const IconButton = ({ icon, onClick, color }) => {
    return (_jsx(IconButtonWrapper, { onClick: onClick, color: color, icon: icon, children: icon }));
};
export default IconButton;
