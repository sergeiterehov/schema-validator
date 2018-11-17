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
    public operation: GroupSchemaOperations;
    public list: Validator[];

    constructor(schema: IGroupSchema) {
        super(schema);

        this.list = schema.list.map(Validator.parse);

        if (undefined === schema.operation) {
            this.operation = GroupSchemaOperations.All;
        } else {
            this.operation = schema.operation;
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

        if (! errors) {
            return errors;
        }

        switch (this.operation) {
            case GroupSchemaOperations.All:
                break;
            case GroupSchemaOperations.Any:
                if (errors.length < this.list.length) {
                    return [];
                }
                break;
            case GroupSchemaOperations.One:
                if (errors.length === this.list.length - 1) {
                    return [];
                }
                break;
            default:
                break;
        }

        return errors;
    }
}

register('group', GroupValidator);
