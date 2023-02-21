import Square from './Square';

export default abstract class ChessPiece {
  constructor(
    public name: string,
    protected position: string | null,
    public collor: 'w' | 'b',
    public attacking: number[] = []
  ) { };
  public abstract getMoves(board: Square[]): number[];

  public abstract moveTo(board: Square[], target: number): boolean;

  protected abstract killPiece(board: Square[], target: number): void;
}
