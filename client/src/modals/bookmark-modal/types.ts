import type { ModalWrapperProps } from 'wrappers/modal-wrapper/types';

export interface BookmarkModalProps extends Pick<ModalWrapperProps, 'onClose' | 'open'> {
   title: string;
   onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   link: string;
   onLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   description?: string;
   onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   onSubmit: () => void;
   loading?: boolean;
}
