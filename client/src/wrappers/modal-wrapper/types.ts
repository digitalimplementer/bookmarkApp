export interface ModalWrapperProps {
   open: boolean;
   onClose: () => void;
   children: React.ReactNode;
   className?: string;
}
