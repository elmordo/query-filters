"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonBuilderBase = (function () {
    function CommonBuilderBase() {
    }
    CommonBuilderBase.prototype.build = function (items) {
        var _this = this;
        var result = [];
        var keyList = this.buildKeyList(items);
        var _loop_1 = function (key) {
            keyList[key].forEach(function (value) { return result.push(_this.buildPair(key, value)); });
        };
        for (var key in keyList) {
            _loop_1(key);
        }
        return result;
    };
    CommonBuilderBase.prototype.buildPair = function (key, value) {
        return [encodeURIComponent(key), encodeURIComponent(value)].join("=");
    };
    return CommonBuilderBase;
}());
exports.CommonBuilderBase = CommonBuilderBase;
