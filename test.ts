import { group, object, required, string } from ".";
import { Validator } from "./lib/Validator";

const test = object({
    firstName: string(),
    lastName: group([
        required(),
        string(),
    ]).when(required().ref('firstName')),
});

console.log(test.errors({
    firstName: 'ivanov',
    lastName: 123,
}));
