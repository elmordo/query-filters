
import { describe, it } from "mocha"
import { expect } from "chai"

import { Sort } from "../src/interfaces"
import { SortByFunction } from "../src/sort"


describe("Tests for SortByFunction.", () =>
{
    const FIELD = "myField";

    it("Build ASC sorting", () =>
    {
        let instance = new SortByFunction();
        let result = instance.build([{field: FIELD, direction: "asc"}]);

        expect(result.length).is.eq(1);
        expect(result).has.members([SortByFunction.DEFAULT_KEY + "=asc(" + FIELD + ")"]);
    });

    it("Build DESC sorting", () =>
    {
        let instance = new SortByFunction();
        let result = instance.build([{field: FIELD, direction: "desc"}]);

        expect(result.length).is.eq(1);
        expect(result).has.members([SortByFunction.DEFAULT_KEY + "=desc(" + FIELD + ")"]);
    });
});
