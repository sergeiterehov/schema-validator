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
        this.list = schema.list.map(Validator_1.Validator.parse);
        if (undefined === schema.operation) {
            this.operation = GroupSchemaOperations.All;
        }
        else {
            this.operation = schema.operation;
        }
    }
    destructor() {
        return {
            $type: 'group',
            list: this.list.map((rule) => rule.schema),
            operation: GroupSchemaOperations.All === this.operation
                ? undefined
                : this.operation,
        };
    }
    validate(data, context) {
        const errors = [];
        this.list.forEach((rule) => errors.push(...rule.errors(data, context)));
        if (!errors) {
            return errors;
        }
        switch (this.operation) {
            case GroupSchemaOperations.All:
                break;
            case GroupSchemaOperations.Any:
                if (errors.length < this.list.length) {
                    return [];
                }
                break;
            case GroupSchemaOperations.One:
                if (errors.length === this.list.length - 1) {
                    return [];
                }
                break;
            default:
                break;
        }
        return errors;
    }
}
exports.GroupValidator = GroupValidator;
Validator_1.register('group', GroupValidator);
