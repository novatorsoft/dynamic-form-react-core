import { FieldBase } from "./form-field.type";

export class GroupFields {
  id!: string;
  fields?: Array<FieldBase<unknown>>;

  constructor(options: GroupFields) {
    this.id = options.id;
    this.fields = options.fields ?? [];
  }
}
