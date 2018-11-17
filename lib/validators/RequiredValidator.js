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
                }
                else {
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
exports.RequiredValidator = RequiredValidator;
Validator_1.register('required', RequiredValidator);
