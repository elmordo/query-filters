export interface Filter {
    field: string;
    operator: string;
    value: string | number | boolean | Date;
}
export interface Sort {
    field: string;
    direction?: "asc" | "desc";
}
export interface Pagination {
    page: number;
    perPage: number;
}
export interface QueryFilter {
    filters?: Filter[];
    sorts?: Sort[];
    pagination?: Pagination;
}
export interface CommonBuilderInterface<InputType> {
    build(items: InputType): string[];
}
export interface FilterBuilderInterface extends CommonBuilderInterface<Filter[]> {
    build(filters: Filter[]): string[];
}
export interface SortBuilderInterface extends CommonBuilderInterface<Sort[]> {
    build(sorts: Sort[]): string[];
}
export interface PaginationBuilderInterface extends CommonBuilderInterface<Pagination> {
    build(pagination: Pagination): string[];
}
export interface QueryBuilderInterface {
    build(query: QueryFilter): string[];
    buildString(query: QueryFilter): string;
}
