import React, { useState } from "react";

import { Elements } from "../elements";
import { FormBuilder } from "../formBuilder";
import { IGroupField } from "./_type";

export const GroupField = ({
  field: groupField,
  formElements,
  containerComponent,
  containerVisible,
  useContainersOutsideGroup,
  useGroupContainer,
  buttonComponent,
}: IGroupField) => {
  const [fields, _] = useState(
    groupField.fields.map((field) => {
      field.id = `${groupField.id}.${field.id}`;
      return field;
    })
  );

  const isContainerVisible = () => {
    return groupField.containerVisible && useGroupContainer && containerVisible;
  };

  return (
    fields &&
    (isContainerVisible() ? (
      <FormBuilder
        containerComponent={containerComponent}
        formElements={formElements}
        useContainersOutsideGroup={useContainersOutsideGroup}
        useGroupContainer={useGroupContainer}
        containerOptions={groupField.containerOptions}
        containerVisible={containerVisible}
        fields={fields}
        buttonComponent={buttonComponent}
      />
    ) : (
      <Elements
        fields={fields}
        containerComponent={containerComponent}
        formElements={formElements}
        useContainersOutsideGroup={useContainersOutsideGroup}
        useGroupContainer={useGroupContainer}
        containerVisible={containerVisible}
        buttonComponent={buttonComponent}
      />
    ))
  );
};
