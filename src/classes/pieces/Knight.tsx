import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";
import Rook from "./Rook";

export default class Knight extends Piece {
    constructor(
        readonly position: Pos,
        readonly color: boolean,
    ) {
        super(position, color);

        this._icon = this.color ? "♘" : "♞";
    }

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        const y = this.position.y;
        const x = this.position.x;

        const attackTiles: Tile[] = [];
        const avaliableTiles: Tile[] = [];

        const knightMoves = [
            [+2, +1], [+2, -1],
            [-2, +1], [-2, -1],
            [+1, +2], [+1, -2],
            [-1, +2], [-1, -2],
        ];

        for (const [dy, dx] of knightMoves) {
            const newY = y + dy;
            const newX = x + dx;

            const crrTile = board.getTile(new Pos(newY, newX));
            if (!crrTile) continue;

            attackTiles.push(crrTile);
            if (!crrTile.occupiedBy || crrTile.occupiedBy.color !== this.color) {
                avaliableTiles.push(crrTile);
            }
        }

        return [avaliableTiles, attackTiles];
    }
}
