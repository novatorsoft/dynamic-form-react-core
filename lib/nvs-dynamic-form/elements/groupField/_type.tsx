import { GroupFields } from "../../../types";
import { IField } from "../field";

export interface IGroupField extends IField {
  field: GroupFields;
  containerComponent: React.FC<any>;
  containerVisible: boolean;
  useContainersOutsideGroup: boolean;
  useGroupContainer: boolean;
}
