import {
  ArrayField,
  FieldBase,
  GroupField,
  ISubmitButtonDefaultOptions,
} from "../types";

import { IButton } from "./elements/button/_type";
import { IField } from "./elements/field";

export type FieldType = FieldBase<any> | GroupField | ArrayField<any>;

export interface INvsDynamicForm extends IButton, Omit<IField, "field"> {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  fields: Array<FieldType>;
  formClass?: string;
  container?: React.FC<any>;
  containerOptions?: { [key: string]: any };
  containerVisible?: boolean;
  useContainersOutsideGroup?: boolean;
  useGroupContainer?: boolean;
  submitButtonDefaultOptions: ISubmitButtonDefaultOptions;
  submitButtonVisible?: boolean;
  submitButtonLabel?: string;
  submitButtonPosition?: "left" | "center" | "right";
  submitButtonIsFullWidth?: boolean;
  submitButtonContainerClass?: string;
}
