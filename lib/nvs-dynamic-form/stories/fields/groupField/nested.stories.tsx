import * as Yup from "yup";

import {
  ButtonComponent,
  TextboxElement,
  TextboxField,
} from "../../components";
import { INvsDynamicForm, NvsDynamicForm } from "../../..";

import { ChangeEvent } from "react";
import { GroupField } from "../../../../types";

export default {
  component: NvsDynamicForm,
  title: "Group Field",
};

export const NestedGroup: { args: INvsDynamicForm; name: string } = {
  name: "Nested Group",
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
      new GroupField({
        id: "contactInfo",
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
          new GroupField({
            id: "address",
            fields: [
              new TextboxField({
                id: "cityName",
                label: "City Name",
                placeholder: "Enter your city name",
                screenSize: 6,
              }),
              new TextboxField({
                id: "districtName",
                label: "District Name",
                placeholder: "Enter your district name",
                screenSize: 6,
              }),
            ],
          }),
        ],
      }),
    ],
  },
};
