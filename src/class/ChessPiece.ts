import Square from './Square';

export default abstract class ChessPiece {
  constructor(
    public name: string,
    protected position: string | null,
    public collor: 'w' | 'b',
  ) { };
  public abstract moveTo(board: Square[], target: number): boolean;

  public abstract getMoves(board: Square[]): number[];
}