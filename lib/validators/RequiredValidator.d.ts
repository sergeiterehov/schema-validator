import { Validator } from "../Validator";
import { SchemaError } from "../SchemaError";
import { ISchema } from "../Schema";
export interface IRequiredSchema extends ISchema {
}
export declare class RequiredValidator extends Validator {
    constructor(schema: IRequiredSchema);
    protected destructor(): IRequiredSchema;
    protected validate(data: any, context?: any): SchemaError[];
}
