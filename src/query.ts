
import {
    QueryFilter,
    QueryBuilderInterface,
    FilterBuilderInterface,
    SortBuilderInterface,
    PaginationBuilderInterface,
    CommonBuilderInterface
} from "./interfaces"


export abstract class AbstractQueryBuilder implements QueryBuilderInterface
{
    abstract filterBuilder: FilterBuilderInterface;

    abstract sortBuilder: SortBuilderInterface;

    abstract paginationBuilder: PaginationBuilderInterface;

    build(query: QueryFilter): string[]
    {
        return [].concat(
            this.buildItem(this.filterBuilder, query.filters),
            this.buildItem(this.sortBuilder, query.sorts),
            this.buildItem(this.paginationBuilder, query.pagination)
        )
        return null;
    }

    private buildItem<ItemType>(builder: CommonBuilderInterface<ItemType>, item: ItemType): string[]
    {
        let result: string[] = [];

        if (builder && item)
            result = builder.build(item);

        return result;
    }
}


export class QueryBuilder extends AbstractQueryBuilder
{
    constructor(
        public filterBuilder: FilterBuilderInterface,
        public sortBuilder: SortBuilderInterface,
        public paginationBuilder: PaginationBuilderInterface)
    {
        super();
    }
}
