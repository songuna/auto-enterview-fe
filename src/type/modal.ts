export type ModalType = "email" | "schedule";

export interface ModalProps {
  type: ModalType;
  stepId: number;
  onClose: () => void;
}
