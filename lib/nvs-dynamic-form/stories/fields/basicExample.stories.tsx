import * as Yup from "yup";

import { ButtonComponent, TextboxElement, TextboxField } from "../components";
import { INvsDynamicForm, NvsDynamicForm } from "../../";

import { ChangeEvent } from "react";

export default {
  component: NvsDynamicForm,
  title: "Basic Example",
};

export const Default: { args: INvsDynamicForm; name: string } = {
  name: "Default",
  args: {
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    submitButtonIsFullWidth: false,
    submitButtonLabel: "Save",
    submitButtonVisible: true,
    submitButtonPosition: "right",
    submitButtonDefaultOptions: {
      label: "Save",
      isFullWidth: true,
      position: "right",
    },
    buttonComponent: ButtonComponent,
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
