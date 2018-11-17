"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("../Validator");
class RequiredValidator extends Validator_1.Validator {
    constructor(schema) {
        super(schema);
    }
    destructor() {
        return {
            $type: 'required',
        };
    }
    validate(data, context) {
        return [];
    }
}
exports.RequiredValidator = RequiredValidator;
Validator_1.register('required', RequiredValidator);
