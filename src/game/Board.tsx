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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squareSelected]);

  //moveOrCapture
  const selectSqrHandler = (square: Square, indexTarget: number) => {
    if (squareSelected?.ocupatedBy?.collor === turne) {
      if (squareSelected.ocupatedBy.moveTo(tempBoard, indexTarget)) {
        changeTurne(turne === 'b' ? 'w' : 'b');
        checkCastle(
          squareSelected.position, indexTarget, board[indexTarget].ocupatedBy?.name as string
        );
      };
      changeSelected(null);
    } else {
      changeSelected(square);
    }
    changeBoard(tempBoard);
  }

  //check if the king has castle
  const checkCastle = (crr: string, next: number, name: string): void => {
    const [collun, line] = crr.split('x');
    const crrIndex = Number(collun) * 8 + Number(line);
    
    if (name.split('King').length > 1 && (crrIndex === 4 || crrIndex === 60)) {
      switch (next) {
        case 2:
          tempBoard[0].ocupatedBy?.moveTo(tempBoard, 3, true);
          break;
        case 6:
          tempBoard[7].ocupatedBy?.moveTo(tempBoard, 5, true);
          break;
        case 58:
          tempBoard[56].ocupatedBy?.moveTo(tempBoard, 59, true);
          break;
        default:
          tempBoard[63].ocupatedBy?.moveTo(tempBoard, 61, true);
          break;
      }
      
    }
  };

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
