import React, { ReactNode, useEffect, useState } from 'react';

import './css/board.css';

import ChessPiece from '../class/ChessPiece';
import Square from '../class/Square';

import Pawn from '../class/Pawn';
import Rook from '../class/Rook';
import Bishop from '../class/Bishop';
import Queen from '../class/Queen';
import Knight from '../class/Knight';

export default function Board() {
  const [board, changeBoard] = useState<Square[]>([]);
  const tempBoard = [...board];
  
  const [squareSelected, changeSelected] = useState<Square | null>(null);

  useEffect(() => {
    for (let x = 0; x <= 7; x++) {
      for (let y = 0; y <= 7; y++) {
        tempBoard.push(new Square(`${x}x${y}`));
      };
    };

    changeBoard(tempBoard);
  }, []);

  useEffect(() => {
    const Rook_1 = new Rook('Rook_1', '7x0', 'w');
    const Bishop_2 = new Bishop('Bishop_2', '0x0', 'w');

    const Bishop_3 = new Bishop('Bishop_3', '2x0', 'b');
    const Bishop_4 = new Bishop('Bishop_4', '3x3', 'b');

    const Queen_1 = new Queen('Queen_1', '2x3', 'w');
    const Knight_1 = new Knight('Knight_1', '3x2', 'w');

    tempBoard[56].ocupatedBy = Rook_1;
    tempBoard[0].ocupatedBy = Bishop_2;
    tempBoard[16].ocupatedBy = Bishop_3;
    tempBoard[27].ocupatedBy = Bishop_4;
    tempBoard[19].ocupatedBy = Queen_1;
    tempBoard[26].ocupatedBy = Knight_1;

    Rook_1.getMoves(tempBoard);
    Bishop_2.getMoves(tempBoard);
    Bishop_3.getMoves(tempBoard);
    Bishop_4.getMoves(tempBoard);
    Queen_1.getMoves(tempBoard);
    Knight_1.getMoves(tempBoard);

    changeBoard(tempBoard);
  }, []);

  // show avaliable moves
  useEffect(() => {
    tempBoard.forEach((square) => square.isAvaliable = false);

    if (squareSelected?.ocupatedBy) {
      const piece = squareSelected.ocupatedBy;
      piece?.attacking.forEach((i) => {
        tempBoard[i].isAvaliable = true;
      });
    };

    changeBoard(tempBoard);
  }, [squareSelected]);

  const selectSqrHandler = (square: Square, indexTarget: number) => {
    if (squareSelected?.ocupatedBy) {
      squareSelected.ocupatedBy.moveTo(tempBoard, indexTarget);
      changeSelected(null);
    } else {
      changeSelected(square);
    }
    changeBoard(tempBoard);
  }

  return (
    <div className="board">
      {
        board.map((square, i): ReactNode => {
          return (
            <div
              key={ square.position }
              className={ `square ${square.isAvaliable ? 'avaliable': ''}` }
              onClick={ () => selectSqrHandler(square, i) }
            >
              { `${square.ocupatedBy?.name || ''}` }
            </div>
          )
        })
      }
    </div>
  );
}
