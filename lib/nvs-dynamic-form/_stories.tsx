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

export const Default: { args: INvsDynamicForm } = {
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

export const Group: { args: INvsDynamicForm } = {
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
