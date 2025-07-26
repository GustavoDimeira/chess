import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";

export default class Bishop extends Piece {
    constructor(
        readonly position: Pos,
        readonly color: boolean,
    ) {
        super(position, color);

        this._icon = this.color ? "♗" : "♝";
    };

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        const y = this.position.y;
        const x = this.position.x;

        const attackTiles: Tile[] = [];
        const avaliableTiles: Tile[] = [];

        this.exploreDirection(board, y, x, -1, -1, attackTiles, avaliableTiles); // --
        this.exploreDirection(board, y, x, -1, +1, attackTiles, avaliableTiles); // -+
        this.exploreDirection(board, y, x, +1, +1, attackTiles, avaliableTiles); // ++
        this.exploreDirection(board, y, x, +1, -1, attackTiles, avaliableTiles); // +-

        return [avaliableTiles, attackTiles];
    }

    private exploreDirection(
        board: Board,
        startY: number,
        startX: number,
        yStep: number,
        xStep: number,
        attackTiles: Tile[],
        avaliableTiles: Tile[]
    ): void {
        for (let offset = 1; offset < board.size; offset++) {
            const newY = startY + offset * yStep;
            const newX = startX + offset * xStep;

            const crrTile = board.getTile(new Pos(newY, newX));
            if (!crrTile) break;

            if (crrTile.occupiedBy) {
                if (crrTile.occupiedBy.color !== this.color) {
                    avaliableTiles.push(crrTile);
                }
                attackTiles.push(crrTile);
                break;
            }

            avaliableTiles.push(crrTile);
            attackTiles.push(crrTile);
        }
    }
}