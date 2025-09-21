import Game from "./classes/Game";
import Board from "./classes/Board";
import King from "./classes/pieces/King";
import Queen from "./classes/pieces/Queen";
import Bishop from "./classes/pieces/Bishop";
import Knight from "./classes/pieces/Knight";
import Rook from "./classes/pieces/Rook";
import Pawn from "./classes/pieces/Pawn";
import Pos from "./classes/Pos";

const board = new Board(8, 8);
const game = new Game(board, [1000, 1000], true);

// Setup inicial padrão de xadrez
const initialPieces = [
  // Peças pretas
  new Rook(new Pos(0, 0), false),
  new Knight(new Pos(0, 1), false),
  new Bishop(new Pos(0, 2), false),
  new Queen(new Pos(0, 3), false),
  new King(new Pos(0, 4), false),
  new Bishop(new Pos(0, 5), false),
  new Knight(new Pos(0, 6), false),
  new Rook(new Pos(0, 7), false),
  ...Array.from({ length: 8 }, (_, i) => new Pawn(new Pos(1, i), false)),

  // Peças brancas
  ...Array.from({ length: 8 }, (_, i) => new Pawn(new Pos(6, i), true)),
  new Rook(new Pos(7, 0), true),
  new Knight(new Pos(7, 1), true),
  new Bishop(new Pos(7, 2), true),
  new Queen(new Pos(7, 3), true),
  new King(new Pos(7, 4), true),
  new Bishop(new Pos(7, 5), true),
  new Knight(new Pos(7, 6), true),
  new Rook(new Pos(7, 7), true),
];

// Adiciona todas as peças no jogo
initialPieces.forEach(piece => game.addPiece(piece));

// Atualiza movimentos disponíveis de todas as peças
game.board.pieceList.forEach(piece => piece.getAvaliableMoves(game.board, game.turn));

game.playerColor = true;

export default game;
