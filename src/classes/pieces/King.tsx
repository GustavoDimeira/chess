import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";
import Rook from "./Rook";

export default class King extends Piece {
    constructor(
       readonly position: Pos,
       readonly color: boolean,
       readonly symbol: string = "K"
    ) {
        super(position, color);

        this._icon = "♚";
    }

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        const values = [-1, 0, 1];
        const king_x = this.position.x;
        const king_y = this.position.y;

        let attackTiles: Tile[] = [];
        let avaliableTiles: Tile[] = [];

        values.forEach(x => values.forEach(y => {
            if (x || y) { // x 0 and y 0 = king tile
                const tile = board.getTile(new Pos(king_y + y, king_x + x));

                if (tile) {
                    if (tile.attackedByEnemies(this.color).length === 0 && (tile.occupiedBy?.color != this.color)) {
                        avaliableTiles.push(tile);
                    }
                    attackTiles.push(tile);
                }
            }
        }));

        // validar hook
        // se é o primeiro lançe do rei, e não esta sobre check
        if (this.isFirstMove && board.getTile(this).attackedByEnemies(this.color).length === 0) {
            const rooksAvaliable = board.pieceList.filter((piece) => {
                return (
                    piece instanceof Rook &&
                    piece.color === this.color &&
                    piece.isFirstMove
                )
            }) // busca as torres disponiveis

            const [k_y, k_x] = [this.position.y, this.position.x];

            rooksAvaliable.forEach((rook) => {
                if (rook.position.y === k_y) { // mesma altura
                    const dx = k_x > rook.position.x ? -1 : 1;
                    let step = 1;

                    while (true) {
                        const tile = board.getTile(new Pos(k_y, k_x + dx * step)) as Tile;

                        if (!tile) break;

                        if (tile.occupiedBy?.ID === rook.ID) {
                            avaliableTiles.push(board.getTile(new Pos(k_y, k_x + 2 * dx)) as Tile);
                            break;
                        } // cheguei na torre sem interromper, então pode fazer o castle

                        if (tile.occupiedBy || tile.attackedByEnemies(this.color).length > 0) {
                            break;
                        }
                    
                        step++;
                    }
                }
            });
        }

        return [avaliableTiles, attackTiles];
    }
}