import { Validator } from "../Validator";
import { ISchema } from "../Schema";
import { SchemaError } from "../SchemaError";
export interface IObjectSchema extends ISchema {
    $type: 'object';
    keys: {
        [key: string]: ISchema;
    };
}
export declare class ObjectValidator extends Validator {
    private keys;
    constructor(schema: IObjectSchema);
    protected destructor(): IObjectSchema;
    protected validate(data: any, context?: any): SchemaError[];
}
