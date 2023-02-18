import Piece from "./Piece";

export default class Square {
  constructor(
    public position: string,
    public ocupatedBy: Piece | null = null,
  ) {}
}
