import { FieldBase } from "./form-field.type";

export class GroupFields {
  id!: string;
  fields?: Array<FieldBase<unknown>>;
  containerVisible?: boolean;
  containerOptions?: { [key: string]: any };

  constructor(options: GroupFields) {
    this.id = options.id;
    this.fields = options.fields ?? [];
    this.containerVisible = options.containerVisible ?? true;
    this.containerOptions = options.containerOptions;
  }
}
