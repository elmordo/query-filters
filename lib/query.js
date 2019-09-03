"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractQueryBuilder = (function () {
    function AbstractQueryBuilder() {
    }
    AbstractQueryBuilder.prototype.build = function (query) {
        return [].concat(this.buildItem(this.filterBuilder, query.filters), this.buildItem(this.sortBuilder, query.sorts), this.buildItem(this.paginationBuilder, query.pagination));
        return null;
    };
    AbstractQueryBuilder.prototype.buildItem = function (builder, item) {
        var result = [];
        if (builder && item)
            result = builder.build(item);
        return result;
    };
    return AbstractQueryBuilder;
}());
exports.AbstractQueryBuilder = AbstractQueryBuilder;
var QueryBuilder = (function (_super) {
    __extends(QueryBuilder, _super);
    function QueryBuilder(filterBuilder, sortBuilder, paginationBuilder) {
        var _this = _super.call(this) || this;
        _this.filterBuilder = filterBuilder;
        _this.sortBuilder = sortBuilder;
        _this.paginationBuilder = paginationBuilder;
        return _this;
    }
    return QueryBuilder;
}(AbstractQueryBuilder));
exports.QueryBuilder = QueryBuilder;
