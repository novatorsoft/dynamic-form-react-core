import { FieldBase, GroupFields } from "../../../types";

export interface IGroupField {
  field: GroupFields;
  containerComponent: React.FC<any>;
  containerVisible: boolean;
  useContainersOutsideGroup: boolean;
  useGroupContainer: boolean;
  formElements: {
    [key: string]: {
      component: React.FC<any>;
      class: typeof FieldBase<any>;
    };
  };
}
