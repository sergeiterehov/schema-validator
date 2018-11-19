import { ISchema } from "./Schema";
import { SchemaError } from "./SchemaError";

/**
 * Global defined validators.
 */
const validators: { [s: string]: typeof Validator } = {};

/**
 * Create a validators logic object the schema object.
 *
 * @param schema Validator schema object.
 */
function build(schema: ISchema): Validator {
    if (! schema.$type) {
        throw new Error('Undefined value of type ($type)');
    }

    if (! validators[schema.$type]) {
        throw new Error(`Unknown validator type "${schema.$type}"`);
    }

    const validatorClass: typeof Validator | any = validators[schema.$type];

    // TODO: validator must have static method for building from schema additional.
    // Here must use that static method.
    return new validatorClass(schema);
}

/**
 * Registrate vlidator by global name.
 *
 * @param type Global name of type.
 * @param validatorClass Validator based class, realizes the validators logic.
 */
export function register<T extends typeof Validator>(type: string, validatorClass: T): T {
    if (! validators[type]) {
        validators[type] = validatorClass;
    }

    return validatorClass;
}

/**
 * Base class of Validator.
 */
export abstract class Validator {
    private $when?: Validator;
    private $context?: string[];

    constructor(schema: ISchema) {
        if (schema.$when) {
            this.$when = Validator.parse(schema.$when);
        }

        if (schema.$context) {
            this.$context = schema.$context;
        }
    }

    /**
     * Convert a structure of validator to validator logic.
     *
     * @param schema Validator schema structure.
     */
    public static parse(schema: ISchema): Validator {
        return build(schema);
    }

    /**
     * Convert a validotrs object logic to JSON string of schema object.
     *
     * @param validator Validators logic object.
     */
    public static stringify(validator: Validator): string {
        return JSON.stringify(validator.schema);
    }

    protected abstract destructor(): ISchema;
    protected abstract validate(data: any, context?: any): SchemaError[];

    /**
     * Convert the validators logic object to a schema object.
     */
    public get schema(): ISchema {
        const schema = {
            $when: this.$when ? this.$when.schema : undefined,
            $context: this.$context,
            ...this.destructor(),
        };

        Object.keys(schema)
            .forEach((key) => {
                if (undefined === (schema as any)[key]) {
                    delete (schema as any)[key];
                }
            });
        
        return schema;
    }

    /**
     * Returns array of validations errors.
     *
     * @param data Validations data.
     * @param context Context of validator.
     */
    public errors(data: any, context?: any): SchemaError[] {
        if (this.$when && this.$when.errors(context, context).length) {
            return [];
        }
        
        let subject: any = data;
        
        if (this.$context && this.$context.length) {
            if ('object' !== typeof data) {
                throw new Error("Not nullable context can be used with object only")
            }
            
            subject = this.$context.reduce((src, item) => src[item], subject);
        }

        return this.validate(subject, undefined !== context ? context : data);
    }

    /**
     * Registrate the Whens validator.
     *
     * @param rule Whens validator.
     */
    public when(rule: Validator): Validator {
        this.$when = rule;

        return this;
    }

    /**
     * Registrate validations context.
     *
     * @param context Context of validator.
     */
    public ref(...context: string[]): Validator {
        this.$context = context;

        return this;
    }
}
