export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
   type?: React.HTMLInputTypeAttribute;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   resize?: boolean;
}
