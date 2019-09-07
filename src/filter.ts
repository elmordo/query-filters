
import { Filter, FilterBuilderInterface } from "./interfaces"


/**
 * encode date to string
 * @type {Function}
 */
export type DateEncoder = (date: Date) => string;


/**
 * process filters by applying buildFilter abstract method to each filter
 * @type {Object}
 */
export abstract class AbstractFilterBuilder implements FilterBuilderInterface
{
    /**
     * encode date to string
     */
    dateEncoder: DateEncoder = (d: Date) => d.toISOString();

    /**
     * build filters to URL key-value pairs
     * @param  {Filter[]} filters list of filters
     * @return {string[]}         build items
     */
    build(filters: Filter[]): string[]
    {
        return filters.map(f => this.processFilter(f)).reduce((acc, val) => acc.concat(val), []);
    }

    protected processFilter(filter: Filter): string[]
    {
        if (filter.value === null || filter.value === undefined)
            throw new Error("Value cannot be null or undefined");

        return this.buildFilter(filter);
    }

    /**
     * build one filter
     * @param  {Filter}   filter filter to be built
     * @return {string[]}        build items
     */
    protected abstract buildFilter(filter: Filter): string[];
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
     * @return {string[]}        build items
     */
    protected buildFilter(filter: Filter): string[]
    {
        let key = filter.field + this.openChar + filter.operator + this.closeChar;
        let value = filter.value;

        if (value instanceof Date)
            value = this.dateEncoder(value);

        return [encodeURIComponent(key) + "=" + encodeURIComponent(value)];
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
     * @return {string[]}        built URL style key-value pairs
     */
    protected buildFilter(filter: Filter): string[]
    {
        let value = filter.value;

        if (value instanceof Date)
            value = this.dateEncoder(value);

        let right =
            encodeURIComponent(filter.operator) +
            encodeURIComponent(this.separator) +
            encodeURIComponent(value);
        return [encodeURIComponent(filter.field) + "=" + right]
    }
}
