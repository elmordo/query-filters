
import { Pagination, PaginationBuilderInterface, KeyMultiValueList } from "./interfaces"
import { CommonBuilderBase } from "./base";


export class PaginationByTwoKeys extends CommonBuilderBase<Pagination> implements PaginationBuilderInterface
{
    static readonly DEFAULT_PER_PAGE_KEY = "__perPage";

    static readonly DEFAULT_PAGE_KEY = "__page";

    readonly perPageKey: string;

    readonly pageKey: string;

    constructor(perPageKey?: string, pageKey?: string)
    {
        super();

        if (!perPageKey) perPageKey = PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY;
        if (!pageKey) pageKey = PaginationByTwoKeys.DEFAULT_PAGE_KEY;

        this.perPageKey = perPageKey;
        this.pageKey = pageKey;
    }

    /**
     * build key-multivalue list of items
     * @param  {QueryFilter}       query query definition
     * @return {KeyMultiValueList}       built items
     */
    buildKeyList(pagination: Pagination): KeyMultiValueList
    {
        const result: KeyMultiValueList = {};
        result[this.perPageKey] = [pagination.perPage.toString()];
        result[this.pageKey] = [pagination.page.toString()];
        return result;
    }
}
