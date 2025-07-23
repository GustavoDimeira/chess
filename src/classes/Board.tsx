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
                this.tiles[y].push(new Tile())
            }
        }
    }
}
