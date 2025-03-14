import * as Yup from "yup";

import {
  ButtonComponent,
  TextboxElement,
  TextboxField,
} from "../../components";
import { INvsDynamicForm, NvsDynamicForm } from "../../..";

import { ArrayField } from "../../../../types";

export default {
  component: NvsDynamicForm,
  title: "Array Field",
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
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new TextboxField({
        id: "lastName",
        placeholder: "Enter your last name",
        screenSize: {
          desktop: 6,
          mobile: 6,
        },
      }),
      new ArrayField({
        id: "addresses",
        label: "Addresses",
        addButtonOptions: {
          label: "Add Address",
        },
        defaultValues: [
          { cityName: "İzmir", districtName: "Göztepe" },
          { cityName: "İstanbul", districtName: "Kadıköy" },
        ],
        validate: Yup.array().min(2).max(3),
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
            label: "district Name",
            placeholder: "Enter your district name",
            screenSize: 6,
          }),
        ],
      }),
    ],
  },
};
