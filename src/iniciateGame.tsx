import Game from "./classes/Game";
import Board from "./classes/Board";
import King from "./classes/pieces/King";
import Queen from "./classes/pieces/Queen";
import Bishop from "./classes/pieces/Bishop";
import Knight from "./classes/pieces/Knight";
import Rook from "./classes/pieces/Rook";
import Pawn from "./classes/pieces/Pawn";
import Pos from "./classes/Pos";

const board = new Board(8);
const game = new Game(board, [10, 10], true);

[
    // black
    new Rook(new Pos(2, 4), false),

    // white
    new Rook(new Pos(4, 4), true),
    new King(new Pos(6, 4), true),
].forEach((piece) => game.addPiece(piece));

game.pieceList.forEach((piece) => piece.getAvaliableMoves(game.board));

export default game;
