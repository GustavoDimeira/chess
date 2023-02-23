import Square from './Square';
import ChessPiece from './ChessPiece';

export default abstract class Piece extends ChessPiece {
  constructor(
    public name: string,
    protected position: string,
    public collor: 'w' | 'b',
    public icon: string,
  ) { 
    super(name, position, collor, icon);
  };

  protected straightMove(
    board: Square[], sense: 1 | -1, axis: number, formula: Function, max: number = 7,
  ): number[] {
    const avaliable: number[] = [];
    let hasPeace;

    for (let positionPlus = 1;
      (axis + (positionPlus * sense)) <= 7 &&
      (axis + (positionPlus * sense)) >= 0 &&
      !hasPeace &&
      positionPlus <= max;
      positionPlus += 1
    ) {
      const index = formula(this.collun, this.line, (positionPlus * sense));
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
    const avaliable: number[] = [];
    let hasPeace;

    for (let positionPlus = 1;
      (this.collun + (positionPlus * senseColl)) <= 7 &&
      (this.collun + (positionPlus * senseColl)) >= 0 &&
      (this.line + (positionPlus * senceLine)) >= 0 &&
      (this.line + (positionPlus * senceLine)) <= 7 &&
      !hasPeace &&
      positionPlus <= max;
      positionPlus += 1
    ) {
      const index = (
        this.collun + (positionPlus * senseColl)) * 8 + (this.line + (positionPlus * senceLine)
      );
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
    const index = (this.collun + collunPLus) * 8 + (this.line + linePLus);

    if (
      this.collun + collunPLus <= 7 &&
      this.collun + collunPLus >= 0 &&
      this.line + linePLus <= 7 &&
      this.line + linePLus >= 0
    ) {
      if (board[index].ocupatedBy?.collor !== this.collor) {
        result.push(index);
      } board[index].attackedBy[this.collor].push(this.name);
    }
  };
}
