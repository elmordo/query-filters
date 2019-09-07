

/**
 * filter settings
 * @type {Object}
 */
export interface Filter
{
    /**
     * name of the field
     * @type {string}
     */
    field: string;

    /**
     * operator identifier
     * @type {string}
     */
    operator: string;

    /**
     * value to match against
     * @type {string|number|boolean|Date}
     */
    value: string|number|boolean|Date;
}


/**
 * sorting definition
 * @type {Object}
 */
export interface Sort
{
    /**
     * field name
     * @type {string}
     */
    field: string;

    /**
     * direction (asc is default)
     */
    direction?: "asc"|"desc";
}


/**
 * pagination settings
 * @type {Object}
 */
export interface Pagination
{
    /**
     * zero based page index
     * @type {number}
     */
    page: number;

    /**
     * records per page
     * @type {number}
     */
    perPage: number;
}


/**
 * full query specification
 * @type {Object}
 */
export interface QueryFilter
{
    /**
     * list of filters
     * @type {Filter[]}
     */
    filters?: Filter[];

    /**
     * list of sort settings
     * @type {Sort[]}
     */
    sorts?: Sort[];

    /**
     * pagination settings
     * @type {Pagination}
     */
    pagination?: Pagination;
}


/**
 * common interface for all builders
 */
export interface CommonBuilderInterface<InputType>
{
    /**
     * build URL style key-value pairs from list of items
     * the values of the key-value pairs cannot be NULL or UNDEFINED. There is no way to encode
     * those values without not to be ambigous with empty string or string with content
     * NULL or UNDEFINED.
     *
     * Example 1: `foo=undefined` - Is original value `{foo: undefined}` or `{foo: 'undefined'}`?
     * Example 2: `foo=` - Is original value `{foo: undefined}`, `{foo: null}` or {foo: ''}?
     *
     * Cases in examples have to be done by some custom features (e.g. special filter for NULL
     * and/or UNDEFINED values).
     *
     * @param  {InputType} items set of items to be built
     * @return {string[]}        built items
     */
    build(items: InputType): string[];
}


/**
 * build filters
 * @type {Object}
 */
export interface FilterBuilderInterface extends CommonBuilderInterface<Filter[]>
{
    /**
     * build filters
     * @param  {Filter[]} filters filters to be built
     * @return {string[]}         key-value paris for URL
     */
    build(filters: Filter[]): string[];
}


/**
 * build sort settings
 * @type {Object}
 */
export interface SortBuilderInterface extends CommonBuilderInterface<Sort[]>
{
    /**
     * build sort settings
     * @param  {Sort[]}   sorts sort settings
     * @return {string[]}       key-value paris for URL
     */
    build(sorts: Sort[]): string[];
}


/**
 * build pagination
 * @type {Object}
 */
export interface PaginationBuilderInterface extends CommonBuilderInterface<Pagination>
{
    /**
     * build pagination
     * @param  {Pagination} pagination pagination settings to be built
     * @return {string[]}              key-value paris for URL
     */
    build(pagination: Pagination): string[];
}


/**
 * build all query filter
 * @type {Object}
 */
export interface QueryBuilderInterface
{
    /**
     * build all query filter
     * @param  {QueryFilter} query query filter to be built
     * @return {string[]}          key-value paris for URL
     */
    build(query: QueryFilter): string[];
}
