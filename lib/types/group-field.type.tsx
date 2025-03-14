import { FieldBase } from "./field-base.type";

export class GroupField {
  id!: string;
  fields: Array<FieldBase<unknown>>;
  containerVisible?: boolean;
  containerOptions?: Record<string, any>;

  constructor(options: GroupField) {
    this.id = options.id;
    this.fields = options.fields ?? [];
    this.containerVisible = options.containerVisible ?? false;
    this.containerOptions = options.containerOptions ?? {};
  }
}
