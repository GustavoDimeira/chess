import Board from "./Board";
import Piece from "./Piece";
import King from "./pieces/King";
import Pawn from "./pieces/Pawn";
import Rook from "./pieces/Rook";
import Pos from "./Pos";
import Tile from "./Tile";

enum states {
    "inicial", "running", "tie", "win", "loss"
}


export default class Game {
    // readonly pieceList: Piece[] = [];
    private _turn: boolean = true;
    private _gameState: states  = states.inicial;
    
    constructor(
        readonly board: Board,
        public timer: [number, number],
        readonly playerColor: boolean
    ) {}

    get turn(): boolean {
        return this._turn;
    }

    get gameState(): states {
        return this.gameState
    }

    private validateState() {

    }

    public addPiece(piece: Piece, position: Pos | null = null): boolean {
        if (!position) position = piece.position;
        else piece.position = position;

        const tile = this.board.getTile(position);

        if (!tile || tile.occupiedBy) return false;

        tile.occupiedBy = piece;
        this.board.pieceList.push(piece);

        return true;
    }

    public movePiece(piece: Piece, destination: Pos): boolean {
        const tile_target = piece.avaliableMoves.find((tile) => tile.position.equals(destination));
        const prev_tile = this.board.getTile(piece);

        if (!tile_target) return false;

        if (tile_target.occupiedBy) { // matar a peça ocupante
            const targetPiece = tile_target.occupiedBy;

            targetPiece.attakedTiles.forEach((tile) => {
                const index = tile.attakedBy.findIndex(p => p.ID === targetPiece.ID);
                if (index !== -1) {
                    tile.attakedBy.splice(index, 1);
                }
            });

            this.board.pieceList.splice(this.board.pieceList.indexOf(targetPiece), 1);
        }

        if (piece instanceof King) { // validar movimento especial roque
            const dx = piece.position.x - destination.x;

            if (dx === 2 || dx === -2) { // rei fez o roque
                let rookStartTile: Tile;
                let rookEndTile: Tile;

                if (dx === 2) {
                    // Roque longo (torre na coluna A)
                    rookStartTile = this.board.getTile(new Pos(piece.position.y, piece.position.x - 4)) as Tile;
                    rookEndTile = this.board.getTile(new Pos(piece.position.y, piece.position.x - 1)) as Tile;
                } else {
                    // Roque curto (torre na coluna H)
                    rookStartTile = this.board.getTile(new Pos(piece.position.y, piece.position.x + 3)) as Tile;
                    rookEndTile = this.board.getTile(new Pos(piece.position.y, piece.position.x + 1)) as Tile;
                }

                const rook = rookStartTile.occupiedBy as Piece;

                rookEndTile.occupiedBy = rook;
                rookStartTile.occupiedBy = null;
                rook.position = rookEndTile.position;
                rook.isFirstMove = false;
            }
        }

        if (piece instanceof Pawn) { // valdiar movimento especial en passant
            const dy = piece.position.y - destination.y;

            if (dy === 2 || dy === -2) { // habilitar en passant para o tile anterior
                
                
            }

            if (false) { // validar se a peça tentou capturar como en passant
        
            }
        }

        this.board.enPassantTiles = [];

        tile_target.occupiedBy = piece;
        prev_tile.occupiedBy = null;
        piece.position = destination;
        piece.isFirstMove = false;

        // Atualiza todos os movimentos primeiro
        this.board.pieceList.forEach((p) => p.getAvaliableMoves(this.board));

        // Recalcula também os reis
        const kings = this.board.pieceList.filter((p) => p instanceof King);
        kings.forEach((king) => king.getAvaliableMoves(this.board));

        kings.forEach((king) => {
            const color = king.color;

            const kingTile = this.board.getTile(king);
            const attackers = kingTile.attackedByEnemies(color);

            if (attackers.length >= 1) {
                this.board.pieceList.forEach((p) => {
                    if (p.color !== color || p instanceof King) return;

                    // valida se a peça é capaz de bloquear ou captrar o atacante, caso tenho apenas 1
                    if (attackers.length === 1) {
                        const attacker = attackers[0];

                        p.avaliableMoves = p.avaliableMoves.filter((tile) => { 
                            return (attacker.blockeableTiles.includes(tile) || tile.position.equals(attacker.position));
                        })
                    } else {
                       p.avaliableMoves = [];
                    }
                });
            } else { // buscar pelas peças pinadas, apenas caso não tenha atacantes
                this.board.pieceList.forEach((piece) => {
                    if (piece.color === color) {
                        if (piece.pinned) {
                            piece.avaliableMoves = piece.avaliableMoves.filter(tile => piece.pinnedOptions.includes(tile))
                        }

                        piece.pinned = false;
                        piece.pinnedOptions = [];
                    }
                });
            }
        });

        this.validateState();

        this._turn = !this._turn;
        return true;
    }

}