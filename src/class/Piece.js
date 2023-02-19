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
exports.__esModule = true;
var ChessPiece_1 = require("./ChessPiece");
var Piece = /** @class */ (function (_super) {
    __extends(Piece, _super);
    function Piece(name, position, collor, attacking) {
        if (attacking === void 0) { attacking = []; }
        var _this = _super.call(this, name, position, collor) || this;
        _this.name = name;
        _this.position = position;
        _this.collor = collor;
        _this.attacking = attacking;
        return _this;
    }
    ;
    Piece.prototype.straightMove = function (board, sense, axis, formula, max) {
        if (max === void 0) { max = 7; }
        var collun = Number(this.position.split('x')[0]);
        var line = Number(this.position.split('x')[1]);
        var avaliable = [];
        var hasPeace;
        for (var positionPlus = 1; (axis + (positionPlus * sense)) <= 7 &&
            (axis + (positionPlus * sense)) >= 0 &&
            !hasPeace &&
            positionPlus <= max; positionPlus += 1) {
            var index = formula(collun, line, (positionPlus * sense));
            hasPeace = board[index].ocupatedBy;
            var collor = hasPeace === null || hasPeace === void 0 ? void 0 : hasPeace.collor;
            board[index].attackedBy[this.collor].push(this.name);
            if (collor !== this.collor) {
                avaliable.push(index);
            }
        }
        ;
        return avaliable;
    };
    ;
    Piece.prototype.diagonalMove = function (board, senseColl, senceLine, max) {
        if (max === void 0) { max = 7; }
        var collun = Number(this.position.split('x')[0]);
        var line = Number(this.position.split('x')[1]);
        var avaliable = [];
        var hasPeace;
        for (var positionPlus = 1; (collun + (positionPlus * senseColl)) <= 7 &&
            (collun + (positionPlus * senseColl)) >= 0 &&
            (line + (positionPlus * senceLine)) >= 0 &&
            (line + (positionPlus * senceLine)) <= 7 &&
            !hasPeace &&
            positionPlus <= max; positionPlus += 1) {
            var index = (collun + (positionPlus * senseColl)) * 8 + (line + (positionPlus * senceLine));
            hasPeace = board[index].ocupatedBy;
            var collor = hasPeace === null || hasPeace === void 0 ? void 0 : hasPeace.collor;
            board[index].attackedBy[this.collor].push(this.name);
            if (collor !== this.collor) {
                avaliable.push(index);
            }
        }
        ;
        return avaliable;
    };
    ;
    Piece.prototype.getLMove = function (collunPLus, linePLus, result, board) {
        var _a;
        var collun = Number(this.position.split('x')[0]);
        var line = Number(this.position.split('x')[1]);
        var index = (collun + collunPLus) * 8 + (line + linePLus);
        if (collun + collunPLus <= 7 &&
            collun + collunPLus >= 0 &&
            line + linePLus <= 7 &&
            line + linePLus >= 0) {
            if (((_a = board[index].ocupatedBy) === null || _a === void 0 ? void 0 : _a.collor) !== this.collor) {
                result.push(index);
            }
            board[index].attackedBy[this.collor].push(this.name);
        }
    };
    ;
    Piece.prototype.moveTo = function (board, target) {
        if (this.attacking.includes(target)) {
            var collun = Number(this.position.split('x')[0]);
            var line = Number(this.position.split('x')[1]);
            var crrIndex = collun * 8 + line;
            board[crrIndex].ocupatedBy = null;
            this.position = board[target].position;
            board[target].ocupatedBy = this;
            board[crrIndex].attackedBy.w.forEach(function (name) {
                var piece = board.find(function (square) { var _a; return ((_a = square.ocupatedBy) === null || _a === void 0 ? void 0 : _a.name) === name; }).ocupatedBy;
                piece.getMoves(board);
            });
            board[crrIndex].attackedBy.b.forEach(function (name) {
                var piece = board.find(function (square) { var _a; return ((_a = square.ocupatedBy) === null || _a === void 0 ? void 0 : _a.name) === name; }).ocupatedBy;
                piece.getMoves(board);
            });
            board[target].attackedBy.w.forEach(function (name) {
                var piece = board.find(function (square) { var _a; return ((_a = square.ocupatedBy) === null || _a === void 0 ? void 0 : _a.name) === name; }).ocupatedBy;
                piece.getMoves(board);
            });
            board[target].attackedBy.b.forEach(function (name) {
                var piece = board.find(function (square) { var _a; return ((_a = square.ocupatedBy) === null || _a === void 0 ? void 0 : _a.name) === name; }).ocupatedBy;
                piece.getMoves(board);
            });
            this.getMoves(board);
            return true;
        }
        return false;
    };
    ;
    return Piece;
}(ChessPiece_1["default"]));
exports["default"] = Piece;
