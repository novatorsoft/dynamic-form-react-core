import "nvs-flexgrid";
import "./_style.css";

import React, { useState } from "react";

import { Button } from "./components/button";
import { Container } from "./components/container";
import { FormBuilder } from "./components/formBuilder";
import { FormikForm } from "./formikForm";
import { INvsDynamicForm } from "./_type";

export const NvsDynamicForm = ({
  onSubmit,
  formElements = {},
  fields = [],
  formClass,
  buttonComponent,
  submitButtonDefaultOptions,
  submitButtonOptions,
  submitButtonVisible = true,
  submitButtonLabel = submitButtonDefaultOptions.label,
  submitButtonIsFullWidth = submitButtonDefaultOptions.isFullWidth,
  submitButtonPosition = submitButtonDefaultOptions.position,
  submitButtonContainerClass,
  container = ({ children }) => <>{children}</>,
  containerVisible = false,
  containerOptions = {},
  useContainersOutsideGroup = false,
  useGroupContainer = false,
  addButtonDefaultOptions,
  removeButtonDefaultOptions,
  doubleSubmitProtection = false,
}: INvsDynamicForm) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: unknown) => {
    if (doubleSubmitProtection && isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit?.(values);
    setIsSubmitting(false);
  };

  const formikForm = (
    <FormikForm onSubmit={handleSubmit} fields={fields} formClass={formClass}>
      <FormBuilder
        containerComponent={container}
        formElements={formElements}
        useContainersOutsideGroup={useContainersOutsideGroup}
        useGroupContainer={useGroupContainer}
        containerVisible={containerVisible}
        fields={fields}
        buttonComponent={buttonComponent}
        containerOptions={containerOptions}
        fieldArrayAddButtonDefaultOptions={addButtonDefaultOptions}
        fieldArrayRemoveButtonDefaultOptions={removeButtonDefaultOptions}
      />
      <Button
        buttonComponent={buttonComponent}
        visible={submitButtonVisible}
        label={submitButtonLabel}
        isFullWidth={submitButtonIsFullWidth}
        position={submitButtonPosition}
        containerClass={submitButtonContainerClass}
        options={submitButtonOptions}
      />
    </FormikForm>
  );

  return containerVisible && !useContainersOutsideGroup ? (
    <Container containerComponent={container} options={containerOptions}>
      {formikForm}
    </Container>
  ) : (
    formikForm
  );
};
