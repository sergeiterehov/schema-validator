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
        switch (typeof data) {
            case 'string':
                if ('' === data) {
                    return ['String must be not empty'];
                }
                break;
            case 'object':
                if (Array.isArray(data)) {
                    if (0 === data.length) {
                        return ['Array must have elements'];
                    }
                } else {
                    if (0 === Object.keys(data).length) {
                        return ['Object must have some keys'];
                    }
                }
                break;
            default:
                if (undefined === data) {
                    return ['Item is required'];
                }
                break;
        }
        return [];
    }
}

register('required', RequiredValidator);
