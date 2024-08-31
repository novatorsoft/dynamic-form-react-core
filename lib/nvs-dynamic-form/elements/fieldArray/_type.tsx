import { IField } from "../field";
import { ArrayField } from "../../../types";

export interface IFieldArray extends IField {
  field: ArrayField;
  buttonComponent: React.FC<any>;
}
