import { Validator, register } from "../Validator";
import { ISchema } from "../Schema";
import { SchemaError } from "../SchemaError";

export interface IStringSchema extends ISchema {
    // empty
}

export class StringValidator extends Validator {
    constructor(schema: IStringSchema) {
        super(schema);
    }

    protected destructor(): IStringSchema {
        return {
            $type: 'string',
        };
    }

    protected validate(data: any, context?: any): SchemaError[] {
        const errors: SchemaError[] = [];
    
        if ('string' !== typeof data) {
            errors.push('Must be string');
        }

        return errors;
    }
}

register('string', StringValidator);
