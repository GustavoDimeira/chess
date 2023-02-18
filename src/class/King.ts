import Piece from "./Piece";
import Square from './Square';

export default class King extends Piece {
  constructor(
    protected name: string,
    protected position: string,
    protected collor: 'w' | 'b',
  ) {
    super(name, position, collor);
  }

  public move(board: Square[]): number[] {
    const collun = Number(this.position.split('x')[0]);
    const line = Number(this.position.split('x')[1]);
    
    const formulaLine = (collun: number, line: number, positionPlus: number) => {
      return (collun * 8 + (line + positionPlus));
    }
    const formulaCollun = (collun: number, line: number, positionPlus: number) => {
      return ((collun +  positionPlus) * 8 + line);
    }

    const bottRight = this.diagonalMove(board, 1, 1, 1);
    const bottLeft = this.diagonalMove(board, 1, -1, 1);
    const topRight = this.diagonalMove(board, -1, 1, 1);
    const topLeft = this.diagonalMove(board, -1, -1, 1);

    const up = this.straightMove(board, -1, collun, formulaCollun, 1);
    const down = this.straightMove(board, 1, collun, formulaCollun, 1);
    const left = this.straightMove(board, -1, line, formulaLine, 1);
    const right = this.straightMove(board, 1, line, formulaLine, 1);

    const straight = [...up, ...down, ...left, ...right];
    const diagonal = [...bottRight, ...bottLeft, ...topRight, ...topLeft];

    return [...straight, ...diagonal];
  };
}
