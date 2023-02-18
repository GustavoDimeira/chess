var Square = /** @class */ (function () {
    function Square(position, ocupatedBy) {
        if (ocupatedBy === void 0) { ocupatedBy = null; }
        this.position = position;
        this.ocupatedBy = ocupatedBy;
    }
    return Square;
}());
export default Square;
