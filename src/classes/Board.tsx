import Pos from "./Pos";
import Tile from "./Tile";

export default class Board {
    readonly tiles: Tile[][] = [];

    constructor(
        readonly size: number,
    ) {
        this.size = size;

        for(let y = 0; y < size; y++) {
            this.tiles.push([])
            for (let x = 0; x < size; x ++) {
                this.tiles[y].push(new Tile(new Pos(y, x)))
            }
        }
    }

    public getTile(position: Pos): Tile | null {
        if (position.x >= this.size || position.x < 0 || position.y >= this.size || position.y < 0) {
            return null;
        }

        return this.tiles[position.y][position.x];
    }
}
