import { GroupSchemaOperations, GroupValidator } from "./validators/GroupValidator";
import { Validator } from "./Validator";
import { ObjectValidator } from "./validators/ObjectValidatoe";
import { RequiredValidator } from "./validators/RequiredValidator";
import { StringValidator } from "./validators/StringValidator";
import { ISchema } from "./Schema";

export const Schema = {
    parse: (schema: ISchema | string) => {
        if ("string" === typeof schema) {
            schema = JSON.parse(schema);
        }

        Validator.parse(schema as ISchema);
    },
    objectify: (validator: Validator) => validator.schema,
    stringify: (validator: Validator) => Validator.stringify(validator),
};

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
        const list: {[key: string]: ISchema} = {};

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
