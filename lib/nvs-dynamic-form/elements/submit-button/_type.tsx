import { SubmitButtonOptions } from "../../../types";

export interface ISubmitButton {
  submitButton: {
    component: React.FC<any>;
    defaultOptions: SubmitButtonOptions;
  };
  submitButtonVisible?: boolean;
  submitButtonLabel?: string;
  submitButtonPosition?: "left" | "center" | "right";
  submitButtonIsFullWidth?: boolean;
  submitButtonContainerClass?: string;
}
