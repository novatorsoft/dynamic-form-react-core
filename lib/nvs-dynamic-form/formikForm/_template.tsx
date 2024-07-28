import * as Yup from "yup";

import { DynamicObject, GroupFields } from "../../types";
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
    return field instanceof GroupFields
      ? getFieldsDefaultValues(field.fields!)
      : field.defaultValue;
  };

  const getFieldsDefaultValues = (fields: Array<FieldType>): DynamicObject => {
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

  const [defaultValues, setDefaultValues] = useState(
    getFieldsDefaultValues(fields)
  );
  const [validateSchema, setValidateSchema] = useState(
    createValidateSchema(fields)
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
