
import { CommonBuilderBase } from "./base";
import {
    QueryFilter,
    QueryBuilderInterface,
    FilterBuilderInterface,
    SortBuilderInterface,
    PaginationBuilderInterface,
    CommonBuilderInterface,
    KeyMultiValueList
} from "./interfaces"


/**
 * provides basic functionality
 * has abstract properties for each type of builder
 * @type {Object}
 */
export abstract class AbstractQueryBuilder extends CommonBuilderBase<QueryFilter> implements QueryBuilderInterface
{
    /**
     * filter builder
     * @type {FilterBuilderInterface}
     */
    abstract filterBuilder: FilterBuilderInterface;

    /**
     * sort builder
     * @type {SortBuilderInterface}
     */
    abstract sortBuilder: SortBuilderInterface;

    /**
     * pagination builder
     * @type {PaginationBuilderInterface}
     */
    abstract paginationBuilder: PaginationBuilderInterface;

    /**
     * build query
     * if some builder is not provided, it is skipped
     * @param  {QueryFilter} query filter settings to be built
     * @return {string[]}          URL-like key value pairs
     */
    build(query: QueryFilter): string[]
    {
        return [].concat(
            this.buildItems(this.filterBuilder, query.filters),
            this.buildItems(this.sortBuilder, query.sorts),
            this.buildItems(this.paginationBuilder, query.pagination)
        )
    }

    /**
     * build key-multivalue list of items
     * @param  {QueryFilter}       query query definition
     * @return {KeyMultiValueList}       built items
     */
    buildKeyList(query: QueryFilter): KeyMultiValueList
    {
        const result = {};
        const filterKeys = this.buildItems(this.filterBuilder, query.filters);
        const sortKeys = this.buildItems(this.sortBuilder, query.sorts);
        const paginationKeys = this.buildItems(this.paginationBuilder, query.pagination);

        this.addItemsToResult(filterKeys, result);
        this.addItemsToResult(sortKeys, result);
        this.addItemsToResult(paginationKeys, result);

        return result;
    }

    /**
     * build all parts of query and join them into one string like `k1=v1&k2=v2&...`
     * @param  {QueryFilter} query query to be built
     * @return {string[]}          query string
     */
    buildString(query: QueryFilter): string
    {
        return this.build(query).join("&");
    }

    /**
     * build items of one kind
     * @param   {CommonBuilderInterface<ItemType>} builder instance of the builder
     * @param   {Item}                             item    item to be built
     * @returns {string[]}                                 built URL like key-value pairs
     */
    private buildItems<ItemType>(builder: CommonBuilderInterface<ItemType>, item: ItemType): KeyMultiValueList
    {
        let result: KeyMultiValueList = {};

        if (builder && item)
            result = builder.buildKeyList(item);

        return result;
    }

    protected addItemsToResult(items: KeyMultiValueList, result: KeyMultiValueList): void
    {
        for (const key in items)
        {
            items[key].forEach(v => this.addPairToResult(key, v, result));
        }
    }
}


/**
 * query builder for most cases of use
 * @type {Object}
 */
export class QueryBuilder extends AbstractQueryBuilder
{
    /**
     * initialize instance
     * @param {FilterBuilderInterface}     public filterBuilder     filter builder instance
     * @param {SortBuilderInterface}       public sortBuilder       sort builder instance
     * @param {PaginationBuilderInterface} public paginationBuilder pagination builder instance
     */
    constructor(
        public filterBuilder: FilterBuilderInterface,
        public sortBuilder: SortBuilderInterface,
        public paginationBuilder: PaginationBuilderInterface)
    {
        super();
    }
}
