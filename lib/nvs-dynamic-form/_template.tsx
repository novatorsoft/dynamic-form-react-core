import "nvs-flexgrid";
import "./_style.css";

import * as Yup from "yup";

import { DynamicObject, FieldBase, GroupFields } from "../types";
import { FieldType, INvsDynamicForm } from "./_type";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { Field } from "./elements/field";
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
  const getFieldDefaultValue = (field: FieldType) => {
    return field instanceof GroupFields
      ? getDefaultValues(field.fields!)
      : field.defaultValue;
  };

  const getDefaultValues = (fields: Array<FieldType>): DynamicObject => {
    return fields.reduce((acc: DynamicObject, field: FieldType) => {
      acc[field.id] = getFieldDefaultValue(field);
      return acc;
    }, {});
  };

  const getFieldValidate = (field: FieldType) => {
    if (field instanceof GroupFields) {
      return createValidateSchema(field.fields!);
    } else if (field?.validate) {
      return field.validate;
    }
  };

  const createValidateSchema = (fields: Array<FieldType>) => {
    const validationSchema = fields.reduce(
      (acc: { [key: string]: Yup.AnySchema }, field) => {
        const validate = getFieldValidate(field);
        if (validate) acc[field.id] = validate;
        return acc;
      },
      {}
    );
    return Yup.object(validationSchema);
  };

  const [defaultValues, setDefaultValues] = useState(getDefaultValues(fields));
  const [validateSchema, setValidateSchema] = useState(
    createValidateSchema(fields)
  );

  useEffect(() => {
    setDefaultValues(getDefaultValues(fields));
    setValidateSchema(createValidateSchema(fields));
  }, [fields]);

  const createFormElement = (field: FieldBase<unknown>) => {
    return <Field key={field.id} formElements={formElements} field={field} />;
  };

  const createFormElements = (
    fields: Array<FieldType>,
    groupId?: string
  ): JSX.Element[] => {
    const fieldsElements = [];

    for (const field of fields) {
      if (field instanceof GroupFields)
        fieldsElements.push(...createFormElements(field.fields!, field.id));
      else {
        fieldsElements.push(
          createFormElement({
            ...field,
            id: groupId ? `${groupId}.${field.id}` : field.id,
          })
        );
      }
    }
    return fieldsElements;
  };

  const createForm = () => (
    <Form className={`nvs-container-fluid${formClass ? ` ${formClass}` : ""}`}>
      <div className="nvs-row">{createFormElements(fields)}</div>
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
