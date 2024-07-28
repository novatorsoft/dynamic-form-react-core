import { FieldType } from "../_type";
import { ReactNode } from "react";

export interface IFormikForm {
  onSubmit?: ((values: unknown) => void) | ((values: unknown) => Promise<void>);
  fields: Array<FieldType>;
  children: ReactNode;
  formClass?: string;
}
