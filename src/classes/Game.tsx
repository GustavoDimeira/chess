import Board from "./Board";
import Piece from "./Piece";
import King from "./pieces/King";
import Pawn from "./pieces/Pawn";
import Pos from "./Pos";
import Tile from "./Tile";

import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";

export enum GameState {
    inicial, running, tie, win
}

export type GameEndReason = 'checkmate' | 'timeout' | 'stalemate' | 'insufficient_material';

export default class Game {
    private _turn: boolean = true;
    private _gameState: GameState = GameState.inicial;
    public winner: boolean | null = null; // true for white, false for black
    public gameEndReason: GameEndReason | null = null;
    private timerInterval: NodeJS.Timeout | null = null;
    private _promoting: boolean = false;

    constructor(
        readonly board: Board,
        public timer: [number, number], // [whiteTime, blackTime] in seconds
        public playerColor: boolean
    ) {
        this._gameState = GameState.running;
        this.startTimer();
    }

    get turn(): boolean {
        return this._turn;
    }

    get gameState(): GameState {
        return this._gameState;
    }

    get promoting(): boolean {
        return this._promoting;
    }

    private startTimer(): void {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            if (this._gameState !== GameState.running) {
                clearInterval(this.timerInterval as NodeJS.Timeout);
                return;
            }

            const timerIndex = this._turn ? 0 : 1;
            this.timer[timerIndex] -= 0.1;

            if (this.timer[timerIndex] <= 0) {
                this.timer[timerIndex] = 0;
                clearInterval(this.timerInterval as NodeJS.Timeout);
                this.handleTimeout();
            }
        }, 100);
    }

    private handleTimeout(): void {
        const winnerColor = !this._turn;
        // Check if the player who has time has sufficient material to win
        if (this.hasSufficientMaterial(winnerColor)) {
            this._gameState = GameState.win;
            this.winner = winnerColor;
            this.gameEndReason = 'timeout';
        } else {
            this._gameState = GameState.tie;
            this.winner = null;
            this.gameEndReason = 'insufficient_material';
        }
    }

    private hasSufficientMaterial(color: boolean): boolean {
        const pieces = this.board.pieceList.filter(p => p.color === color);

        // Queen or Rook or Pawn is always sufficient
        if (pieces.some(p => p instanceof Queen || p instanceof Rook || p instanceof Pawn)) {
            return true;
        }

        const bishops = pieces.filter(p => p instanceof Bishop);
        const knights = pieces.filter(p => p instanceof Knight);

        // Two bishops, or one bishop and one knight is sufficient
        if (bishops.length >= 2 || (bishops.length >= 1 && knights.length >= 1)) {
            return true;
        }

        // Two knights is also sufficient against a lone king
        if (knights.length >= 2) {
            return true;
        }

        return false;
    }

    private updateGameState(): void {
        const kings = this.board.pieceList.filter(p => p instanceof King);
        const king = kings.find(k => k.color === this._turn);
        if (!king) return; // Should not happen

        const kingTile = this.board.getTile(king);
        const kingInCheck = kingTile.attackedByEnemies(this._turn).length > 0;

        let hasLegalMoves = false;
        for (const piece of this.board.pieceList) {
            if (piece.color === this._turn && piece.avaliableMoves.length > 0) {
                hasLegalMoves = true;
                break;
            }
        }

        if (!hasLegalMoves) {
            if (kingInCheck) {
                this._gameState = GameState.win;
                this.winner = !this._turn; // The other player wins
                this.gameEndReason = 'checkmate';
            } else {
                this._gameState = GameState.tie;
                this.winner = null;
                this.gameEndReason = 'stalemate';
            }
        } else {
            this._gameState = GameState.running;
        }
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

    private removePiece(arg: Tile | Piece): boolean {
        const tile_target = arg instanceof Tile ? arg : this.board.getTile(arg);


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

    private validateEnPassant(piece: Pawn, destination: Pos): void {
        const dy = piece.position.y - destination.y;

        // Caso o peão tenha avançado 2 casas (possibilita en passant)
        if (dy === 2 || dy === -2) {
            const direction = dy === 2 ? -1 : 1;

            // Tile atrás do peão após ele avançar duas casas
            this.board.enPassantTile = this.board.getTile(new Pos(
                piece.position.y + direction,
                piece.position.x
            ));
            this.board.enPassantColor = piece.color;
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
            this.board.enPassantColor = null;
        }
    }

    private validateCheck(kings: Piece[]): void {
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
                            const isBlockingOrCapturing = (
                                (
                                    attacker.blockeableTiles.includes(tile) || tile.position.equals(attacker.position)
                                ) &&
                                (
                                    !p.pinned || p.pinnedOptions.includes(this.board.getTile(attacker))
                                )
                            );

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
    
    private getNotation(attacker: Piece, attacked: Piece | null, attacked_tile: Tile): string {
        let finalString = "";

        const file = String.fromCharCode("a".charCodeAt(0) + attacker.position.x);
        const rank = (8 - attacker.position.y).toString();

        // atacantes do mesmo tipo e cor que podem ir para esse tile
        const sameTypeAttackers = attacked_tile.attakedBy.filter(
            a => a.symbol === attacker.symbol && a.color === attacker.color
        );

        if (attacker.symbol !== "P") {
            finalString += attacker.symbol;
        }

        if (attacked && attacker.symbol === "P") {
            finalString += file;
        } else if (sameTypeAttackers.length > 1) {
            const others = sameTypeAttackers.filter(a => a !== attacker);
            const anySameFile = others.some(a => a.position.x === attacker.position.x);
            const anySameRank = others.some(a => a.position.y === attacker.position.y);

            if (!anySameFile) {
                finalString += file;
            } else if (!anySameRank) {
                finalString += rank;
            } else {
                finalString += file + rank;
            }
        }

        // Captura
        if (attacked) finalString += "x";

        // Destino
        finalString += String.fromCharCode("a".charCodeAt(0) + attacked_tile.position.x);
        finalString += (8 - attacked_tile.position.y).toString();

        return finalString;
    }

    private checkPromotion(piece: Piece): void {
        if (piece instanceof Pawn) {
            if (piece.position.y == 7 || piece.position.y == 0) {
                this._promoting = true
            }
        }
    }

    public promote(piece: Piece): void {
        if (this._promoting) {
            this.removePiece(piece);
            this.addPiece(new Queen(piece.position, piece.color));

            this._promoting = false;
        }
    }

    public movePiece(piece: Piece, destination: Pos): string | boolean {
        if (!piece.avaliableMoves.find((move) => move.position.equals(destination))) return false;

        const tile_target = piece.avaliableMoves.find((tile) => tile.position.equals(destination));
        const prev_tile = this.board.getTile(piece);

        if (!tile_target) return false;

        var notation = this.getNotation(piece, tile_target.occupiedBy, this.board.getTile(destination) as Tile); // confia

        if (tile_target.occupiedBy) this.removePiece(tile_target);

        if (piece instanceof King) this.validateCastle(piece, destination);
        if (piece instanceof Pawn) {
            this.validateEnPassant(piece, destination);
        } else {
            this.board.enPassantTile = null;
            this.board.enPassantColor = null;
        }

        // mover a peça
        tile_target.occupiedBy = piece;
        prev_tile.occupiedBy = null;
        piece.position = destination;
        piece.isFirstMove = false;

        this.checkPromotion(piece);

        this._turn = !this._turn;

        // Atualiza todos as peças
        this.board.pieceList.forEach((p) => p.getAvaliableMoves(this.board, this._turn));

        // Recalcula também os reis para garantir consistencia
        const kings: Piece[] = this.board.pieceList.filter((p) => p instanceof King);
        kings.forEach((king) => king.getAvaliableMoves(this.board, this._turn));

        this.validateCheck(kings);

        this.updateGameState();

        return notation;
    }
}