import Piece from "./Piece";
import Square from './Square';

export default class Queen extends Piece {
  constructor(
    public name: string,
    public position: string,
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

    const bottRight = this.diagonalMove(board, 1, 1);
    const bottLeft = this.diagonalMove(board, 1, -1);
    const topRight = this.diagonalMove(board, -1, 1);
    const topLeft = this.diagonalMove(board, -1, -1);

    const up = this.straightMove(board, -1, this.collun, formulaCollun);
    const down = this.straightMove(board, 1, this.collun, formulaCollun);
    const left = this.straightMove(board, -1, this.line, formulaLine);
    const right = this.straightMove(board, 1, this.line, formulaLine);

    const straight = [...up, ...down, ...left, ...right];
    const diagonal = [...bottRight, ...bottLeft, ...topRight, ...topLeft];

    const result =  [...straight, ...diagonal];

    this.attacking = result;
    return result;
  };
}
