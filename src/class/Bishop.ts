import Piece from "./Piece";
import Square from './Square';

export default class Bishop extends Piece {
  constructor(
    protected name: string,
    protected position: string,
    protected collor: 'w' | 'b',
  ) {
    super(name, position, collor);
  }

  public move(board: Square[]): number[] {
    const bottRight = this.diagonalMove(board, 1, 1);
    const bottLeft = this.diagonalMove(board, 1, -1);
    const topRight = this.diagonalMove(board, -1, 1);
    const topLeft = this.diagonalMove(board, -1, -1);

    return [...bottRight, ...bottLeft, ...topRight, ...topLeft];
  };
}