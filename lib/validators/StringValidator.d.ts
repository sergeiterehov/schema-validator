import { Validator } from "../Validator";
import { ISchema } from "../Schema";
import { SchemaError } from "../SchemaError";
export interface IStringSchema extends ISchema {
}
export declare class StringValidator extends Validator {
    constructor(schema: IStringSchema);
    protected destructor(): IStringSchema;
    protected validate(data: any, context?: any): SchemaError[];
}
