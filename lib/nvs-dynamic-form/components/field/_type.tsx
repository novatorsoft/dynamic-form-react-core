import { FieldBase } from "../../../types";

export interface IFormElement {
  [key: string]: {
    component: React.FC<any>;
    class: typeof FieldBase<any>;
  };
}

export interface IField {
  field: FieldBase<unknown>;
  formElements: IFormElement;
}
