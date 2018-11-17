import "mocha";
import { group, object, required, string } from ".";

describe("The common test", () => {
    it("Normal building validators objects", () => {
        const test = object({
            firstName: string(),
            lastName: group([
                required(),
                string(),
            ]).when(required().ref('firstName')),
        });
        
        const errors = test.errors({
            firstName: 'ivanov',
            lastName: 123,
        });

        console.log(errors);
    });
});
