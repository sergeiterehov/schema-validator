"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("../Validator");
class StringValidator extends Validator_1.Validator {
    constructor(schema) {
        super(schema);
    }
    destructor() {
        return {
            $type: 'string',
        };
    }
    validate(data, context) {
        const errors = [];
        if (undefined === data) {
            return errors;
        }
        if ('string' !== typeof data) {
            errors.push('Must be string');
        }
        return errors;
    }
}
exports.StringValidator = StringValidator;
Validator_1.register('string', StringValidator);
