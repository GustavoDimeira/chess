import Square from './Square';

export default abstract class Piece {
  constructor(
    protected _name: string,
    public positon: string,
    public isSelected: boolean = false,
  ) {};

  protected straightMove(
    board: Square[],
    sense: 1 | -1,
    axis: number,
    formula: Function,
    max: number = 7,
  ): number[] {
    const collun = this.positon.split('x')[0];
    const line = this.positon.split('x')[1];
    
    const avaliable = [];
    let hasPeace;

    for (
      let positonPlus = 1;
      (axis + (positonPlus * sense)) <= 7 &&
      (axis + (positonPlus * sense)) >= 0 &&
      !hasPeace &&
      positonPlus <= max;
      positonPlus += 1
    ) {
      hasPeace = board[formula(collun, line, (positonPlus * sense))].ocupatedBy;
      avaliable.push(formula(collun, line, (positonPlus * sense)));
    }

    return avaliable;
  }

  protected abstract move(board: Square[], max: number): number[];
}
