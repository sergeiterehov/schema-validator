import { ISchema } from "../Schema";
import { Validator } from "../Validator";
import { SchemaError } from "../SchemaError";
export declare enum GroupSchemaOperations {
    All = "all",
    Any = "any",
    One = "one"
}
export interface IGroupSchema extends ISchema {
    $type: 'group';
    operation?: GroupSchemaOperations;
    list: ISchema[];
}
export declare class GroupValidator extends Validator {
    operation: GroupSchemaOperations;
    list: Validator[];
    constructor(schema: IGroupSchema);
    protected destructor(): IGroupSchema;
    protected validate(data: any, context?: any): SchemaError[];
}
