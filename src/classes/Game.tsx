import Board from "./Board";
import Piece from "./Piece";
import King from "./pieces/King";
import Pos from "./Pos";
import Tile from "./Tile";

/**
 * Possíveis estados do jogo:
 * - `"r"`: rodando (running)
 * - `"t"`: empate (tie)
 * - `"w"`: vitória (win)
 * - `"l"`: derrota (loss)
 * - `"i"`: estado inicial (initial)
 */
type states = "r" | "t" | "w" | "l" | "i"

export default class Game {
    readonly pieceList: Piece[] = [];
    private _turn: boolean = true;
    private _gameState: states  = "i";
    
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
        this.pieceList.push(piece);

        return true;
    }

    public movePiece(piece: Piece, destination: Pos): boolean {       
        const tile_target = piece.avaliableMoves.find((tile) => tile.position.equals(destination));
        const prev_tile = this.board.tiles[piece.position.y][piece.position.x];

        if (!tile_target) return false;

        if (tile_target.occupiedBy) { // matar a peça ocupante
            const targetPiece = tile_target.occupiedBy;

            targetPiece.attakedTiles.forEach((tile) => {
                tile.attakedBy.splice(tile.attakedBy.indexOf(piece), 1);
            });

            this.pieceList.splice(this.pieceList.indexOf(targetPiece), 1);
        }

        tile_target.occupiedBy = piece;
        prev_tile.occupiedBy = null;
        piece.position = destination;
        piece.isFirstMove = false;

        // Atualiza todos os movimentos primeiro
        this.pieceList.forEach((p) => p.getAvaliableMoves(this.board));

        // Recalcula também os reis
        const kings = this.pieceList.filter((p) => p instanceof King);
        kings.forEach((king) => king.getAvaliableMoves(this.board));

        kings.forEach((king) => {
            const color = king.color;

            const kingTile = this.board.getTile(king.position) as Tile;
            const attackers = kingTile.attackedByEnemies(color);

            if (attackers.length >= 1) {
                this.pieceList.forEach((p) => {
                    if (p.color !== color || p instanceof King) return;

                    // Se só tem 1 atacante, deixa as peças que podem capturá-lo ou bloquer se mover
                    if (attackers.length === 1) {
                        const attacker = attackers[0];
                        const canCapture = p.avaliableMoves.some((t) =>
                            t.position.equals(attacker.position)
                        );
                        const canBlock = false; // # todo
                        if (canCapture) {
                            p.avaliableMoves = [this.board.getTile(attacker.position) as Tile];
                        } else if (canBlock)
                            p.avaliableMoves = [] // # todo
                        else {
                            p.avaliableMoves = [];
                        }
                    } else {
                       p.avaliableMoves = [];
                    }
                });
            } else { // buscar pelas peças pinadas
                this.pieceList.forEach((piece) => {
                    if (piece.color === color) {
                        if (piece.pinned) {
                            piece.avaliableMoves = piece.avaliableMoves.filter(tile => piece.options.includes(tile))
                        }

                        piece.pinned = false;
                        piece.options = [];
                    }
                });
            }
        });

        this.validateState();

        this._turn = !this._turn;
        return true;
    }

}