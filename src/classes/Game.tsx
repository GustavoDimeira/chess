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
    private _gameState: states = states.inicial;

    constructor(
        readonly board: Board,
        public timer: [number, number],
        readonly playerColor: boolean
    ) { }

    get turn(): boolean {
        return this._turn;
    }

    get gameState(): states {
        return this.gameState
    }

    private validateState() {
        // todo
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

    private removePiece(tile_target: Tile): boolean {
        if (!tile_target.occupiedBy) return false;
        const targetPiece = tile_target.occupiedBy;

        targetPiece.attakedTiles.forEach((tile) => {
            const index = tile.attakedBy.findIndex(p => p.ID === targetPiece.ID);
            if (index !== -1) {
                tile.attakedBy.splice(index, 1);
            }
        });

        this.board.pieceList.splice(this.board.pieceList.indexOf(targetPiece), 1);
        tile_target.occupiedBy = null;
        return true;
    }

    private validateCastle(piece: Piece, destination: Pos): void {
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

    private validateEnPassant(piece: Pawn, destination: Pos) {
        const dy = piece.position.y - destination.y;

        // Caso o peão tenha avançado 2 casas (possibilita en passant)
        if (dy === 2 || dy === -2) {
            const direction = dy === 2 ? -1 : 1;

            // Tile atrás do peão após ele avançar duas casas
            this.board.enPassantTile = this.board.getTile(new Pos(
                piece.position.y + direction,
                piece.position.x
            ));
        } else {
            // Verifica se o movimento atual foi uma captura por en passant
            if (
                this.board.enPassantTile &&
                destination.equals(this.board.enPassantTile.position)
            ) {
                const capturedPawnTile = this.board.getTile(new Pos(
                    piece.position.y,
                    destination.x
                )) as Tile;

                this.removePiece(capturedPawnTile); // remove o peão
            }

            this.board.enPassantTile = null;
        }
    }

    private validateCheck(kings: Piece[]) {
        kings.forEach((king) => {
            const color = king.color;

            const kingTile = this.board.getTile(king);
            const attackers = kingTile.attackedByEnemies(color);

            if (attackers.length >= 1) {
                this.board.pieceList.forEach((p) => {
                    if (p.color !== color || p instanceof King) return;

                    if (attackers.length === 1) {
                        const attacker = attackers[0];

                        p.avaliableMoves = p.avaliableMoves.filter((tile) => {
                            // Captura direta ou bloqueio
                            const isBlockingOrCapturing = attacker.blockeableTiles.includes(tile) || tile.position.equals(attacker.position);

                            // Captura por en passant (somente se p é peão e o tile é a casa de en passant)
                            let isEnPassantCapture = false;

                            if (
                                p instanceof Pawn &&
                                this.board.enPassantTile &&
                                tile.position.equals(this.board.enPassantTile.position)
                            ) {
                                // O peão capturado por en passant estaria na mesma linha do peão atacante
                                const capturedPawnTile = this.board.getTile(new Pos(
                                    p.position.y,
                                    tile.position.x
                                ));

                                const capturedPawn = capturedPawnTile?.occupiedBy;
                                if (capturedPawn?.ID === attacker.ID) {
                                    isEnPassantCapture = true;
                                }
                            }

                            return isBlockingOrCapturing || isEnPassantCapture;
                        });

                    } else {
                        // Mais de um atacante: só o rei pode se mover
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
    }

    public movePiece(piece: Piece, destination: Pos): boolean {
        const tile_target = piece.avaliableMoves.find((tile) => tile.position.equals(destination));
        const prev_tile = this.board.getTile(piece);

        if (!tile_target) return false;

        if (tile_target.occupiedBy) this.removePiece(tile_target);

        if (piece instanceof King) this.validateCastle(piece, destination);
        if (piece instanceof Pawn) this.validateEnPassant(piece, destination);
        else {
            this.board.enPassantTile = null;
        }

        // mover a peça
        tile_target.occupiedBy = piece;
        prev_tile.occupiedBy = null;
        piece.position = destination;
        piece.isFirstMove = false;

        // Atualiza todos as peças
        this.board.pieceList.forEach((p) => p.getAvaliableMoves(this.board));

        // Recalcula também os reis para garantir consistencia
        const kings: Piece[] = this.board.pieceList.filter((p) => p instanceof King);
        kings.forEach((king) => king.getAvaliableMoves(this.board));

        this.validateCheck(kings);

        this.validateState();

        this._turn = !this._turn;
        return true;
    }

}