import { Filter, FilterBuilderInterface } from "./interfaces";
export declare type DateEncoder = (date: Date) => string;
export declare abstract class AbstractFilterBuilder implements FilterBuilderInterface {
    dateEncoder: DateEncoder;
    build(filters: Filter[]): string[];
    protected abstract buildFilter(filter: Filter): string[];
}
export declare class LeftHandedStyleFilter extends AbstractFilterBuilder {
    static readonly DEFAULT_OPEN = "[";
    static readonly DEFAULT_CLOSE = "]";
    readonly openChar: string;
    readonly closeChar: string;
    constructor(openChar?: string, closeChar?: string);
    protected buildFilter(filter: Filter): string[];
}
export declare class RightHandStyleFilter extends AbstractFilterBuilder {
    static readonly DEFAULT_SEPARATOR = ":";
    readonly separator: string;
    constructor(separator?: string);
    protected buildFilter(filter: Filter): string[];
}
