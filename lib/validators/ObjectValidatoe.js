"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("../Validator");
class ObjectValidator extends Validator_1.Validator {
    constructor(schema) {
        super(schema);
        this.keys = {};
        Object.keys(schema.keys).forEach((key) => {
            this.keys[key] = Validator_1.Validator.parse(schema.keys[key]);
        });
    }
    destructor() {
        const keys = {};
        Object.keys(this.keys).forEach((key) => {
            keys[key] = this.keys[key].schema;
        });
        return {
            $type: 'object',
            keys: keys,
        };
    }
    validate(data, context) {
        const errors = [];
        if (undefined === data) {
            return errors;
        }
        if ('object' !== typeof data) {
            errors.push('Must be object');
        }
        else {
            Object.keys(this.keys).forEach((key) => {
                errors.push(...this.keys[key]
                    .errors(data[key], context)
                    .map((error) => `${key}: ${error}`));
            });
        }
        return errors;
    }
}
exports.ObjectValidator = ObjectValidator;
Validator_1.register('object', ObjectValidator);
