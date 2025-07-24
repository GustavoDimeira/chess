import Board from "./Board";
import Piece from "./Piece";
import Pos from "./Pos";

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

        if (!tile || tile.ocupatedBy) return false;

        tile.ocupatedBy = piece;
        this.pieceList.push(piece);

        return true;
    }

    public movePiece(piece: Piece, destination: Pos): boolean {
        const tile_target = piece.avaliableMoves.find((tile) => tile.position.equals(destination))
        const prev_tile = this.board.getTile(piece.position);

        if (!tile_target) return false;
        if (!prev_tile) throw new Error("incorrect board state"); // necessario para satisfazer a tipagem

        if (tile_target.ocupatedBy) { // remover a peça caso a casa destino esteja ocupada
            const targetPiece = tile_target.ocupatedBy

            targetPiece.attakedTiles.forEach((tile) => tile.attakedBy.splice(tile.attakedBy.indexOf(piece), 1));
            this.pieceList.splice(this.pieceList.indexOf(targetPiece), 1)
        }

        tile_target.ocupatedBy = piece;
        prev_tile.ocupatedBy = null
        piece.position = destination;

        // recalcular somente o movimento das peças possivelmente afetadas pela ultima movimentação
        prev_tile.attakedBy.forEach((piece) => piece.getAvaliableMoves(this.board));
        // prev_tile.sightBy.forEach((piece) => piece.getAvaliableMoves(this.board));
        tile_target.attakedBy.forEach((piece) => piece.getAvaliableMoves(this.board));
        // tile_target.sightBy.forEach((piece) => piece.getAvaliableMoves(this.board));

        this._turn = !this._turn;

        return true;
    }
}