import Piece from "./Piece";
import Square from './Square';

export default class Knight extends Piece {
  constructor(
    public name: string,
    protected position: string,
    public collor: 'w' | 'b',
  ) {
    super(name, position, collor);
  }

  public getMoves(board: Square[]): number[] {
    const result: number[] = [];    

    // remove the name from the list of attackedBy in every square
    this.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[this.collor].findIndex((iN) => iN === this.name);
      board[i].attackedBy[this.collor].splice(nameIndex, 1);
    })

    // refill the attackedBy array
    this.getLMove(+2, +1, result, board);
    this.getLMove(+2, -1, result, board);
    this.getLMove(-2, +1, result, board);
    this.getLMove(-2, -1, result, board);
    this.getLMove(+1, +2, result, board);
    this.getLMove(-1, +2, result, board);
    this.getLMove(+1, -2, result, board);
    this.getLMove(-1, -2, result, board);
 
    // refill the attacking list
    this.attacking = result;
    return result;
  };
}
