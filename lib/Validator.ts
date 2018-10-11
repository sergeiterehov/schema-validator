import { ISchema } from "./Schema";

abstract class Validator {
    public abstract get schema(): ISchema;
}

enum GroupSchemaOperations {
    All = 'all',
    Any = 'any',
    One = 'one',
}

interface IGroupSchema extends ISchema {
    $type: 'group';
    operation?: GroupSchemaOperations;
    list: ISchema[];
}

class GroupValidator extends Validator {
    public operation: GroupSchemaOperations = GroupSchemaOperations.All;
    public list: ISchema[];

    constructor(schema: IGroupSchema) {
        super();

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
}
