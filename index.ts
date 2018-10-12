import { Validator } from "./lib/Validator";
import { GroupSchemaOperations, GroupValidator } from "./lib/validators/GroupValidator";

export const group = (list: Validator[], operation: GroupSchemaOperations = GroupSchemaOperations.All): GroupValidator => new GroupValidator({
    $type: 'group',
    list: list, // todo: конструктор должен получать НЕ схему
    operation: operation,
});