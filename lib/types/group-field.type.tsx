import { FieldType } from "../nvs-dynamic-form";

export class GroupField {
  id!: string;
  fields: Array<FieldType>;
  containerVisible?: boolean;
  containerOptions?: Record<string, any>;

  constructor(options: GroupField) {
    this.id = options.id;
    this.fields = options.fields ?? [];
    this.containerVisible = options.containerVisible ?? false;
    this.containerOptions = options.containerOptions ?? {};
  }
}
