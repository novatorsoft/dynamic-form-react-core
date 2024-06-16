import "nvs-flexgrid";
import "./_style.css";

import * as Yup from "yup";

import { DynamicObject, FieldBase } from "../types";
import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React, { useEffect, useState } from "react";

import { Field } from "./elements/field";
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

  const createFormElements = (
    errors: FormikErrors<DynamicObject>,
    touched: FormikTouched<DynamicObject>
  ) => {
    return fields.map((field: FieldBase<any>) => (
      <Field formElements={formElements} field={field} />
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
