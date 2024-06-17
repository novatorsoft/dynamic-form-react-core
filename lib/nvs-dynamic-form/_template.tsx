import "nvs-flexgrid";
import "./_style.css";

import * as Yup from "yup";

import { DynamicObject, FieldBase } from "../types";
import { Form, FormikProvider, useFormik } from "formik";
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

  const createFormElements = () => {
    return fields.map((field: FieldBase<any>) => (
      <Field key={field.id} formElements={formElements} field={field} />
    ));
  };

  const createForm = () => (
    <Form className={`nvs-container-fluid${formClass ? ` ${formClass}` : ""}`}>
      <div className="nvs-row">{createFormElements()}</div>
      <SubmitButton
        submitButton={submitButton}
        submitButtonVisible={submitButtonVisible}
        submitButtonLabel={submitButtonLabel}
        submitButtonIsFullWidth={submitButtonIsFullWidth}
        submitButtonPosition={submitButtonPosition}
      />
    </Form>
  );

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      onSubmit && (await onSubmit(values));
    },
  });

  return <FormikProvider value={formik}>{createForm()}</FormikProvider>;
};
