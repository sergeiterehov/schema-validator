import { Validator, register } from "../Validator";
import { ISchema } from "../Schema";
import { SchemaError } from "../SchemaError";

export interface IObjectSchema extends ISchema {
    $type: 'object';
    keys: {[key: string]: ISchema};
}

export class ObjectValidator extends Validator {
    private keys: {[key: string]: Validator};

    constructor(schema: IObjectSchema) {
        super(schema);

        this.keys = {};

        Object.keys(schema.keys).forEach((key) => {
            this.keys[key] = Validator.parse(schema.keys[key]);
        });
    }

    protected destructor(): IObjectSchema {
        const keys = {};

        Object.keys(this.keys).forEach((key) => {
            keys[key] = this.keys[key].schema;
        });

        return {
            $type: 'object',
            keys: keys,
        };
    }

    protected validate(): SchemaError[] {
        return [];
    }
}

register('object', ObjectValidator);
