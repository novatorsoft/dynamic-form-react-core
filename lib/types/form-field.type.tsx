import * as Yup from "yup";

import { ChangeEvent, FocusEvent } from "react";
import { IScreenSize, ScreenSizeType } from "./screen-size.type";

export abstract class FieldBase<ValueType, HtmlElement = any> {
  id!: string;
  label?: string;
  fieldType?: string;
  defaultValue?: ValueType;
  screenSize?: ScreenSizeType | IScreenSize;
  validate?: Yup.AnySchema;
  error?: string;
  onChange?: (event: ChangeEvent<HtmlElement>) => void;
  onBlur?: (event: FocusEvent<HtmlElement>) => void;

  constructor(options: FieldBase<ValueType>, fieldDefaultValue?: ValueType) {
    this.defaultValue = options.defaultValue ?? fieldDefaultValue;
    this.id = options.id;
    this.label = options.label;
    this.fieldType = options.fieldType;
    this.screenSize = options.screenSize ?? 12;
    this.validate = options.validate;
    this.onChange = options.onChange;
    this.onBlur = options.onBlur;
  }
}
