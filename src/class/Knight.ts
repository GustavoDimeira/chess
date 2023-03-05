import Piece from "./Piece";
import Square from './Square';

export default class Knight extends Piece {
  constructor(
    public name: string,
    protected position: string,
    public collor: 'w' | 'b',
    public icon: string,
  ) {
    super(name, position, collor, icon);
  }

  public getMoves(board: Square[]): number[] {
    const result: number[] = [];    

    this.resetAttacking(board);

    this.getLMove(+2, +1, result, board);
    this.getLMove(+2, -1, result, board);
    this.getLMove(-2, +1, result, board);
    this.getLMove(-2, -1, result, board);
    this.getLMove(+1, +2, result, board);
    this.getLMove(-1, +2, result, board);
    this.getLMove(+1, -2, result, board);
    this.getLMove(-1, -2, result, board);

    this.attacking = result;
    return result;
  };
}
