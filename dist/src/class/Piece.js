var Piece = /** @class */ (function () {
    function Piece(name, position, collor, isSelected) {
        if (isSelected === void 0) { isSelected = false; }
        this.name = name;
        this.position = position;
        this.collor = collor;
        this.isSelected = isSelected;
    }
    ;
    Piece.prototype.straightMove = function (board, sense, axis, formula, max) {
        var _a;
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
            var collor = (_a = board[index].ocupatedBy) === null || _a === void 0 ? void 0 : _a.collor;
            if (collor !== this.collor) {
                avaliable.push(index);
            }
            hasPeace = board[index].ocupatedBy;
        }
        ;
        return avaliable;
    };
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
            if (collor !== this.collor) {
                avaliable.push(index);
            }
        }
        ;
        return avaliable;
    };
    return Piece;
}());
export default Piece;
