var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Piece from "./Piece";
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(name, position, collor) {
        var _this = _super.call(this, name, position, collor) || this;
        _this.name = name;
        _this.position = position;
        _this.collor = collor;
        return _this;
    }
    Rook.prototype.move = function (board) {
        var collun = Number(this.position.split('x')[0]);
        var line = Number(this.position.split('x')[1]);
        var formulaLine = function (collun, line, positionPlus) {
            return (collun * 8 + (line + positionPlus));
        };
        var formulaCollun = function (collun, line, positionPlus) {
            return ((collun + positionPlus) * 8 + line);
        };
        var up = this.straightMove(board, -1, collun, formulaCollun);
        var down = this.straightMove(board, 1, collun, formulaCollun);
        var left = this.straightMove(board, -1, line, formulaLine);
        var right = this.straightMove(board, 1, line, formulaLine);
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], up, true), down, true), left, true), right, true);
    };
    ;
    return Rook;
}(Piece));
export default Rook;
var torre = new Rook('Rook_1', '0x0', 'w');
var board = [];
for (var x = 0; x <= 7; x += 1) {
    for (var y = 0; y <= 7; y += 1) {
        board.push({
            position: "".concat(x, "x").concat(y),
            ocupatedBy: null,
        });
    }
}
console.log(torre.move(board), 'teste');
