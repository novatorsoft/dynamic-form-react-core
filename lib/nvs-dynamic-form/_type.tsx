import { ArrayField, FieldBase, GroupFields } from "../types";

import { IField } from "./elements/field";
import { ISubmitButton } from "./elements/submit-button";
import { IFieldArray } from "./elements/fieldArray";

export type FieldType = FieldBase<any> | GroupFields | ArrayField;

export interface INvsDynamicForm
  extends ISubmitButton,
    Omit<IField | IFieldArray, "field"> {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  fields: Array<FieldType>;
  formClass?: string;
  container?: React.FC<any>;
  containerOptions?: { [key: string]: any };
  containerVisible?: boolean;
  useContainersOutsideGroup?: boolean;
  useGroupContainer?: boolean;
}
