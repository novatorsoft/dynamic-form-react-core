import { FieldBase, SubmitButton } from "../types";

export interface INvsDynamicForm {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  submitButton: SubmitButton;
  formElements: {
    [key: string]: {
      component: React.FC<any>;
      class: typeof FieldBase<any>;
    };
  };
  fields: Array<FieldBase<unknown>>;
  formClass?: string;
  submitButtonVisible?: boolean;
  submitButtonLabel?: string;
  submitButtonPosition?: "left" | "center" | "right";
  submitButtonIsFullWidth?: boolean;
}
