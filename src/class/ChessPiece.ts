import Square from './Square';

export default abstract class ChessPiece {
  constructor(
    public name: string,
    protected position: string,
    public icon: string,
    public collor: 'w' | 'b' = 'w',
    public attacking: number[] = [],
    public isFirstMove: boolean = true,
    protected collun: number = -1,
    protected line: number = -1,
  ) {
    if (name.split('_')[1] !== 'w' && name.split('_')[1] !=='b') {
      throw new Error('Incorrect name format');
    }
    this.collun = Number(this.position.split('x')[0]);
    this.line = Number(this.position.split('x')[1]);

    this.collor = name.split('_')[1] as 'w' | 'b';
  };
  public abstract getMoves(board: Square[]): number[];

  public moveTo(board: Square[], target: number, forceMove: boolean = false): boolean {
    if (this.attacking.includes(target) || forceMove) {
      this.isFirstMove = false;

      const crrIndex = this.collun * 8 + this.line;

      this.killPiece(board, target);

      board[crrIndex].ocupatedBy = null;
      board[target].ocupatedBy = this;
      this.position = board[target].position;

      this.collun = Number(this.position.split('x')[0]);
      this.line = Number(this.position.split('x')[1]);

      const recalcAttackOff = [
        ...board[crrIndex].attackedBy.w,
        ...board[crrIndex].attackedBy.b,
        ...board[target].attackedBy.w,
        ...board[target].attackedBy.b,
        board[target + 8]?.ocupatedBy?.name, board[target - 8]?.ocupatedBy?.name,
        board[crrIndex + 8]?.ocupatedBy?.name, board[crrIndex - 8]?.ocupatedBy?.name,
        board[target + 16]?.ocupatedBy?.name, board[target - 16]?.ocupatedBy?.name,
        board[crrIndex + 16]?.ocupatedBy?.name, board[crrIndex - 16]?.ocupatedBy?.name,
      ];

      recalcAttackOff.forEach((name) => {
        const piece = board.find((square) => square.ocupatedBy?.name === name)?.ocupatedBy;
        piece?.getMoves(board);
      });

      this.getMoves(board);

      return true;
    } return false;
  };

  public killPiece(board: Square[], target: number) {
    const piece = board[target].ocupatedBy;
    piece?.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[piece.collor].findIndex((iN) => iN === piece.name);
      board[i].attackedBy[piece.collor].splice(nameIndex, 1);
    });
    if (piece) piece.attacking = [];
  };

  protected resetAttacking(board: Square[]) {
    this.attacking.forEach((squareI) => {
      board[squareI].attackedBy[this.collor] = [...new Set(board[squareI].attackedBy[this.collor])];

      const nameIndex = board[squareI].attackedBy[this.collor].findIndex((iN) => iN === this.name);

      board[squareI].attackedBy[this.collor].splice(nameIndex, 1);
    });
  }
}
