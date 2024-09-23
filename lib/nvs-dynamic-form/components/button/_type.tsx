export interface IButton {
  buttonComponent: React.FC<any>;
  visible?: boolean;
  label?: string;
  position?: "left" | "center" | "right";
  isFullWidth?: boolean;
  containerClass?: string;
}
