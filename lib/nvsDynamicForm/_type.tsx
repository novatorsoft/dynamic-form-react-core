import { FieldBase, SubmitButtonOptions } from "../types";

export interface INvsDynamicForm {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  submitButton: {
    component: React.FC<any>;
    defaultOptions: SubmitButtonOptions;
  };
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
