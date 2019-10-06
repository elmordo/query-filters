import { Pagination, PaginationBuilderInterface, KeyMultiValueList } from "./interfaces";
import { CommonBuilderBase } from "./base";
export declare class PaginationByTwoKeys extends CommonBuilderBase<Pagination> implements PaginationBuilderInterface {
    static readonly DEFAULT_PER_PAGE_KEY = "__perPage";
    static readonly DEFAULT_PAGE_KEY = "__page";
    readonly perPageKey: string;
    readonly pageKey: string;
    constructor(perPageKey?: string, pageKey?: string);
    buildKeyList(pagination: Pagination): KeyMultiValueList;
}
