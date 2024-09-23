import { GenerateFormContentUtils } from "../../services/generateFormContentUtils";
import { IGroupField } from "./_type";

export const GroupField = ({
  field: groupField,
  formElements,
  containerComponent,
  containerVisible,
  useContainersOutsideGroup,
  useGroupContainer,
}: IGroupField) => {
  const generateFormContentUtils = new GenerateFormContentUtils({
    containerComponent,
    formElements,
    useContainersOutsideGroup,
    useGroupContainer,
    containerOptions: groupField.containerOptions,
    containerVisible: containerVisible && groupField.containerVisible!,
    fields: groupField.fields.map((field) => {
      field.id = `${groupField.id}.${field.id}`;
      return field;
    }),
  });

  const isContainerVisible = () => {
    return groupField.containerVisible && useGroupContainer && containerVisible;
  };

  return isContainerVisible()
    ? generateFormContentUtils.createFormContent()
    : generateFormContentUtils.createFormElements(groupField.fields);
};
