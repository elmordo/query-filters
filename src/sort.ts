
import { SortBuilderInterface, Sort } from "./interfaces"


/**
 * common base for most of sort builders
 * @type {Object}
 */
export abstract class AbstractSortBuilder implements SortBuilderInterface
{
    /**
     * default key for ASC sorting
     * @type {String}
     */
    static readonly DEFAULT_ASC = "asc";

    /**
     * default key for DESC sorting
     * @type {String}
     */
    static readonly DEFAULT_DESC = "desc";

    /**
     * key used for ASC
     * @type {string}
     */
    readonly ascKey: string;

    /**
     * key used for DESC
     * @type {string}
     */
    readonly descKey: string;

    /**
     * initialize and setup instance
     * @param {string} ascKey  key used for ASC
     * @param {string} descKey key used for DESC
     */
    constructor(ascKey?: string, descKey?: string)
    {
        if (!ascKey) ascKey = AbstractSortBuilder.DEFAULT_ASC;
        if (!descKey) descKey = AbstractSortBuilder.DEFAULT_DESC;

        this.ascKey = ascKey;
        this.descKey = descKey;
    }

    /**
     * build sort settings
     * @param  {Sort[]}   sorts sort settings
     * @return {string[]}       key-value paris for URL
     */
    build(sorts: Sort[]): string[]
    {
        return sorts.map(s => this.buildSort(s)).reduce((acc, s) => acc.concat(s), []);
    }

    /**
     * process one sort item
     * @param  {Sort}     sort sort item
     * @return {string[]}      built sort
     */
    protected processSort(sort: Sort): string[]
    {
        if (!sort.direction)
            sort.direction = "asc";

        return this.buildSort(sort);
    }

    /**
     * build one sort item
     * @param  {Sort}     sort sort item
     * @return {string[]}      URL style key-value pairs
     */
    protected abstract buildSort(sort: Sort): string[];
}


/**
 * base for sort style like __sort=<something>
 * @type {Object}
 */
export abstract class AbstractKeyBasedSortBuilder extends AbstractSortBuilder
{
    /**
     * default url key
     * @type {String}
     */
    static readonly DEFAULT_KEY = "__sort";

    /**
     * url key
     * @type {string}
     */
    readonly sortKey: string;

    /**
     * initialize and setup instance
     * @param {string} sortKey url key
     * @param {string} ascKey  key used for ASC
     * @param {string} descKey key used for DESC
     */
    constructor(sortKey?: string, ascKey?: string, descKey?: string)
    {
        super(ascKey, descKey);
        if (!sortKey) sortKey = AbstractKeyBasedSortBuilder.DEFAULT_KEY;
        this.sortKey = sortKey;
    }

    /**
     * build one sort item
     * @param  {Sort}     sort sort item
     * @return {string[]}      URL key-value pairs
     */
    protected buildSort(sort: Sort): string[]
    {
        let key = encodeURIComponent(this.sortKey);
        let val = this.buildValue(sort);
        return [key + "=" + encodeURIComponent(val)];
    }

    /**
     * build value for key-value pair
     * @param  {Sort}   sort sort item
     * @return {string}      value
     */
    protected abstract buildValue(sort: Sort): string;
}


/**
 * sort formatted like __sort=asc(field)
 * @type {Object}
 */
export class SortByFunction extends AbstractKeyBasedSortBuilder
{
    /**
     * build value for key-value pair
     * @param  {Sort}   sort sort item
     * @return {string}      value
     */
    protected buildValue(sort: Sort): string
    {
        let key = (sort.direction == "asc") ? this.ascKey : this.descKey;
        return key + "(" + sort.field + ")";
    }
}


/**
 * sort formatted like __sort=+field or __sort=-field
 * @type {Object}
 */
export class SortBySign extends AbstractKeyBasedSortBuilder
{
    /**
     * build value for key-value pair
     * @param  {Sort}   sort sort item
     * @return {string}      value
     */
    protected buildValue(sort: Sort): string
    {
        let key = (sort.direction == "asc") ? "+" : "-";
        return key + sort.field;
    }
}


/**
 * sort formatted like __sort=field.asc
 * @type {Object}
 */
export class SortByProperty extends AbstractKeyBasedSortBuilder
{
    /**
     * build value for key-value pair
     * @param  {Sort}   sort sort item
     * @return {string}      value
     */
    protected buildValue(sort: Sort): string
    {
        let key = (sort.direction == "asc") ? this.ascKey : this.descKey;
        return sort.field + "." + key;
    }
}
