import Board from "./Board";
import Piece from "./Piece";
import Pos from "./Pos";
import Tile from "./Tile";

export default class Game {
    readonly pieceList: Piece[] = [];
    private _turn: boolean = true;
    
    constructor(
        readonly board: Board,
    ) {}

    get turn(): boolean {
        return this._turn;
    }

    public addPiece(piece: Piece, position: Pos | null = null): boolean {
        if (!position) position = piece.position;
        else piece.position = position;

        const tile = this.board.getTile(position);

        if (!tile || tile.occupiedBy) return false;

        tile.occupiedBy = piece;
        this.pieceList.push(piece);

        return true;
    }

    public movePiece(piece: Piece, destination: Pos): boolean {       
        const tile_target = piece.avaliableMoves.find((tile) => tile.position.equals(destination));
        const prev_tile = this.board.tiles[piece.position.y][piece.position.x]; // getTile(piece.position);

        if (!tile_target) return false;
        // if (!prev_tile) throw new Error("incorrect board state"); // necessario para satisfazer a tipagem

        if (tile_target.occupiedBy) { // remover a peça caso a casa destino esteja ocupada
            const targetPiece = tile_target.occupiedBy;

            targetPiece.attakedTiles.forEach((tile) => tile.attakedBy.splice(tile.attakedBy.indexOf(piece), 1));
            this.pieceList.splice(this.pieceList.indexOf(targetPiece), 1);
        }

        tile_target.occupiedBy = piece;
        prev_tile.occupiedBy = null
        piece.position = destination;
        piece.isFirstMove = false;

        this.pieceList.forEach((piece) => piece.getAvaliableMoves(this.board));

        this._turn = !this._turn;

        return true;
    }
}