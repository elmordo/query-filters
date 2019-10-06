import { CommonBuilderBase } from "./base";
import { SortBuilderInterface, Sort, KeyMultiValueList } from "./interfaces";
export declare abstract class AbstractSortBuilder extends CommonBuilderBase<Sort[]> implements SortBuilderInterface {
    static readonly DEFAULT_ASC = "asc";
    static readonly DEFAULT_DESC = "desc";
    readonly ascKey: string;
    readonly descKey: string;
    constructor(ascKey?: string, descKey?: string);
    buildKeyList(items: Sort[]): KeyMultiValueList;
    protected processSort(sort: Sort, result: KeyMultiValueList): void;
    protected abstract buildSort(sort: Sort, result: KeyMultiValueList): void;
}
export declare abstract class AbstractKeyBasedSortBuilder extends AbstractSortBuilder {
    static readonly DEFAULT_KEY = "__sort";
    readonly sortKey: string;
    constructor(sortKey?: string, ascKey?: string, descKey?: string);
    protected buildSort(sort: Sort, result: KeyMultiValueList): void;
    protected abstract buildValue(sort: Sort): string;
}
export declare class SortByFunction extends AbstractKeyBasedSortBuilder {
    protected buildValue(sort: Sort): string;
}
export declare class SortBySign extends AbstractKeyBasedSortBuilder {
    protected buildValue(sort: Sort): string;
}
export declare class SortByProperty extends AbstractKeyBasedSortBuilder {
    protected buildValue(sort: Sort): string;
}
