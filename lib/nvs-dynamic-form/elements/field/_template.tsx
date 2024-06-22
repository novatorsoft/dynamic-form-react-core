import React, { ChangeEvent, FocusEvent } from "react";

import { IField } from "./_type";
import { useField } from "formik";

export const Field = ({
  formElements,
  field: { fieldType, screenSize = 12, onBlur, onChange, ...fieldProps },
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

  const onChangeHandler = (event: ChangeEvent) => {
    onChange && onChange(event);
    formikField.onChange(event);
  };

  const onBlurHandler = (event: FocusEvent) => {
    onBlur && onBlur(event);
    formikField.onBlur(event);
  };

  const Field = formElements[fieldType!]?.component;
  return Field ? (
    <div key={fieldProps.id} className={createFieldItemClass()}>
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
