import * as lodash from "lodash";

import {
  ArrayFieldAddButton,
  ArrayFieldRemoveButton,
  LabelOptions,
} from "../../../types";
import { FieldArray, FormikProps } from "formik";
import React, { useState } from "react";

import { GenerateFormContentUtils } from "../../services/generateFormContentUtils";
import { IArrayField } from "./_type";
import { List } from "../list/_template";

export const ArrayField: React.FC<IArrayField> = ({
  field: arrayField,
  formElements,
  containerComponent,
  containerVisible,
  useContainersOutsideGroup,
  useGroupContainer,
  buttonComponent: ButtonComponent,
  addButtonDefaultOptions,
  removeButtonDefaultOptions,
  labelDefaultOptions,
}: IArrayField) => {
  const [addButtonOptions] = useState(
    new ArrayFieldAddButton(
      lodash.merge(
        addButtonDefaultOptions ?? {},
        arrayField.addButtonOptions ?? {}
      )
    )
  );
  const [removeButtonOptions] = useState(
    new ArrayFieldRemoveButton(
      lodash.merge(
        removeButtonDefaultOptions ?? {},
        arrayField.removeButtonOptions ?? {}
      )
    )
  );
  const [labelOptions] = useState(
    new LabelOptions(
      lodash.merge(labelDefaultOptions ?? {}, arrayField.labelOptions ?? {})
    )
  );
  const generateFormContentUtils = new GenerateFormContentUtils({
    containerComponent,
    formElements,
    useContainersOutsideGroup,
    useGroupContainer,
    containerVisible: containerVisible,
    fields: arrayField.fields,
    fieldArrayAddButtonDefaultOptions: addButtonDefaultOptions,
    fieldArrayRemoveButtonDefaultOptions: removeButtonDefaultOptions,
  });

  const createArrayItem = (name: string, index: number) => {
    return arrayField.fields.map((field) => {
      field.id = `${name}[${index}].${field.id}`;
      return field;
    });
  };

  const getDefaultItem = () => {
    return arrayField.fields.reduce((acc: { [key: string]: any }, field) => {
      if ("defaultValue" in field) acc[field.id] = field.defaultValue;
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
          {...removeButtonOptions.options}
        >
          {removeButtonOptions.label}
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

  const createFieldArrayContent = (onRemoveItem: Function, index: number) => {
    return (
      <div
        className={`df-array-field remove-button-${removeButtonOptions.position}`}
        key={index}
      >
        {createArrayFields(index)}
        {removeButtonOptions.visible &&
          createArrayItemRemoveButton(() => onRemoveItem(index))}
      </div>
    );
  };

  const createAddButton = (onAddItem: Function) => {
    return (
      <div className="df-array-field-add-button">
        <ButtonComponent
          onClick={() => onAddItem(getDefaultItem())}
          type="button"
          {...addButtonOptions.options}
        >
          {addButtonOptions.label}
        </ButtonComponent>
      </div>
    );
  };

  const createArrayItemAddButton = (onAddItem: Function) => {
    return generateFormContentUtils.createContentContainer(
      createAddButton(onAddItem)
    );
  };

  const createArrayFieldLabel = () => {
    return generateFormContentUtils.createContentContainer(
      <div className="nvs-col-12">
        <label className={`df-array-field-label ${labelOptions.class}`}>
          {arrayField.label}
        </label>
      </div>
    );
  };

  const checkFieldArrayMaxSize = (length: number) => {
    const maxSize = arrayField
      .validate!.describe()
      .tests.find((test) => test.name === "max")?.params!.max as number;

    return !(maxSize && length == maxSize);
  };

  const getArrayFieldErrorMessage = (
    form: FormikProps<any>
  ): string | undefined => {
    let error = form.errors[arrayField.id];
    if (lodash.isArray(error)) error = error.at(0);
    if (!lodash.isString(error)) error = undefined;
    return error;
  };

  const createErrorList = (form: FormikProps<any>) => {
    const error = getArrayFieldErrorMessage(form);
    return error && <List items={[error]} />;
  };

  return (
    <FieldArray name={arrayField.id}>
      {({ push, remove, form }) => (
        <>
          {arrayField.label && createArrayFieldLabel()}
          {form.values[arrayField.id]?.map((_: any, index: number) =>
            createFieldArrayContent(remove, index)
          )}
          {checkFieldArrayMaxSize(form.values[arrayField.id].length) &&
            createArrayItemAddButton(push)}
          {createErrorList(form)}
        </>
      )}
    </FieldArray>
  );
};
