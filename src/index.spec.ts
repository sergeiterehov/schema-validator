import "mocha";
import { expect } from "chai";
import { group, object, required, string } from ".";

describe("The common test", () => {
    it("Normal building validators objects", () => {
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

        expect(errors).length(1, "Should contains 1 error");
    });
});
