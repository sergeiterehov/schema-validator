import { ISchema } from "./Schema";
import { SchemaError } from "./SchemaError";

const validators: { [s: string]: typeof Validator } = {};

function build(schema: ISchema): Validator {
    if (! schema.$type) {
        throw new Error('Undefined value of type ($type)');
    }

    if (! validators[schema.$type]) {
        throw new Error(`Unknown validator type "${schema.$type}"`);
    }

    const validatorClass: typeof Validator | any = validators[schema.$type];

    return new validatorClass(schema);
}

export function register<T extends typeof Validator>(type: string, validatorClass: T): T {
    if (! validators[type]) {
        validators[type] = validatorClass;
    }

    return validatorClass;
}

export abstract class Validator {
    private $when?: Validator;
    private $context?: any;

    constructor(schema: ISchema) {
        if (schema.$when) {
            this.$when = Validator.parse(schema.$when);
        }

        if (schema.$context) {
            this.$context = schema.$context;
        }
    }

    public static parse(schema: ISchema): Validator {
        return build(schema);
    }

    public static stringify(validator: Validator): string {
        return JSON.stringify(validator.schema);
    }

    protected abstract destructor(): ISchema;
    protected abstract validate(data: any, context?: any): SchemaError[];

    public get schema(): ISchema {
        return {
            $when: this.$when ? this.$when.schema : undefined,
            $context: this.$context,
            ...this.destructor(),
        };
    }

    public errors(data: any, context?: any): SchemaError[] {
        return this.validate(data, undefined !== context ? context : data);
    }

    public when(rule: Validator): Validator {
        this.$when = rule;

        return this;
    }

    public ref(...context: string[]): Validator {
        this.$context = context;

        return this;
    }
}
