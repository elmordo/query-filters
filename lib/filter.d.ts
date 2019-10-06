import { CommonBuilderBase } from "./base";
import { Filter, FilterBuilderInterface, KeyMultiValueList } from "./interfaces";
export declare type DateEncoder = (date: Date) => string;
export declare abstract class AbstractFilterBuilder extends CommonBuilderBase<Filter[]> implements FilterBuilderInterface {
    dateEncoder: DateEncoder;
    buildKeyList(items: Filter[]): KeyMultiValueList;
    protected processFilter(filter: Filter, result: KeyMultiValueList): void;
    protected abstract buildFilter(filter: Filter, result: KeyMultiValueList): void;
}
export declare class LeftHandedStyleFilter extends AbstractFilterBuilder {
    static readonly DEFAULT_OPEN = "[";
    static readonly DEFAULT_CLOSE = "]";
    readonly openChar: string;
    readonly closeChar: string;
    constructor(openChar?: string, closeChar?: string);
    protected buildFilter(filter: Filter, result: KeyMultiValueList): void;
}
export declare class RightHandStyleFilter extends AbstractFilterBuilder {
    static readonly DEFAULT_SEPARATOR = ":";
    readonly separator: string;
    constructor(separator?: string);
    protected buildFilter(filter: Filter, result: KeyMultiValueList): void;
}
