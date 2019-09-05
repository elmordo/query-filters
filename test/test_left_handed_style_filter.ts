
import { describe, it } from "mocha"
import { assert } from "chai"

import { LeftHandedStyleFilter } from "../src/filter"


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
})
