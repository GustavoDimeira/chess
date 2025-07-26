import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";

export default class King extends Piece {
    constructor(
       readonly position: Pos,
       readonly color: boolean 
    ) {
        super(position, color);

        this._icon = this.color ? "♔" : "♚";
    }

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        const values = [-1, 0, 1];
        const king_x = this.position.x;
        const king_y = this.position.y;

        let attackTiles: Tile[] = [];
        let avaliableTiles: Tile[] = [];

        values.forEach(x => values.forEach(y => {
            if (x || y) { // x 0 and y 0 = king tile
                const tile = board.getTile(new Pos(king_x + x, king_y + y));

                if (tile) {
                    if (!tile.attackedByEnemies(this.color) && !(tile.occupiedBy?.color == this.color)) {
                        avaliableTiles.push(tile);
                    }
                    attackTiles.push(tile);
                }
            }
        }))

        return [avaliableTiles, attackTiles];
    }
}