import * as Yup from "yup";

import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React, { useEffect, useState } from "react";

import { DynamicObject } from "../types/dynamic-object";
import { FieldBase } from "../types";
import { INvsDynamicForm } from "./_type";

export const NvsDynamicForm = ({
  onSubmit,
  formElements = {},
  fields = [],
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

  const createFormElement = (field: FieldBase<any>) => {
    const Field = formElements[field.fieldType!]?.component;
    return Field ? <Field {...field} /> : <></>;
  };

  const createForm = (
    errors: FormikErrors<DynamicObject>,
    touched: FormikTouched<DynamicObject>
  ) => (
    <Form>
      {fields.map((field: FieldBase<any>) =>
        createFormElement({
          ...field,
          error: errors[field.id],
          touched: touched[field.id],
        })
      )}
      <button type="submit">Submit</button>
    </Form>
  );

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validateSchema}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      {({ errors, touched }) => createForm(errors, touched)}
    </Formik>
  );
};
