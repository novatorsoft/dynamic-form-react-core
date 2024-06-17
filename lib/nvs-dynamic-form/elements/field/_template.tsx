import { IField } from "./_type";
import React from "react";
import { useField } from "formik";

export const Field = ({
  formElements,
  field: { fieldType, screenSize = 12, defaultValue, ...fieldProps },
}: IField) => {
  const [formikField, meta] = useField({
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

  const Field = formElements[fieldType!]?.component;
  return Field ? (
    <div key={fieldProps.id} className={createFieldItemClass()}>
      <Field
        {...fieldProps}
        {...formikField}
        error={meta.error && meta.touched ? meta.error : undefined}
      />
    </div>
  ) : (
    <></>
  );
};
