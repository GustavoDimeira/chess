import ChessPiece from "./ChessPiece";
import Square from "./Square";

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

    // get move
    if (board[forward] && !board[forward].ocupatedBy) {
      if (board[forward + (8 * direction)] && !board[forward + (8 * direction)].ocupatedBy && this.isFirstMove) {
        response.push(forward + (8 * direction));
      }
      response.push(forward);
    };

    this.attacking = [];

    // get catches
    if (left !== false)  {
      if (
        board[left].ocupatedBy &&
        board[left].ocupatedBy.collor !== this.collor
      ) { response.push(left); }
      board[left].attackedBy[this.collor].push(this.name);
      this.attacking.push(left);
    };

    if (right !== false)  {
      if (
        board[right].ocupatedBy &&
        board[right].ocupatedBy.collor !== this.collor
      ) { response.push(right); }
      board[right].attackedBy[this.collor].push(this.name);
      this.attacking.push(right);
    };

    return response;
  };

  public moveTo(board: Square[], target: number): boolean {
    return true;
  };
}

const Pawn_1 = new Pawn('Pawn_1', '1x0', 'b');
const Pawn_3 = new Pawn('Pawn_3', '1x1', 'b');

const Pawn_7 = new Pawn('Pawn_7', '2x1', 'w');

const board = [];

for (let x = 0; x <= 7; x+= 1) {
  for (let y = 0; y <= 7;  y+= 1) {
    board.push({
      position: `${x}x${y}`,
      ocupatedBy: null,
      attackedBy: {
        w: ['a'],
        b: ['b'],
      },
    });
  }
}

board[17] = {
  position: '2x1',
  ocupatedBy: Pawn_7,
  attackedBy: {
    w: ['a'],
    b: ['a'],
  },
}

console.log(Pawn_1.getMoves(board));
console.log(Pawn_3.getMoves(board));
