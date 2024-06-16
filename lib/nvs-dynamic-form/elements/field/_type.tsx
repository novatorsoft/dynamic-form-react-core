import { FieldBase } from "../../../types";

export interface IField {
  field: FieldBase<unknown>;
  formElements: {
    [key: string]: {
      component: React.FC<any>;
      class: typeof FieldBase<any>;
    };
  };
}
