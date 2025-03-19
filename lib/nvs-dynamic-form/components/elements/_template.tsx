import {
  ArrayField,
  ArrayFieldAddButton,
  GroupField,
  LabelOptions,
} from "../../../types";
import { Field, IFormElement } from "../field";
import React, { useEffect, useState } from "react";

import { ArrayField as ArrayFieldElement } from "../arrayField";
import { FieldBase } from "../../../types";
import { FieldType } from "../../_type";
import { GroupField as GroupFieldElement } from "../groupField";

export const Elements = ({
  fields,
  formElements,
  containerComponent,
  useContainersOutsideGroup,
  useGroupContainer,
  containerVisible,
  buttonComponent,
  fieldArrayAddButtonDefaultOptions = {},
  fieldArrayRemoveButtonDefaultOptions = {},
  labelDefaultOptions = {},
}: {
  fields: Array<FieldType>;
  formElements: IFormElement;
  containerComponent: React.FC<any>;
  useContainersOutsideGroup: boolean;
  useGroupContainer: boolean;
  containerVisible: boolean;
  buttonComponent?: React.FC<any>;
  fieldArrayAddButtonDefaultOptions?: ArrayFieldAddButton;
  fieldArrayRemoveButtonDefaultOptions?: ArrayFieldAddButton;
  labelDefaultOptions?: LabelOptions;
}) => {
  const [fieldsElements, setFieldsElements] = useState<JSX.Element[]>([]);

  const createFormElements = (): JSX.Element[] => {
    const fieldsElements = [];
    for (const field of fields) {
      if (field instanceof GroupField)
        fieldsElements.push(createGroupFieldElement(field));
      else if (field instanceof ArrayField)
        fieldsElements.push(createArrayFieldElement(field));
      else fieldsElements.push(createSingleFieldElement(field));
    }
    return fieldsElements;
  };

  const createSingleFieldElement = (field: FieldBase<unknown>) => {
    return <Field key={field.id} formElements={formElements} field={field} />;
  };

  const createGroupFieldElement = (field: GroupField) => {
    return (
      <GroupFieldElement
        key={field.id}
        formElements={formElements}
        field={field}
        containerComponent={containerComponent}
        useContainersOutsideGroup={useContainersOutsideGroup}
        useGroupContainer={useGroupContainer}
        containerVisible={containerVisible}
        buttonComponent={buttonComponent!}
      />
    );
  };

  const createArrayFieldElement = (field: ArrayField) => {
    return (
      <ArrayFieldElement
        key={field.id}
        formElements={formElements}
        field={field}
        containerComponent={containerComponent}
        useContainersOutsideGroup={useContainersOutsideGroup}
        useGroupContainer={useGroupContainer}
        containerVisible={containerVisible}
        buttonComponent={buttonComponent!}
        addButtonDefaultOptions={fieldArrayAddButtonDefaultOptions}
        removeButtonDefaultOptions={fieldArrayRemoveButtonDefaultOptions}
        labelDefaultOptions={labelDefaultOptions}
      />
    );
  };

  useEffect(() => {
    if (fields.length > 0) setFieldsElements(createFormElements());
  }, [fields]);

  return fieldsElements.length > 0 ? fieldsElements : <></>;
};
