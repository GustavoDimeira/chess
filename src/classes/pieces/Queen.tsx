import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";

export default class Queen extends Piece {
    constructor(
        readonly position: Pos,
        readonly color: boolean,
    ) {
        super(position, color);
    };

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        const y = this.position.y;
        const x = this.position.x

        // pegar linha
        let attackTiles: Tile[] = [];
        let avaliableTiles: Tile[] = [];

        for (let crr_x = 0; crr_x < board.size; crr_x++) {
            const crrTile = board.tiles[y][crr_x];

            if (crr_x == x) continue;
            if (crrTile.occupiedBy) {
                if (crr_x > x) { // encerrar
                    attackTiles.push(crrTile)
                    if (crrTile.occupiedBy.color != this.color) avaliableTiles.push(crrTile);
                    crr_x = board.size // para parar
                } else { // resetar
                    attackTiles = [crrTile];
                    if (crrTile.occupiedBy.color != this.color) avaliableTiles = [crrTile];
                }
            } else {
                avaliableTiles.push(crrTile);
                attackTiles.push(crrTile);
            }
        }

        // pegar coluna
        for (let crr_y = 0; crr_y < board.size; crr_y++) {
            const crrTile = board.tiles[crr_y][x];

            if (crr_y == y) continue;
            if (crrTile.occupiedBy) {
                if (crr_y > y) { // encerrar
                    attackTiles.push(crrTile)
                    if (crrTile.occupiedBy.color != this.color) avaliableTiles.push(crrTile);
                    crr_y = board.size // para parar
                } else { // resetar
                    attackTiles = [crrTile];
                    if (crrTile.occupiedBy.color != this.color) avaliableTiles = [crrTile];
                }
            } else {
                avaliableTiles.push(crrTile);
                attackTiles.push(crrTile);
            }
        }

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

            if (crrTile.position.equals(this.position)) continue;

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
