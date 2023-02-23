import Piece from "./Piece";
import Square from './Square';

export default class Bishop extends Piece {
  constructor(
    public name: string,
    protected position: string,
    public collor: 'w' | 'b',
    public icon: string,
  ) {
    super(name, position, collor, icon);
  }

  public getMoves(board: Square[]): number[] {
    this.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[this.collor].findIndex((iN) => iN === this.name);
      board[i].attackedBy[this.collor].splice(nameIndex, 1);
    });

    const bottRight = this.diagonalMove(board, 1, 1);
    const bottLeft = this.diagonalMove(board, 1, -1);
    const topRight = this.diagonalMove(board, -1, 1);
    const topLeft = this.diagonalMove(board, -1, -1);

    const result =  [...bottRight, ...bottLeft, ...topRight, ...topLeft];

    this.attacking = result;
    return result;
  };
}
