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
export declare type KeyMultiValueList = {
    [key: string]: string[];
};
export interface CommonBuilderInterface<InputType> {
    build(items: InputType): string[];
    buildKeyList(items: InputType): KeyMultiValueList;
}
export interface FilterBuilderInterface extends CommonBuilderInterface<Filter[]> {
}
export interface SortBuilderInterface extends CommonBuilderInterface<Sort[]> {
}
export interface PaginationBuilderInterface extends CommonBuilderInterface<Pagination> {
}
export interface QueryBuilderInterface {
    build(query: QueryFilter): string[];
    buildString(query: QueryFilter): string;
}
