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

    this.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[this.collor].findIndex((iN) => iN === this.name);
      board[i].attackedBy[this.collor].splice(nameIndex, 1).filter(( item, i2, array ) => array.indexOf(item) === i2);
    });

    const up = this.straightMove(board, -1, this.collun, formulaCollun);
    const down = this.straightMove(board, 1, this.collun, formulaCollun);
    const left = this.straightMove(board, -1, this.line, formulaLine);
    const right = this.straightMove(board, 1, this.line, formulaLine);

    const result = [...up, ...down, ...left, ...right];

    this.attacking = result;
    return result;
  };
}
