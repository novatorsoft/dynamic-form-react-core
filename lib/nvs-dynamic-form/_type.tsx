import { FieldBase, GroupFields } from "../types";

import { IField } from "./elements/field";
import { ISubmitButton } from "./elements/submit-button/_type";

export type FieldType = FieldBase<any> | GroupFields;

export interface INvsDynamicForm extends ISubmitButton, Omit<IField, "field"> {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  fields: Array<FieldType>;
  formClass?: string;
}
