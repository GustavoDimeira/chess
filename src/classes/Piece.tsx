import Board from "./Board";
import King from "./pieces/King";
import Pos from "./Pos";
import Tile from "./Tile";

export default abstract class Piece {
    readonly ID: string = Math.random() + "";
    public isFirstMove: boolean = true;
    protected _icon: string = '';

    private _avaliableMoves: Tile[] = [];
    private _attakedTiles: Tile[] = [];

    public pinned: boolean = false;
    public pinnedOptions: Tile[] = [];
    public blockeableTiles: Tile[] = [];
    
    constructor(
        public position: Pos,
        readonly color: boolean
    ) {}

    get avaliableMoves(): Tile[] {
        return this._avaliableMoves;
    }

    set avaliableMoves(tiles: Tile[]) {
        this._avaliableMoves = tiles;
    }

    get attakedTiles(): Tile[] {
        return this._attakedTiles;
    }

    get icon(): string {
        return this._icon;
    }

    public getAvaliableMoves(board: Board): boolean {
        this.blockeableTiles = [];
        this._attakedTiles.forEach((tile) => {
            const index = tile.attakedBy.findIndex(p => p.ID === this.ID);
            if (index !== -1) {
                tile.attakedBy.splice(index, 1);
            }
        });


        [this._avaliableMoves, this._attakedTiles] =  this.calculateMoves(board);

        this._attakedTiles.forEach((tile) => tile.attakedBy.push(this));

        return true;
    }

    protected getDirectionalMoves(
        board: Board,
        startPos: Pos,
        color: boolean,
        directions: [number, number][],
        attackTiles: Tile[],
        avaliableTiles: Tile[]
    ): void {
        for (const [dy, dx] of directions) {
            let step = 1;
            const newAttackedDirection: Tile[] = [];
            const newAvaliableDirection: Tile[] = [];
            let firstPiece: Piece | null = null;
            const inLineTiles: Tile[] = [board.getTile(this)];

            while (true) {
                const newY = startPos.y + dy * step;
                const newX = startPos.x + dx * step;
                const tile = board.getTile(new Pos(newY, newX));
                if (!tile) break;

                if (!firstPiece) newAttackedDirection.push(tile);

                if (tile.occupiedBy) {
                    const targetPiece = tile.occupiedBy;

                    if (targetPiece.color !== color) {
                        if (!firstPiece) newAvaliableDirection.push(tile);

                        if (targetPiece instanceof King) {
                            if (firstPiece) {
                                // A peça entre o rei e essa está pinada
                                firstPiece.pinned = true;
                                firstPiece.pinnedOptions = inLineTiles;
                            } else {
                                this.blockeableTiles = newAvaliableDirection; 

                                step++;
                                const nextY = startPos.y + dy * step;
                                const nextX = startPos.x + dx * step;
                                const nextTile = board.getTile(new Pos(nextY, nextX));
                                if (nextTile) newAttackedDirection.push(nextTile);
                            }
                            break;
                        }

                        if (!firstPiece) {
                            firstPiece = targetPiece;
                            step++;
                            continue;
                        }
                    }

                    // Peça aliada ou já tem uma peça no caminho
                    break;
                } else {
                    if (!firstPiece) {
                        newAvaliableDirection.push(tile);
                    }
                    inLineTiles.push(tile);
                }

                step++;
            }

            attackTiles.push(...newAttackedDirection);
            avaliableTiles.push(...newAvaliableDirection);
        }
    }

    protected abstract calculateMoves(board: Board): [Tile[], Tile[]];
}