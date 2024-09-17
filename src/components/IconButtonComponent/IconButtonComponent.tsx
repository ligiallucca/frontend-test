import styled from "styled-components";
import { IconButtonProps } from "./IconButtonComponent.type";

const IconButtonWrapper = styled.button<IconButtonProps>`
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

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, color }) => {
  return (
    <IconButtonWrapper onClick={onClick} color={color} icon={icon}>
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
