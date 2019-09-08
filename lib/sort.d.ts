import { SortBuilderInterface, Sort } from "./interfaces";
export declare abstract class AbstractSortBuilder implements SortBuilderInterface {
    static readonly DEFAULT_ASC = "asc";
    static readonly DEFAULT_DESC = "desc";
    readonly ascKey: string;
    readonly descKey: string;
    constructor(ascKey?: string, descKey?: string);
    build(sorts: Sort[]): string[];
    protected processSort(sort: Sort): string[];
    protected abstract buildSort(sort: Sort): string[];
}
export declare abstract class AbstractKeyBasedSortBuilder extends AbstractSortBuilder {
    static readonly DEFAULT_KEY = "__sort";
    readonly sortKey: string;
    constructor(sortKey?: string, ascKey?: string, descKey?: string);
    protected buildSort(sort: Sort): string[];
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
