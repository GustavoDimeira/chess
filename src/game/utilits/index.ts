import Square from '../../class/Square';

import Pawn from '../../class/Pawn';
import Bishop from '../../class/Bishop';
import Knight from '../../class/Knight';
import Rook from '../../class/Rook';
import Queen from '../../class/Queen';
import King from '../../class/King';

const boardStandart: Square[] = [];

for (let x = 0; x <= 7; x++) {
  for (let y = 0; y <= 7; y++) {
    boardStandart.push(new Square(`${x}x${y}`));
  };
};

const Rook_w_0 = new Rook('Rook_w_0', '7x0', '♜');
const Knight_w_0 = new Knight('Knight_w_0', '7x1', '♞');
const Bishop_w_0 = new Bishop('Bishop_w_0', '7x2', '♝');
const Queen_w_0 = new Queen('Queen_w_0', '7x3', '♛');
const King_w = new King('King_w', '7x4', '♚');
const Bishop_w_1 = new Bishop('Bishop_w_1', '7x5', '♝');
const Knight_w_1 = new Knight('Knight_w_1', '7x6', '♞');
const Rook_w_1 = new Rook('Rook_w_1', '7x7', '♜');

const Pawn_w_0 = new Pawn('Pawn_w_0', '6x0', '♟︎');
const Pawn_w_1 = new Pawn('Pawn_w_1', '6x1', '♟︎');
const Pawn_w_2 = new Pawn('Pawn_w_2', '6x2', '♟︎');
const Pawn_w_3 = new Pawn('Pawn_w_3', '6x3', '♟︎');
const Pawn_w_4 = new Pawn('Pawn_w_4', '6x4', '♟︎');
const Pawn_w_5 = new Pawn('Pawn_w_5', '6x5', '♟︎');
const Pawn_w_6 = new Pawn('Pawn_w_6', '6x6', '♟︎');
const Pawn_w_7 = new Pawn('Pawn_w_7', '6x7', '♟︎');

const Rook_b_0 = new Rook('Rook_b_0', '0x0', '♖');
const Knight_b_0 = new Knight('Knight_b_0', '0x1', '♘');
const Bishop_b_0 = new Bishop('Bishop_b_0', '0x2', '♗');
const Queen_b_0 = new Queen('Queen_b_0', '0x3', '♕');
const King_b = new King('King_b', '0x4', '♔');
const Bishop_b_1 = new Bishop('Bishop_b_1', '0x5', '♗');
const Knight_b_1 = new Knight('Knight_b_1', '0x6', '♘');
const Rook_b_1 = new Rook('Rook_b_1', '0x7', '♖');

const Pawn_b_0 = new Pawn('Pawn_b_0', '1x0', '♙');
const Pawn_b_1 = new Pawn('Pawn_b_1', '1x1', '♙');
const Pawn_b_2 = new Pawn('Pawn_b_2', '1x2', '♙');
const Pawn_b_3 = new Pawn('Pawn_b_3', '1x3', '♙');
const Pawn_b_4 = new Pawn('Pawn_b_4', '1x4', '♙');
const Pawn_b_5 = new Pawn('Pawn_b_5', '1x5', '♙');
const Pawn_b_6 = new Pawn('Pawn_b_6', '1x6', '♙');
const Pawn_b_7 = new Pawn('Pawn_b_7', '1x7', '♙');

boardStandart[0].ocupatedBy = Rook_b_0;
boardStandart[1].ocupatedBy = Knight_b_0;
boardStandart[2].ocupatedBy = Bishop_b_0;
boardStandart[3].ocupatedBy = Queen_b_0;
boardStandart[4].ocupatedBy = King_b;
boardStandart[5].ocupatedBy = Bishop_b_1;
boardStandart[6].ocupatedBy = Knight_b_1;
boardStandart[7].ocupatedBy = Rook_b_1;

boardStandart[8].ocupatedBy = Pawn_b_0;
boardStandart[9].ocupatedBy = Pawn_b_1;
boardStandart[10].ocupatedBy = Pawn_b_2;
boardStandart[11].ocupatedBy = Pawn_b_3;
boardStandart[12].ocupatedBy = Pawn_b_4;
boardStandart[13].ocupatedBy = Pawn_b_5;
boardStandart[14].ocupatedBy = Pawn_b_6;
boardStandart[15].ocupatedBy = Pawn_b_7;

boardStandart[48].ocupatedBy = Pawn_w_0;
boardStandart[49].ocupatedBy = Pawn_w_1;
boardStandart[50].ocupatedBy = Pawn_w_2;
boardStandart[51].ocupatedBy = Pawn_w_3;
boardStandart[52].ocupatedBy = Pawn_w_4;
boardStandart[53].ocupatedBy = Pawn_w_5;
boardStandart[54].ocupatedBy = Pawn_w_6;
boardStandart[55].ocupatedBy = Pawn_w_7;

boardStandart[56].ocupatedBy = Rook_w_0;
boardStandart[57].ocupatedBy = Knight_w_0;
boardStandart[58].ocupatedBy = Bishop_w_0;
boardStandart[59].ocupatedBy = Queen_w_0;
boardStandart[60].ocupatedBy = King_w;
boardStandart[61].ocupatedBy = Bishop_w_1;
boardStandart[62].ocupatedBy = Knight_w_1;
boardStandart[63].ocupatedBy = Rook_w_1;

boardStandart.forEach((square) => {
  if (square.ocupatedBy) {
    square.ocupatedBy.getMoves(boardStandart);
  };
});

export default boardStandart;
