"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Global defined validators.
 */
const validators = {};
/**
 * Create a validators logic object the schema object.
 *
 * @param schema Validator schema object.
 */
function build(schema) {
    if (!schema.$type) {
        throw new Error('Undefined value of type ($type)');
    }
    if (!validators[schema.$type]) {
        throw new Error(`Unknown validator type "${schema.$type}"`);
    }
    const validatorClass = validators[schema.$type];
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
function register(type, validatorClass) {
    if (!validators[type]) {
        validators[type] = validatorClass;
    }
    return validatorClass;
}
exports.register = register;
/**
 * Base class of Validator.
 */
class Validator {
    constructor(schema) {
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
    static parse(schema) {
        return build(schema);
    }
    /**
     * Convert a validotrs object logic to JSON string of schema object.
     *
     * @param validator Validators logic object.
     */
    static stringify(validator) {
        return JSON.stringify(validator.schema);
    }
    /**
     * Convert the validators logic object to a schema object.
     */
    get schema() {
        const schema = Object.assign({ $when: this.$when ? this.$when.schema : undefined, $context: this.$context }, this.destructor());
        Object.keys(schema)
            .forEach((key) => {
            if (undefined === schema[key]) {
                delete schema[key];
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
    errors(data, context) {
        if (this.$when && this.$when.errors(context, context).length) {
            return [];
        }
        let subject = data;
        if (this.$context && this.$context.length) {
            if ('object' !== typeof data) {
                throw new Error("Not nullable context can be used with object only");
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
    when(rule) {
        this.$when = rule;
        return this;
    }
    /**
     * Registrate validations context.
     *
     * @param context Context of validator.
     */
    ref(...context) {
        this.$context = context;
        return this;
    }
}
exports.Validator = Validator;
