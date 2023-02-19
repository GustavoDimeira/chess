import Square from "./Square";

export default class Pawn {
  constructor(
    public name: string,
    public position: string,
    public collor: 'w' | 'b',
    public isFirstMove: boolean = true,
  ) {}

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

    // get catches
    if (
      left !== false &&
      board[left].ocupatedBy &&
      board[left].ocupatedBy.collor !== this.collor
    ) response.push(left);

    if (
      right !== false &&
      board[right].ocupatedBy &&
      board[right].ocupatedBy.collor !== this.collor
    ) response.push(right);

    return response;
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
    });
  }
}

board[17] = {
  position: '2x1',
  ocupatedBy: Pawn_7,
}

console.log(Pawn_1.getMoves(board));
console.log(Pawn_3.getMoves(board));
