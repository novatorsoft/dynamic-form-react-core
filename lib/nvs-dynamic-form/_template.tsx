import "nvs-flexgrid";
import "./_style.css";

import { FieldBase, GroupFields } from "../types";
import { FieldType, INvsDynamicForm } from "./_type";
import React, { ReactNode } from "react";

import { Field } from "./elements/field";
import { FormikForm } from "./formikForm";
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
  submitButtonContainerClass,
  container: CustomContainer = ({ children }) => <>{children}</>,
  containerVisible = false,
  containerOptions = {},
  useContainersOutsideGroup = false,
  useGroupContainer = false,
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

  const isParentField = (field: FieldType) => {
    return !(
      field instanceof GroupFields &&
      field.containerVisible &&
      useGroupContainer &&
      containerVisible
    );
  };

  const getParentFormElements = () => {
    return fields.filter((field) => isParentField(field));
  };

  const getSubGroupFormElements = () => {
    return fields.filter((field) => !isParentField(field));
  };

  const createFormContent = (formElements: ReactNode) => {
    return (
      <div className="nvs-container-fluid">
        <div className="nvs-row">{formElements}</div>
      </div>
    );
  };

  const createFormElementGroupContainer = (
    formContent: ReactNode,
    containerProps = containerOptions
  ) => {
    return <CustomContainer {...containerProps}>{formContent}</CustomContainer>;
  };

  const createSubFormElementGroupContainers = () => {
    const subFormGroupFields = getSubGroupFormElements();
    if (subFormGroupFields.length == 0) return <></>;

    return subFormGroupFields.map((groupField: GroupFields) =>
      createFormElementGroupContainer(
        createFormContent(
          createFormElements(groupField.fields ?? [], groupField.id)
        ),
        groupField.containerOptions ?? containerOptions
      )
    );
  };

  const createFormElementGroupContainers = () => {
    const parentFormFields = getParentFormElements();

    let formContent = (
      <div className="df-form-group">
        {createFormContent(createFormElements(parentFormFields))}
        {createSubFormElementGroupContainers()}
      </div>
    );

    if (
      containerVisible &&
      useContainersOutsideGroup &&
      parentFormFields.length > 0
    ) {
      formContent = (
        <>
          {createFormElementGroupContainer(
            createFormContent(createFormElements(parentFormFields))
          )}
          {createSubFormElementGroupContainers()}
        </>
      );
    }

    return formContent;
  };

  const formikForm = (
    <FormikForm onSubmit={onSubmit} fields={fields} formClass={formClass}>
      {createFormElementGroupContainers()}
      <SubmitButton
        submitButton={submitButton}
        submitButtonVisible={submitButtonVisible}
        submitButtonLabel={submitButtonLabel}
        submitButtonIsFullWidth={submitButtonIsFullWidth}
        submitButtonPosition={submitButtonPosition}
        submitButtonContainerClass={submitButtonContainerClass}
      />
    </FormikForm>
  );

  return containerVisible && !useContainersOutsideGroup ? (
    <CustomContainer {...containerOptions}>{formikForm}</CustomContainer>
  ) : (
    formikForm
  );
};
