import * as Yup from "yup";

import { ArrayField, DynamicObject, GroupField } from "../../types";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { FieldType } from "../_type";
import { IFormikForm } from "./_type";

export const FormikForm = ({
  children,
  fields,
  onSubmit,
  formClass,
}: IFormikForm) => {
  const getFieldDefaultValue = (field: FieldType) => {
    let defaultValue;
    if (field instanceof ArrayField) defaultValue = field.defaultValues ?? [];
    else if (field instanceof GroupField)
      defaultValue = getFieldsDefaultValues(field.fields!);
    else defaultValue = field.defaultValue;

    return defaultValue;
  };

  const getFieldsDefaultValues = (fields: Array<FieldType>): DynamicObject => {
    return fields.reduce((acc: DynamicObject, field: FieldType) => {
      acc[field.id] = getFieldDefaultValue(field);
      return acc;
    }, {});
  };

  const getFieldValidate = (field: FieldType) => {
    let validate;
    if (field instanceof GroupField)
      validate = createValidateSchema(field.fields!);
    else if (field instanceof ArrayField)
      validate = createArrayValidateSchema(field);
    else if (field?.validate) validate = field.validate;

    return validate;
  };

  const createValidateSchema = (fields: Array<FieldType>) => {
    const validationSchema = fields.reduce(
      (acc: { [key: string]: Yup.AnySchema }, field) => {
        const validate = getFieldValidate(field);
        if (validate) acc[field.id] = validate;
        return acc;
      },
      {},
    );
    return Yup.object(validationSchema);
  };

  const createArrayValidateSchema = (arrayField: ArrayField) => {
    return arrayField.validate!.of(createValidateSchema(arrayField.fields));
  };

  const [defaultValues, setDefaultValues] = useState(
    getFieldsDefaultValues(fields),
  );

  const [validateSchema, setValidateSchema] = useState(
    createValidateSchema(fields),
  );

  useEffect(() => {
    setDefaultValues(getFieldsDefaultValues(fields));
    setValidateSchema(createValidateSchema(fields));
  }, [fields]);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      onSubmit && (await onSubmit(values));
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form className={formClass ? ` ${formClass}` : ""}>{children}</Form>
    </FormikProvider>
  );
};
