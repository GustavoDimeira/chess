import Piece from "./Piece";
import Square from './Square';

export default class Knight extends Piece {
  constructor(
    protected name: string,
    protected position: string,
    public collor: 'w' | 'b',
  ) {
    super(name, position, collor);
  }

  public getMove(board: Square[]): number[] {
    const result: number[] = [];    

    this.getLMove(+2, +1, result, board);
    this.getLMove(+2, -1, result, board);
    this.getLMove(-2, +1, result, board);
    this.getLMove(-2, -1, result, board);
    this.getLMove(+1, +2, result, board);
    this.getLMove(-1, +2, result, board);
    this.getLMove(+1, -2, result, board);
    this.getLMove(-1, -2, result, board);
 
    return result;
  };

  private getLMove(
    collunPLus: number,
    linePLus: number,
    result: number[],
    board: Square[]
  ): void {
    const collun = Number(this.position.split('x')[0]);
    const line = Number(this.position.split('x')[1]);

    const newIndex = (collun + collunPLus) * 8 + (line + linePLus);

    if (
      collun + collunPLus <= 7 &&
      collun + collunPLus >= 0 &&
      line + linePLus <= 7 &&
      line + linePLus >= 0 &&
      board[newIndex].ocupatedBy?.collor !== this.collor
    ) result.push(newIndex);
  };
}
