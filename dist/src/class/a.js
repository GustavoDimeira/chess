var collun = 0;
var line = 0;
var collorCrr = 'w';
var board = [];
for (var x = 0; x <= 7; x += 1) {
    for (var y = 0; y <= 7; y += 1) {
        board.push({
            position: "".concat(x, "x").concat(y),
            ocupatedBy: null,
        });
    }
}
board[6].ocupatedBy = {
    collor: 'w',
};
var straightMove = function (board, sense, axis, formula, max) {
    var _a;
    if (max === void 0) { max = 7; }
    var avaliable = [];
    var hasPeace;
    for (var positionPlus = 1; (axis + (positionPlus * sense)) <= 7 &&
        (axis + (positionPlus * sense)) >= 0 &&
        !hasPeace &&
        positionPlus <= max; positionPlus += 1) {
        var index = formula(collun, line, (positionPlus * sense));
        var collor = (_a = board[index].ocupatedBy) === null || _a === void 0 ? void 0 : _a.collor;
        if (collor !== collorCrr) {
            avaliable.push(index);
        }
        hasPeace = board[index].ocupatedBy;
    }
    ;
    return avaliable;
};
var formula = function (collun, line, positionPlus) {
    return collun * 8 + line + positionPlus;
};
console.log(straightMove(board, 1, line, formula));
