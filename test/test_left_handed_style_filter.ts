
import { describe, it } from "mocha"
import { assert, expect } from "chai"

import { LeftHandedStyleFilter } from "../src/filter"
import { Filter } from "../src/interfaces"


describe("Left hand style filter", function ()
{
    describe("Constructor tests", function ()
    {
        it("default open and close character of filter is [ and ]", () =>
        {
            let builder = new LeftHandedStyleFilter();
            assert(builder.openChar == LeftHandedStyleFilter.DEFAULT_OPEN);
            assert(builder.closeChar == LeftHandedStyleFilter.DEFAULT_CLOSE);
        });

        it("Custom open and close characters of filter can be passed as constructor argument", function ()
        {
            const open = "X";
            const close = "Y";
            let builder = new LeftHandedStyleFilter(open, close);

            assert(builder.openChar == open);
            assert(builder.closeChar == close);
        });
    });

    describe("test build calls", function ()
    {
        const FIELD = "my_field";
        const OPERATOR = "eq";
        const STR_VALUE = "val"
        const BOOL_VALUE = true;

        function createInstance(): LeftHandedStyleFilter
        {
            return new LeftHandedStyleFilter();
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
            let expected = field + "%5B" + operator + "%5D=" + value;

            assertData(result, expected);

        }

        it("test fully specified filter", function ()
        {
            doTest(FIELD, OPERATOR, STR_VALUE);
        });

        it("test filter with boolearn value", function ()
        {
            doTest(FIELD, OPERATOR, BOOL_VALUE);
        });

        it("test filter with empty string", function ()
        {
            doTest(FIELD, OPERATOR, "");
        });

        it("test NULL value. The 'null' value should trigger error", function ()
        {
            expect(() => doTest(FIELD, OPERATOR, null)).throws();
        });

        it("test UNDEFINED value. The `undefined` value should trigger error", function ()
        {
            expect(() => doTest(FIELD, OPERATOR, undefined)).throws();
        });
    });
});
