import Piece from "./Piece";
import Square from './Square';

export default class Queen extends Piece {
  constructor(
    protected name: string,
    protected position: string,
    protected collor: 'w' | 'b',
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

    const bottRight = this.diagonalMove(board, 1, 1);
    const bottLeft = this.diagonalMove(board, 1, -1);
    const topRight = this.diagonalMove(board, -1, 1);
    const topLeft = this.diagonalMove(board, -1, -1);

    const up = this.straightMove(board, -1, collun, formulaCollun);
    const down = this.straightMove(board, 1, collun, formulaCollun);
    const left = this.straightMove(board, -1, line, formulaLine);
    const right = this.straightMove(board, 1, line, formulaLine);

    const straight = [...up, ...down, ...left, ...right];
    const diagonal = [...bottRight, ...bottLeft, ...topRight, ...topLeft];

    return [...straight, ...diagonal];
  };
}
const queen = new Queen('queen_1', '0x0', 'w');

const board = []

for (let x = 0; x <= 7; x+= 1) {
  for (let y = 0; y <= 7;  y+= 1) {
    board.push({
      position: `${x}x${y}`,
      ocupatedBy: null,
    });
  }
}

console.log(queen.move(board));
