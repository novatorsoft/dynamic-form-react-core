import React, { ReactNode, useEffect, useState } from "react";
import { ArrayField, GroupField, LabelOptions } from "../../../types";
import { IFormElement } from "../field";
import { FieldType } from "../../_type";
import { ArrayFieldAddButton } from "../../../types";
import { Container } from "../container";
import { Elements } from "../elements";

export const FormBuilder = ({
  containerComponent,
  formElements,
  useContainersOutsideGroup,
  useGroupContainer,
  containerVisible,
  fields,
  containerOptions = {},
  buttonComponent,
  fieldArrayAddButtonDefaultOptions,
  fieldArrayRemoveButtonDefaultOptions,
  labelDefaultOptions,
}: {
  containerComponent: React.FC<any>;
  formElements: IFormElement;
  useContainersOutsideGroup: boolean;
  useGroupContainer: boolean;
  containerVisible: boolean;
  fields: Array<FieldType>;
  buttonComponent?: React.FC<any>;
  containerOptions?: { [key: string]: any };
  fieldArrayAddButtonDefaultOptions?: ArrayFieldAddButton;
  fieldArrayRemoveButtonDefaultOptions?: ArrayFieldAddButton;
  labelDefaultOptions?: LabelOptions;
}) => {
  const [formContent, setFormContent] = useState<ReactNode>();

  const createFormContent = () => {
    const singleFields = createSingleFieldsElements();
    const groupFields = createGroupFieldsElements();

    let formContent;
    if (containerVisible && useContainersOutsideGroup && singleFields)
      formContent = (
        <>
          {createContainer(singleFields, containerOptions)}
          {groupFields}
        </>
      );
    else
      formContent = createFormGroup(
        <>
          {singleFields}
          {groupFields}
        </>,
      );

    return formContent;
  };

  const createContentContainer = (formElements: ReactNode) => {
    return (
      <div className="nvs-container-fluid">
        <div className="nvs-row">{formElements}</div>
      </div>
    );
  };

  const createSingleFieldsElements = () => {
    const singleFields = getSingleFields();
    return (
      singleFields.length > 0 &&
      createContentContainer(
        <Elements
          fields={singleFields}
          formElements={formElements}
          containerComponent={containerComponent}
          useContainersOutsideGroup={useContainersOutsideGroup}
          useGroupContainer={useGroupContainer}
          containerVisible={containerVisible}
          buttonComponent={buttonComponent}
          fieldArrayAddButtonDefaultOptions={fieldArrayAddButtonDefaultOptions}
          fieldArrayRemoveButtonDefaultOptions={
            fieldArrayRemoveButtonDefaultOptions
          }
          labelDefaultOptions={labelDefaultOptions}
        />,
      )
    );
  };

  const createGroupFieldsElements = () => {
    const groupFields = getGroupFields();
    return (
      groupFields.length > 0 && (
        <Elements
          fields={groupFields}
          formElements={formElements}
          containerComponent={containerComponent}
          useContainersOutsideGroup={useContainersOutsideGroup}
          useGroupContainer={useGroupContainer}
          containerVisible={containerVisible}
          buttonComponent={buttonComponent}
          fieldArrayAddButtonDefaultOptions={fieldArrayAddButtonDefaultOptions}
          fieldArrayRemoveButtonDefaultOptions={
            fieldArrayRemoveButtonDefaultOptions
          }
          labelDefaultOptions={labelDefaultOptions}
        />
      )
    );
  };

  const isSingleField = (field: FieldType) => {
    return !(
      (field instanceof GroupField || field instanceof ArrayField) &&
      field.containerVisible &&
      useGroupContainer &&
      containerVisible
    );
  };

  const getSingleFields = () => {
    return fields.filter((field) => isSingleField(field));
  };

  const getGroupFields = () => {
    return fields.filter((field) => !isSingleField(field));
  };

  const createContainer = (content: ReactNode, containerProps: object) => {
    return (
      <Container
        containerComponent={containerComponent}
        options={containerProps}
      >
        {content}
      </Container>
    );
  };

  const createFormGroup = (formContent: ReactNode) => {
    return <div className="df-form-group">{formContent}</div>;
  };

  useEffect(() => {
    setFormContent(createFormContent());
  }, [fields]);

  return <>{formContent}</>;
};
