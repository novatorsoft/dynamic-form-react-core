import "nvs-flexgrid";
import "./_style.css";

import * as Yup from "yup";

import {
  DynamicObject,
  FieldBase,
  IScreenSize,
  ScreenSizeType,
} from "../types";
import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React, { useEffect, useState } from "react";

import { INvsDynamicForm } from "./_type";
import { SubmitButton } from "./elements/submit-button";

export const NvsDynamicForm = ({
  onSubmit,
  formElements = {},
  fields = [],
  formClass,
  submitButton,
  submitButtonVisible,
  submitButtonLabel,
  submitButtonIsFullWidth,
  submitButtonPosition,
}: INvsDynamicForm) => {
  const getDefaultValues = (): DynamicObject => {
    return fields.reduce((acc: DynamicObject, field: FieldBase<any>) => {
      acc[field.id] = field.defaultValue;
      return acc;
    }, {});
  };

  const getValidateSchema = () => {
    const validationSchema = fields.reduce(
      (acc: { [key: string]: Yup.AnySchema }, field) => {
        if (field?.validate) {
          acc[field.id] = field.validate;
        }
        return acc;
      },
      {}
    );
    return Yup.object(validationSchema);
  };

  const [defaultValues, setDefaultValues] = useState(getDefaultValues());
  const [validateSchema, setValidateSchema] = useState(getValidateSchema());

  useEffect(() => {
    setDefaultValues(getDefaultValues());
    setValidateSchema(getValidateSchema());
  }, [fields]);

  const createFieldItemClass = (
    screenSize: ScreenSizeType | IScreenSize
  ): Array<string> => {
    const className: Array<string> = [];
    if (typeof screenSize == "number") className.push("nvs-col-" + screenSize);
    else {
      className.push("nvs-col-md-" + screenSize?.desktop);
      if (screenSize?.tablet) className.push("nvs-col-sm-" + screenSize.tablet);
      if (screenSize?.mobile) className.push("nvs-col-xs-" + screenSize.mobile);
    }
    return className;
  };

  const createFormElement = (field: FieldBase<any>) => {
    const Field = formElements[field.fieldType!]?.component;
    return Field ? <Field {...field} /> : <></>;
  };

  const createFormElements = (
    errors: FormikErrors<DynamicObject>,
    touched: FormikTouched<DynamicObject>
  ) => {
    return fields.map((field: FieldBase<any>) => (
      <div
        key={field.id}
        className={createFieldItemClass(field.screenSize ?? 12).join(" ")}
      >
        {createFormElement({
          ...field,
          error: errors[field.id],
          touched: touched[field.id],
        })}
      </div>
    ));
  };

  const createForm = (
    errors: FormikErrors<DynamicObject>,
    touched: FormikTouched<DynamicObject>
  ) => (
    <Form className={`nvs-container-fluid${formClass ? ` ${formClass}` : ""}`}>
      <div className="nvs-row">{createFormElements(errors, touched)}</div>
      <SubmitButton
        submitButton={submitButton}
        submitButtonVisible={submitButtonVisible}
        submitButtonLabel={submitButtonLabel}
        submitButtonIsFullWidth={submitButtonIsFullWidth}
        submitButtonPosition={submitButtonPosition}
      />
    </Form>
  );

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        onSubmit && (await onSubmit(values));
      }}
    >
      {({ errors, touched }) => createForm(errors, touched)}
    </Formik>
  );
};
