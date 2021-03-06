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
var AbstractFilterBuilder = (function (_super) {
    __extends(AbstractFilterBuilder, _super);
    function AbstractFilterBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateEncoder = function (d) { return d.toISOString(); };
        return _this;
    }
    AbstractFilterBuilder.prototype.buildKeyList = function (items) {
        var _this = this;
        var result = {};
        items.forEach(function (x) { return _this.processFilter(x, result); });
        return result;
    };
    AbstractFilterBuilder.prototype.processFilter = function (filter, result) {
        if (filter.value === null || filter.value === undefined)
            throw new Error("Value cannot be null or undefined");
        this.buildFilter(filter, result);
    };
    return AbstractFilterBuilder;
}(base_1.CommonBuilderBase));
exports.AbstractFilterBuilder = AbstractFilterBuilder;
var LeftHandedStyleFilter = (function (_super) {
    __extends(LeftHandedStyleFilter, _super);
    function LeftHandedStyleFilter(openChar, closeChar) {
        var _this = _super.call(this) || this;
        if (openChar === undefined)
            openChar = LeftHandedStyleFilter.DEFAULT_OPEN;
        if (closeChar === undefined)
            closeChar = LeftHandedStyleFilter.DEFAULT_CLOSE;
        _this.openChar = openChar;
        _this.closeChar = closeChar;
        return _this;
    }
    LeftHandedStyleFilter.prototype.buildFilter = function (filter, result) {
        var key = filter.field + this.openChar + filter.operator + this.closeChar;
        var value = filter.value;
        if (value instanceof Date)
            value = this.dateEncoder(value);
        this.addPairToResult(key, value.toString(), result);
    };
    LeftHandedStyleFilter.DEFAULT_OPEN = "[";
    LeftHandedStyleFilter.DEFAULT_CLOSE = "]";
    return LeftHandedStyleFilter;
}(AbstractFilterBuilder));
exports.LeftHandedStyleFilter = LeftHandedStyleFilter;
var RightHandStyleFilter = (function (_super) {
    __extends(RightHandStyleFilter, _super);
    function RightHandStyleFilter(separator) {
        var _this = _super.call(this) || this;
        if (separator === undefined)
            separator = RightHandStyleFilter.DEFAULT_SEPARATOR;
        _this.separator = separator;
        return _this;
    }
    RightHandStyleFilter.prototype.buildFilter = function (filter, result) {
        var value = filter.value;
        if (value instanceof Date)
            value = this.dateEncoder(value);
        var right = filter.operator + this.separator + value.toString();
        this.addPairToResult(filter.field, right, result);
    };
    RightHandStyleFilter.DEFAULT_SEPARATOR = ":";
    return RightHandStyleFilter;
}(AbstractFilterBuilder));
exports.RightHandStyleFilter = RightHandStyleFilter;
