import Square from './Square';

export default abstract class Piece {
  constructor(
    protected name: string,
    public positon: string,
    public isSelected: boolean = false,
  ) {};

  protected straightMove(
    board: Square[], sense: 1 | -1, axis: number, formula: Function, max: number = 7,
  ): number[] {
    const collun = this.positon.split('x')[0];
    const line = this.positon.split('x')[1];

    const avaliable = [];
    let hasPeace;
  
    for (let positonPlus = 1;
      (axis + (positonPlus * sense)) <= 7 &&
      (axis + (positonPlus * sense)) >= 0 &&
      !hasPeace &&
      positonPlus <= max;
      positonPlus += 1
    ) {
      const index = formula(collun, line, (positonPlus * sense));
      hasPeace = board[index].ocupatedBy;
      avaliable.push(index);
    };
  
    return avaliable;
  }

  protected diagonalMove(
    board: Square[], senseColl: 1 | -1, senceDiag: 1 | -1, max: number = 7,
  ): number[] {
    const collun = Number(this.positon.split('x')[0]);
    const line = Number(this.positon.split('x')[1]);

    const avaliable = [];
    let hasPeace;
  
    for (let positonPlus = 1;
      (collun + (positonPlus * senseColl)) <= 7 &&
      (collun + (positonPlus * senseColl)) >= 0 &&
      (line + (positonPlus * senceDiag)) >= 0 &&
      (line + (positonPlus * senceDiag)) <= 7 &&
      !hasPeace &&
      positonPlus <= max;
      positonPlus += 1
    ) {
      const index = (collun + (positonPlus * senseColl)) * 8 + (line + (positonPlus * senceDiag));
      hasPeace = board[index].ocupatedBy;
      avaliable.push(index);
    };
  
    return avaliable;
  }

  protected abstract move(board: Square[], max: number): number[];
}
