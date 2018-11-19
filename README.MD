# JSON Schema Validator

Validate you JSON now!

## How to?

```ts
import { group, object, required, string } from "schema-validator";

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