
import { describe, it } from "mocha"
import { assert, expect } from "chai"

import { RightHandStyleFilter } from "../src/filter"
import { Filter } from "../src/interfaces"


describe("Right hand style filter", function ()
{
    describe("Constructor tests", function ()
    {
        it("Default separator is :", () =>
        {
            let builder = new RightHandStyleFilter();
            assert(builder.separator == RightHandStyleFilter.DEFAULT_SEPARATOR);
        });

        it("Custom open and close characters of filter can be passed as constructor argument", function ()
        {
            const separator = "~";
            let builder = new RightHandStyleFilter(separator);

            assert(builder.separator == separator);
        });
    });

    describe("Build calls", function ()
    {
        const FIELD = "my_field";
        const OPERATOR = "eq";
        const STR_VALUE = "val"
        const BOOL_VALUE = true;

        function createInstance(): RightHandStyleFilter
        {
            return new RightHandStyleFilter();
        }

        function assertData(filters: string[], expected: string)
        {
            assert(filters.length == 1);
            assert(filters[0] == expected, "Expected '" + expected + "' but '" + filters[0] + "' was given");
        }

        function doTest(field: string, operator: string, value?: any)
        {
            let f: Filter = {field: field, operator: operator, value: value};
            let builder = createInstance();
            let result = builder.build([f]);
            let expected = field + "=" + operator + "%3A" + value;

            assertData(result, expected);

        }

        it("Test fully specified filter", function ()
        {
            doTest(FIELD, OPERATOR, STR_VALUE);
        });

        it("Test filter with boolearn value", function ()
        {
            doTest(FIELD, OPERATOR, BOOL_VALUE);
        });

        it("Test filter with empty string", function ()
        {
            doTest(FIELD, OPERATOR, "");
        });

        it("Test NULL value. The 'null' value should trigger error", function ()
        {
            expect(() => doTest(FIELD, OPERATOR, null)).throws();
        });

        it("Test UNDEFINED value. The `undefined` value should trigger error", function ()
        {
            expect(() => doTest(FIELD, OPERATOR, undefined)).throws();
        });
    });
});
