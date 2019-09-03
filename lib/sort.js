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
var AbstractSortBuilder = (function () {
    function AbstractSortBuilder(ascKey, descKey) {
        if (!ascKey)
            ascKey = AbstractSortBuilder.DEFAULT_ASC;
        if (!descKey)
            descKey = AbstractSortBuilder.DEFAULT_DESC;
        this.ascKey = ascKey;
        this.descKey = descKey;
    }
    AbstractSortBuilder.prototype.build = function (sorts) {
        var _this = this;
        return sorts.map(function (s) { return _this.buildSort(s); }).reduce(function (acc, s) { return acc.concat(s); }, []);
    };
    AbstractSortBuilder.DEFAULT_ASC = "asc";
    AbstractSortBuilder.DEFAULT_DESC = "desc";
    return AbstractSortBuilder;
}());
exports.AbstractSortBuilder = AbstractSortBuilder;
var AbstractKeyBasedSortBuilder = (function (_super) {
    __extends(AbstractKeyBasedSortBuilder, _super);
    function AbstractKeyBasedSortBuilder(sortKey, ascKey, descKey) {
        var _this = _super.call(this, ascKey, descKey) || this;
        if (!sortKey)
            sortKey = AbstractKeyBasedSortBuilder.DEFAULT_KEY;
        _this.sortKey = sortKey;
        return _this;
    }
    AbstractKeyBasedSortBuilder.prototype.buildSort = function (sort) {
        var key = encodeURIComponent(this.sortKey);
        var val = this.buildValue(sort);
        return [key + "=" + encodeURIComponent(val)];
    };
    AbstractKeyBasedSortBuilder.DEFAULT_KEY = "__sort";
    return AbstractKeyBasedSortBuilder;
}(AbstractSortBuilder));
exports.AbstractKeyBasedSortBuilder = AbstractKeyBasedSortBuilder;
var SortByFunction = (function (_super) {
    __extends(SortByFunction, _super);
    function SortByFunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortByFunction.prototype.buildValue = function (sort) {
        var key = (sort.direction == "asc") ? this.ascKey : this.descKey;
        return key + "(" + sort.field + ")";
    };
    return SortByFunction;
}(AbstractKeyBasedSortBuilder));
exports.SortByFunction = SortByFunction;
var SortBySign = (function (_super) {
    __extends(SortBySign, _super);
    function SortBySign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortBySign.prototype.buildValue = function (sort) {
        var key = (sort.direction == "asc") ? "+" : "-";
        return key + sort.field;
    };
    return SortBySign;
}(AbstractKeyBasedSortBuilder));
exports.SortBySign = SortBySign;
var SortProperty = (function (_super) {
    __extends(SortProperty, _super);
    function SortProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortProperty.prototype.buildValue = function (sort) {
        var key = (sort.direction == "asc") ? this.ascKey : this.descKey;
        return sort.field + "." + key;
    };
    return SortProperty;
}(AbstractKeyBasedSortBuilder));
exports.SortProperty = SortProperty;
