import {
  ArrayField,
  ArrayFieldAddButton,
  ArrayFieldRemoveButton,
  FieldBase,
  GroupField,
  ISubmitButtonDefaultOptions,
  LabelOptions,
} from "../types";

import { IField } from "./components/field";

export type FieldType = FieldBase<any> | GroupField | ArrayField<any>;

export interface INvsDynamicForm extends Omit<IField, "field"> {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  fields: Array<FieldType>;
  formClass?: string;
  container?: React.FC<any>;
  containerOptions?: { [key: string]: any };
  containerVisible?: boolean;
  useContainersOutsideGroup?: boolean;
  useGroupContainer?: boolean;
  buttonComponent: React.FC<any>;
  submitButtonDefaultOptions: ISubmitButtonDefaultOptions;
  submitButtonOptions?: { [key: string]: any };
  submitButtonVisible?: boolean;
  submitButtonLabel?: string;
  submitButtonPosition?: "left" | "center" | "right";
  submitButtonIsFullWidth?: boolean;
  submitButtonContainerClass?: string;
  addButtonDefaultOptions?: ArrayFieldAddButton;
  removeButtonDefaultOptions?: ArrayFieldRemoveButton;
  labelDefaultOptions?: LabelOptions;
}
