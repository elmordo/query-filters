
import { Pagination, PaginationBuilderInterface } from "./interfaces"


export class PaginationByTwoKeys implements PaginationBuilderInterface
{
    static readonly DEFAULT_PER_PAGE_KEY = "__perPage";

    static readonly DEFAULT_PAGE_KEY = "__page";

    readonly perPageKey: string;

    readonly pageKey: string;

    constructor(perPageKey?: string, pageKey?: string)
    {
        if (!perPageKey) perPageKey = PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY;
        if (!pageKey) pageKey = PaginationByTwoKeys.DEFAULT_PAGE_KEY;

        this.perPageKey = perPageKey;
        this.pageKey = pageKey;
    }

    build(pagination: Pagination): string[]
    {
        return [
            this.buildKey(this.perPageKey, pagination.perPage),
            this.buildKey(this.pageKey, pagination.page)
        ];
    }

    /**
     * build one key
     * @param  {string} key   key
     * @param  {number} value value
     * @return {string}       URL style key-value pair
     */
    private buildKey(key: string, value: number): string
    {
        let k = encodeURIComponent(key);
        let v = encodeURIComponent(value);
        return k + "=" + v;
    }
}
