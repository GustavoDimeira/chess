import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";

export default class Queen extends Piece {
    constructor(
        readonly position: Pos,
        readonly color: boolean,
        readonly symbol: string = "Q"
    ) {
        super(position, color);

        this._icon = "♛";
    };

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        const attackTiles: Tile[] = [];
        const avaliableTiles: Tile[] = [];

        const directions: [number, number][] = [
            [+1, +0],
            [+0, +1],
            [-1, +0],
            [+0, -1],
            [+1, +1],
            [+1, -1],
            [-1, +1],
            [-1, -1]
        ];

        this.getDirectionalMoves(
            board, this.position, this.color, directions, attackTiles, avaliableTiles
        );

        return [avaliableTiles, attackTiles];
    }
}
