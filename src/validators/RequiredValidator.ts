import { Validator, register } from "../Validator";
import { SchemaError } from "../SchemaError";
import { ISchema } from "../Schema";

export interface IRequiredSchema extends ISchema {
    // empty
}

export class RequiredValidator extends Validator {
    constructor(schema: IRequiredSchema) {
        super(schema);
    }

    protected destructor(): IRequiredSchema {
        return {
            $type: 'required',
        };
    }

    protected validate(data: any, context?: any): SchemaError[] {
        return [];
    }
}

register('required', RequiredValidator);
