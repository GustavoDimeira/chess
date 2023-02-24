import React, { ReactNode, useEffect, useState } from 'react';

import './css/board.css';

import boardStandart from './utilits/index';

import Square from '../class/Square';

export default function Board() {
  const [board, changeBoard] = useState<Square[]>([]);
  let tempBoard = [...board];
  const [squareSelected, changeSelected] = useState<Square | null>(null);
  const [turne, changeTurne] = useState<'w' | 'b'>('w');

  //set default board
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
    if (squareSelected?.ocupatedBy?.collor === turne) {
      if (squareSelected.ocupatedBy.moveTo(tempBoard, indexTarget)) {
        changeTurne(turne === 'w' ? 'b' : 'w');
      };
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
              className={
                `
                  square
                  ${ square.ocupatedBy ? '' : 'empty' }
                  ${ square.isAvaliable ? 'avaliable' : '' }
                  ${((Math.floor(i / 8) + i) % 2) > 0 ? 'black' : 'white'}
                `
              }
              onClick={ () => selectSqrHandler(square, i) }
            >
              <p
                className={
                  ` ${ square.ocupatedBy?.collor || '' } `
                }
              >
                { `${ square.ocupatedBy?.icon || (square.isAvaliable ? '·' : '') }` }
              </p>
            </div>
          )
        })
      }
    </div>
  );
}
