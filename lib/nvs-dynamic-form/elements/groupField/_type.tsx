import { GroupField } from "../../../types";
import { IField } from "../field";

export interface IGroupField extends IField {
  field: GroupField;
  containerComponent: React.FC<any>;
  containerVisible: boolean;
  useContainersOutsideGroup: boolean;
  useGroupContainer: boolean;
}
