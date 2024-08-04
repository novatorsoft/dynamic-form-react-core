import { INvsDynamicForm, NvsDynamicForm } from ".";
import * as Yup from "yup";

import React, { ChangeEvent } from "react";
import { FieldBase, GroupFields } from "../types";

export default {
  component: NvsDynamicForm,
  title: "Nvs Dynamic Form",
};

const ButtonComponent = ({ children }: { children: string }) => {
  return (
    <button style={{ width: "100%" }} type="submit">
      {children}
    </button>
  );
};

const TextboxElement = ({ defaultValue, ...props }: TextboxField) => {
  return (
    <input style={{ width: "100%", boxSizing: "border-box" }} {...props} />
  );
};

const Container = ({ children, ...props }) => {
  return (
    <div id="custom-container" className="nvs-container-fluid">
      <div className="nvs-row">
        <div className="nvs-col-12">
          <h1>{props.title}</h1>
        </div>
        <div className="nvs-col-12">{children}</div>
      </div>
    </div>
  );
};

class TextboxField extends FieldBase<string> {
  override readonly fieldType? = "textbox";
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  placeholder?: string;

  constructor(options: TextboxField) {
    super(options, "");
    this.type = options.type ?? "text";
    this.placeholder = options.placeholder ?? "";
  }
}

export const Default: { args: INvsDynamicForm; name: string } = {
  name: "Simple Example",
  args: {
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    submitButtonIsFullWidth: false,
    submitButtonLabel: "Save",
    submitButtonVisible: true,
    submitButtonPosition: "right",
    submitButton: {
      component: ButtonComponent,
      defaultOptions: {
        label: "Save",
        isFullWidth: true,
        position: "right",
      },
    },
    formElements: {
      textbox: {
        component: TextboxElement,
        class: TextboxField,
      },
    },
    fields: [
      new TextboxField({
        id: "firstName",
        placeholder: "Enter your first name",
        defaultValue: "ismet",
        validate: Yup.string().required(),
        onChange: (event) => {
          console.log((event as ChangeEvent<HTMLInputElement>).target.value);
        },
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new TextboxField({
        id: "lastName",
        placeholder: "Enter your last name",
        validate: Yup.string().required(),
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new TextboxField({
        id: "emailAddress",
        placeholder: "Enter your e-mail address",
        screenSize: 12,
        type: "email",
      }),
    ],
  },
};

export const Group: { args: INvsDynamicForm; name: string } = {
  name: "Group Example",
  args: {
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    submitButtonIsFullWidth: false,
    submitButtonLabel: "Save",
    submitButtonVisible: true,
    submitButtonPosition: "right",
    submitButton: {
      component: ButtonComponent,
      defaultOptions: {
        label: "Save",
        isFullWidth: true,
        position: "right",
      },
    },
    formElements: {
      textbox: {
        component: TextboxElement,
        class: TextboxField,
      },
    },
    fields: [
      new TextboxField({
        id: "firstName",
        label: "First Name",
        placeholder: "Enter your first name",
        defaultValue: "ismet",
        validate: Yup.string().required(),
        onChange: (event) => {
          console.log((event as ChangeEvent<HTMLInputElement>).target.value);
        },
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new TextboxField({
        id: "lastName",
        label: "Last Name",
        placeholder: "Enter your last name",
        validate: Yup.string().required(),
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new GroupFields({
        id: "contact",
        fields: [
          new TextboxField({
            id: "emailAddress",
            label: "E-mail Address",
            placeholder: "Enter your e-mail address",
            screenSize: 6,
            type: "email",
            defaultValue: "info@ismetkizgin.com",
          }),
          new TextboxField({
            id: "phoneNumber",
            label: "Phone Number",
            placeholder: "Enter your phone number",
            screenSize: 6,
          }),
        ],
      }),
    ],
  },
};

export const GroupAndContainer: { args: INvsDynamicForm; name: string } = {
  name: "Container Example",
  args: {
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    submitButtonIsFullWidth: false,
    submitButtonLabel: "Save",
    submitButtonVisible: true,
    submitButtonPosition: "right",
    container: Container,
    containerVisible: true,
    useGroupContainer: true,
    useContainersOutsideGroup: true,
    containerOptions: {
      title: "Title",
    },
    submitButton: {
      component: ButtonComponent,
      defaultOptions: {
        label: "Save",
        isFullWidth: true,
        position: "right",
      },
    },
    formElements: {
      textbox: {
        component: TextboxElement,
        class: TextboxField,
      },
    },
    fields: [
      new TextboxField({
        id: "firstName",
        label: "First Name",
        placeholder: "Enter your first name",
        defaultValue: "ismet",
        validate: Yup.string().required(),
        onChange: (event) => {
          console.log((event as ChangeEvent<HTMLInputElement>).target.value);
        },
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new TextboxField({
        id: "lastName",
        label: "Last Name",
        placeholder: "Enter your last name",
        validate: Yup.string().required(),
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new GroupFields({
        id: "contact",
        fields: [
          new TextboxField({
            id: "emailAddress",
            label: "E-mail Address",
            placeholder: "Enter your e-mail address",
            screenSize: 6,
            type: "email",
            defaultValue: "info@ismetkizgin.com",
          }),
          new TextboxField({
            id: "phoneNumber",
            label: "Phone Number",
            placeholder: "Enter your phone number",
            screenSize: 6,
          }),
        ],
      }),
      new GroupFields({
        id: "location",
        containerVisible: false,
        fields: [
          new TextboxField({
            id: "cityName",
            label: "City Name",
            placeholder: "Enter your city name",
            screenSize: 6,
          }),
          new TextboxField({
            id: "districtName",
            label: "district Name",
            placeholder: "Enter your district name",
            screenSize: 6,
          }),
        ],
      }),
    ],
  },
};
