import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";

export default class Rook extends Piece {
    constructor(
        readonly position: Pos,
        readonly color: boolean,
    ) {
        super(position, color);
    };

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        throw new Error("Method not implemented.");
    }
}