# query-filter

Main purpose of the `query-filter` is to provide functionality to generate URL query strings for filtering, sorting and pagination.

## Filtering

Filters are defined by threee properties of interface `Filter`:

* `field` - name of the field (e.g. `"username"`)
* `operator` - operator identifier (e.g. `"like"`)
* `value` - value for the operator (e.g. `"John Doe")

Value cannot be `null` or `undefined` because we do not know, if the `null` value is realy `NULL` or string with content `"NULL"`.

There are two styles of filter formats supported:

1. Left hand operator (by `LeftHandedStyleFilter` class) - `username[like]=John Doe`
2. Right hand operator (by `RightHandStyleFilter` class) - `username=like:John Doe`

## Sorting

Sorts are defined by object with two properties:

* `field` - name of the field (e.g. `username`)
* `direction` - optional sort direction (`asc` or `desc`, default is `asc`).

There are three types of sort formats supported:

1. Function like format (by `SortByFunction` class) - `asc(username)`, `desc(username)`
2. Sign style format (by `SortBySign`) - `__sort=+username`, `__sort=-username`
3. Property style format (by `SortByProperty`) - `__sort=username.asc`, `__sort=username.desc`

## Pagination

Pagination is defined by object with two properties:

* `page` - page index (e.g. 5)
* `perPage` - number of records per one page (e.g. 20)

There is only one pagination style at this time:

1. Pagination defined by two keys (by `PaginationByTwoKeys`) - `__page=5&__perPage=20`

## Final query and query builder

All three parts described above are used in the `FilterQuery`. This object has three properties:

* `filters` - list of filter definitions
* `sorts` - list of sort definitions
* `pagination` - pagination definition

When some property is missing (is `null` or `undefined`) this part of query string won't be built.

Final query string is built by object implementing the `QueryBuilderInterface`. There are two query builders:

* `AbstractQueryBuilder` with abstract properties (slots) for partial builders
* `QueryBuilder` with partial builders passed by constructor.

If some partial builder is not set (the `null` or the `undefined` value is passed), this part of query string won't be built.

## Example

```typescript

let query: QueryFilter = {
  filters: [
    {field: "username", operator: "like", value: "John Doe"},
    {field: "age", operator: "gt", value: 18},
  ],
  sorts: [
    {field: "registered_at"},
    {field: "nickname", direction: "desc"}
  ],
  pagination: {page: 0, perPage: 20}
}

let queryBuilder = new QueryBuilder(
  new RightHandStyleFilter(),
  new SortBySign(),
  new PaginationByTwoKeys()
);

let parts = queryBuilder.build(query);  // list of string key-value pairs
liet queryString = queryBuilder.buildString(query)  // all key-value pairs merged into query string

```

## Customizing builders

All builders can be customized by implementing builder interfaces. Each partial builder interface have only one method with one argument (list of items to be built) and returning list of strings.

Final query builder has two methods. Each take one argument - an object implementing `QueryFilter` interface. But return value is different:

* The `build` method returns list of strings (like partial builders)
* The `buildString` returns one string containing list of strings returned by `build` method and joined by `&` character.
