import { FieldBase, GroupFields } from "../../types";

import { Container } from "../elements/container";
import { Field } from "../elements/field";
import { FieldType } from "../_type";
import { GroupField } from "../elements/groupField";
import { IFormElement } from "../elements/field";
import React from "react";
import { ReactNode } from "react";

export class GenerateFormContentUtils {
  private readonly containerComponent: React.FC<any>;
  private readonly formElements: IFormElement;
  private readonly useContainersOutsideGroup: boolean;
  private readonly useGroupContainer: boolean;
  private readonly containerVisible: boolean;
  private readonly fields: Array<FieldType>;
  private readonly containerOptions: { [key: string]: any };

  constructor({
    containerComponent,
    formElements,
    useContainersOutsideGroup,
    useGroupContainer,
    containerVisible,
    fields,
    containerOptions,
  }: {
    containerComponent: React.FC<any>;
    formElements: IFormElement;
    useContainersOutsideGroup: boolean;
    useGroupContainer: boolean;
    containerVisible: boolean;
    fields: Array<FieldType>;
    containerOptions?: { [key: string]: any };
  }) {
    this.containerComponent = containerComponent;
    this.formElements = formElements;
    this.useContainersOutsideGroup = useContainersOutsideGroup;
    this.useGroupContainer = useGroupContainer;
    this.containerVisible = containerVisible;
    this.fields = fields;
    this.containerOptions = containerOptions || {};
  }

  createContainer(content: ReactNode, containerProps: object) {
    return (
      <Container
        containerComponent={this.containerComponent}
        options={containerProps}
      >
        {content}
      </Container>
    );
  }

  createFormContent() {
    const singleFields = this.createSingleFieldsElements();
    const groupFields = this.createGroupFieldsElements();

    let formContent;
    if (this.containerVisible && this.useContainersOutsideGroup && singleFields)
      formContent = (
        <>
          {this.createContainer(singleFields, this.containerOptions)}
          {groupFields}
        </>
      );
    else
      formContent = this.createFormGroup(
        <>
          {singleFields}
          {groupFields}
        </>
      );

    return formContent;
  }

  createFormElements(fields: Array<FieldType>): JSX.Element[] {
    const fieldsElements = [];
    for (const field of fields) {
      if (field instanceof GroupFields)
        fieldsElements.push(this.createGroupFieldElement(field));
      else {
        fieldsElements.push(this.createSingleFieldElement(field));
      }
    }
    return fieldsElements;
  }

  private createFormContentContainer(formElements: ReactNode) {
    return (
      <div className="nvs-container-fluid">
        <div className="nvs-row">{formElements}</div>
      </div>
    );
  }

  private getSingleFields() {
    return this.fields.filter((field) => this.isSingleField(field));
  }

  private getGroupFields() {
    return this.fields.filter((field) => !this.isSingleField(field));
  }

  private createSingleFieldsElements() {
    const singleFields = this.getSingleFields();
    return (
      singleFields.length > 0 &&
      this.createFormContentContainer(this.createFormElements(singleFields))
    );
  }

  private createGroupFieldsElements() {
    const groupFields = this.getGroupFields();
    return groupFields.length > 0 && this.createFormElements(groupFields);
  }

  private createSingleFieldElement(field: FieldBase<unknown>) {
    return (
      <Field key={field.id} formElements={this.formElements} field={field} />
    );
  }

  private createGroupFieldElement(field: GroupFields) {
    return (
      <GroupField
        key={field.id}
        formElements={this.formElements}
        field={field}
        containerComponent={this.containerComponent}
        useContainersOutsideGroup={this.useContainersOutsideGroup}
        useGroupContainer={this.useGroupContainer}
        containerVisible={this.containerVisible}
      />
    );
  }

  private isSingleField(field: FieldType) {
    return !(
      field instanceof GroupFields &&
      field.containerVisible &&
      this.useGroupContainer &&
      this.containerVisible
    );
  }

  private createFormGroup(formContent: ReactNode) {
    return <div className="df-form-group">{formContent}</div>;
  }
}
