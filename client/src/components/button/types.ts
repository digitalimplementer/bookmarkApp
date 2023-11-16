export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
   variant?: 'text' | 'contained' | 'outlined';
   type?: 'button' | 'submit';
   startIcon?: React.ReactNode;
   loading?: boolean;
   textTransform?: 'capitalize';
   fullWidth?: boolean;
}
