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
    public list: Validator[];

    constructor(schema: IGroupSchema) {
        super(schema);

        this.list = schema.list.map(Validator.parse);

        if (undefined !== schema.operation) {
            this.operation;
        }
    }

    protected destructor(): IGroupSchema {
        return {
            $type: 'group',
            list: this.list.map((rule) => rule.schema),
            operation: this.operation,
        }
    }

    protected validate(data: any, context?: any): SchemaError[] {
        const errors: SchemaError[] = [];
        this.list.forEach((rule) => errors.push(...rule.errors(data, context)));

        return errors;
    }
}

register('group', GroupValidator);
