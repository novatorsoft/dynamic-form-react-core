import {
  ArrayFieldAddButton,
  ArrayFieldRemoveButton,
} from "./array-field-action-button.type";

import { FieldBase } from "./field-base.type";

export class ArrayField<ValueType = { [key: string]: any }> {
  fieldType?: string = "fieldArray";
  id!: string;
  fields: Array<FieldBase<any>>;
  addButtonOptions?: ArrayFieldAddButton;
  removeButtonOptions?: ArrayFieldRemoveButton;
  defaultValues?: Array<ValueType>;

  constructor(options: ArrayField<ValueType>) {
    this.id = options.id;
    this.fields = options.fields ?? [];
    this.addButtonOptions = options.addButtonOptions ?? {};
    this.removeButtonOptions = options.removeButtonOptions ?? {};
    this.defaultValues = options.defaultValues ?? [];
  }
}
