import React, { ReactNode, useEffect, useState } from 'react';

import './css/board.css';

import boardStandart from './utilits/index';

import Square from '../class/Square';

export default function Board() {
  const [board, changeBoard] = useState<Square[]>([]);
  let tempBoard = [...board];
  
  const [squareSelected, changeSelected] = useState<Square | null>(null);

  useEffect(() => {
    tempBoard = boardStandart;
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

  //moveOrCapture
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
              <p>
              { `${square.ocupatedBy?.name || ''}` }
              </p>
            </div>
          )
        })
      }
    </div>
  );
}
