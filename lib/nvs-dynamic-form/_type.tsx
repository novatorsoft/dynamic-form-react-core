import { FieldBase } from "../types";
import { ISubmitButton } from "./elements/submit-button/_type";

export interface INvsDynamicForm extends ISubmitButton {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  formElements: {
    [key: string]: {
      component: React.FC<any>;
      class: typeof FieldBase<any>;
    };
  };
  fields: Array<FieldBase<unknown>>;
  formClass?: string;
}
