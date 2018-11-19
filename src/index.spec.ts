import "mocha";
import { expect } from "chai";
import { group, object, required, string, Schema } from ".";
import { GroupSchemaOperations } from "./validators/GroupValidator";

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

        expect(errors).to.length(1, "Should contains 1 error");
    });

    it("Correct creates a Schema object", () => {
        const schema = object({
            a: group([
                required(),
                string(),
            ]).when(required().ref("b")),
            b: object({
                c: string(),
                d: group([
                    required(),
                    object({
                        e: string(),
                        f: string(),
                    })
                ]),
            }),
        });

        expect(schema.schema).to.deep.equals({
            $type: "object",
            keys: {
                a: {
                    $type: "group",
                    $when: {
                        $type: "required",
                        $context: ["b"],
                    },
                    list: [
                        {$type: "required"},
                        {$type: "string"},
                    ],
                },
                b: {
                    $type: "object",
                    keys: {
                        c: {$type: "string"},
                        d: {
                            $type: "group",
                            list: [
                                {$type: "required"},
                                {
                                    $type: "object",
                                    keys: {
                                        e: {$type: "string"},
                                        f: {$type: "string"},
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
                        {$type: "required"},
                        {$type: "string"},
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
                                        {$type: "required"},
                                        {$type: "string"},
                                    ],
                                },
                                {
                                    $type: "object",
                                    keys: {
                                        d: {$type: "string"},
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        };

        expect(Schema.parse(schema)).to.deep.equals(
            object({
                a: group([
                    required(),
                    string(),
                ]),
                b: object({
                    c: group([
                        group([
                            required(),
                            string(),
                        ]),
                        object({
                            d: string(),
                        }),
                    ], GroupSchemaOperations.One)
                }).when(required().ref("a")),
            }),
            "Validator should be correctly build"
        );
    });
});
