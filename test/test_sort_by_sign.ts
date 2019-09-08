
import { describe, it } from "mocha"
import { expect } from "chai"

import { Sort } from "../src/interfaces"
import { SortBySign } from "../src/sort"


describe("Tests for SortBySign.", () =>
{
    const FIELD = "myField";

    it("Build ASC sorting", () =>
    {
        let instance = new SortBySign();
        let result = instance.build([{field: FIELD, direction: "asc"}]);

        expect(result.length).is.eq(1);
        expect(result).has.members([SortBySign.DEFAULT_KEY + "=%2B" + FIELD]);
    });

    it("Build DESC sorting", () =>
    {
        let instance = new SortBySign();
        let result = instance.build([{field: FIELD, direction: "desc"}]);

        expect(result.length).is.eq(1);
        expect(result).has.members([SortBySign.DEFAULT_KEY + "=-" + FIELD]);
    });
});
