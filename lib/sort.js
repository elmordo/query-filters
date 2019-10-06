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
var AbstractSortBuilder = (function (_super) {
    __extends(AbstractSortBuilder, _super);
    function AbstractSortBuilder(ascKey, descKey) {
        var _this = _super.call(this) || this;
        if (!ascKey)
            ascKey = AbstractSortBuilder.DEFAULT_ASC;
        if (!descKey)
            descKey = AbstractSortBuilder.DEFAULT_DESC;
        _this.ascKey = ascKey;
        _this.descKey = descKey;
        return _this;
    }
    AbstractSortBuilder.prototype.buildKeyList = function (items) {
        var _this = this;
        var result = {};
        items.forEach(function (item) {
            _this.processSort(item, result);
        });
        return result;
    };
    AbstractSortBuilder.prototype.processSort = function (sort, result) {
        if (!sort.direction)
            sort.direction = "asc";
        this.buildSort(sort, result);
    };
    AbstractSortBuilder.DEFAULT_ASC = "asc";
    AbstractSortBuilder.DEFAULT_DESC = "desc";
    return AbstractSortBuilder;
}(base_1.CommonBuilderBase));
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
    AbstractKeyBasedSortBuilder.prototype.buildSort = function (sort, result) {
        this.addPairToResult(sort.field, this.buildValue(sort), result);
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
var SortByProperty = (function (_super) {
    __extends(SortByProperty, _super);
    function SortByProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortByProperty.prototype.buildValue = function (sort) {
        var key = (sort.direction == "asc") ? this.ascKey : this.descKey;
        return sort.field + "." + key;
    };
    return SortByProperty;
}(AbstractKeyBasedSortBuilder));
exports.SortByProperty = SortByProperty;
