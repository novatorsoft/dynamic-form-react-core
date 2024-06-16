import { IScreenSize, ScreenSizeType } from "../../../types";

import { IField } from "./_type";
import React from "react";

export const Field = ({ formElements, field }: IField) => {
  const createFieldItemClass = (
    screenSize: ScreenSizeType | IScreenSize
  ): Array<string> => {
    const className: Array<string> = [];
    if (typeof screenSize == "number") className.push("nvs-col-" + screenSize);
    else {
      className.push("nvs-col-md-" + screenSize?.desktop);
      if (screenSize?.tablet) className.push("nvs-col-sm-" + screenSize.tablet);
      if (screenSize?.mobile) className.push("nvs-col-xs-" + screenSize.mobile);
    }
    return className;
  };

  const Field = formElements[field.fieldType!]?.component;
  return Field ? (
    <div
      key={field.id}
      className={createFieldItemClass(field.screenSize ?? 12).join(" ")}
    >
      <Field {...field} />
    </div>
  ) : (
    <></>
  );
};
