import { GroupSchemaOperations, GroupValidator } from "./lib/validators/GroupValidator";
import { Validator } from "./lib/Validator";
import { ObjectValidator } from "./lib/validators/ObjectValidatoe";
import { RequiredValidator } from "./lib/validators/RequiredValidator";
import { StringValidator } from "./lib/validators/StringValidator";

export const group = (
    list: Validator[],
    operation: GroupSchemaOperations = GroupSchemaOperations.All
): GroupValidator => new GroupValidator({
    $type: 'group',
    list: list.map((item) => item.schema),
    operation: operation,
});

export const object = (
    keys: {[key: string]: Validator},
) => new ObjectValidator({
    $type: 'object',
    keys: (() => {
        const list = {};

        Object.keys(keys).forEach((key) => {
            list[key] = keys[key].schema;
        });

        return list;
    })(),
});

export const required = (
    //empty
) => new RequiredValidator({
    $type: 'required',
});

export const string = (
    // empty
) => new StringValidator({
    $type: 'string',
});
