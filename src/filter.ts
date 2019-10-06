
import { CommonBuilderBase } from "./base";
import { Filter, FilterBuilderInterface, KeyMultiValueList } from "./interfaces";


/**
 * encode date to string
 * @type {Function}
 */
export type DateEncoder = (date: Date) => string;


/**
 * process filters by applying buildFilter abstract method to each filter
 * @type {Object}
 */
export abstract class AbstractFilterBuilder extends CommonBuilderBase<Filter[]> implements FilterBuilderInterface
{
    /**
     * encode date to string
     */
    dateEncoder: DateEncoder = (d: Date) => d.toISOString();

    /**
     * build key-multivalue list of items
     * @param  {QueryFilter}       query query definition
     * @return {KeyMultiValueList}       built items
     */
    buildKeyList(items: Filter[]): KeyMultiValueList
    {
        const result: KeyMultiValueList = {};
        items.forEach(x => this.processFilter(x, result));
        return result;
    }

    protected processFilter(filter: Filter, result: KeyMultiValueList): void
    {
        if (filter.value === null || filter.value === undefined)
            throw new Error("Value cannot be null or undefined");

        this.buildFilter(filter, result);
    }

    /**
     * build one filter
     * @param  {Filter}   filter filter to be built
     * @param  {KeyMultiValueList} result result object
     */
    protected abstract buildFilter(filter: Filter, result: KeyMultiValueList): void;
}


/**
 * filter style with left handed operator
 * Format example: field[operator]=value
 * Example: age[gt]=18
 * @type {Object}
 */
export class LeftHandedStyleFilter extends AbstractFilterBuilder
{
    /**
     * default character used to open operator definition
     * @type {String}
     */
    static readonly DEFAULT_OPEN = "[";

    /**
     * default character used to close operator definition
     * @type {String}
     */
    static readonly DEFAULT_CLOSE = "]";

    /**
     * character used to open operator definition
     * @type {string}
     */
    readonly openChar: string;

    /**
     * character used to close operator definition
     * @type {string}
     */
    readonly closeChar: string;

    /**
     * initialize instance
     * @param {string} openChar  open character of operator definition
     * @param {string} closeChar close character of operator definition
     */
    constructor(openChar?: string, closeChar?: string)
    {
        super();

        if (openChar === undefined) openChar = LeftHandedStyleFilter.DEFAULT_OPEN;
        if (closeChar === undefined) closeChar = LeftHandedStyleFilter.DEFAULT_CLOSE;

        this.openChar = openChar;
        this.closeChar = closeChar;
    }

    /**
     * build one filter
     * @param  {Filter}   filter filter to be built
     * @param  {KeyMultiValueList} result result object
     */
    protected buildFilter(filter: Filter, result: KeyMultiValueList): void
    {
        let key = filter.field + this.openChar + filter.operator + this.closeChar;
        let value = filter.value;

        if (value instanceof Date)
            value = this.dateEncoder(value);

        this.addPairToResult(key, value.toString(), result);
    }
}


/**
 * filter style with right handed operator
 * format example: field=operator:value
 * example: age=gt:18
 * @type {Object}
 */
export class RightHandStyleFilter extends AbstractFilterBuilder
{
    /**
     * default separator of operator and value
     * @type {String}
     */
    static readonly DEFAULT_SEPARATOR = ":";

    /**
     * separator of operator and value
     * @type {string}
     */
    readonly separator: string;

    /**
     * initialize and setup instance
     * @param {string} separator separator of operator and value
     */
    constructor(separator?: string)
    {
        super();
        if (separator === undefined) separator = RightHandStyleFilter.DEFAULT_SEPARATOR;
        this.separator = separator;
    }

    /**
     * build one filter instance
     * @param  {Filter}   filter filter instance
     * @param  {KeyMultiValueList} result result object
     */
    protected buildFilter(filter: Filter, result: KeyMultiValueList): void
    {
        let value = filter.value;

        if (value instanceof Date)
            value = this.dateEncoder(value);

        let right = filter.operator + this.separator + value.toString();

        this.addPairToResult(filter.field, right, result);
    }
}
