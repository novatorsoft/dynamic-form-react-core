import "nvs-flexgrid";
import "./_style.css";

import { FieldBase, GroupFields } from "../types";
import { FieldType, INvsDynamicForm } from "./_type";

import { Field } from "./elements/field";
import { FormikForm } from "./formikForm";
import React from "react";
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
    <>
      <div className="nvs-row">{createFormElements(fields)}</div>
      <SubmitButton
        submitButton={submitButton}
        submitButtonVisible={submitButtonVisible}
        submitButtonLabel={submitButtonLabel}
        submitButtonIsFullWidth={submitButtonIsFullWidth}
        submitButtonPosition={submitButtonPosition}
      />
    </>
  );

  return (
    <FormikForm onSubmit={onSubmit} fields={fields} formClass={formClass}>
      {createForm()}
    </FormikForm>
  );
};
