export type RHFInputProps = {
  name: string;
  title?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  onChange?: (value: string) => void;
  prefix?: React.ReactNode;
  maxWidth?: string;
};