import { ISchema } from "./Schema";
import { SchemaError } from "./SchemaError";
/**
 * Registrate vlidator by global name.
 *
 * @param type Global name of type.
 * @param validatorClass Validator based class, realizes the validators logic.
 */
export declare function register<T extends typeof Validator>(type: string, validatorClass: T): T;
/**
 * Base class of Validator.
 */
export declare abstract class Validator {
    private $when?;
    private $context?;
    constructor(schema: ISchema);
    /**
     * Convert a structure of validator to validator logic.
     *
     * @param schema Validator schema structure.
     */
    static parse(schema: ISchema): Validator;
    /**
     * Convert a validotrs object logic to JSON string of schema object.
     *
     * @param validator Validators logic object.
     */
    static stringify(validator: Validator): string;
    protected abstract destructor(): ISchema;
    protected abstract validate(data: any, context?: any): SchemaError[];
    /**
     * Convert the validators logic object to a schema object.
     */
    readonly schema: ISchema;
    /**
     * Returns array of validations errors.
     *
     * @param data Validations data.
     * @param context Context of validator.
     */
    errors(data: any, context?: any): SchemaError[];
    /**
     * Registrate the Whens validator.
     *
     * @param rule Whens validator.
     */
    when(rule: Validator): Validator;
    /**
     * Registrate validations context.
     *
     * @param context Context of validator.
     */
    ref(...context: string[]): Validator;
}
