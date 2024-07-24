export type ModalType = "email" | "schedule";

export interface ModalProps {
  type: ModalType;
  step: number;
  onClose: () => void;
}
