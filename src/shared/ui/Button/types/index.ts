export interface IButton {
  name: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}
