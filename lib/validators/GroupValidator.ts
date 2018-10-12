import { ISchema } from "../Schema";
import { Validator, register } from "../Validator";
import { SchemaError } from "../SchemaError";

export enum GroupSchemaOperations {
    All = 'all',
    Any = 'any',
    One = 'one',
}

export interface IGroupSchema extends ISchema {
    $type: 'group';
    operation?: GroupSchemaOperations;
    list: ISchema[];
}

export class GroupValidator extends Validator {
    public operation: GroupSchemaOperations = GroupSchemaOperations.All;
    public list: ISchema[];

    constructor(schema: IGroupSchema) {
        super(schema);

        if (undefined !== schema.operation) {
            this.operation;
        }
    }

    public get schema(): IGroupSchema {
        return {
            $type: 'group',
            list: this.list,
            operation: this.operation,
        }
    }

    protected validate(): SchemaError[] {
        return [];
    }
}

register('group', GroupValidator);
