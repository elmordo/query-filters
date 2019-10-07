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
var base_1 = require("./base");
var AbstractQueryBuilder = (function (_super) {
    __extends(AbstractQueryBuilder, _super);
    function AbstractQueryBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractQueryBuilder.prototype.build = function (query) {
        return [].concat(this.buildItems(this.filterBuilder, query.filters), this.buildItems(this.sortBuilder, query.sorts), this.buildItems(this.paginationBuilder, query.pagination));
    };
    AbstractQueryBuilder.prototype.buildKeyList = function (query) {
        var result = {};
        var filterKeys = this.buildItems(this.filterBuilder, query.filters);
        var sortKeys = this.buildItems(this.sortBuilder, query.sorts);
        var paginationKeys = this.buildItems(this.paginationBuilder, query.pagination);
        this.addItemsToResult(filterKeys, result);
        this.addItemsToResult(sortKeys, result);
        this.addItemsToResult(paginationKeys, result);
        return result;
    };
    AbstractQueryBuilder.prototype.buildString = function (query) {
        return this.build(query).join("&");
    };
    AbstractQueryBuilder.prototype.buildItems = function (builder, item) {
        var result = {};
        if (builder && item)
            result = builder.buildKeyList(item);
        return result;
    };
    AbstractQueryBuilder.prototype.addItemsToResult = function (items, result) {
        var _this = this;
        var _loop_1 = function (key) {
            items[key].forEach(function (v) { return _this.addPairToResult(key, v, result); });
        };
        for (var key in items) {
            _loop_1(key);
        }
    };
    return AbstractQueryBuilder;
}(base_1.CommonBuilderBase));
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
