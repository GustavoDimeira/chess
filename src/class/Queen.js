"use strict";
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
exports.__esModule = true;
var Piece_1 = require("./Piece");
var Square_1 = require("./Square");
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(name, position, collor) {
        var _this = _super.call(this, name, position, collor) || this;
        _this.name = name;
        _this.position = position;
        _this.collor = collor;
        return _this;
    }
    Queen.prototype.getMoves = function (board) {
        var _this = this;
        var collun = Number(this.position.split('x')[0]);
        var line = Number(this.position.split('x')[1]);
        var formulaLine = function (collun, line, positionPlus) {
            return (collun * 8 + (line + positionPlus));
        };
        var formulaCollun = function (collun, line, positionPlus) {
            return ((collun + positionPlus) * 8 + line);
        };
        this.attacking.forEach(function (i) {
            var nameIndex = board[i].attackedBy[_this.collor].findIndex(function (iN) { return iN === _this.name; });
            board[i].attackedBy[_this.collor].splice(nameIndex, 1);
        });
        this.attacking = [];

        var bottRight = this.diagonalMove(board, 1, 1);
        var bottLeft = this.diagonalMove(board, 1, -1);
        var topRight = this.diagonalMove(board, -1, 1);
        var topLeft = this.diagonalMove(board, -1, -1);

        var up = this.straightMove(board, -1, collun, formulaCollun);
        var down = this.straightMove(board, 1, collun, formulaCollun);
        var left = this.straightMove(board, -1, line, formulaLine);
        var right = this.straightMove(board, 1, line, formulaLine);

        var straight = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], up, true), down, true), left, true), right, true);

        var diagonal = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], bottRight, true), bottLeft, true), topRight, true), topLeft, true);

        var result = __spreadArray(__spreadArray([], straight, true), diagonal, true);

        this.attacking = result;

        return result;
    };
    ;
    return Queen;
}(Piece_1["default"]));
exports["default"] = Queen;
var Queen_1 = new Queen('Queen_1', '0x0', 'w');
var Queen_2 = new Queen('Queen_2', '0x1', 'w');
var Queen_3 = new Queen('Queen_3', '1x0', 'w');
var Queen_4 = new Queen('Queen_4', '1x1', 'w');
var board = [];
for (var x = 0; x <= 7; x += 1) {
    for (var y = 0; y <= 7; y += 1) {
        board.push(new Square_1["default"]("".concat(x, "\"").concat(y)));
    }
}
board[0] = {
    position: '0x0',
    ocupatedBy: Queen_1,
    attackedBy: {
        b: [],
        w: []
    }
};
board[1] = {
    position: '0x1',
    ocupatedBy: Queen_2,
    attackedBy: {
        b: [],
        w: []
    }
};
board[8] = {
    position: '1x0',
    ocupatedBy: Queen_3,
    attackedBy: {
        b: [],
        w: []
    }
};
board[9] = {
    position: '1x1',
    ocupatedBy: Queen_4,
    attackedBy: {
        b: [],
        w: []
    }
};
Queen_1.getMoves(board);
Queen_2.getMoves(board);
Queen_3.getMoves(board);
Queen_4.getMoves(board);
console.log(board[0].attackedBy);
console.log(Queen_1.attacking);
console.log(Queen_2.attacking);
console.log(Queen_3.attacking);
console.log(Queen_4.attacking);
