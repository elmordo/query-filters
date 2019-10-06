
import { CommonBuilderBase } from "./base";
import { SortBuilderInterface, Sort, KeyMultiValueList } from "./interfaces"


/**
 * common base for most of sort builders
 * @type {Object}
 */
export abstract class AbstractSortBuilder extends CommonBuilderBase<Sort[]> implements SortBuilderInterface
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
        super();
        if (!ascKey) ascKey = AbstractSortBuilder.DEFAULT_ASC;
        if (!descKey) descKey = AbstractSortBuilder.DEFAULT_DESC;

        this.ascKey = ascKey;
        this.descKey = descKey;
    }

    /**
     * build key-multivalue list of items
     * @param  {QueryFilter}       query query definition
     * @return {KeyMultiValueList}       built items
     */
    buildKeyList(items: Sort[]): KeyMultiValueList
    {
        const result: KeyMultiValueList = {};

        items.forEach(item =>
        {
            this.processSort(item, result);
        });

        return result;
    }

    /**
     * process one sort item
     * @param  {Sort}     sort sort item
     * @param  {KeyMultiValueList} result data
     */
    protected processSort(sort: Sort, result: KeyMultiValueList): void
    {
        if (!sort.direction)
            sort.direction = "asc";

        this.buildSort(sort, result);
    }

    /**
     * build one sort item
     * @param  {Sort}     sort sort item
     * @param  {KeyMultiValueList} result data
     */
    protected abstract buildSort(sort: Sort, result: KeyMultiValueList): void;
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
     * @param  {KeyMultiValueList} result data
     */
    protected buildSort(sort: Sort, result: KeyMultiValueList): void
    {
        this.addPairToResult(sort.field, this.buildValue(sort), result);
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
