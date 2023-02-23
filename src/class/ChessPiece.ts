import Square from './Square';

export default abstract class ChessPiece {
  constructor(
    public name: string,
    protected position: string,
    public collor: 'w' | 'b',
    public icon: string,
    public attacking: number[] = [],
    protected isFirstMove: boolean = true,
    protected collun: number = -1,
    protected line: number = -1,
  ) {
    this.collun = Number(this.position.split('x')[0]);
    this.line = Number(this.position.split('x')[1]);
  };
  public abstract getMoves(board: Square[]): number[];
  
  public moveTo(board: Square[], target: number): boolean {
    if (this.attacking.includes(target)) {
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

  protected killPiece(board: Square[], target: number) {
    const piece = board[target].ocupatedBy;
    piece?.attacking.forEach((i) => {
      const nameIndex = board[i].attackedBy[piece.collor].findIndex((iN) => iN === piece.name);
      board[i].attackedBy[piece.collor].splice(nameIndex, 1);
    });
  };
}
