import * as Yup from "yup";

import {
  ButtonComponent,
  TextboxElement,
  TextboxField,
} from "../../components";
import { INvsDynamicForm, NvsDynamicForm } from "../../..";

import { ChangeEvent } from "react";
import { ArrayField, GroupField } from "../../../../types";

export default {
  component: NvsDynamicForm,
  title: "Array Field",
};

export const NestedGroupExample: { args: INvsDynamicForm; name: string } = {
  name: "Nested Arraf Field",
  args: {
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
    submitButtonIsFullWidth: false,
    submitButtonLabel: "Submit",
    submitButtonVisible: true,
    submitButtonPosition: "right",
    submitButtonDefaultOptions: {
      label: "Submit",
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
        label: "First Name",
        placeholder: "Enter your first name",
        defaultValue: "ismet",
        validate: Yup.string().required(),
        screenSize: {
          desktop: 6,
          mobile: 12,
        },
      }),
      new TextboxField({
        id: "lastName",
        label: "Last Name",
        placeholder: "Enter your last name",
        validate: Yup.string().required(),
        screenSize: {
          desktop: 6,
          mobile: 12,
        },
      }),
      new GroupField({
        id: "contactDetails",
        fields: [
          new TextboxField({
            id: "email",
            label: "Email Address",
            placeholder: "Enter your email",
            validate: Yup.string().required(),
            screenSize: {
              desktop: 6,
              mobile: 12,
            },
          }),
          new TextboxField({
            id: "phone",
            label: "Phone Number",
            placeholder: "Enter your phone number",
            validate: Yup.string().required(),
            screenSize: {
              desktop: 6,
              mobile: 12,
            },
          }),
        ],
      }),
      new ArrayField({
        id: "sources",
        label: "Sources",
        addButtonOptions: {
          label: "Add Source",
        },
        defaultValues: [
          {
            sourceName: "Source 1",
            addresses: [{ cityName: "İzmir", districtName: "Göztepe" }],
          },
        ],
        validate: Yup.array().min(1),
        fields: [
          new TextboxField({
            id: "sourceName",
            label: "Source Name",
            placeholder: "Enter source name",
            screenSize: 12,
            validate: Yup.string().required(),
          }),
          new ArrayField({
            id: "addresses",
            label: "Addresses",
            addButtonOptions: {
              label: "Add Address",
            },
            validate: Yup.array().min(1),
            fields: [
              new TextboxField({
                id: "cityName",
                label: "City Name",
                placeholder: "Enter your city name",
                screenSize: 6,
                validate: Yup.string().required(),
              }),
              new TextboxField({
                id: "districtName",
                label: "District Name",
                placeholder: "Enter your district name",
                screenSize: 6,
                validate: Yup.string().required(),
              }),
            ],
          }),
        ],
      }),
    ],
  },
};
