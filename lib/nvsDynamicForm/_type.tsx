import { FieldBase } from "../types";

export interface INvsDynamicForm {
  onSubmit: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  formElements: {
    [key: string]: {
      component: React.FC<any>;
      class: typeof FieldBase<any>;
    };
  };
  fields: Array<FieldBase<unknown>>;
}
