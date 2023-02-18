import Piece from "./Piece";
import Square from './Square';

export default class Rook extends Piece {
  constructor(
    public name: string,
    public position: string,
    public collor: 'w' | 'b',
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

    const up = this.straightMove(board, -1, collun, formulaCollun);
    const down = this.straightMove(board, 1, collun, formulaCollun);
    const left = this.straightMove(board, -1, line, formulaLine);
    const right = this.straightMove(board, 1, line, formulaLine);

    return [...up, ...down, ...left, ...right];
  };
}
