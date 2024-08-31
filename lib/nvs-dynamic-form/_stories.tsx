import { INvsDynamicForm, NvsDynamicForm } from ".";
import * as Yup from "yup";

import React, { ChangeEvent, CSSProperties } from "react";
import { ArrayField, FieldBase, GroupFields } from "../types";

export default {
  component: NvsDynamicForm,
  title: "Nvs Dynamic Form",
};

const ButtonComponent = ({
  children,
  type = "submit",
  onClick,
  style = { width: "100%" },
}: {
  type: "submit" | "reset" | "button" | undefined;
  children: string;
  onClick?: () => void;
  style?: CSSProperties;
}) => {
  return (
    <button style={style} onClick={onClick} type={type}>
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
    button: {
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
    button: {
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
    button: {
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

export const ArrayFieldExample: { args: INvsDynamicForm; name: string } = {
  name: "Array Field Example",
  args: {
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    submitButtonIsFullWidth: false,
    submitButtonLabel: "Save",
    submitButtonVisible: true,
    submitButtonPosition: "right",
    button: {
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
      new ArrayField({
        id: "items",
        defaultValue: [
          { firstName: "Ismet", lastName: "Kizgin" },
          { name: "Ayberk" },
        ],
        screenSize: 12,
        properties: ["firstName", "lastName"],
        buttonComponent: ButtonComponent,
        addButton: { label: "Add" },
        removeButton: { label: "Remove" },
        validate: Yup.array()
          .of(
            Yup.object().shape({
              firstName: Yup.string().required("Name is required"),
            }),
          )
          .min(1, "At least one item is required")
          .required("You must have at least one item"),
        fields: [
          new TextboxField({
            id: "firstName",
            placeholder: "First Name",
          }),
          new TextboxField({
            id: "lastName",
            placeholder: "Last Name",
          }),
        ],
      }),
    ],
  },
};

export const GroupArrayFieldExample: { args: INvsDynamicForm; name: string } = {
  name: "Group Array Field Example",
  args: {
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    submitButtonIsFullWidth: false,
    submitButtonLabel: "Save",
    submitButtonVisible: true,
    submitButtonPosition: "right",
    button: {
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
      new ArrayField({
        id: "items",
        defaultValue: [
          { questionAnswer: { question: "Question-1", answer: "Answer-1" } },
          { questionAnswer: { question: "Question-2", answer: "Answer-2" } },
        ],
        properties: ["questionAnswer.question", "questionAnswer.answer"],
        screenSize: 12,
        buttonComponent: ButtonComponent,
        addButton: { label: "Add" },
        removeButton: { label: "Remove" },
        validate: Yup.array()
          .of(
            Yup.object().shape({
              questionAnswer: Yup.object().shape({
                question: Yup.string().required("Question is required"),
                answer: Yup.string().required("Answer is required"),
              }),
            }),
          )
          .min(1, "At least one item is required")
          .required("You must have at least one item"),
        fields: [
          new GroupFields({
            id: "questionAnswer",
            fields: [
              new TextboxField({
                id: "question",
                label: "Question",
                placeholder: "Enter question",
                screenSize: 6,
              }),
              new TextboxField({
                id: "answer",
                label: "Answer",
                placeholder: "Enter answer",
                screenSize: 6,
              }),
            ],
          }),
        ],
      }),
    ],
  },
};

export const GroupAndBasicArrayFieldExample: { args: INvsDynamicForm; name: string } =
  {
    name: "Group and Basic Array Field Example",
    args: {
      onSubmit: (values) => {
        alert(JSON.stringify(values));
      },
      submitButtonIsFullWidth: false,
      submitButtonLabel: "Save",
      submitButtonVisible: true,
      submitButtonPosition: "right",
      button: {
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
        new ArrayField({
          id: "items",
          defaultValue: [
            {
              questionAnswer: { question: "Question-1", answer: "Answer-1" },
              context: "Context",
            },
            { questionAnswer: { question: "Question-2", answer: "Answer-2" } },
          ],
          properties: [
            "questionAnswer.question",
            "questionAnswer.answer",
            "context",
          ],
          screenSize: 12,
          buttonComponent: ButtonComponent,
          addButton: { label: "Add" },
          removeButton: { label: "Remove" },
          validate: Yup.array()
            .of(
              Yup.object().shape({
                questionAnswer: Yup.object().shape({
                  question: Yup.string().required("Question is required"),
                  answer: Yup.string().required("Answer is required"),
                }),
              }),
            )
            .min(1, "At least one item is required")
            .required("You must have at least one item"),
          fields: [
            new GroupFields({
              id: "questionAnswer",
              fields: [
                new TextboxField({
                  id: "question",
                  label: "Question",
                  placeholder: "Enter question",
                  screenSize: 6,
                }),
                new TextboxField({
                  id: "answer",
                  label: "Answer",
                  placeholder: "Enter answer",
                  screenSize: 6,
                }),
              ],
            }),
            new TextboxField({
              id: "context",
              label: "Context",
              placeholder: "Enter Context",
              screenSize: 6,
            }),
          ],
        }),
      ],
    },
  };
