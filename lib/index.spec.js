"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const _1 = require(".");
describe("The common test", () => {
    it("Normal building validators objects", () => {
        const test = _1.object({
            firstName: _1.string(),
            lastName: _1.group([
                _1.required(),
                _1.string(),
            ]).when(_1.required().ref('firstName')),
        });
        console.log(test.errors({
            firstName: 'ivanov',
            lastName: 123,
        }));
    });
});
