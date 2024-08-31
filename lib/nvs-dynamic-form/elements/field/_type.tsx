import { FieldBase } from "../../../types";
import React from "react";

export interface IFormElement {
  [key: string]: {
    component: React.FC<any>;
    class: typeof FieldBase<any>;
  };
}

export interface IField {
  field: FieldBase<unknown>;
  formElements: IFormElement;
}
