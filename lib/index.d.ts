import { GroupSchemaOperations, GroupValidator } from "./validators/GroupValidator";
import { Validator } from "./Validator";
import { ObjectValidator } from "./validators/ObjectValidatoe";
import { RequiredValidator } from "./validators/RequiredValidator";
import { StringValidator } from "./validators/StringValidator";
import { ISchema } from "./Schema";
export declare const Schema: {
    parse: (schema: ISchema) => Validator;
    stringify: (validator: Validator) => string;
};
export declare const group: (list: Validator[], operation?: GroupSchemaOperations) => GroupValidator;
export declare const object: (keys: {
    [key: string]: Validator;
}) => ObjectValidator;
export declare const required: () => RequiredValidator;
export declare const string: () => StringValidator;
