export interface InputProps {
  name: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StyledInputProps {
  error: boolean;
}
