import "nvs-flexgrid";
import "./_style.css";

import { Button } from "./components/button";
import { FormikForm } from "./formikForm";
import { INvsDynamicForm } from "./_type";
import React from "react";
import { FormBuilder } from "./components/formBuilder";
import { Container } from "./components/container";

export const NvsDynamicForm = ({
  onSubmit,
  formElements = {},
  fields = [],
  formClass,
  buttonComponent,
  submitButtonDefaultOptions,
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
}: INvsDynamicForm) => {
  const formikForm = (
    <FormikForm onSubmit={onSubmit} fields={fields} formClass={formClass}>
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
