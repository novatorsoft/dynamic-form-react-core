import React from "react";

import { FieldArray as FormikFieldArray, useField } from "formik";
import { ArrayField } from "../../../types";
import { createFieldItemClass } from "../baseField";
import { IFieldArray } from "./_type";

export const FieldArray = ({
  formElements,
  buttonComponent: ButtonComponent,
  field: {
    fieldType,
    screenSize = 12,
    onBlur,
    onChange,
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
          style={{ display: "flex", flexDirection: "row", marginBottom: 12 }}
          key={index}
        >
          {formElements &&
            (fieldProps as ArrayField)?.fields?.map((field) => {
              const FieldComponent =
                formElements[field?.fieldType as string]?.component;
              return (
                <FieldComponent
                  {...field}
                  {...formikField}
                  key={`${index}.${field.id}`}
                  id={`${formikField.name}.${index}.${field.id}`}
                  name={`${formikField.name}.${index}.${field.id}`}
                  value={formikField.value[index][field.id]}
                />
              );
            })}
          <ButtonComponent
            style={removeButton.style ? removeButton.style : { marginLeft: 10 }}
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
        onClick={() => push({ name: "", value: "" })}
      >
        {addButton.label}
      </ButtonComponent>
    </div>
  );

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
