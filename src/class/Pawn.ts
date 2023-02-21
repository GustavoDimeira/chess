import ChessPiece from "./ChessPiece";
import Square from "./Square";

// broken

export default class Pawn extends ChessPiece {
  constructor(
    public name: string,
    public position: string,
    public collor: 'w' | 'b',
    public isFirstMove: boolean = true,
    public attacking: number[] = [],
  ) {
    super(name, position, collor);
  }

  public getMoves (board: Square[]): number[] {
    const collun = Number(this.position.split('x')[0]);
    const line = Number(this.position.split('x')[1]);

    const direction = this.collor === 'w' ? -1 : 1;
    const forward = ((collun + direction) * 8 + line);

    const left = line > 0 ? forward - 1 : false; 
    const right = line < 7 ? forward + 1 : false; 

    const response: number[] = [];

    this.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[this.collor].findIndex((iN) => iN === this.name);
      board[i].attackedBy[this.collor].splice(nameIndex, 1);
    });
    
    this.attacking = [];

    // get move
    if (board[forward] && !board[forward].ocupatedBy) {
      if (board[forward + (8 * direction)] && !board[forward + (8 * direction)].ocupatedBy && this.isFirstMove) {
        response.push(forward + (8 * direction));
      }
      response.push(forward);
    };

    // get catches
    if (left !== false)  {
      if (
        board[left].ocupatedBy !== null &&
        board[left].ocupatedBy?.collor !== this.collor
      ) { response.push(left); }
      board[left].attackedBy[this.collor].push(this.name);
    };

    if (right !== false)  {
      if (
        board[right].ocupatedBy !== null &&
        board[right].ocupatedBy?.collor !== this.collor
      ) response.push(right);
      board[right].attackedBy[this.collor].push(this.name);
    };

    this.attacking = response;

    return response;
  };

  public moveTo(board: Square[], target: number): boolean {
    if (this.attacking.includes(target)) {
      const collun = Number(this.position.split('x')[0]);
      const line = Number(this.position.split('x')[1]);

      const crrIndex = collun * 8 + line

      board[crrIndex].ocupatedBy = null;
      
      this.position = board[target].position;
      board[target].ocupatedBy = this;

      board[crrIndex].attackedBy.w.forEach((name) => {
        const piece = board.find((square) => square.ocupatedBy?.name === name)?.ocupatedBy;
        piece?.getMoves(board);
      });
      
      board[crrIndex].attackedBy.b.forEach((name) => {
        const piece = board.find((square) => square.ocupatedBy?.name === name)?.ocupatedBy;
        piece?.getMoves(board);
      });

      board[target].attackedBy.w.forEach((name) => {
        const piece = board.find((square) => square.ocupatedBy?.name === name)?.ocupatedBy;
        piece?.getMoves(board);
      });
      
      board[target].attackedBy.b.forEach((name) => {
        const piece = board.find((square) => square.ocupatedBy?.name === name)?.ocupatedBy;
        piece?.getMoves(board);
      });

      this.getMoves(board);

      return true;
    } return false;
  };

  protected killPiece(board: Square[], target: number) {
    console.log(1)
    const piece = board[target].ocupatedBy;
    piece?.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[piece.collor].findIndex((iN) => iN === this.name);
      board[i].attackedBy[this.collor].splice(nameIndex, 1);
    });
  };
}
