import ChessPiece from './ChessPiece';

export default class Square {
  constructor(
    public position: string,
    public ocupatedBy: ChessPiece | null = null,
    public attackedBy: {
      b: string[],
      w: string[]
    } = { b: [], w: [] }
  ) {}
}
