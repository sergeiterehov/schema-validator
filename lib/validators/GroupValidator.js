"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = require("../Validator");
var GroupSchemaOperations;
(function (GroupSchemaOperations) {
    GroupSchemaOperations["All"] = "all";
    GroupSchemaOperations["Any"] = "any";
    GroupSchemaOperations["One"] = "one";
})(GroupSchemaOperations = exports.GroupSchemaOperations || (exports.GroupSchemaOperations = {}));
class GroupValidator extends Validator_1.Validator {
    constructor(schema) {
        super(schema);
        this.operation = GroupSchemaOperations.All;
        this.list = schema.list.map(Validator_1.Validator.parse);
        if (undefined !== schema.operation) {
            this.operation;
        }
    }
    destructor() {
        return {
            $type: 'group',
            list: this.list.map((rule) => rule.schema),
            operation: this.operation,
        };
    }
    validate(data, context) {
        const errors = [];
        this.list.forEach((rule) => errors.push(...rule.errors(data, context)));
        return errors;
    }
}
exports.GroupValidator = GroupValidator;
Validator_1.register('group', GroupValidator);
