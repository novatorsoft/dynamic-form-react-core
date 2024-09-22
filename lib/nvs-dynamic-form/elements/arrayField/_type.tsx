import {
  ArrayField,
  ArrayFieldAddButton,
  ArrayFieldRemoveButton,
} from "../../../types";

import { IField } from "../field";

export interface IArrayField extends IField {
  field: ArrayField;
  buttonComponent: React.FC<any>;
  containerComponent: React.FC<any>;
  containerVisible: boolean;
  useContainersOutsideGroup: boolean;
  useGroupContainer: boolean;
  addButtonDefaultOptions?: ArrayFieldAddButton;
  removeButtonDefaultOptions?: ArrayFieldRemoveButton;
}
