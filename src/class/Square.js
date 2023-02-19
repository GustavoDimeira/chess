"use strict";
exports.__esModule = true;
var Square = /** @class */ (function () {
    function Square(position, ocupatedBy, attackedBy) {
        if (ocupatedBy === void 0) { ocupatedBy = null; }
        if (attackedBy === void 0) { attackedBy = { b: [], w: [] }; }
        this.position = position;
        this.ocupatedBy = ocupatedBy;
        this.attackedBy = attackedBy;
    }
    return Square;
}());
exports["default"] = Square;
