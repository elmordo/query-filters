"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaginationByTwoKeys = (function () {
    function PaginationByTwoKeys(perPageKey, pageKey) {
        if (!perPageKey)
            perPageKey = PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY;
        if (!pageKey)
            pageKey = PaginationByTwoKeys.DEFAULT_PAGE_KEY;
        this.perPageKey = perPageKey;
        this.pageKey = pageKey;
    }
    PaginationByTwoKeys.prototype.build = function (pagination) {
        return [
            this.buildKey(this.perPageKey, pagination.perPage),
            this.buildKey(this.pageKey, pagination.page)
        ];
    };
    PaginationByTwoKeys.prototype.buildKey = function (key, value) {
        var k = encodeURIComponent(key);
        var v = encodeURIComponent(value);
        return k + "=" + v;
    };
    PaginationByTwoKeys.DEFAULT_PER_PAGE_KEY = "__perPage";
    PaginationByTwoKeys.DEFAULT_PAGE_KEY = "__page";
    return PaginationByTwoKeys;
}());
exports.PaginationByTwoKeys = PaginationByTwoKeys;
