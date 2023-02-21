import Square from './Square';
import ChessPiece from './ChessPiece';

export default abstract class Piece extends ChessPiece {
  constructor(
    public name: string,
    protected position: string,
    public collor: 'w' | 'b',
  ) { 
    super(name, position, collor);
  };

  protected straightMove(
    board: Square[], sense: 1 | -1, axis: number, formula: Function, max: number = 7,
  ): number[] {
    const collun = Number(this.position.split('x')[0]);
    const line = Number(this.position.split('x')[1]);

    const avaliable: number[] = [];
    let hasPeace;

    for (let positionPlus = 1;
      (axis + (positionPlus * sense)) <= 7 &&
      (axis + (positionPlus * sense)) >= 0 &&
      !hasPeace &&
      positionPlus <= max;
      positionPlus += 1
    ) {
      const index = formula(collun, line, (positionPlus * sense));
      hasPeace = board[index].ocupatedBy;
      const collor = hasPeace?.collor;

      board[index].attackedBy[this.collor].push(this.name);

      if (collor !== this.collor) {
        avaliable.push(index);
      }
    };

    return avaliable;
  };

  protected diagonalMove(
    board: Square[], senseColl: 1 | -1, senceLine: 1 | -1, max: number = 7,
  ): number[] {
    const collun = Number(this.position.split('x')[0]);
    const line = Number(this.position.split('x')[1]);

    const avaliable: number[] = [];
    let hasPeace;

    for (let positionPlus = 1;
      (collun + (positionPlus * senseColl)) <= 7 &&
      (collun + (positionPlus * senseColl)) >= 0 &&
      (line + (positionPlus * senceLine)) >= 0 &&
      (line + (positionPlus * senceLine)) <= 7 &&
      !hasPeace &&
      positionPlus <= max;
      positionPlus += 1
    ) {
      const index = (collun + (positionPlus * senseColl)) * 8 + (line + (positionPlus * senceLine));
      hasPeace = board[index].ocupatedBy;
      const collor = hasPeace?.collor;

      board[index].attackedBy[this.collor].push(this.name);

      if (collor !== this.collor) {
        avaliable.push(index);
      }
    };

    return avaliable;
  };


  public getLMove(
    collunPLus: number, linePLus: number, result: number[], board: Square[],
  ): void {
    const collun = Number(this.position.split('x')[0]);
    const line = Number(this.position.split('x')[1]);

    const index = (collun + collunPLus) * 8 + (line + linePLus);

    if (
      collun + collunPLus <= 7 &&
      collun + collunPLus >= 0 &&
      line + linePLus <= 7 &&
      line + linePLus >= 0
    ) {
      if (board[index].ocupatedBy?.collor !== this.collor) {
        result.push(index);
      } board[index].attackedBy[this.collor].push(this.name);
    }
  };

  public moveTo(board: Square[], target: number): boolean {
    if (this.attacking.includes(target)) {
      const collun = Number(this.position.split('x')[0]);
      const line = Number(this.position.split('x')[1]);

      const crrIndex = collun * 8 + line

      board[crrIndex].ocupatedBy = null;
      
      this.killPiece(board, target); 

      this.position = board[target].position;
      board[target].ocupatedBy = this;

      const recalcAttackOff = [
        ...board[crrIndex].attackedBy.w,
        ...board[crrIndex].attackedBy.b,
        ...board[target].attackedBy.w,
        ...board[target].attackedBy.b,
      ];

      recalcAttackOff.forEach((name) => {
        const piece = board.find((square) => square.ocupatedBy?.name === name)?.ocupatedBy;
        piece?.getMoves(board);
      });

      this.getMoves(board);

      return true;
    } return false; 
  };

  protected killPiece(board: Square[], target: number) {
    const piece = board[target].ocupatedBy;
    console.log(piece);
    piece?.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[piece.collor].findIndex((iN) => iN === piece.name);
      board[i].attackedBy[piece.collor].splice(nameIndex, 1);
    });
  };
}
