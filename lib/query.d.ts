import { CommonBuilderBase } from "./base";
import { QueryFilter, QueryBuilderInterface, FilterBuilderInterface, SortBuilderInterface, PaginationBuilderInterface, KeyMultiValueList } from "./interfaces";
export declare abstract class AbstractQueryBuilder extends CommonBuilderBase<QueryFilter> implements QueryBuilderInterface {
    abstract filterBuilder: FilterBuilderInterface;
    abstract sortBuilder: SortBuilderInterface;
    abstract paginationBuilder: PaginationBuilderInterface;
    build(query: QueryFilter): string[];
    buildKeyList(query: QueryFilter): KeyMultiValueList;
    buildString(query: QueryFilter): string;
    private buildItems;
    protected addItemsToResult(items: KeyMultiValueList, result: KeyMultiValueList): void;
}
export declare class QueryBuilder extends AbstractQueryBuilder {
    filterBuilder: FilterBuilderInterface;
    sortBuilder: SortBuilderInterface;
    paginationBuilder: PaginationBuilderInterface;
    constructor(filterBuilder: FilterBuilderInterface, sortBuilder: SortBuilderInterface, paginationBuilder: PaginationBuilderInterface);
}
