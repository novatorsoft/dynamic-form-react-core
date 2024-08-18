import * as Yup from "yup";
import { FieldBase } from "../../../types";

export class ArrayField {
    fieldType?: string = "fieldArray";
    id!: string;
    fields: Array<FieldBase<unknown>>;
    defaultValue: any[];
    validate?: Yup.AnySchema;
    screenSize?: any

    constructor(options: ArrayField) {
        this.id = options.id;
        this.fieldType = options.fieldType
        this.fields = options.fields ?? [];
        this.defaultValue = options.defaultValue;
        this.validate = options.validate;
        this.screenSize = options.screenSize;
    }
}
