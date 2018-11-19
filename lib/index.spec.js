"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const _1 = require(".");
describe("The common test", () => {
    it("Normal building validators objects", () => {
        const test = _1.object({
            firstName: _1.string(),
            lastName: _1.group([
                _1.required(),
                _1.string(),
            ]).when(_1.required().ref("firstName")),
        });
        const errors = test.errors({
            firstName: "Ivan",
        });
        chai_1.expect(errors).length(1, "Should contains 1 error");
    });
});
