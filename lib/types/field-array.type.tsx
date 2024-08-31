import { FieldBase, GroupFields } from "./index";
import { ComponentType, CSSProperties } from "react";

export class ArrayField extends FieldBase<object[]> {
  fieldType?: string = "fieldArray";
  fields: Array<FieldBase<unknown>> | Array<GroupFields>;
  buttonComponent: ComponentType<any>;
  properties: string[];
  addButton: {
    label?: string;
    iconName?: JSX.Element;
    size?: string;
    style?: CSSProperties;
  };
  removeButton: {
    label?: string;
    iconName?: JSX.Element;
    size?: string;
    style?: CSSProperties;
  };

  constructor(options: ArrayField) {
    super(options, []);
    this.fields = options.fields ?? [];
    this.buttonComponent = options.buttonComponent;
    this.properties = options.properties;
    this.addButton = options.addButton;
    this.removeButton = options.removeButton;
  }
}
