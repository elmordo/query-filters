import { Pagination, PaginationBuilderInterface } from "./interfaces";
export declare class PaginationByTwoKeys implements PaginationBuilderInterface {
    static readonly DEFAULT_PER_PAGE_KEY = "__perPage";
    static readonly DEFAULT_PAGE_KEY = "__page";
    readonly perPageKey: string;
    readonly pageKey: string;
    constructor(perPageKey?: string, pageKey?: string);
    build(pagination: Pagination): string[];
    private buildKey;
}
