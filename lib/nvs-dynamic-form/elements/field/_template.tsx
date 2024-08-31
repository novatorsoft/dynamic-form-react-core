import React, { ChangeEvent, FocusEvent } from "react";

import { IField } from "./_type";
import { useField } from "formik";
import { createFieldItemClass } from "../baseField";

export const Field = ({
  formElements,
  field: { fieldType, screenSize = 12, onBlur, onChange, ...fieldProps },
}: IField) => {
  const [formikField, meta, helpers] = useField({
    id: fieldProps.id,
    name: fieldProps.id,
  });

  const onChangeHandler = (event: ChangeEvent | Array<unknown>) => {
    if (Array.isArray(event)) {
      helpers.setValue(event);
      onChange && onChange(event);
    } else {
      onChange && onChange(event);
      formikField.onChange(event);
    }
  };

  const onBlurHandler = (event: FocusEvent) => {
    onBlur && onBlur(event);
    formikField.onBlur(event);
  };

  const Field = formElements[fieldType!]?.component;
  return Field ? (
    <div key={fieldProps.id} className={createFieldItemClass(screenSize)}>
      <Field
        {...fieldProps}
        {...formikField}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        error={meta.error && meta.touched ? meta.error : undefined}
      />
    </div>
  ) : (
    <></>
  );
};
