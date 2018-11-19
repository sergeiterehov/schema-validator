# JSON Schema Validator

Validate you JSON now!

## How to?

```ts
import { group, object, required, string } from "json-sv";

const test = object({
    firstName: string(),
    lastName: group([
        required(),
        string(),
    ]).when(required().ref("firstName")),
});

const errors = test.errors({
    firstName: "Ivan",
});

console.log("Errors:", errors);
```

## Format

Uses JSON format for a Schema declaration.
For example:

```json
{
    "$type": "object",
    "keys": {
        "a": {
            "$type": "required"
        },
        "b": {
            "$type": "required",
            "$when": {
                "$type": "required",
                "$context": ["a"]
            }
        }
    }
}
```

### Base Validator

A base Validators declaration should contains follow propertie: `$type` - string, one of available validators name. If you want to declare conditionaly validator (should be current validator execut, or not), use `$when` - schema. When you uses `$when`, internal conditional validator checks same data (from parent validator), for changing validation context, use `$context` - array of string, a route in root data.

```ts
type ISchemaContext = string[];

interface ISchema {
    $type: string;
    $when?: ISchema;
    $context?: ISchemaContext;
}
```

## Parse/Stringify/Objectify

You can parse a object declaration or a JSON string to the Validator.
Also actually you can create the object declaration or the JSON string from a Validator.

```ts
import { Schema, group, object, required, string } from "schema-validator";

const subSchema = Schema.parse(mySchemaJsonStringOrObject);
const schema = object({
    name: group([
        required(),
        string(),
    ]),
    data: subSchema,
});

const finalSchemaObject = Schema.objectify(schema);
const finalSchemaObject_1 = schema.schema;

const finalSchemaJson = Schema.stringify(schema);
const finalSchemaJson_1 = JSON.stringify(schema.schema);
```