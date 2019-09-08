
import { describe, it } from "mocha"
import { expect } from "chai"

import { Sort } from "../src/interfaces"
import { SortByProperty } from "../src/sort"


describe("Tests for SortByProperty.", () =>
{
    const FIELD = "myField";

    it("Build ASC sorting", () =>
    {
        let instance = new SortByProperty();
        let result = instance.build([{field: FIELD, direction: "asc"}]);

        expect(result.length).is.eq(1);
        expect(result).has.members([SortByProperty.DEFAULT_KEY + "=" + FIELD + ".asc"]);
    });

    it("Build DESC sorting", () =>
    {
        let instance = new SortByProperty();
        let result = instance.build([{field: FIELD, direction: "desc"}]);

        expect(result.length).is.eq(1);
        expect(result).has.members([SortByProperty.DEFAULT_KEY + "=" + FIELD + ".desc"]);
    });
});
