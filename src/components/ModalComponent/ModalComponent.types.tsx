export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  content: React.ReactNode;
}
