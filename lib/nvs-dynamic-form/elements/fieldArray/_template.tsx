import React from "react";

import { FieldArray as FormikFieldArray, useField } from "formik";
import { IField } from "../field";
import { ArrayField } from "./_type";

export const FieldArray = ({
  formElements,
  field: { fieldType, screenSize = 12, onBlur, onChange, ...fieldProps },
}: IField) => {
  const [formikField] = useField({
    id: fieldProps.id,
    name: fieldProps.id,
  });

  const createFieldItemClass = (): string => {
    const className: Array<string> = [];
    if (typeof screenSize == "number") className.push("nvs-col-" + screenSize);
    else {
      className.push("nvs-col-md-" + screenSize?.desktop);
      if (screenSize?.tablet) className.push("nvs-col-sm-" + screenSize.tablet);
      if (screenSize?.mobile) className.push("nvs-col-xs-" + screenSize.mobile);
    }
    return className.join(" ");
  };

    const renderFieldArrayItems = (
        items: Array<any>,
        remove: (index: number) => void,
        push: (obj: any) => void
    ) => (
        <div>
            {items.map((_, index) => (
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: 12}} key={index}>
                    {formElements &&
                        (fieldProps as ArrayField)?.fields?.map((field) => {
                            const FieldComponent = formElements[field?.fieldType]?.component;
                            return (
                                <FieldComponent
                                    {...field}
                                    {...formikField}
                                    key={field.id}
                                    id={`${formikField.name}.${index}.${field.id}`}
                                    name={`${formikField.name}.${index}.${field.id}`}
                                    value={formikField.value[index][field.id]}
                                />
                            );
                        })}
                    <button style={{marginLeft: 10}} type="button" onClick={() => remove(index)}>
                        Sil
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => push({})}>
                Ekle
            </button>
        </div>
    );

  const renderFieldArray = () => (
    <div key={fieldProps.id} className={createFieldItemClass()}>
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
