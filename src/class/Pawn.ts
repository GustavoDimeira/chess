import ChessPiece from "./ChessPiece";
import Square from "./Square";

// broken

export default class Pawn extends ChessPiece {
  constructor(
    public name: string,
    public position: string,
    public collor: 'w' | 'b',
    public icon: string,
    public attacking: number[] = [],
  ) {
    super(name, position, collor, icon);
  }

  public getMoves (board: Square[]): number[] {
    const direction = this.collor === 'w' ? -1 : 1;
    const forward = ((this.collun + direction) * 8 + this.line);

    const left = this.line > 0 ? forward - 1 : false; 
    const right = this.line < 7 ? forward + 1 : false; 

    const response: number[] = [];

    this.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[this.collor].findIndex((iN) => iN === this.name);
      board[i].attackedBy[this.collor].splice(nameIndex, 1);
    });

    // get move
    if (board[forward] && !board[forward]?.ocupatedBy) {
      if (board[forward + (8 * direction)] && !board[forward + (8 * direction)].ocupatedBy && this.isFirstMove) {
        response.push(forward + (8 * direction));
      }
      response.push(forward);
    };

    // get catches
    if (left !== false)  {
      if (
        board[left] !== undefined &&
        board[left].ocupatedBy !== null &&
        board[left].ocupatedBy?.collor !== this.collor
      ) { response.push(left); }
      board[left]?.attackedBy[this.collor].push(this.name);
    };

    if (right !== false)  {
      if (
        board[right] !== undefined &&
        board[right]?.ocupatedBy !== null &&
        board[right].ocupatedBy?.collor !== this.collor
      ) response.push(right);
      board[right]?.attackedBy[this.collor].push(this.name);
    };

    this.attacking = response;

    return response;
  };
}
