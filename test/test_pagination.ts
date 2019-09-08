
import { describe, it } from "mocha"
import { assert, expect } from "chai"

import { Pagination } from "../src/interfaces"
import { PaginationByTwoKeys } from "../src/pagination"


describe("Test of PaginationByTwoKeys", () =>
{
    describe("Tests for constructor", () =>
    {
        it("Constructor without parameters", () =>
        {
            let instance = new PaginationByTwoKeys();

            assert(instance.perPageKey == PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY);
            assert(instance.pageKey == PaginationByTwoKeys.DEFAULT_PAGE_KEY);
        });

        it("Constructor with parameters", () =>
        {
            let perPageKey = "myPerPage";
            let pageKey = "myPage";
            let instance = new PaginationByTwoKeys(perPageKey, pageKey);

            assert(instance.perPageKey == perPageKey);
            assert(instance.pageKey == pageKey);
        });
    });

    describe("Test build method", () =>
    {
        it("Common build", () =>
        {
            let instance = new PaginationByTwoKeys();
            let page = 13;
            let perPage = 666;
            let pagination: Pagination = {page: page, perPage: perPage};

            let data = instance.build(pagination);
            let perPageVal = PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY + "=" + perPage.toString();
            let pageVal = PaginationByTwoKeys.DEFAULT_PAGE_KEY + "=" + page.toString();

            expect(data.length).to.be.equal(2);
            expect(data).members([perPageVal, pageVal]);
        });
    });
});
