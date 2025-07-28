import Piece from "./Piece";
import Pos from "./Pos";
import Tile from "./Tile";

export default class Board {
    readonly tiles: Tile[][] = [];
    readonly pieceList: Piece[] = [];
    public enPassantTile: Tile | null = null;
    public enPassantColor : boolean | null = null;

    constructor(readonly size: number) {
        for(let y = 0; y < size; y++) {
            this.tiles.push([])
            for (let x = 0; x < size; x ++) {
                this.tiles[y].push(new Tile(new Pos(y, x)))
            }
        }
    }

    public getTile(position: Pos): Tile | null;
    public getTile(piece: Piece): Tile;
    public getTile(arg: Piece | Pos): Tile | null {
        const position = arg instanceof Piece ? arg.position : arg;

        if (position.x >= this.size || position.x < 0 || position.y >= this.size || position.y < 0) {
            if (arg instanceof Piece) throw new Error("invalid board state");
            return null;
        }

        return this.tiles[position.y][position.x];
    }
}
