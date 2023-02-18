import Square from './Square';

export default abstract class Piece {
  constructor(
    protected name: string,
    protected position: string | null,
    public collor: 'w' | 'b',
    public isSelected: boolean = false,
  ) { };

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
      const collor = board[index].ocupatedBy?.collor;
      if (collor !== this.collor) {
        avaliable.push(index);
      }
      hasPeace = board[index].ocupatedBy;
    };

    return avaliable;
  }

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
      
      if (collor !== this.collor) {
        avaliable.push(index);
      }
    };

    return avaliable;
  }

  protected abstract getMove(board: Square[], max?: number): number[];
}
