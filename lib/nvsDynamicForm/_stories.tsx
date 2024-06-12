import { INvsDynamicForm, NvsDynamicForm } from "./";
import * as Yup from "yup";

import { Field } from "formik";
import React from "react";
import { FieldBase } from "../types";

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

const TextboxElement = (opt: TextboxField) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={opt.id}>{opt.label}</label>
      <Field id={opt.id} name={opt.id} placeholder={opt.label} />
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
        label: "First Name",
        defaultValue: "ismet",
        screenSize: {
          desktop: 6,
          mobile: 12,
        },
        validate: Yup.string().required(),
      }),
      new TextboxField({
        id: "lastName",
        label: "Last Name",
        screenSize: {
          desktop: 6,
          mobile: 12,
        },
        validate: Yup.string().required(),
      }),
      new TextboxField({
        id: "emailAddress",
        label: "E-mail Address",
        screenSize: 12,
        validate: Yup.string().email().required(),
        type: "email",
      }),
    ],
  },
};
