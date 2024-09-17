import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const ModalOverlay = styled.div `
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div `
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 500px;
`;
const CloseButton = styled.button `
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};
`;
const ModalTitle = styled.h2 `
  font-size: 18px;
  margin: 0 0 20px 0;
`;
const Modal = ({ isOpen, onClose, modalTitle, content, }) => {
    return (_jsx(ModalOverlay, { isOpen: isOpen, children: _jsxs(ModalContent, { children: [_jsx(CloseButton, { onClick: onClose, children: "\u00D7" }), _jsx(ModalTitle, { children: modalTitle }), content] }) }));
};
export default Modal;
