import Board from "../Board";
import Piece from "../Piece";
import Pos from "../Pos";
import Tile from "../Tile";

export default class Pawn extends Piece {
    private direction: number;

    constructor(
       readonly position: Pos,
       readonly color: boolean,
       readonly symbol: string = "P"
    ) {
        super(position, color);

        this.direction = this.color ? -1 : 1;
        this._icon = "♟";
    }

    protected calculateMoves(board: Board): [Tile[], Tile[]] {
        const [x, y] = [this.position.x, this.position.y];

        const attack1 = board.getTile(new Pos(y + this.direction, x - 1));
        const attack2 = board.getTile(new Pos(y + this.direction, x + 1));

        const avaliableTiles: Tile[] = [];
        const attackTiles: Tile[] = [];

        if (attack1) {
            attackTiles.push(attack1);
            if ((attack1.occupiedBy && attack1.occupiedBy.color !== this.color) || (board.enPassantTile?.position === attack1.position && board.enPassantColor !== this.color)) {
                avaliableTiles.push(attack1);
            }
        }

        if (attack2) {
            attackTiles.push(attack2);
            if ((attack2.occupiedBy && attack2.occupiedBy.color !== this.color) || (board.enPassantTile?.position === attack2.position && board.enPassantColor !== this.color)) {
                avaliableTiles.push(attack2);
            }
        }

        const move1 = board.getTile(new Pos(y + this.direction, x));
        const move2 = board.getTile(new Pos(y + (this.direction * 2), x));

        if (move1 && !move1.occupiedBy) {
            avaliableTiles.push(move1);

            if (move2 && !move2.occupiedBy && this.isFirstMove) {
                avaliableTiles.push(move2);
            }
        }

        return [avaliableTiles, attackTiles];
    }
}