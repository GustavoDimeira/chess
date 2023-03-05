import Piece from "./Piece";
import Square from './Square';

export default class King extends Piece {
  constructor(
    public name: string,
    protected position: string,
    public icon: string,
  ) {
    super(name, position, icon);
  }

  public getMoves(board: Square[]): number[] {
    const formulaLine = (collun: number, line: number, positionPlus: number) => {
      return (collun * 8 + (line + positionPlus));
    }
    const formulaCollun = (collun: number, line: number, positionPlus: number) => {
      return ((collun +  positionPlus) * 8 + line);
    }

    this.resetAttacking(board);

    const bottRight = this.diagonalMove(board, 1, 1, 1);
    const bottLeft = this.diagonalMove(board, 1, -1, 1);
    const topRight = this.diagonalMove(board, -1, 1, 1);
    const topLeft = this.diagonalMove(board, -1, -1, 1);

    const up = this.straightMove(board, -1, this.collun, formulaCollun, 1);
    const down = this.straightMove(board, 1, this.collun, formulaCollun, 1);
    const left = this.straightMove(board, -1, this.line, formulaLine, 1);
    const right = this.straightMove(board, 1, this.line, formulaLine, 1);

    const straight = [...up, ...down, ...left, ...right];
    const diagonal = [...bottRight, ...bottLeft, ...topRight, ...topLeft];

    const castle = this.getCastle(board);

    const result = [...straight, ...diagonal, ...castle];

    this.attacking = result;
    return result;
  };

  private getCastle(board: Square[]): number[] {
    const castle: number[] = [];

    if (this.collor === 'b') {
      const rook1 = board[0].ocupatedBy;
      const square1 = board[1].ocupatedBy;
      const square2 = board[2].ocupatedBy;
      const square3 = board[3].ocupatedBy;
      const king = board[4].ocupatedBy;
      const square5 = board[5].ocupatedBy;
      const square6 = board[6].ocupatedBy;
      const rook2 = board[7].ocupatedBy;

      if (
          king?.isFirstMove && rook1?.isFirstMove && !square1 && !square2 && !square3
        ) castle.push(2);
      
      if (
        king?.isFirstMove && rook2?.isFirstMove && !square5 && !square6
      ) castle.push(6);

    } else {
      const rook1 = board[56].ocupatedBy;
      const square1 = board[57].ocupatedBy;
      const square2 = board[58].ocupatedBy;
      const square3 = board[59].ocupatedBy;
      const king = board[60].ocupatedBy;
      const square5 = board[61].ocupatedBy;
      const square6 = board[62].ocupatedBy;
      const rook2 = board[63].ocupatedBy;

      if (
          king?.isFirstMove && rook1?.isFirstMove && !square1 && !square2 && !square3
        ) castle.push(58);
      if (
        king?.isFirstMove && rook2?.isFirstMove && !square5 && !square6
      ) castle.push(62);
    };

    return castle;
  };
}
