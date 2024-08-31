import React, { FC } from "react";

import { FieldArray as FormikFieldArray, useField } from "formik";
import { ArrayField, FieldBase, GroupFields } from "../../../types";
import { createFieldItemClass } from "../baseField";
import { IFieldArray } from "./";
import { IFormElement } from "../field";

export const FieldArray = ({
  formElements,
  buttonComponent: ButtonComponent,
  field: {
    fieldType,
    screenSize = 12,
    onBlur,
    onChange,
    properties,
    addButton,
    removeButton,
    ...fieldProps
  },
}: IFieldArray) => {
  const [formikField] = useField({
    id: fieldProps.id,
    name: fieldProps.id,
  });

  const renderFieldArrayItems = (
    items: Array<any>,
    remove: (index: number) => void,
    push: (obj: any) => void,
  ) => (
    <div>
      {items.map((_, index) => (
        <div
          style={{ gap: 8, display: "flex", flexDirection: "row", marginBottom: 12 }}
          key={index}
        >
          {formElements &&
            (fieldProps as ArrayField)?.fields?.map(
              (field: FieldBase<unknown> | GroupFields) => {
                return renderField(field, index, formikField, formElements);
              },
            )}
          <ButtonComponent
            style={removeButton.style ? removeButton.style : {}}
            type="button"
            {...removeButton}
            onClick={() => remove(index)}
          >
            {removeButton.label}
          </ButtonComponent>
        </div>
      ))}
      <ButtonComponent
        style={addButton.style ? addButton.style : { float: "left" }}
        type="button"
        {...addButton}
        onClick={() => addNewFieldItem(push)}
      >
        {addButton.label}
      </ButtonComponent>
    </div>
  );

  const addNewFieldItem = (push: (obj: any) => void) => {
    const newItem: { [key: string]: any } = properties.reduce(
      (acc: { [key: string]: any }, property: string) => {
        if (property.includes(".")) {
          const [parent, child] = property.split(".");
          acc[parent] = acc[parent] || {};
          acc[parent][child] = "";
        } else {
          acc[property] = "";
        }
        return acc;
      },
      {},
    );

    push(newItem);
  };

  const renderFieldComponent = (
    field: FieldBase<unknown>,
    index: number,
    formikField: any,
    formElements: IFormElement,
    parentGroupId?: string,
  ): JSX.Element | null => {
    const FieldComponent: FC<any> =
      formElements[field?.fieldType as string]?.component;
    const fieldName = parentGroupId
      ? `${formikField.name}.${index}.${parentGroupId}.${field.id}`
      : `${formikField.name}.${index}.${field.id}`;
    const fieldValue = parentGroupId
      ? formikField.value[index][parentGroupId as string][field.id]
      : formikField.value[index][field.id];

    return FieldComponent ? (
      <FieldComponent
        {...field}
        {...formikField}
        key={`${index}.${field.id}`}
        id={`${formikField.name}.${index}.${field.id}`}
        name={fieldName}
        value={fieldValue}
      />
    ) : null;
  };

  const renderGroupFieldComponent = (
    groupField: GroupFields,
    index: number,
    formikField: any,
    formElements: IFormElement,
  ) => {
    return (
      <div key={groupField.id} className="df-group-field">
        {groupField.fields?.map((field) => {
          return renderFieldComponent(
            field,
            index,
            formikField,
            formElements,
            groupField.id,
          );
        })}
      </div>
    );
  };

  const renderField = (
    field: FieldBase<unknown> | GroupFields,
    index: number,
    formikField: any,
    formElements: IFormElement,
  ): JSX.Element | null => {
    if (!(field instanceof GroupFields)) {
      return renderFieldComponent(field, index, formikField, formElements);
    } else {
      return renderGroupFieldComponent(field, index, formikField, formElements);
    }
  };

  const renderFieldArray = () => (
    <div key={fieldProps.id} className={createFieldItemClass(screenSize)}>
      <FormikFieldArray name={formikField.name}>
        {({ push, remove, form }) => {
          const items = form.values[formikField.name] || [];
          return renderFieldArrayItems(items, remove, push);
        }}
      </FormikFieldArray>
    </div>
  );

  return renderFieldArray();
};
