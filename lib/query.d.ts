import { QueryFilter, QueryBuilderInterface, FilterBuilderInterface, SortBuilderInterface, PaginationBuilderInterface } from "./interfaces";
export declare abstract class AbstractQueryBuilder implements QueryBuilderInterface {
    abstract filterBuilder: FilterBuilderInterface;
    abstract sortBuilder: SortBuilderInterface;
    abstract paginationBuilder: PaginationBuilderInterface;
    build(query: QueryFilter): string[];
    private buildItems;
}
export declare class QueryBuilder extends AbstractQueryBuilder {
    filterBuilder: FilterBuilderInterface;
    sortBuilder: SortBuilderInterface;
    paginationBuilder: PaginationBuilderInterface;
    constructor(filterBuilder: FilterBuilderInterface, sortBuilder: SortBuilderInterface, paginationBuilder: PaginationBuilderInterface);
}
