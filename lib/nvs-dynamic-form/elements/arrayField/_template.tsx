import { FieldArray } from "formik";
import { GenerateFormContentUtils } from "../../services/generateFormContentUtils";
import { IArrayField } from "./_type";
import React from "react";

export const ArrayField: React.FC<IArrayField> = ({
  field: arrayField,
  formElements,
  containerComponent,
  containerVisible,
  useContainersOutsideGroup,
  useGroupContainer,
  buttonComponent: ButtonComponent,
}) => {
  const generateFormContentUtils = new GenerateFormContentUtils({
    containerComponent,
    formElements,
    useContainersOutsideGroup,
    useGroupContainer,
    containerVisible: containerVisible,
    fields: arrayField.fields,
  });

  const createArrayItem = (name: string, index: number) => {
    return arrayField.fields.map((field) => ({
      ...field,
      id: `${name}[${index}].${field.id}`,
    }));
  };

  const getDefaultItem = () => {
    return arrayField.fields.reduce((acc: { [key: string]: any }, field) => {
      acc[field.id] = field.defaultValue;
      return acc;
    }, {});
  };

  const createArrayFields = (index: number) => {
    return (
      <div className="df-array-field-content">
        <div className="nvs-container-fluid">
          <div className="nvs-row">
            {generateFormContentUtils.createFormElements(
              createArrayItem(arrayField.id, index)
            )}
          </div>
        </div>
      </div>
    );
  };

  const createRemoveButton = (onRemoveItem: Function) => {
    return (
      <div className="nvs-col-12">
        <ButtonComponent
          onClick={() => {
            onRemoveItem();
          }}
          type="button"
        >
          {arrayField.removeButtonOptions?.label}
        </ButtonComponent>
      </div>
    );
  };

  const createArrayItemRemoveButton = (onRemoveItem: Function) => {
    return (
      <div className="df-array-field-remove-button">
        {generateFormContentUtils.createContentContainer(
          createRemoveButton(onRemoveItem)
        )}
      </div>
    );
  };

  const createFieldArrayContent = (
    onRemoveItem: (index: number) => void,
    index: number
  ) => {
    return (
      <div
        className={`df-array-field remove-button-${arrayField.removeButtonOptions?.position}`}
        key={index}
      >
        {createArrayFields(index)}
        {createArrayItemRemoveButton(() => onRemoveItem(index))}
      </div>
    );
  };

  const createAddButton = (onAddItem: Function) => {
    return (
      <div className="df-array-field-add-button">
        <ButtonComponent
          onClick={() => onAddItem(getDefaultItem())}
          type="button"
        >
          {arrayField.addButtonOptions?.label}
        </ButtonComponent>
      </div>
    );
  };

  const createArrayItemAddButton = (onAddItem: Function) => {
    return generateFormContentUtils.createContentContainer(
      createAddButton(onAddItem)
    );
  };

  return (
    <FieldArray name={arrayField.id}>
      {({ push, remove, form }) => (
        <>
          {form.values[arrayField.id]?.map((_: any, index: number) =>
            createFieldArrayContent(remove, index)
          )}
          {createArrayItemAddButton(push)}
        </>
      )}
    </FieldArray>
  );
};
