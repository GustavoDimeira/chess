import Piece from "./Piece";
import Square from './Square';

export default class Rook extends Piece {
  constructor(
    public name: string,
    protected position: string,
    public collor: 'w' | 'b',
    public icon: string,
  ) {
    super(name, position, collor, icon);
  }

  public getMoves(board: Square[]): number[] {
    const formulaLine = (collun: number, line: number, positionPlus: number) => {
      return (collun * 8 + (line + positionPlus));
    }
    const formulaCollun = (collun: number, line: number, positionPlus: number) => {
      return ((collun +  positionPlus) * 8 + line);
    }

    this.resetAttacking(board);

    const up = this.straightMove(board, -1, this.collun, formulaCollun);
    const down = this.straightMove(board, 1, this.collun, formulaCollun);
    const left = this.straightMove(board, -1, this.line, formulaLine);
    const right = this.straightMove(board, 1, this.line, formulaLine);

    const result = [...up, ...down, ...left, ...right];

    if (this.collor === 'b') {
      const bKing = board[4].ocupatedBy;
      if (bKing?.isFirstMove) {
        bKing?.getMoves(board);
      }
    } else {
      const wKing = board[60].ocupatedBy;
      if (wKing?.isFirstMove) {
        wKing?.getMoves(board);
      }  
    }

    this.attacking = result;
    return result;
  };
}
