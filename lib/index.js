"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GroupValidator_1 = require("./validators/GroupValidator");
const ObjectValidatoe_1 = require("./validators/ObjectValidatoe");
const RequiredValidator_1 = require("./validators/RequiredValidator");
const StringValidator_1 = require("./validators/StringValidator");
exports.group = (list, operation = GroupValidator_1.GroupSchemaOperations.All) => new GroupValidator_1.GroupValidator({
    $type: 'group',
    list: list.map((item) => item.schema),
    operation: operation,
});
exports.object = (keys) => new ObjectValidatoe_1.ObjectValidator({
    $type: 'object',
    keys: (() => {
        const list = {};
        Object.keys(keys).forEach((key) => {
            list[key] = keys[key].schema;
        });
        return list;
    })(),
});
exports.required = (
//empty
) => new RequiredValidator_1.RequiredValidator({
    $type: 'required',
});
exports.string = (
// empty
) => new StringValidator_1.StringValidator({
    $type: 'string',
});
