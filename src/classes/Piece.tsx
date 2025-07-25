import Board from "./Board";
import Pos from "./Pos";
import Tile from "./Tile";

export default abstract class Piece {
    public isFirstMove: boolean = true;

    private _avaliableMoves: Tile[] = [];
    private _attakedTiles: Tile[] = [];
    
    constructor(
        public position: Pos,
        readonly color: boolean
    ) {}

    get avaliableMoves(): Tile[] {
        return this._avaliableMoves;
    }

    get attakedTiles(): Tile[] {
        return this._attakedTiles;
    }

    public getAvaliableMoves(board: Board): boolean {
        this._attakedTiles.forEach((tile) => tile.attakedBy.splice(tile.attakedBy.indexOf(this), 1));

        [this._avaliableMoves, this._attakedTiles] =  this.calculateMoves(board);

        this._attakedTiles.forEach((tile) => tile.attakedBy.push(this));

        return true;
    }

    protected abstract calculateMoves(board: Board): [Tile[], Tile[]];
}