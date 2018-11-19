"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const _1 = require(".");
const GroupValidator_1 = require("./validators/GroupValidator");
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
        chai_1.expect(errors).to.length(1, "Should contains 1 error");
    });
    it("Correct creates a Schema object", () => {
        const schema = _1.object({
            a: _1.group([
                _1.required(),
                _1.string(),
            ]).when(_1.required().ref("b")),
            b: _1.object({
                c: _1.string(),
                d: _1.group([
                    _1.required(),
                    _1.object({
                        e: _1.string(),
                        f: _1.string(),
                    })
                ]),
            }),
        });
        chai_1.expect(schema.schema).to.deep.equals({
            $type: "object",
            keys: {
                a: {
                    $type: "group",
                    $when: {
                        $type: "required",
                        $context: ["b"],
                    },
                    list: [
                        { $type: "required" },
                        { $type: "string" },
                    ],
                },
                b: {
                    $type: "object",
                    keys: {
                        c: { $type: "string" },
                        d: {
                            $type: "group",
                            list: [
                                { $type: "required" },
                                {
                                    $type: "object",
                                    keys: {
                                        e: { $type: "string" },
                                        f: { $type: "string" },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        }, "Schema should be correclty built");
    });
    it("Correct creates a Validator", () => {
        const schema = {
            $type: "object",
            keys: {
                a: {
                    $type: "group",
                    list: [
                        { $type: "required" },
                        { $type: "string" },
                    ],
                },
                b: {
                    $type: "object",
                    $when: {
                        $type: "required",
                        $context: ["a"],
                    },
                    keys: {
                        c: {
                            $type: "group",
                            operation: "one",
                            list: [
                                {
                                    $type: "group",
                                    list: [
                                        { $type: "required" },
                                        { $type: "string" },
                                    ],
                                },
                                {
                                    $type: "object",
                                    keys: {
                                        d: { $type: "string" },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        };
        chai_1.expect(_1.Schema.parse(schema)).to.deep.equals(_1.object({
            a: _1.group([
                _1.required(),
                _1.string(),
            ]),
            b: _1.object({
                c: _1.group([
                    _1.group([
                        _1.required(),
                        _1.string(),
                    ]),
                    _1.object({
                        d: _1.string(),
                    }),
                ], GroupValidator_1.GroupSchemaOperations.One)
            }).when(_1.required().ref("a")),
        }), "Validator should be correctly build");
    });
});
