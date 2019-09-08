
import { expect, assert } from "chai"
import { describe, it } from "mocha"

import { QueryFilter, Filter, Sort, Pagination } from "../src/interfaces"
import { QueryBuilder } from "../src/query"
import { RightHandStyleFilter } from "../src/filter"
import { PaginationByTwoKeys } from "../src/pagination"
import { SortByFunction } from "../src/sort"


describe("Test query builder", () =>
{
    describe("Test constructor", () =>
    {
        it("Constructor with all builders", () =>
        {
            let filterBuilder = new RightHandStyleFilter();
            let paginationBuilder = new PaginationByTwoKeys();
            let sortBuilder = new SortByFunction();

            let instance = new QueryBuilder(filterBuilder, sortBuilder, paginationBuilder);

            assert(instance.filterBuilder === filterBuilder);
            assert(instance.sortBuilder === sortBuilder);
            assert(instance.paginationBuilder === paginationBuilder);
        });

        it("Constructor with none builders", () =>
        {
            let filterBuilder = null;
            let paginationBuilder = null;
            let sortBuilder = null;

            let instance = new QueryBuilder(filterBuilder, sortBuilder, paginationBuilder);

            assert(instance.filterBuilder === filterBuilder);
            assert(instance.sortBuilder === sortBuilder);
            assert(instance.paginationBuilder === paginationBuilder);
        })
    });

    const FIELD_1 = "field1";
    const FIELD_2 = "field2";

    const OPERATOR_1 = "eq";
    const OPERATOR_2 = "neq";

    const VALUE_1 = "val1";
    const VALUE_2 = "val2";

    const PAGE = 3
    const PER_PAGE = 22;

    function createFilters(): Filter[]
    {
        return [
            {field: FIELD_1, operator: OPERATOR_1, value: VALUE_1},
            {field: FIELD_2, operator: OPERATOR_2, value: VALUE_2},
        ];
    }

    function createSorts(): Sort[]
    {
        return [
            {field: FIELD_1, direction: "asc"},
            {field: FIELD_2, direction: "desc"},
        ]
    }

    function createPagination(): Pagination
    {
        return {perPage: PER_PAGE, page: PAGE};
    }

    describe("Build items", () =>
    {
        it("All filters", function ()
        {
            let instance = new QueryBuilder(
                new RightHandStyleFilter(),
                new SortByFunction(),
                new PaginationByTwoKeys());

            let items = instance.build({
                filters: createFilters(),
                sorts: createSorts(),
                pagination: createPagination()}
            );

            expect(items).have.members([
                FIELD_1 + "=" + OPERATOR_1 + "%3A" + VALUE_1,
                FIELD_2 + "=" + OPERATOR_2 + "%3A" + VALUE_2,
                SortByFunction.DEFAULT_KEY + "=" + SortByFunction.DEFAULT_ASC + "(" + FIELD_1 + ")",
                SortByFunction.DEFAULT_KEY + "=" + SortByFunction.DEFAULT_DESC + "(" + FIELD_2 + ")",
                PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY + "=" + PER_PAGE,
                PaginationByTwoKeys.DEFAULT_PAGE_KEY + "=" + PAGE,
            ]);
        });

        it("All some filters", function ()
        {
            let instance = new QueryBuilder(
                new RightHandStyleFilter(),
                null,
                new PaginationByTwoKeys());

            let items = instance.build({
                filters: createFilters(),
                sorts: createSorts(),
                pagination: null}
            );

            expect(items).have.members([
                FIELD_1 + "=" + OPERATOR_1 + "%3A" + VALUE_1,
                FIELD_2 + "=" + OPERATOR_2 + "%3A" + VALUE_2,
            ]);
        });
    });

    describe("Build items to string", () =>
    {
        it("All filters", function ()
        {
            let instance = new QueryBuilder(
                new RightHandStyleFilter(),
                new SortByFunction(),
                new PaginationByTwoKeys());

            let items = instance.buildString({
                filters: createFilters(),
                sorts: createSorts(),
                pagination: createPagination()}
            );

            expect(items).have.include(
                FIELD_1 + "=" + OPERATOR_1 + "%3A" + VALUE_1
            ).include(
                FIELD_2 + "=" + OPERATOR_2 + "%3A" + VALUE_2
            ).include(
                SortByFunction.DEFAULT_KEY + "=" + SortByFunction.DEFAULT_ASC + "(" + FIELD_1 + ")"
            ).include(
                SortByFunction.DEFAULT_KEY + "=" + SortByFunction.DEFAULT_DESC + "(" + FIELD_2 + ")"
            ).include(
                PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY + "=" + PER_PAGE
            ).include(
                PaginationByTwoKeys.DEFAULT_PAGE_KEY + "=" + PAGE
            );
        });

        it("All some filters", function ()
        {
            let instance = new QueryBuilder(
                new RightHandStyleFilter(),
                null,
                new PaginationByTwoKeys());

            let items = instance.buildString({
                filters: createFilters(),
                sorts: createSorts(),
                pagination: null}
            );

            expect(items).have.include(
                FIELD_1 + "=" + OPERATOR_1 + "%3A" + VALUE_1
            ).include(
                FIELD_2 + "=" + OPERATOR_2 + "%3A" + VALUE_2
            );
        });
    });
});
