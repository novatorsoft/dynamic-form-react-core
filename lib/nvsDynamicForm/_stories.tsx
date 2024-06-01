import { INvsDynamicForm, NvsDynamicForm } from "./";
import * as Yup from "yup";

import { Field } from "formik";
import React from "react";
import { FieldBase } from "../types";

export default {
  component: NvsDynamicForm,
  title: "Nvs Dynamic Form",
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
  override readonly fieldType = "textbox";
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
    formElements: {
      textbox: {
        component: TextboxElement,
        class: TextboxField,
      },
    },
    fields: [
      {
        id: "firstName",
        label: "First Name",
        fieldType: "textbox",
        defaultValue: "ismet",
        screenSize: 6,
      },
      {
        id: "lastName",
        label: "Last Name",
        fieldType: "textbox",
        validate: Yup.string().required(),
        screenSize: 6,
      },
      {
        id: "lastName",
        label: "Last Name",
        fieldType: "textbox",
        validate: Yup.string().email(),
        screenSize: 12,
      },
    ],
  },
};
