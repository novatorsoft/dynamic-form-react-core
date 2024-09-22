import "nvs-flexgrid";
import "./_style.css";

import { Button } from "./elements/button";
import { FormikForm } from "./formikForm";
import { GenerateFormContentUtils } from "./services/generateFormContentUtils";
import { INvsDynamicForm } from "./_type";
import React from "react";

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
  const generateFormContentUtils = new GenerateFormContentUtils({
    containerComponent: container,
    formElements,
    useContainersOutsideGroup,
    useGroupContainer,
    containerVisible,
    fields,
    containerOptions,
    buttonComponent,
    fieldArrayAddButtonDefaultOptions: addButtonDefaultOptions,
    fieldArrayRemoveButtonDefaultOptions: removeButtonDefaultOptions,
  });

  const formikForm = (
    <FormikForm onSubmit={onSubmit} fields={fields} formClass={formClass}>
      {generateFormContentUtils.createFormContent()}
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

  return containerVisible && !useContainersOutsideGroup
    ? generateFormContentUtils.createContainer(formikForm, containerOptions)
    : formikForm;
};
