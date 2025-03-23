import * as lodash from "lodash";

import {
  ArrayFieldAddButton,
  ArrayFieldRemoveButton,
  LabelOptions,
} from "../../../types";
import { FieldArray, FormikProps } from "formik";
import React, { ReactNode, useCallback, useState } from "react";

import { Container } from "../container";
import { Elements } from "../elements";
import { IArrayField } from "./_type";
import { List } from "../list/_template";

export const ArrayField: React.FC<IArrayField> = ({
  field: arrayField,
  formElements,
  containerComponent,
  containerVisible,
  useContainersOutsideGroup,
  useGroupContainer,
  buttonComponent: ButtonComponent,
  addButtonDefaultOptions,
  removeButtonDefaultOptions,
  labelDefaultOptions,
}: IArrayField) => {
  const createArrayItem = useCallback(
    (index: number) => {
      return lodash.cloneDeep(arrayField.fields).map((field) => {
        field.id = `${arrayField.id}[${index}].${field.id}`;
        return field;
      });
    },
    [arrayField.fields]
  );

  const [addButtonOptions] = useState(
    new ArrayFieldAddButton(
      lodash.merge(
        addButtonDefaultOptions ?? {},
        arrayField.addButtonOptions ?? {}
      )
    )
  );
  const [removeButtonOptions] = useState(
    new ArrayFieldRemoveButton(
      lodash.merge(
        removeButtonDefaultOptions ?? {},
        arrayField.removeButtonOptions ?? {}
      )
    )
  );
  const [labelOptions] = useState(
    new LabelOptions(
      lodash.merge(labelDefaultOptions ?? {}, arrayField.labelOptions ?? {})
    )
  );

  const ContentContainer = ({ children }: { children: ReactNode }) => {
    return (
      <div className="nvs-container-fluid">
        <div className="nvs-row">{children}</div>
      </div>
    );
  };

  const getDefaultItem = () => {
    return arrayField.fields.reduce((acc: { [key: string]: any }, field) => {
      if ("defaultValue" in field) acc[field.id] = field.defaultValue;
      return acc;
    }, {});
  };

  const createArrayFields = (index: number) => {
    return (
      <div className="df-array-field-content">
        <div className="nvs-container-fluid">
          <div className="nvs-row">
            <Elements
              fields={createArrayItem(index)}
              formElements={formElements}
              containerComponent={containerComponent}
              useContainersOutsideGroup={useContainersOutsideGroup}
              useGroupContainer={useGroupContainer}
              containerVisible={containerVisible}
              buttonComponent={ButtonComponent}
              fieldArrayAddButtonDefaultOptions={addButtonDefaultOptions}
              fieldArrayRemoveButtonDefaultOptions={removeButtonDefaultOptions}
              labelDefaultOptions={labelDefaultOptions}
            />
          </div>
        </div>
      </div>
    );
  };

  const createRemoveButton = (onRemoveItem: Function) => {
    return (
      <div className="nvs-col-12">
        <ButtonComponent
          onClick={() => {
            onRemoveItem();
          }}
          type="button"
          {...removeButtonOptions.options}
        >
          {removeButtonOptions.label}
        </ButtonComponent>
      </div>
    );
  };

  const createArrayItemRemoveButton = (onRemoveItem: Function) => {
    return (
      <div className="df-array-field-remove-button">
        <ContentContainer>{createRemoveButton(onRemoveItem)}</ContentContainer>
      </div>
    );
  };

  const createFieldArrayContent = (onRemoveItem: Function, index: number) => {
    return (
      <div
        className={`df-array-field remove-button-${removeButtonOptions.position}`}
        key={index}
      >
        {createArrayFields(index)}
        {removeButtonOptions.visible &&
          createArrayItemRemoveButton(() => onRemoveItem(index))}
      </div>
    );
  };

  const createAddButton = (onAddItem: Function) => {
    return (
      <div className="df-array-field-add-button">
        <ButtonComponent
          onClick={() => onAddItem(getDefaultItem())}
          type="button"
          {...addButtonOptions.options}
        >
          {addButtonOptions.label}
        </ButtonComponent>
      </div>
    );
  };

  const createArrayItemAddButton = (onAddItem: Function) => {
    return <ContentContainer>{createAddButton(onAddItem)}</ContentContainer>;
  };

  const createArrayFieldLabel = () => {
    return (
      <ContentContainer>
        <div className="nvs-col-12">
          <label className={`df-array-field-label ${labelOptions.class}`}>
            {arrayField.label}
          </label>
        </div>
      </ContentContainer>
    );
  };

  const checkFieldArrayMaxSize = (length: number) => {
    const maxSize = arrayField
      .validate!.describe()
      .tests.find((test) => test.name === "max")?.params!.max as number;

    return !(maxSize && length == maxSize);
  };

  const getArrayFieldErrorMessage = (
    form: FormikProps<any>
  ): string | undefined => {
    let error = form.errors[arrayField.id];
    if (lodash.isArray(error)) error = error.at(0);
    if (!lodash.isString(error)) error = undefined;
    return error;
  };

  const createErrorList = (form: FormikProps<any>) => {
    const error = getArrayFieldErrorMessage(form);
    return error && <List items={[error]} />;
  };

  const isContainerVisible = () => {
    return arrayField.containerVisible && useGroupContainer && containerVisible;
  };

  const ContentArrayField = () => {
    return (
      <ContentContainer>
        <FieldArray name={arrayField.id}>
          {({ push, remove, form }) => (
            <>
              {arrayField.label && createArrayFieldLabel()}
              {lodash
                .get(form.values, arrayField.id)
                ?.map((_: any, index: number) =>
                  createFieldArrayContent(remove, index)
                )}
              {checkFieldArrayMaxSize(
                lodash.get(form.values, arrayField.id)?.length
              ) && createArrayItemAddButton(push)}
              {createErrorList(form)}
            </>
          )}
        </FieldArray>
      </ContentContainer>
    );
  };

  const ContainerComponent = ({ children }: { children: ReactNode }) => {
    return (
      <Container
        containerComponent={containerComponent}
        options={arrayField.containerOptions}
      >
        {children}
      </Container>
    );
  };

  return isContainerVisible() ? (
    <ContainerComponent>
      <ContentArrayField />
    </ContainerComponent>
  ) : (
    <ContentArrayField />
  );
};
