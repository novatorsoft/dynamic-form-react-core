import "./_style.css";

import * as Yup from "yup";

import { FieldBase, IScreenSize, ScreenSizeType } from "../types";
import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React, { useEffect, useState } from "react";

import { DynamicObject } from "../types/dynamic-object";
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

  const createFieldItemClass = (
    screenSize: ScreenSizeType | IScreenSize
  ): Array<string> => {
    const className: Array<string> = ["df__item"];
    if (typeof screenSize == "number") className.push("df-col-" + screenSize);
    else {
      className.push("df-col-" + screenSize?.desktop);
      if (screenSize?.tablet) className.push("df-col-t-" + screenSize.tablet);
      if (screenSize?.mobile) className.push("df-col-m-" + screenSize.mobile);
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
    <Form className="df-container-fluid">
      <div className="df-row">
        {createFormElements(errors, touched)}
        <button type="submit">Submit</button>
      </div>
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
